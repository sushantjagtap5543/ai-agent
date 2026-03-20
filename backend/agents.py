from crewai import Agent, Task, Crew, Process, LLM
import os
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://ollama:11434")
llm = LLM(model="ollama/llama3", base_url=OLLAMA_HOST)
def run_crew(user_task: str):
        researcher = Agent(role='Senior Research Analyst', goal=f'Uncover cutting-edge developments in {user_task}', backstory="You are an expert at a technology research group...", verbose=True, allow_delegation=False, llm=llm)
        writer = Agent(role='Tech Content Strategist', goal=f'Draft a compelling report on {user_task}', backstory="You are a renowned Content Strategist...", verbose=True, allow_delegation=True, llm=llm)
        task1 = Task(description=f"Analyze {user_task}. Provide a detailed report.", agent=researcher)
        task2 = Task(description=f"Create a summary blog post based on the report.", agent=writer)
        crew = Crew(agents=[researcher, writer], tasks=[task1, task2], process=Process.sequential, verbose=2)
                               return crew.kickoff()
