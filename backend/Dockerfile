# Use a slim version of Python
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install core infra one-by-one to avoid resolver loops
RUN pip install --no-cache-dir fastapi uvicorn requests python-dotenv pydantic==2.4.0 langchain_community langchain_openai

# Install the heavy agents
# We split them to avoid pip resolver backtracking issues
RUN pip install --no-cache-dir crewai
RUN pip install --no-cache-dir open-interpreter

# Copy project
COPY . .

# Expose port
EXPOSE 8000

# Run the application (shell form for robustness or exec form with explicit strings)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
