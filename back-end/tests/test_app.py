import pytest
from app import app
from unittest.mock import patch

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_search_civatai_missing_query(client):
    response = client.get('/api/search/civatai')
    assert response.status_code == 400
    assert response.json['messageKey'] == 'search_query_missing'

@patch('requests.get')
def test_search_civatai_success(mock_get, client):
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {'models': []}
    response = client.get('/api/search/civatai?query=test')
    assert response.status_code == 200
    assert response.json['messageKey'] == 'search_success'

def test_remove_model_not_found(client):
    response = client.delete('/api/models/remove/unknown')
    assert response.status_code == 404
    assert response.json['messageKey'] == 'model_not_found'

@patch('app.get_db_connection')
def test_remove_model_success(mock_db, client):
    mock_conn = mock_db.return_value
    mock_conn.execute.return_value.fetchone.return_value = {'model_id': '1'}
    mock_conn.execute.return_value.rowcount = 1
    response = client.delete('/api/models/remove/1')
    assert response.status_code == 200
    assert response.json['messageKey'] == 'model_removed_successfully'
    mock_conn.execute.assert_called_with('DELETE FROM downloaded_models WHERE model_id = ?', ('1',))