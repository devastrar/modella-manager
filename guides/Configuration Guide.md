# Modella Manager Software Configuration Guide

This guide provides detailed and comprehensive instructions for configuring the **Modella Manager** application, ensuring it is set up correctly for development, testing, or production environments. Proper configuration is essential for optimal performance, especially when integrating with external APIs like **Civitai** and **Hugging Face**, and for ensuring secure and efficient operation within a **Runpod** environment with **Stable Diffusion WebUI Forge**. Follow each section carefully to set up the application successfully.

---

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Environment Setup](#environment-setup)
3. [Configuration Steps](#configuration-steps)
4. [Troubleshooting Common Issues](#troubleshooting-common-issues)
5. [Conclusion](#conclusion)

---

## System Requirements

Before configuring Modella Manager, ensure your system meets the following hardware and software prerequisites.

### Hardware Requirements
- **CPU**: Minimum 4 cores (recommended: 8 cores for handling large model downloads and concurrent tasks).
- **RAM**: Minimum 8 GB (recommended: 16 GB or more for smoother multitasking and managing large files).
- **Storage**: At least 50 GB of free space (models can be large, up to 20 GB each; adjust based on expected usage).
- **Network**: Stable internet connection with sufficient bandwidth for downloading large model files.

### Software Requirements
- **Operating System**: 
  - Linux (Ubuntu 20.04 or later recommended).
  - Windows 10 or later.
  - macOS 10.15 (Catalina) or later.
- **Node.js**: Version 14 or later (includes npm).
- **Python**: Version 3.8 or later (includes pip).
- **Git**: Latest version for version control.
- **Docker** (optional): For containerized deployment.

---

## Environment Setup

Setting up the environment involves installing the necessary tools and dependencies for both the front-end and back-end of Modella Manager. Follow these steps based on your operating system.

### Step 1: Install Node.js and npm
Node.js is required for the front-end of Modella Manager.

- **Linux (Ubuntu)**:
  ```bash
  sudo apt update
  sudo apt install nodejs npm
  ```
- **Windows**: Download and install from the [Node.js official site](https://nodejs.org/).
- **macOS**: Use Homebrew:
  ```bash
  brew install node
  ```

Verify the installation:
```bash
node -v
npm -v
```
You should see the installed versions of Node.js and npm.

### Step 2: Install Python and pip
Python is required for the back-end of Modella Manager.

- **Linux (Ubuntu)**:
  ```bash
  sudo apt install python3 python3-pip
  ```
- **Windows**: Download and install from the [Python official site](https://www.python.org/). Ensure you check "Add Python to PATH" during installation.
- **macOS**: Use Homebrew:
  ```bash
  brew install python
  ```

Verify the installation:
```bash
python3 --version
pip3 --version
```
You should see the installed versions of Python and pip.

### Step 3: Install Git
Git is used to clone the Modella Manager repository.

- **Linux (Ubuntu)**:
  ```bash
  sudo apt install git
  ```
- **Windows**: Download and install from the [Git official site](https://git-scm.com/).
- **macOS**: Use Homebrew:
  ```bash
  brew install git
  ```

Verify the installation:
```bash
git --version
```
You should see the installed Git version.

### Step 4: Clone the Repository
Clone the Modella Manager source code from GitHub:

```bash
git clone https://github.com/devastrar/modella-manager.git
cd modella-manager
```
This creates a local copy of the repository and navigates you into the project directory.

---

## Configuration Steps

These steps guide you through configuring the application, including environment variables, database setup, API keys, storage paths, and front-end settings.

### Step 1: Configure Environment Variables
Environment variables secure sensitive information and customize the application’s behavior.

1. **Navigate to the Back-End Directory**:
   ```bash
   cd back-end
   ```

2. **Create a `.env` File**:
   Create a file named `.env` in the `back-end` directory with the following content:
   ```plaintext
   FLASK_APP=app.py
   FLASK_ENV=development
   JWT_SECRET_KEY=your_jwt_secret_here
   STORAGE_PATH=/workspace/models
   CIVITAI_API_KEY=your_civitai_api_key
   HUGGINGFACE_API_KEY=your_huggingface_api_key
   ```

   - **FLASK_APP**: Specifies the entry point of the Flask application (typically `app.py`).
   - **FLASK_ENV**: Set to `development` for debugging features (use `production` for deployment).
   - **JWT_SECRET_KEY**: A unique, secure key for JWT authentication. Generate a strong, random string (e.g., using a password manager or `openssl rand -hex 32`).
   - **STORAGE_PATH**: Directory where models will be stored (e.g., `/workspace/models` on Runpod or `C:\models` on Windows).
   - **CIVITAI_API_KEY** and **HUGGINGFACE_API_KEY**: API keys from Civitai and Hugging Face (see Step 3).

3. **Secure the `.env` File**:
   - Ensure the `.env` file is not tracked by Git. Add `.env` to `.gitignore` in the `back-end` directory if it’s not already present:
     ```bash
     echo ".env" >> .gitignore
     ```

### Step 2: Set Up the Database
Modella Manager uses **SQLite** for local storage of settings and model data.

1. **Initialize the Database**:
   - The database is automatically initialized when the application starts. To manually initialize it, run the following Python commands in the `back-end` directory:
     ```python
     from app import init_db
     init_db()
     ```
   - This creates `modella_manager.db` with the necessary tables.

2. **Verify Database Creation**:
   - Check that `modella_manager.db` exists in the `back-end` directory:
     ```bash
     ls -lh modella_manager.db  # Linux/macOS
     dir modella_manager.db     # Windows
     ```

### Step 3: Configure API Keys
API keys are required to access models from Civitai and Hugging Face.

1. **Obtain API Keys**:
   - **Civitai**: Log in to [Civitai](https://civitai.com/), go to your account settings, and generate an API key.
   - **Hugging Face**: Log in to [Hugging Face](https://huggingface.co/), go to your account settings, and create an API token.

2. **Update `.env` File**:
   - Edit the `.env` file and replace `your_civitai_api_key` and `your_huggingface_api_key` with the keys you obtained.

3. **Verify API Key Access**:
   - Test the Civitai API key with a sample request:
     ```bash
     curl https://civitai.com/api/v1/models?token=your_civitai_api_key
     ```
   - A successful response indicates the key is valid. Repeat for Hugging Face if needed.

### Step 4: Configure Storage Path
The storage path defines where downloaded models are saved.

1. **Set Storage Path**:
   - In the `.env` file, set `STORAGE_PATH` to a directory with sufficient space (e.g., `/workspace/models` on Linux or `C:\models` on Windows).

2. **Create the Directory**:
   - Ensure the directory exists:
     ```bash
     mkdir -p /workspace/models  # Linux/macOS
     mkdir C:\models            # Windows
     ```

3. **Set Permissions**:
   - Adjust permissions if necessary to allow the application to write to this directory:
     ```bash
     sudo chown -R your_username:your_username /workspace/models  # Linux
     icacls "C:\models" /grant your_username:F                   # Windows
     ```

### Step 5: Configure Front-End Settings
The front-end requires configuration to connect to the back-end.

1. **Navigate to Front-End Directory**:
   ```bash
   cd ../front-end
   ```

2. **Update API Base URL**:
   - Edit `src/config.js` (or the equivalent configuration file) to point to the back-end:
     ```javascript
     export const API_BASE_URL = 'http://localhost:5000';
     ```
   - Update the URL to the actual back-end address if it’s hosted elsewhere (e.g., a Runpod server IP).

3. **Install Front-End Dependencies**:
   - Install required Node.js packages:
     ```bash
     npm install
     ```

---

## Troubleshooting Common Issues

Here are solutions to common configuration problems you might encounter:

- **Environment Variables Not Loading**:
  - **Cause**: Incorrect `.env` file placement or syntax errors.
  - **Solution**: Ensure `.env` is in the `back-end` directory and formatted correctly (e.g., no spaces around `=`).

- **Database Connection Errors**:
  - **Cause**: Missing or inaccessible SQLite database file.
  - **Solution**: Verify `modella_manager.db` exists in the `back-end` directory and has read/write permissions:
    ```bash
    chmod 664 modella_manager.db  # Linux/macOS
    ```

- **API Key Authentication Failures**:
  - **Cause**: Invalid or expired API keys.
  - **Solution**: Regenerate keys on Civitai and Hugging Face, then update the `.env` file and restart the application.

- **Storage Path Issues**:
  - **Cause**: Incorrect path or insufficient permissions.
  - **Solution**: Confirm the path exists and is writable:
    ```bash
    ls -ld /workspace/models  # Linux/macOS, check permissions
    dir C:\models            # Windows
    ```

- **Front-End API Request Failures**:
  - **Cause**: Misconfigured API base URL or back-end not running.
  - **Solution**: Verify `API_BASE_URL` in `src/config.js` and ensure the back-end server is active (e.g., `flask run` in the `back-end` directory).

For additional help, check the application logs or contact the development team.

---

## Conclusion

By following this guide, you have successfully configured the **Modella Manager** application. The environment is now set up with secure API keys, a functional database, a properly configured storage path, and a connected front-end. You are ready to proceed with development, testing, or deployment. For further information, refer to the project’s documentation or reach out to support.

Happy configuring!