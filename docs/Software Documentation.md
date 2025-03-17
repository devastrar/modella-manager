Below is a thorough and detailed software documentation document for the **Modella Manager** application. This document is designed to provide a complete understanding of the software, covering its purpose, installation, usage, API interactions, and troubleshooting. It is intended for developers, users, and system administrators to ensure seamless setup, operation, and maintenance of the application.

---

# Modella Manager Documentation

## Table of Contents
1. [Overview](#overview)
2. [Installation](#installation)
3. [User Guide](#user-guide)
4. [API Documentation](#api-documentation)
5. [Troubleshooting](#troubleshooting)
6. [Appendices](#appendices)

---

## Overview

**Modella Manager** is a web-based application designed to streamline the management of AI image generation models sourced from platforms such as **Civitai** and **Hugging Face**. Tailored specifically for users operating within a **Runpod** environment with **Stable Diffusion WebUI Forge**, this tool offers an intuitive interface to browse, download, organize, and monitor AI models. It is an essential resource for artists, researchers, and developers working with AI-generated art.

### Key Features
- **Model Browsing**: Search and filter models from Civitai and Hugging Face with infinite scrolling.
- **Detailed Views**: Access model versions, files, and usage instructions.
- **Download Queue Management**: Handle large file downloads (up to 20 GB) with monitoring and control.
- **Custom Lists**: Organize models into user-defined lists for project-specific workflows.
- **Disk Usage Monitoring**: Visualize storage usage through interactive charts.
- **Internationalization**: Supports multiple languages, including English, French, Spanish, German, Russian, Chinese, and Japanese.
- **Accessibility**: Adheres to WCAG 2.1 AA guidelines for inclusive usability.
- **Security**: Implements encrypted API key storage, JWT authentication, and HTTPS communication.

---

## Installation

Modella Manager comprises a **React.js** front-end and a **Flask** back-end. Follow the steps below to install and configure the application.

### Prerequisites
- **Node.js** and **npm**: Required for the front-end.
- **Python 3** and **pip**: Required for the back-end.
- **Git**: Necessary for cloning the repository.

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/devastrar/modella-manager.git
   cd modella-manager
   ```

2. **Set Up the Front-End**:
   ```bash
   cd front-end
   npm install
   npm run build
   ```
   - This installs dependencies and builds the React application.

3. **Set Up the Back-End**:
   ```bash
   cd back-end
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
   - This creates a virtual environment and installs Python dependencies.

4. **Configure Environment Variables**:
   - Create a `.env` file in the `back-end` directory with the following:
     ```plaintext
     JWT_SECRET_KEY=your_jwt_secret_here
     STORAGE_PATH=/workspace/models
     ```
   - Replace `your_jwt_secret_here` with a secure key and adjust `STORAGE_PATH` as needed.

5. **Start the Servers**:
   - **Front-End**: In the `front-end` directory, run:
     ```bash
     npm start
     ```
   - **Back-End**: In the `back-end` directory, run:
     ```bash
     flask run
     ```
   - Ensure both servers are running concurrently.

---

## User Guide

This section provides detailed instructions on using Modella Manager’s core features.

### 1. Dashboard
- **Purpose**: Acts as the central navigation hub.
- **Features**: Links to Model Browser, Download Queue, Disk Usage, Model Lists, Local Models, and Settings.

### 2. Model Browser
- **Functionality**: Search and filter models from Civitai and Hugging Face.
- **How to Use**:
  - Enter keywords, tags, or usernames in the search bar.
  - Apply filters (e.g., model type: Checkpoint, LORA; base model: SD 1.5).
  - Scroll down to trigger infinite loading of additional models.
  - Click a model card to view its details.

### 3. Model Details
- **Functionality**: Displays comprehensive model information.
- **How to Use**:
  - View versions, files, descriptions, and images.
  - Use checkboxes to select files/versions for download or management.
  - Copy trained words for use in prompts.
  - Navigate model images with arrow buttons.

### 4. Download Queue
- **Functionality**: Manages ongoing and pending downloads.
- **How to Use**:
  - Monitor progress with bars showing percentage complete.
  - Cancel or remove downloads via action buttons.
  - Receive completion notifications.

### 5. Custom Lists
- **Functionality**: Organizes models into user-defined categories.
- **How to Use**:
  - Create lists (e.g., "Wishlist," "SD15 Models") via the "New List" button.
  - Add/remove models using drag-and-drop or action buttons.
  - Import/export lists to/from the download queue or local storage.

### 6. Disk Usage
- **Functionality**: Tracks and visualizes storage consumption.
- **How to Use**:
  - View usage via pie or bar charts.
  - Filter by source (Civitai, Hugging Face, Other).
  - Click "Refresh" for updated statistics.

### 7. Settings
- **Functionality**: Configures application preferences.
- **How to Use**:
  - Enter API keys for Civitai and Hugging Face.
  - Set the default storage path (e.g., `/workspace/models`).
  - Choose a language from the dropdown.
  - Toggle between dark and light themes.

---

## API Documentation

Modella Manager leverages both internal and external APIs. This section outlines key endpoints and their usage.

### Internal API Endpoints
These endpoints manage authentication, settings, downloads, and more within the Flask back-end.

- **POST /api/login**
  - **Description**: Authenticates users and issues a JWT token.
  - **Request Body**: 
    ```json
    { "username": "string", "password": "string" }
    ```
  - **Response**: 
    ```json
    { "access_token": "string" }
    ```

- **POST /api/settings**
  - **Description**: Updates user settings.
  - **Request Body**: 
    ```json
    { "user_id": "string", "encrypted_api_key": "string", "storage_path": "string" }
    ```
  - **Response**: 
    ```json
    { "msg": "Settings updated" }
    ```

- **POST /api/download**
  - **Description**: Starts a model download.
  - **Request Body**: 
    ```json
    { "model_id": "string", "source": "string", "download_url": "string", "path": "string" }
    ```
  - **Response**: 
    ```json
    { "msg": "Download started" }
    ```

- **GET /api/task/<task_id>**
  - **Description**: Checks download task status.
  - **Response**: 
    ```json
    { "state": "string", "current": number, "total": number }
    ```

- **GET /api/disk-usage**
  - **Description**: Retrieves disk usage data.
  - **Response**: 
    ```json
    { "civitai": number, "huggingface": number, "other": number }
    ```

- **GET /api/lists**
  - **Description**: Lists all custom model lists.
  - **Response**: 
    ```json
    [ { "id": "string", "name": "string", "models": [] } ]
    ```

- **POST /api/lists**
  - **Description**: Creates a new custom list.
  - **Request Body**: 
    ```json
    { "name": "string" }
    ```
  - **Response**: 
    ```json
    { "msg": "List created" }
    ```

- **DELETE /api/lists/<list_id>**
  - **Description**: Deletes a custom list.
  - **Response**: 
    ```json
    { "msg": "List deleted" }
    ```

- **POST /api/lists/<list_id>/add**
  - **Description**: Adds models to a list.
  - **Request Body**: 
    ```json
    { "modelIds": ["string"] }
    ```
  - **Response**: 
    ```json
    { "msg": "Models added to list" }
    ```

- **POST /api/uninstall**
  - **Description**: Removes a model from storage.
  - **Request Body**: 
    ```json
    { "model_id": "string" }
    ```
  - **Response**: 
    ```json
    { "msg": "Model uninstalled" }
    ```

### External API Integration

#### Civitai API
- **Base URL**: `https://civitai.com/api/v1`
- **Authentication**: API key in `Authorization` header or query string.
- **Key Endpoints**:
  - **GET /models**: Browse models with filters and pagination.
  - **GET /models/{modelId}**: Fetch model details.
  - **GET /models-versions/{modelVersionId}**: Retrieve version-specific details.
  - **GET /images**: Access model images.

#### Hugging Face API
- **Base URL**: `https://huggingface.co/api`
- **Authentication**: API key in `Authorization` header.
- **Key Endpoints**:
  - **GET /models**: List models with filters and pagination.
  - **GET /models/{repo_id}**: Get model details.
  - **GET /datasets**: List datasets.

---

## Troubleshooting

This section addresses common issues and their resolutions.

- **Authentication Errors**:
  - **Cause**: Incorrect or missing API keys.
  - **Solution**: Verify API keys in the Settings section.

- **Download Failures**:
  - **Cause**: Network interruptions or permission issues.
  - **Solution**: Check connectivity and ensure API keys have download permissions.

- **Database Connection Issues**:
  - **Cause**: Missing or inaccessible SQLite database file.
  - **Solution**: Confirm the database file exists and has read/write permissions.

- **Path Traversal Errors**:
  - **Cause**: Invalid storage path configuration.
  - **Solution**: Use the default path or specify a valid directory in settings.

- **Task Status Not Updating**:
  - **Cause**: Celery worker or SocketIO failure.
  - **Solution**: Restart Celery and ensure SocketIO is configured correctly.

---

## Appendices

### Appendix A: Database Schema
- **settings**:
  - `user_id` (TEXT, PRIMARY KEY)
  - `encrypted_api_key` (TEXT)
  - `storage_path` (TEXT)
- **downloaded_models**:
  - `model_id` (TEXT, PRIMARY KEY)
  - `path` (TEXT)

### Appendix B: Environment Variables
- `JWT_SECRET_KEY`: Key for JWT authentication.
- `STORAGE_PATH`: Default model storage location (e.g., `/workspace/models`).

### Appendix C: Dependencies
- **Front-End**: React, Material-UI, i18next, Axios, Chart.js, Framer Motion.
- **Back-End**: Flask, Celery, Redis, SQLite, requests, Flask-JWT-Extended, Flask-SocketIO, blake3.

---

This documentation offers a comprehensive guide to installing, using, and maintaining Modella Manager, ensuring users and developers have all necessary information for effective operation.