## Instructions for Setup

- **Front-end Dependencies**: Install via npm:
  ```bash
  npm install socket.io-client react-toastify @material-ui/core axios axios-retry react-i18next
  ```

- **Back-end Dependencies**: Install via pip:
  ```bash
  pip install flask flask-jwt-extended flask-socketio celery requests huggingface_hub blake3 pytest
  ```

- **Environment Variables**: Set in the back-end environment (e.g., `.env` file or system variables):
  ```plaintext
  CIVITAI_API_KEY=your_civitai_api_key
  HUGGINGFACE_API_KEY=your_huggingface_api_key
  JWT_SECRET_KEY=your_jwt_secret_here
  STORAGE_PATH=/workspace/models
  ```

- **Running the Application**:
  - Start the back-end: `python back-end/app.py`
  - Start the front-end: `cd front-end && npm start`
  - Ensure Celery is running: `celery -A tasks worker --loglevel=info`

- **Testing**:
  - Front-end tests: `cd front-end && npm test`
  - Back-end tests: `cd back-end && pytest`