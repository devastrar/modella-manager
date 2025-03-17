#!/bin/bash

# Create directories under /workspace if they don't exist
mkdir -p /workspace/models/Stable-diffusion
mkdir -p /workspace/models/Lora
mkdir -p /workspace/models/VAE
mkdir -p /workspace/models/embeddings
mkdir -p /workspace/models/ControlNet
mkdir -p /workspace/models/hypernetworks
mkdir -p /workspace/models/ESRGAN
mkdir -p /workspace/outputs
mkdir -p /workspace/configs
mkdir -p /workspace/extensions
mkdir -p /workspace/scripts

# Copy default config files only if they don't exist
[ ! -f /workspace/configs/config.json ] && cp /app/stable-diffusion-webui-forge/config.json /workspace/configs/
[ ! -f /workspace/configs/ui-config.json ] && cp /app/stable-diffusion-webui-forge/ui-config.json /workspace/configs/
[ ! -f /workspace/configs/ui-settings.json ] && cp /app/stable-diffusion-webui-forge/ui-settings.json /workspace/configs/

# Start Supervisord
supervisord -c /etc/supervisor/conf.d/supervisord.conf