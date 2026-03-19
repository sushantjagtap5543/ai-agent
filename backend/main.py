from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import requests
from dotenv import load_dotenv
from agents import run_crew
from interpreter_logic import run_interpreter

load_dotenv()

app = FastAPI(title="AI Agent Platform API")

class TaskRequest(BaseModel):
    task: str
    context: Optional[str] = None

class ChatResponse(BaseModel):
    result: str
    status: str

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "AI Backend"}

@app.get("/status")
async def get_status():
    ollama_host = os.getenv("OLLAMA_HOST", "http://ollama:11434")
    try:
        # Check if Ollama is responding
        response = requests.get(f"{ollama_host}/api/tags", timeout=2)
        if response.status_code == 200:
            return {
                "backend": "online",
                "ollama": "online",
                "models": response.json().get("models", [])
            }
        return {"backend": "online", "ollama": "error", "error": "Ollama returned non-200"}
    except Exception as e:
        return {"backend": "online", "ollama": "offline", "error": str(e)}

@app.get("/")
async def root():
    return {"message": "AI Agent Platform API is running"}

@app.post("/run-crew", response_model=ChatResponse)
async def execute_crew(request: TaskRequest):
    try:
        result = run_crew(request.task)
        return ChatResponse(result=result, status="success")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/run-interpreter", response_model=ChatResponse)
async def execute_interpreter(request: TaskRequest):
    try:
        result = run_interpreter(request.task)
        return ChatResponse(result=result, status="success")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
