import sqlite3
import pytest
from app import get_db_connection

@pytest.fixture
def db_connection():
conn = sqlite3.connect(':memory:')
conn.row_factory = sqlite3.Row
conn.execute('CREATE TABLE model_cache (model_id TEXT PRIMARY KEY, metadata TEXT)')
yield conn
conn.close()

@pytest.fixture
def mock_db(monkeypatch, db_connection):
monkeypatch.setattr('app.get_db_connection', lambda: db_connection)
yield db_connection

def test_insert_model(mock_db):
conn = get_db_connection()
cursor = conn.cursor()
cursor.execute('INSERT INTO model_cache (model_id, metadata) VALUES (?, ?)', ('1', '{"name": "Test Model"}'))
conn.commit()
cursor.execute('SELECT * FROM model_cache WHERE model_id = ?', ('1',))
result = cursor.fetchone()
assert result['metadata'] == '{"name": "Test Model"}'

def test_delete_model(mock_db):
conn = get_db_connection()
cursor = conn.cursor()
cursor.execute('INSERT INTO model_cache (model_id, metadata) VALUES (?, ?)', ('1', '{"name": "Test Model"}'))
conn.commit()
cursor.execute('DELETE FROM model_cache WHERE model_id = ?', ('1',))
conn.commit()
cursor.execute('SELECT * FROM model_cache WHERE model_id = ?', ('1',))
assert cursor.fetchone() is None


