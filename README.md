# AI Agent Orchestrator

A powerful full-stack AI platform combining **CrewAI** for multi-agent orchestration and **OpenInterpreter** for autonomous task execution, all powered by **Ollama** (Llama 3).

## 🚀 Getting Started

### 1. Initialize & Push to GitHub
If you haven't pushed this code to your repository yet, follow these steps:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AI Agent Orchestrator with CrewAI and OpenInterpreter"

# Add remote (Update with your actual URL)
git remote add origin https://github.com/sushantjagtap5543/ai-agent.git

# Push
git push -u origin main
```

### 2. Local Setup (with Docker)
Ensure you have Docker installed.

```bash
# Start all services
docker-compose up -d --build

# Pull the AI model (required first time)
docker exec -it ollama ollama pull llama3
```

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8000
- **Ollama API**: http://localhost:11434

---

## ☁️ Deployment on AWS Lightsail

For a production-ready deployment on AWS:

1. **Launch Instance**: Select Ubuntu 22.04 LTS (Recommended: 8GB RAM).
2. **Open Ports**: Enable Port 80 (HTTP) and 443 in Lightsail Networking.
3. **Run Deployment Script**: 
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

Refer to [docs/lightsail_deployment.md](docs/lightsail_deployment.md) for a step-by-step walkthrough.

---

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite + Nginx
- **Backend**: FastAPI (Python)
- **Agent Orchestration**: CrewAI
- **Code Execution**: OpenInterpreter
- **LLM Engine**: Ollama (Llama 3)
- **Containerization**: Docker & Docker Compose

## 🛡️ Security Note
The `.pem` file for your AWS instance and any `.env` files are automatically ignored by `.gitignore`. Never commit these to public repositories.