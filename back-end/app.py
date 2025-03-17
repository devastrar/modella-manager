from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, jwt_required
from flask_socketio import SocketIO
from celery import Celery
import os
from pathlib import Path
import requests
from tasks import download_file

# Initialize Flask application
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key')  # Secure JWT secret
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'  # Redis broker for Celery
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'  # Redis backend for Celery results
jwt = JWTManager(app)  # JWT authentication manager
socketio = SocketIO(app)  # Real-time communication with Socket.IO
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])  # Celery task queue
celery.conf.update(app.config)

# Route to fetch Civitai models
@app.route('/civitai/models', methods=['GET'])
@jwt_required()
def get_civitai_models():
    params = request.args.to_dict()  # Pass query parameters to Civitai API
    response = requests.get('https://civitai.com/api/v1/models', params=params)
    return jsonify(response.json())

# Route to fetch Hugging Face models
@app.route('/huggingface/models', methods=['GET'])
@jwt_required()
def get_huggingface_models():
    params = request.args.to_dict()  # Pass query parameters to Hugging Face API
    response = requests.get('https://huggingface.co/api/models', params=params)
    # Transform flat list into tree structure (e.g., by repository)
    tree_data = [{'id': model['id'], 'name': model['id'], 'children': []} for model in response.json()]
    return jsonify(tree_data)

# Route to initiate a download task
@app.route('/download', methods=['POST'])
@jwt_required()
def initiate_download():
    data = request.json  # Expect JSON payload with download details
    task = download_file.delay(data['url'], data['path'], data['model_id'], data['source'], os.getenv('STORAGE_PATH', '/workspace/models'))
    return jsonify({'taskId': task.id})  # Return task ID for tracking

# Route to cancel a download task
@app.route('/api/download/cancel/<task_id>', methods=['POST'])
@jwt_required()
def cancel_download(task_id):
    celery.control.revoke(task_id, terminate=True)  # Revoke and terminate the task
    return jsonify({'message': 'Download cancelled'})

# Route to get local models tree structure
@app.route('/local-models/tree', methods=['GET'])
@jwt_required()
def get_local_models_tree():
    base_path = os.getenv('STORAGE_PATH', '/workspace/models')  # Storage directory
    tree = []
    for root, dirs, files in os.walk(base_path):
        node = {'id': root, 'name': os.path.basename(root), 'children': []}
        for file in files:
            file_path = os.path.join(root, file)
            size = os.path.getsize(file_path) / (1024 * 1024)  # Size in MB
            node['children'].append({'id': file_path, 'name': file, 'size': size})
        tree.append(node)
    return jsonify(tree)

# Route to get disk usage statistics
@app.route('/api/disk-usage', methods=['GET'])
@jwt_required()
def get_disk_usage():
    base_path = os.getenv('STORAGE_PATH', '/workspace/models')
    usage = {'civitai': 0, 'huggingface': 0, 'other': 0}
    for root, _, files in os.walk(base_path):
        for file in files:
            size = os.path.getsize(os.path.join(root, file)) / (1024 * 1024 * 1024)  # Size in GB
            if 'civitai' in root.lower():
                usage['civitai'] += size
            elif 'huggingface' in root.lower():
                usage['huggingface'] += size
            else:
                usage['other'] += size
    return jsonify(usage)

# Run the application with Socket.IO
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)