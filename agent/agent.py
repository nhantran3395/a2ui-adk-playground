from google.adk.agents import Agent


def get_weather(location: str) -> dict:
    """Get the weather for a given location."""
    # Replace with real API call in production
    mock_weather = {
        "Ho Chi Minh City": {"temp": "32°C", "condition": "Partly Cloudy", "humidity": "78%"},
        "New York": {"temp": "5°C", "condition": "Snowy", "humidity": "65%"},
        "London": {"temp": "8°C", "condition": "Rainy", "humidity": "85%"},
    }
    weather = mock_weather.get(location, {"temp": "22°C", "condition": "Clear", "humidity": "50%"})
    return {"status": "success", "location": location, **weather}


def add_todo(task: str, priority: str = "medium") -> dict:
    """Add a todo item to the list."""
    return {"status": "success", "task": task, "priority": priority, "message": f"Added: {task}"}


# Define the root agent
root_agent = Agent(
    name="personal_assistant_agent",
    model="gemini-2.5-flash",
    instruction="""You are a helpful assistant that can check the weather and manage todos.
    Be concise and friendly. When the user asks about weather, use the get_weather tool.
    When they want to add a task, use the add_todo tool.""",
    description="A helpful assistant with weather and todo capabilities.",
    tools=[get_weather, add_todo],
)