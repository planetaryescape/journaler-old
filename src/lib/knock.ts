import { env } from "@/env";
import { Knock } from "@knocklabs/node";

export const knock = new Knock((env.KNOCK_API_KEY as string) ?? "");
