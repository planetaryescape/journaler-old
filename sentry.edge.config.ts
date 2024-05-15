// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV === "development";

Sentry.init({
  dsn: "https://781ffc6adff3301054c712eca10d8205@o4507252798455808.ingest.de.sentry.io/4507252800356432",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  enabled: !isDev,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
