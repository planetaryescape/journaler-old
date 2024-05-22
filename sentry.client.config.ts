// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { env } from "@/env";
import * as Sentry from "@sentry/nextjs";

const isDev = env.NODE_ENV === "development";

Sentry.init({
  dsn: "https://781ffc6adff3301054c712eca10d8205@o4507252798455808.ingest.de.sentry.io/4507252800356432",

  enabled: !isDev,

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      colorScheme: "system",
      isNameRequired: true,
      isEmailRequired: true,
      useSentryUser: {
        name: "fullName",
        email: "email",
      },
      themeLight: {
        background: "#F5DEB3",
      },
      themeDark: {
        background: "#2F4F4F",
      },
    }),
  ],
});
