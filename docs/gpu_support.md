# GPU Support with Docker

If your AWS instance or local machine has an NVIDIA GPU, you can significantly speed up the LLM by following these steps.

## Prerequisites
- **NVIDIA Drivers** installed.
- **NVIDIA Container Toolkit** installed.

## Alternative Docker Compose
Use this configuration in your `docker-compose.yml` to enable GPU acceleration in the `ollama` container.

```yaml
version: '3.8'

services:
  ollama:
    image: ollama/ollama:latest
    container_name: ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]
    restart: always

  backend:
    build:
      context: ./backend
    container_name: ai_backend
    ports:
      - "8000:8000"
    environment:
      - OLLAMA_HOST=http://ollama:11434
    depends_on:
      - ollama
    restart: always

  frontend:
    build:
      context: ./frontend
    container_name: ai_frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: always

volumes:
  ollama_data:
```

## Benefits
- **Llama 3** will run at much higher tokens per second.
- Reducd CPU load on the host machine.
