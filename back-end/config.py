import os

class Config:
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'default_secret_key')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'default_jwt_secret')
    SQLITE_DB_PATH = os.getenv('SQLITE_DB_PATH', '/workspace/modella.db')
    STORAGE_PATH = os.getenv('STORAGE_PATH', '/workspace/models')
    CIVITAI_API_KEY = os.getenv('CIVITAI_API_KEY', '')
    HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY', '')
    ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '*').split(',')
    PORT = int(os.getenv('PORT', 5000))
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
    VERSION = '1.0.0'
    ENCRYPTION_KEY = os.getenv('ENCRYPTION_KEY')
    CELERY_BROKER_URL = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0')

    if not SECRET_KEY:
        raise ValueError("FLASK_SECRET_KEY must be set in environment variables")
    if not JWT_SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY must be set in environment variables")
    if not ENCRYPTION_KEY:
        raise ValueError("ENCRYPTION_KEY must be set for secure API key storage")