import { env } from "@/env";
import { Resend } from "resend";

const apiKey = (env.RESEND_API_KEY as string) ?? "re_123";
console.log("apiKey:", apiKey);

export const resend = new Resend(apiKey);
