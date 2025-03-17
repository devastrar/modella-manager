Below is a thorough and detailed user guide for the **Modella Manager** application. This guide is designed to help users—ranging from artists and researchers to developers—understand and effectively use the application within a **Runpod** environment integrated with **Stable Diffusion WebUI Forge**. It provides step-by-step instructions, examples, and troubleshooting tips to ensure a smooth experience.

---

# Modella Manager User Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Installation and Setup](#installation-and-setup)
3. [Getting Started](#getting-started)
4. [Using the Dashboard](#using-the-dashboard)
5. [Browsing and Searching Models](#browsing-and-searching-models)
6. [Viewing Model Details](#viewing-model-details)
7. [Managing Downloads](#managing-downloads)
8. [Organizing Models with Custom Lists](#organizing-models-with-custom-lists)
9. [Monitoring Disk Usage](#monitoring-disk-usage)
10. [Configuring Settings](#configuring-settings)
11. [Accessibility Features](#accessibility-features)
12. [Troubleshooting](#troubleshooting)
13. [Conclusion](#conclusion)

---

## Introduction

**Modella Manager** is a web-based tool designed to simplify the management of AI image generation models from platforms like **Civitai** and **Hugging Face**. It provides an intuitive interface for browsing, downloading, organizing, and monitoring models, making it ideal for users working within a **Runpod** environment with **Stable Diffusion WebUI Forge**.

### Key Features
- **Model Browsing**: Search and filter models with infinite scrolling.
- **Detailed Model Views**: Access versions, files, and usage instructions.
- **Download Queue**: Manage large file downloads with progress tracking.
- **Custom Lists**: Organize models into project-specific groups.
- **Disk Usage Monitoring**: Visualize storage consumption.
- **Internationalization**: Supports multiple languages.
- **Accessibility**: Designed for inclusivity with keyboard navigation and screen reader compatibility.

This guide will walk you through each feature, ensuring you can make the most of Modella Manager.

---

## Installation and Setup

Before using Modella Manager, you need to install and configure the application.

### Prerequisites
- **Node.js** and **npm**: Required for the front-end.
- **Python 3** and **pip**: Required for the back-end.
- **Git**: To clone the repository.

### Step-by-Step Installation
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

3. **Set Up the Back-End**:
   ```bash
   cd back-end
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**:
   - Create a `.env` file in the `back-end` directory:
     ```plaintext
     JWT_SECRET_KEY=your_jwt_secret_here
     STORAGE_PATH=/workspace/models
     ```
   - Replace `your_jwt_secret_here` with a secure key.

5. **Start the Servers**:
   - **Front-End**: Run `npm start` in the `front-end` directory.
   - **Back-End**: Run `flask run` in the `back-end` directory.

---

## Getting Started

Once the application is running, access it via your web browser (typically at `http://localhost:3000` for the front-end).

### Logging In
- **Username and Password**: Use your credentials to log in. If you’re a new user, you may need to create an account or use default credentials provided by your administrator.
- **API Keys**: Ensure you have valid API keys for Civitai and Hugging Face, which can be configured in the **Settings** section.

---

## Using the Dashboard

The **Dashboard** is your central hub for navigation.

- **Navigation Links**: Access key sections like **Model Browser**, **Download Queue**, **Disk Usage**, **Model Lists**, **Local Models**, and **Settings**.
- **Quick Access**: Each link takes you to a dedicated page for managing specific aspects of the application.

---

## Browsing and Searching Models

The **Model Browser** allows you to explore models from Civitai and Hugging Face.

### Searching Models
- **Search Bar**: Enter keywords, tags, or usernames to find specific models.
  - Example: Search for "resnet" or "microsoft" to find related models.
- **Filters**: Refine results by model type (e.g., Checkpoint, LORA), base model (e.g., SD 1.5), or NSFW status.
- **Sorting**: Sort models by rating, downloads, or newest.

### Infinite Scrolling
- **Load More Models**: Scroll down to automatically load additional models.
- **Return to Top**: Use the "Return to Top" button to quickly navigate back to the start.

---

## Viewing Model Details

Clicking a model card opens the **Model Details** page.

### Model Information
- **Name and Description**: View the model’s name and full description.
- **Versions**: Browse different versions with pagination.
- **Files**: See file details like size, format, and floating-point precision.
- **Images**: Navigate through model images using arrow buttons.

### Managing Files and Versions
- **Checkboxes**: Select files or versions for download or uninstallation.
- **Copy Trained Words**: Click to copy words for use in prompts.

---

## Managing Downloads

The **Download Queue** helps you monitor and control model downloads.

### Monitoring Progress
- **Progress Bars**: Track the percentage completion of each download.
- **Status Indicators**: See if a download is pending, in progress, or completed.

### Controlling Downloads
- **Cancel Downloads**: Stop ongoing downloads if needed.
- **Remove from Queue**: Clear completed or failed downloads from the list.
- **Notifications**: Receive alerts when downloads finish.

---

## Organizing Models with Custom Lists

**Custom Lists** allow you to group models for specific projects or preferences.

### Creating a List
- **New List Button**: Click to create a list (e.g., "My Wishlist").
- **Naming**: Provide a meaningful name for easy identification.

### Adding Models to Lists
- **Drag-and-Drop**: Select models from the browser and drop them into a list.
- **Action Buttons**: Use buttons to add or remove models from lists.

### Managing Lists
- **Import/Export**: Move entire lists to/from the download queue or local storage.
- **Delete Lists**: Remove lists when no longer needed.

---

## Monitoring Disk Usage

The **Disk Usage** section provides insights into storage consumption.

### Viewing Usage
- **Charts**: Switch between pie and bar charts to visualize usage by source (Civitai, Hugging Face, Other).
- **Filters**: Break down usage by base model or type for detailed analysis.

### Refreshing Data
- **Refresh Button**: Click to update the usage statistics manually.

---

## Configuring Settings

The **Settings** page allows you to customize the application.

### API Keys
- **Civitai and Hugging Face**: Enter or update API keys for model access.
- **Security**: Keys are stored securely and used for authenticated API calls.

### Storage Path
- **Default Path**: Set to `/workspace/models`; change if needed.
- **Validation**: Ensure the path is accessible and writable.

### Language and Theme
- **Language Selection**: Choose from supported languages (e.g., English, French).
- **Theme Toggle**: Switch between dark and light modes for comfort.

---

## Accessibility Features

Modella Manager is designed to be inclusive:

- **Keyboard Navigation**: Navigate the entire application using a keyboard.
- **Screen Reader Support**: ARIA labels ensure compatibility with screen readers.
- **High-Contrast Options**: Visual elements are designed for clarity.

---

## Troubleshooting

Here are solutions to common issues:

- **Login Failures**:
  - **Solution**: Verify credentials and ensure API keys are correctly configured.
  
- **Download Errors**:
  - **Solution**: Check network connectivity and API key permissions.

- **Disk Usage Not Updating**:
  - **Solution**: Click "Refresh" or check storage path settings.

- **Model Not Found**:
  - **Solution**: Ensure the model exists on the source platform and filters are correctly applied.

For further assistance, consult the documentation or contact support.

---

## Conclusion

Modella Manager simplifies the process of managing AI image generation models, making it easier to focus on creative and research tasks. By following this guide, you should be able to install, configure, and use the application effectively. Explore the features, customize your settings, and enjoy a streamlined workflow with Modella Manager!