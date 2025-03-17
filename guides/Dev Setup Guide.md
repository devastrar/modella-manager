# Modella Manager Development Environment Setup Guide

This guide provides detailed and comprehensive instructions for setting up the development environment for the **Modella Manager** application. It is designed for developers who want to contribute to the project or run the application locally for testing and development purposes. The application consists of a **React.js** front-end and a **Flask** back-end, and this guide covers everything from prerequisites to running and testing the setup.

---

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Cloning the Repository](#cloning-the-repository)
4. [Setting Up the Front-End](#setting-up-the-front-end)
5. [Setting Up the Back-End](#setting-up-the-back-end)
6. [Configuring Environment Variables](#configuring-environment-variables)
7. [Running the Application](#running-the-application)
8. [Testing the Setup](#testing-the-setup)
9. [Troubleshooting](#troubleshooting)
10. [Conclusion](#conclusion)

---

## Introduction

The **Modella Manager** application is a tool built with a modern tech stack: a **React.js** front-end for a dynamic user interface and a **Flask** back-end for handling API requests and business logic. This guide will walk you through setting up your local development environment step-by-step, ensuring you can work on the project effectively.

---

## Prerequisites

Before starting, ensure your system meets the following requirements:

- **Node.js** (v14 or later) and **npm** (v6 or later):  
  Required for the React.js front-end. Download and install from the [Node.js official site](https://nodejs.org/). Verify installation with:
  ```bash
  node -v
  npm -v
  ```

- **Python 3** (v3.8 or later) and **pip**:  
  Required for the Flask back-end. Download from the [Python official site](https://www.python.org/). Confirm versions with:
  ```bash
  python3 --version
  pip3 --version
  ```

- **Git**:  
  Needed to clone the repository. Install from the [Git official site](https://git-scm.com/) and verify with:
  ```bash
  git --version
  ```

- **Virtualenv** (optional but recommended):  
  For isolating Python dependencies. Install it globally with:
  ```bash
  pip install virtualenv
  ```

Ensure all these tools are installed before proceeding.

---

## Cloning the Repository

To get started, clone the Modella Manager repository to your local machine:

1. Open a terminal and run:
   ```bash
   git clone https://github.com/devastrar/modella-manager.git
   ```
   This downloads the project’s source code.

2. Navigate into the project directory:
   ```bash
   cd modella-manager
   ```

You now have the project files locally and are ready to set up the front-end and back-end.

---

## Setting Up the Front-End

The front-end uses **React.js** and relies on Node.js and npm for dependency management and running the development server.

### Step 1: Navigate to the Front-End Directory
From the project root, move to the front-end folder:
```bash
cd front-end
```

### Step 2: Install Dependencies
Install all required npm packages listed in `package.json` (e.g., React, Material-UI, Axios):
```bash
npm install
```
This may take a few minutes. Watch for any errors in the terminal and resolve them (e.g., by ensuring Node.js is up-to-date).

### Step 3: Build the Front-End (Optional)
For a production-ready build, you can run:
```bash
npm run build
```
This creates an optimized build in the `build/` directory. However, for development, you’ll typically skip this and use the development server (covered later).

---

## Setting Up the Back-End

The back-end is built with **Flask**, a lightweight Python web framework, and requires Python 3 and pip.

### Step 1: Navigate to the Back-End Directory
From the `front-end` directory, move to the back-end folder:
```bash
cd ../back-end
```

### Step 2: Create a Virtual Environment (Recommended)
To keep dependencies isolated, create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```
After activation, your terminal prompt should change (e.g., `(venv)`), indicating the virtual environment is active.

### Step 3: Install Dependencies
Install the Python packages specified in `requirements.txt` (e.g., Flask, Flask-JWT-Extended, Celery):
```bash
pip install -r requirements.txt
```
If you encounter errors, ensure `requirements.txt` exists and your Python version is compatible.

---

## Configuring Environment Variables

Environment variables are used to configure the application securely, especially for sensitive data like API keys.

### Step 1: Create a `.env` File
In the `back-end` directory, create a file named `.env` and add the following content:
```plaintext
FLASK_APP=app.py
FLASK_ENV=development
JWT_SECRET_KEY=your_jwt_secret_here
STORAGE_PATH=/workspace/models
CIVITAI_API_KEY=your_civitai_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

- **FLASK_APP**: The entry point of the Flask app (usually `app.py`).
- **FLASK_ENV**: Set to `development` for debugging features like auto-reloading.
- **JWT_SECRET_KEY**: A unique, secure key for JWT authentication (generate a random string, e.g., using a password manager).
- **STORAGE_PATH**: Local directory for storing models (adjust to a valid path on your system).
- **CIVITAI_API_KEY** and **HUGGINGFACE_API_KEY**: Obtain these from [Civitai](https://civitai.com/) and [Hugging Face](https://huggingface.co/) respectively.

### Step 2: Verify the `.env` File
Ensure the `.env` file is saved in the `back-end` directory. Flask will automatically load these variables when you run the app.

---

## Running the Application

To run Modella Manager, you’ll need to start both the back-end and front-end servers in separate terminal windows.

### Step 1: Run the Back-End Server
In the `back-end` directory (with the virtual environment active), start the Flask server:
```bash
flask run
```
The server runs on `http://localhost:5000` by default. You should see output indicating the server is active.

### Step 2: Run the Front-End Server
Open a new terminal, navigate to the `front-end` directory, and start the React development server:
```bash
cd front-end
npm start
```
This launches the front-end on `http://localhost:3000`, and your browser should open automatically.

---

## Testing the Setup

Verify that everything is working correctly with these steps:

1. **Access the Front-End**:  
   Open `http://localhost:3000` in your browser. You should see the Modella Manager login page.

2. **Log In**:  
   Use your credentials (or defaults provided by your team) to log in.

3. **Check API Connectivity**:  
   Navigate to the Model Browser and search for models. If results load, the back-end is communicating properly.

4. **Verify Settings**:  
   Go to the **Settings** section and test saving API keys or storage paths.

If any step fails, proceed to the troubleshooting section.

---

## Troubleshooting

Here are common issues and their solutions:

### Front-End Not Loading
- **Cause**: Missing or corrupted dependencies.
- **Solution**: Run `npm install` again in the `front-end` directory. Check for network issues or outdated npm.

### Back-End Server Errors
- **Cause**: Missing dependencies or misconfigured `.env`.
- **Solution**: Re-run `pip install -r requirements.txt` and verify the `.env` file contents.

### API Key Issues
- **Cause**: Invalid or missing API keys.
- **Solution**: Confirm your keys are correct in `.env` and have no extra spaces.

### Port Conflicts
- **Cause**: Ports 3000 or 5000 are in use by other processes.
- **Solution**: Stop the conflicting process (e.g., with `kill` on Unix-like systems) or modify the ports:
  - Front-end: Edit `package.json` `"start"` script (e.g., add `--port 3001`).
  - Back-end: Run Flask with `flask run --port 5001`.

Check terminal logs for detailed error messages.

---

## Conclusion

You’ve now set up a fully functional development environment for **Modella Manager**. With the front-end running on `http://localhost:3000` and the back-end on `http://localhost:5000`, you’re ready to develop, test, and contribute to the project. If issues persist, revisit the troubleshooting steps or consult the project’s documentation for additional support. Happy coding!