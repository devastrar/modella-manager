import os
import requests
from flask_socketio import SocketIO
import hashlib
from celery import shared_task
from huggingface_hub import hf_hub_download, HfApi
import blake3
from pathlib import Path

# Initialize Socket.IO for real-time updates
socketio = SocketIO()

# Validate file path to prevent traversal attacks
def validate_path(path, base):
    """Ensure the file path is safe and within the base directory."""
    base_path = Path(base).resolve()
    abs_path = (base_path / path).resolve()
    if not abs_path.is_relative_to(base_path):
        raise ValueError("Invalid download path attempted: path traversal detected")
    return str(abs_path)

# Fetch SHA256 hash for Hugging Face files
def get_huggingface_file_hash(repo_id, filename):
    """Retrieve the SHA256 hash for a file from Hugging Face."""
    api = HfApi()
    try:
        file_info = api.file_metadata(repo_id=repo_id, filename=filename)
        return file_info.sha256.lower() if file_info.sha256 else None
    except Exception as e:
        print(f"Warning: Could not fetch hash for {repo_id}/{filename}: {e}")
        return None

# Celery task to download a file
@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def download_file(self, url, path, model_id, source, base):
    """Download a file from the specified URL with progress updates and hash verification."""
    try:
        path = validate_path(path, base)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        resume_byte_pos = os.path.getsize(path) if os.path.exists(path) else 0
        headers = {'Range': f'bytes={resume_byte_pos}-'} if resume_byte_pos else {}

        with requests.get(url, stream=True, headers=headers, timeout=30) as r:
            r.raise_for_status()
            total_size = int(r.headers.get('content-length', 0)) + resume_byte_pos
            hasher = hashlib.sha256() if source == 'huggingface' else blake3.blake3()
            with open(path, 'ab') as f:
                downloaded = resume_byte_pos
                for chunk in r.iter_content(chunk_size=1024 * 1024):  # 1MB chunks
                    if chunk:
                        f.write(chunk)
                        hasher.update(chunk)
                        downloaded += len(chunk)
                        progress = (downloaded / total_size) * 100 if total_size else 0
                        socketio.emit('queue_update', [{
                            'id': model_id,
                            'name': os.path.basename(path),
                            'status': 'downloading',
                            'progress': progress
                        }])
            computed_hash = hasher.hexdigest()

            # Hash verification logic
            if source == 'civitai':
                meta = requests.get(f"https://civitai.com/api/v1/models/{model_id}").json()
                expected_hash = meta['modelVersions'][0]['files'][0]['hashes'].get('BLAKE3', '').lower()
                hash_type = 'BLAKE3'
            elif source == 'huggingface':
                repo_id, filename = model_id.rsplit('/', 1) if '/' in model_id else (model_id, os.path.basename(path))
                expected_hash = get_huggingface_file_hash(repo_id, filename)
                hash_type = 'SHA256'
                if not expected_hash:
                    print(f"No hash available for {model_id}, computed hash: {computed_hash}")
                    socketio.emit('queue_update', [{
                        'id': model_id,
                        'name': os.path.basename(path),
                        'status': 'completed',
                        'progress': 100,
                        'warning': f'Hash computed locally: {computed_hash}'
                    }])
                    return

            if expected_hash and computed_hash != expected_hash:
                os.remove(path)
                socketio.emit('queue_update', [{
                    'id': model_id,
                    'name': os.path.basename(path),
                    'status': 'failed',
                    'progress': 0,
                    'reason': f'{hash_type} hash verification failed'
                }])
                raise ValueError(f"Hash mismatch: {computed_hash} != {expected_hash}")
            else:
                socketio.emit('queue_update', [{
                    'id': model_id,
                    'name': os.path.basename(path),
                    'status': 'completed',
                    'progress': 100
                }])
    except requests.Timeout as e:
        socketio.emit('queue_update', [{'id': model_id, 'status': 'failed', 'reason': 'Timeout'}])
        self.retry(exc=e)
    except requests.RequestException as e:
        socketio.emit('queue_update', [{'id': model_id, 'status': 'failed', 'reason': str(e)}])
        raise