# AWS Lightsail Deployment Guide

This guide will help you deploy the AI Agent Platform to an AWS Lightsail instance.

## Step 1: Launch a Lightsail Instance
1. Log in to the [AWS Lightsail Console](https://lightsail.aws.amazon.com/).
2. Click **Create instance**.
3. Choose **Linux/Unix** platform and **OS Only** (Amazon Linux 2 or Ubuntu 22.04 LTS).
4. **Instance Plan**: Select at least **8 GB RAM / 2 vCPUs** (approx. $40/month) for smooth LLM performance.
5. Identify your instance and click **Create instance**.

## Step 2: Configure Networking
1. Go to the **Networking** tab of your instance.
2. Add firewall rules for:
   - **HTTP (80)**: For the frontend.
   - **Custom (8000)**: Optional, for direct backend access.

## Step 3: Install Docker & Docker Compose
Connect to your instance via SSH and run:

```bash
# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

## Step 4: Deploy the Application
1. Clone your GitHub repository:
   ```bash
   git clone <YOUR_GITHUB_REPO_URL>
   cd <REPO_NAME>
   ```
2. Run the stack:
   ```bash
   sudo docker-compose up -d
   ```
3. Pull the required AI model (Llama3) into Ollama:
   ```bash
   sudo docker exec -it ollama ollama run llama3
   ```

## Step 5: Access the Platform
Open your browser and navigate to the **Public IP** of your Lightsail instance. You should see the premium AI Agent interface!
