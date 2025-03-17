# Modella Manager Docker Deployment Guide

This guide provides detailed, step-by-step instructions for deploying the **Modella Manager** application using Docker. Docker simplifies the deployment process by containerizing the application, ensuring consistency across different environments. While this guide is tailored for deployment within a **Runpod** environment integrated with **Stable Diffusion WebUI Forge**, the steps are adaptable to any Docker-compatible platform.

---

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Building the Docker Image](#building-the-docker-image)
4. [Running the Docker Container](#running-the-docker-container)
5. [Configuring Environment Variables](#configuring-environment-variables)
6. [Accessing the Application](#accessing-the-application)
7. [Troubleshooting](#troubleshooting)
8. [Conclusion](#conclusion)

---

## Introduction

The **Modella Manager** application is designed to streamline the management of AI models, and deploying it with Docker ensures a consistent and portable setup. This guide walks you through the entire process, from building the Docker image to accessing the deployed application, making it accessible even to users new to Docker.

---

## Prerequisites

Before you begin, ensure the following requirements are met:

- **Docker**: Installed and running on your system. If not installed, follow the official [Docker installation guide](https://docs.docker.com/get-docker/).
- **Git**: Required to clone the Modella Manager repository. Install it from the [Git installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if needed.
- **Runpod Account** (optional): If deploying on Runpod, ensure you have an account and access to an instance with sufficient resources (e.g., CPU, GPU, and storage).
- **API Keys**: Obtain API keys for **Civitai** and **Hugging Face** to enable model access within the application. These are required for full functionality.

---

## Building the Docker Image

To deploy Modella Manager, you first need to build a Docker image using the provided `Dockerfile`.

### Step 1: Clone the Repository
Clone the Modella Manager repository from GitHub to your local machine:

```bash
git clone https://github.com/devastrar/modella-manager.git
cd modella-manager
```

This command downloads the source code and navigates into the project directory.

### Step 2: Build the Docker Image
Build the Docker image using the `Dockerfile` located in the repository’s root directory:

```bash
docker build -t modella-manager .
```

- `-t modella-manager`: Tags the image with the name `modella-manager`. You can customize this tag if desired.
- `.`: Specifies the current directory as the build context.

This process may take a few minutes, depending on your system and internet speed, as it installs dependencies and configures the environment.

### Step 3: Verify the Image
Confirm that the image was built successfully by listing all Docker images:

```bash
docker images
```

You should see `modella-manager` listed in the output, along with its tag and size.

---

## Running the Docker Container

With the image built, you can now launch the Modella Manager application as a Docker container.

### Step 1: Run the Container
Start the container with the following command:

```bash
docker run -d -p 5000:5000 -p 3000:3000 --name modella-manager-container modella-manager
```

- `-d`: Runs the container in detached mode (in the background).
- `-p 5000:5000`: Maps port 5000 on the host to port 5000 in the container (used by the back-end API).
- `-p 3000:3000`: Maps port 3000 on the host to port 3000 in the container (used by the front-end UI).
- `--name modella-manager-container`: Assigns a custom name to the container for easy management.
- `modella-manager`: Specifies the image to use.

### Step 2: Verify the Container is Running
Check that the container is active:

```bash
docker ps
```

Look for `modella-manager-container` in the output. If it’s listed, the container is running successfully.

---

## Configuring Environment Variables

Environment variables are essential for configuring Modella Manager, including API keys and storage paths.

### Step 1: Create an Environment File
Create a file named `.env` in the root directory of the cloned repository with the following content:

```plaintext
JWT_SECRET_KEY=your_jwt_secret_here
STORAGE_PATH=/workspace/models
CIVITAI_API_KEY=your_civitai_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

- Replace `your_jwt_secret_here` with a secure secret key for JWT authentication.
- Adjust `STORAGE_PATH` if you’re using a different directory for model storage (e.g., `/path/to/your/models`).
- Replace `your_civitai_api_key` and `your_huggingface_api_key` with your actual API keys from Civitai and Hugging Face, respectively.

### Step 2: Mount the Environment File
Run the container again, this time mounting the `.env` file to pass the environment variables:

```bash
docker run -d -p 5000:5000 -p 3000:3000 --env-file .env --name modella-manager-container modella-manager
```

- `--env-file .env`: Loads the variables from the `.env` file into the container.

If a container with the same name already exists, stop and remove it first:

```bash
docker stop modella-manager-container
docker rm modella-manager-container
```

Then re-run the `docker run` command above.

---

## Accessing the Application

Once the container is running, you can access Modella Manager through your web browser.

### Front-End Access
Navigate to the front-end interface:

```
http://localhost:3000
```

This URL loads the React-based user interface of Modella Manager.

### Back-End API
Access the Flask back-end API at:

```
http://localhost:5000
```

Use this endpoint for API requests or testing if needed.

If deploying on a remote server (e.g., Runpod), replace `localhost` with the server’s public IP address or domain name.

---

## Troubleshooting

Here are solutions to common issues you might encounter during deployment:

### Container Fails to Start
- **Cause**: Missing dependencies or errors in the `Dockerfile`.
- **Solution**: Review the build logs with `docker build -t modella-manager .` and check for error messages. Ensure all required dependencies are specified.

### Environment Variables Not Loading
- **Cause**: Incorrect `.env` file path or syntax errors.
- **Solution**: Verify the `.env` file is in the correct directory and properly formatted (no spaces around `=` signs).

### API Key Errors
- **Cause**: Invalid or missing API keys.
- **Solution**: Double-check your Civitai and Hugging Face API keys in the `.env` file and ensure they are valid.

### Port Conflicts
- **Cause**: Ports 3000 or 5000 are already in use on your system.
- **Solution**: Identify conflicting processes with `netstat -tuln | grep 3000` (or 5000) and stop them, or map different host ports (e.g., `-p 5001:5000`).

For additional logs, inspect the container output:

```bash
docker logs modella-manager-container
```

---

## Conclusion

Congratulations! By following this guide, you’ve successfully deployed the **Modella Manager** application using Docker. This containerized setup ensures portability and consistency, making it easy to manage AI models in your environment. For further details or advanced configurations, consult the Modella Manager documentation or reach out to the support community.

Happy deploying!