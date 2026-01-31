import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string().transform(Number).default("4000"),
  ALLOW_ORIGIN: z.string().url().default("http://localhost:5173"),
  AGENT_URL: z.string().url().default("http://localhost:8000"),
});

const envVars = envSchema.safeParse(process.env);

if (!envVars.success) {
  console.error("Invalid environment variables:", envVars.error.format());
  process.exit(1);
}

export const config = envVars.data;
