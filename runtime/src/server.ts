import { HttpAgent } from "@ag-ui/client";
import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNodeHttpEndpoint,
} from "@copilotkit/runtime";
import cors from "cors";
import express from "express";

import { config } from "./config";

const app = express();

app.use(
  cors({
    origin: config.ALLOW_ORIGIN,
    credentials: true,
  }),
);

const serviceAdapter = new ExperimentalEmptyAdapter();

app.post("/copilotkit", (req, res) => {
  const runtime = new CopilotRuntime({
    agents: {
      // @ts-expect-error HttpAgent type mismatch is okay to be ignored
      personal_assistant_agent: new HttpAgent({
        url: config.AGENT_URL,
      }),
    },
  });

  const handler = copilotRuntimeNodeHttpEndpoint({
    endpoint: "/copilotkit",
    runtime,
    serviceAdapter,
  });

  return handler(req, res);
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(config.PORT, () => {
  console.log(`Runtime server listening at ${config.PORT}`);
});
