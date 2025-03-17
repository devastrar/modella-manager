# Modella Manager Back-End

This directory contains the Flask-based back-end for Modella Manager.

## Directory Structure
- `app.py`: Main Flask app with API routes.
- `tasks.py`: Celery tasks for async operations.
- `tests/`: API and task tests.

## Setup
1. Install dependencies: `pip install -r requirements.txt`
2. Set up Redis for Celery.
3. Run the app: `flask run`

## Testing
Run tests with `pytest`.