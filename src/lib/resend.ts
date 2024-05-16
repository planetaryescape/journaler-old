import { Resend } from "resend";

const apiKey = (process.env.RESEND_API_KEY as string) ?? "";
console.log("apiKey:", apiKey);

export const resend = new Resend(apiKey);
