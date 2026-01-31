import "dotenv/config";
import { HttpAgent } from "@ag-ui/client";
import { CopilotRuntime, createCopilotEndpoint } from "@copilotkit/runtime/v2";
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

const runtime = new CopilotRuntime({
  agents: {
    // @ts-expect-error HttpAgent type mismatch can be safely ignored
    personal_assistant_agent: new HttpAgent({
      url: config.AGENT_URL,
    }),
  },
  // runner: new InMemoryAgentRunner(),  // ← default, explicit if you want
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
