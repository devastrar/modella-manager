import pytest
from tasks import download_file
from unittest.mock import patch, MagicMock
import requests

def test_download_file_network_failure():
    """Test that download_file handles network failures gracefully."""
    with patch('requests.get', side_effect=requests.RequestException('Network error')):
        result = download_file.apply(args=['url', 'path', 'id', 'civitai', '/base'])
        assert result.state == 'FAILURE'
        assert 'Network error' in str(result.result)

def test_download_file_hash_verification_failure():
    """Test that download_file fails on hash mismatch."""
    with patch('requests.get', return_value=MagicMock(status_code=200, iter_content=lambda chunk_size: [b'chunk1', b'chunk2'])):
        with patch('blake3.blake3', return_value=MagicMock(hexdigest=lambda: 'wrong_hash')):
            with patch('tasks.get_huggingface_file_hash', return_value='correct_hash'):
                with pytest.raises(ValueError, match="Hash mismatch"):
                    download_file('url', 'path', 'id', 'huggingface', '/base')

def test_download_file_timeout():
    """Test that download_file handles timeouts gracefully."""
    with patch('requests.get', side_effect=requests.exceptions.Timeout('Timeout')):
        result = download_file.apply(args=['url', 'path', 'id', 'civitai', '/base'])
        assert result.state == 'FAILURE'
        assert 'Timeout' in str(result.result)