import { env } from "@/env";
import pino from "pino";

export const logger = pino({
  level: env.PINO_LOG_LEVEL || "debug",
  timestamp: pino.stdTimeFunctions.isoTime,
  redact: {
    paths: ["email"],
  },
});
