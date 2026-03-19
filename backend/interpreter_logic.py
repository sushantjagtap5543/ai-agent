import interpreter
import os

# Configure OpenInterpreter
# If using local ollama, we can point it there
interpreter.llm.model = "ollama/llama3"
interpreter.llm.api_base = os.getenv("OLLAMA_HOST", "http://ollama:11434")

def run_interpreter(user_task: str):
    # Setup for non-interactive execution
    interpreter.auto_run = True
    
    # Capture output
    messages = interpreter.chat(user_task)
    
    # Extract the final result (last message's content)
    if messages:
        return messages[-1]["content"]
    return "No output from interpreter."
