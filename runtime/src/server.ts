import "dotenv/config";
import { HttpAgent } from "@ag-ui/client";
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

const runtime = new CopilotRuntime({
  agents: {
    // @ts-expect-error HttpAgent type mismatch can be safely ignored
    personal_assistant_agent: new HttpAgent({
      url: config.AGENT_URL,
    }),
  },
  runner: new InMemoryAgentRunner(),
});

const copilotApp = createCopilotEndpoint({
  runtime,
  basePath: "/copilotkit",
});

app.route("/", copilotApp);

app.get("/health", (c) => c.json({ status: "ok" }));

const PORT = config.PORT;

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(
    `Runtime server listening at http://localhost:${info.port}/copilotkit`,
  );
});
