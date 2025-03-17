import pytest
from app import app as flask_app
from tasks import app as celery_app
import sqlite3
import os

@pytest.fixture
def app():
    """Create a Flask app instance for testing."""
    flask_app.config['TESTING'] = True
    flask_app.config['SQLITE_DB_PATH'] = ':memory:'  # For testing only; production uses [e.g., PostgreSQL]
    yield flask_app

@pytest.fixture
def client(app):
    """Create a test client for the Flask app."""
    return app.test_client()

@pytest.fixture
def celery(celery_app):
    """Create a Celery app instance for testing."""
    celery_app.conf.update(CELERY_ALWAYS_EAGER=True)
    yield celery_app

@pytest.fixture
def db():
    """Create an in-memory SQLite database for testing."""
    conn = sqlite3.connect(':memory:')
    conn.execute('CREATE TABLE settings (user_id TEXT PRIMARY KEY, encrypted_api_key TEXT, storage_path TEXT)')
    conn.execute('CREATE TABLE downloaded_models (model_id TEXT PRIMARY KEY, path TEXT)')
    yield conn
    conn.close()