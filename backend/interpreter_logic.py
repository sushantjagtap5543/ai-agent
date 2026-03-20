import interpreter
import os
interpreter.model = "ollama/llama3"
interpreter.api_base = os.getenv("OLLAMA_HOST", "http://ollama:11434")
def run_interpreter(user_task: str):
        interpreter.auto_run = True
        messages = interpreter.chat(user_task)
        if messages: return messages[-1]["content"]
                return "No output from interpreter."
