import pytest
from app import app, validate_path

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_path_traversal():
    with pytest.raises(ValueError):
        validate_path('../etc/passwd', '/workspace')
    with pytest.raises(ValueError):
        validate_path('/absolute/path', '/workspace')
    assert validate_path('models/test', '/workspace') == '/workspace/models/test'

def test_expired_token(client):
    # Simulate expired token scenario (mock JWT if needed)
    response = client.post('/api/download', json={"path": "/workspace/test"}, headers={"Authorization": "Bearer expired-token"})
    assert response.status_code == 401
    assert "Token expired" in response.get_json()["msg"]