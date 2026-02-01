import "dotenv/config";
import { A2AClient } from "@a2a-js/sdk/client";
import { A2AAgent } from "@ag-ui/a2a";
import {
  CopilotRuntime,
  createCopilotEndpoint,
  InMemoryAgentRunner,
} from "@copilotkit/runtime/v2";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { config } from "./config";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: config.ALLOW_ORIGIN,
    credentials: true,
  }),
);

// Create A2A client to connect to the Python agent server
const a2aClient = new A2AClient(config.AGENT_URL);

// Create A2A agent with A2UI support
// @ts-expect-error A2AClient type mismatch between package versions can be safely ignored
const a2aAgent = new A2AAgent({ a2aClient });

const runtime = new CopilotRuntime({
  agents: {
    // Use A2AAgent for proper A2UI protocol support
    // @ts-expect-error Type mismatch between package versions can be safely ignored
    personal_assistant_agent: a2aAgent,
  },
  runner: new InMemoryAgentRunner(),
});

const copilotApp = createCopilotEndpoint({
  runtime,
  basePath: "/copilotkit",
});

// Mount the CopilotKit routes
app.route("/", copilotApp);

app.get("/health", (c) => c.json({ status: "ok" }));

const PORT = config.PORT;

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(
    `Runtime server listening at http://localhost:${info.port}/copilotkit`,
  );
});
