import os
from dotenv import load_dotenv
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ag_ui_adk import ADKAgent, add_adk_fastapi_endpoint
from agent import root_agent

load_dotenv()

# Wrap the ADK agent with AG-UI middleware
adk_agent = ADKAgent(
    adk_agent=root_agent,
    app_name="my_app",
    user_id="default_user",
    session_timeout_seconds=3600,
    use_in_memory_services=True,  # Use in-memory session/artifact stores
)

# Create the FastAPI app
app = FastAPI(title="ADK Agent Server")

# CORS — allow the CopilotKit runtime to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000"],  # Runtime origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the AG-UI endpoint at the root path
add_adk_fastapi_endpoint(app, adk_agent, path="/")


@app.get("/health")
async def health():
    return {"status": "ok"}


if __name__ == "__main__":
    if not os.getenv("GOOGLE_API_KEY"):
        print("⚠️  Set GOOGLE_API_KEY: export GOOGLE_API_KEY='your-key-here'")
        print("   Get one at: https://aistudio.google.com/apikey")

    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)