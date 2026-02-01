"""
A2A Protocol Server

Serves the Restaurant Agent using the A2A protocol with A2UI support.
"""

import logging
import os

from a2a.server.apps import A2AStarletteApplication
from a2a.server.request_handlers import DefaultRequestHandler
from a2a.server.tasks import InMemoryTaskStore
from a2a.types import AgentCapabilities, AgentCard, AgentSkill
from a2ui.extension.a2ui_extension import get_a2ui_agent_extension
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import uvicorn

from agent_executor import RestaurantAgentExecutor

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def create_app(host: str = "localhost", port: int = 8000):
    """Create the A2A server application."""

    if not os.getenv("GOOGLE_API_KEY"):
        logger.warning(
            "⚠️  GOOGLE_API_KEY not set. Set it with: export GOOGLE_API_KEY='your-key-here'"
        )
        logger.warning("   Get one at: https://aistudio.google.com/apikey")

    capabilities = AgentCapabilities(
        streaming=True,
        extensions=[get_a2ui_agent_extension()],
    )

    skill = AgentSkill(
        id="find_restaurants",
        name="Find Restaurants",
        description="Helps find restaurants based on user criteria (cuisine, location, price range).",
        tags=["restaurant", "finder", "booking"],
        examples=[
            "Find Vietnamese restaurants in Ho Chi Minh City",
            "Show me Italian restaurants",
            "Book a table at Pho 24",
        ],
    )

    base_url = f"http://{host}:{port}"

    agent_card = AgentCard(
        name="Restaurant Finder Agent",
        description="A restaurant finder assistant that helps users discover restaurants and make reservations with rich A2UI widget rendering.",
        url=base_url,
        version="1.0.0",
        default_input_modes=["text", "text/plain"],
        default_output_modes=["text", "text/plain"],
        capabilities=capabilities,
        skills=[skill],
    )

    agent_executor = RestaurantAgentExecutor(base_url=base_url)

    request_handler = DefaultRequestHandler(
        agent_executor=agent_executor,
        task_store=InMemoryTaskStore(),
    )

    server = A2AStarletteApplication(
        agent_card=agent_card, http_handler=request_handler
    )

    app = server.build()

    # Add CORS middleware to allow the CopilotKit runtime to connect
    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=r"http://localhost:\d+",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


def main():
    """Run the A2A server."""
    host = os.getenv("HOST", "localhost")
    port = int(os.getenv("PORT", "8000"))

    app = create_app(host, port)

    logger.info(f"Starting A2A server at http://{host}:{port}")
    logger.info(f"Agent card available at http://{host}:{port}/.well-known/agent.json")

    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    main()
