from google import genai
from google.adk.agents import Agent
from google.adk.agents.readonly_context import ReadonlyContext
from google.adk.tools import ToolContext


def get_weather(location: str) -> dict:
    """Get the weather for a given location."""
    # Replace with real API call in production
    mock_weather = {
        "Ho Chi Minh City": {
            "temp": "32°C",
            "condition": "Partly Cloudy",
            "humidity": "78%",
        },
        "New York": {"temp": "5°C", "condition": "Snowy", "humidity": "65%"},
        "London": {"temp": "8°C", "condition": "Rainy", "humidity": "85%"},
    }
    weather = mock_weather.get(
        location, {"temp": "22°C", "condition": "Clear", "humidity": "50%"}
    )
    return {"status": "success", "location": location, **weather}


def add_todo(task: str, priority: str = "medium") -> dict:
    """Add a todo item to the list."""
    return {
        "status": "success",
        "task": task,
        "priority": priority,
        "message": f"Added: {task}",
    }


async def create_plan(
    title: str,
    content: str,
    tool_context: ToolContext,
) -> dict:
    """Create or update a markdown plan. The content should be well-formatted markdown
    with headings, bullet points, and numbered lists."""
    artifact = genai.types.Part(
        inline_data=genai.types.Blob(
            mime_type="text/markdown",
            data=content.encode("utf-8"),
        )
    )
    version = await tool_context.save_artifact(
        filename="plan.md",
        artifact=artifact,
    )
    tool_context.state["plan"] = {
        "title": title,
        "content": content,
        "version": version,
    }
    return {"status": "success", "message": f"Plan '{title}' created (v{version})"}


def build_instruction(context: ReadonlyContext) -> str:
    """Build the agent instruction dynamically, injecting the current plan from session state."""
    base = """You are a helpful assistant that can check the weather, manage todos, and create plans.
Be concise and friendly. When the user asks about weather, use the get_weather tool.
When they want to add a task, use the add_todo tool.
When the user asks you to create a plan, outline, roadmap, or strategy, use the create_plan tool.
Write the plan content as well-structured markdown with headings, bullet points, and numbered lists.
The user may edit the plan directly in the UI canvas. If they mention changes to the plan,
compare their current plan content below with what you last generated to identify what changed."""

    plan = context.state.get("plan")
    if plan and isinstance(plan, dict) and plan.get("content"):
        base += f"""

## Current Plan (from session state)
Title: {plan.get("title", "Untitled")}
Version: {plan.get("version", 0)}

{plan["content"]}"""

    return base


# Define the root agent
root_agent = Agent(
    name="personal_assistant_agent",
    model="gemini-2.5-flash",
    instruction=build_instruction,
    description="A helpful assistant with weather, todo, and planning capabilities.",
    tools=[get_weather, add_todo, create_plan],
)
