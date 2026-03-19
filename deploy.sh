#!/bin/bash

# AI Agent Orchestrator Deployment Script
# Run this on your AWS Lightsail instance

echo "🚀 Starting AI Agent Orchestrator deployment..."

# 1. Update system
sudo apt-get update -y

# 2. Install Docker if not present
if ! command -v docker &> /dev/null
then
    echo "🐳 Docker not found, installing..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
fi

# 3. Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null
then
    echo "🐙 Docker Compose not found, installing..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# 4. Clone or Pull latest code
if [ -d "ai-agent" ]; then
    echo "📂 Directory ai-agent exists, pulling latest changes..."
    cd ai-agent
    git pull
else
    echo "🔗 Cloning repository..."
    # Replace with your actual repository URL
    git clone https://github.com/sushantjagtap5543/ai-agent.git
    cd ai-agent
fi

# 5. Start services
echo "🏗️ Building and starting containers..."
docker-compose up -d --build

# 6. Pull Ollama model
echo "🧠 Pulling Llama 3 model into Ollama..."
docker exec -it ollama ollama pull llama3

echo "✅ Deployment complete! Your AI Agent is running."
echo "Frontend: http://$(curl -s ifconfig.me)"
echo "Backend: http://$(curl -s ifconfig.me):8000"
