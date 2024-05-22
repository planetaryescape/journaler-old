// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { env } from "@/env";
import * as Sentry from "@sentry/nextjs";

const isDev = env.NODE_ENV === "development";

Sentry.init({
  dsn: "https://781ffc6adff3301054c712eca10d8205@o4507252798455808.ingest.de.sentry.io/4507252800356432",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  enabled: !isDev,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: env.NODE_ENV === 'development',
});
