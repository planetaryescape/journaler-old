"use client";

import { env } from "@/env";
import { useAuth } from "@clerk/nextjs";
import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";
import { useTheme } from "next-themes";

export function AppKnockProvider({ children }: { children: React.ReactNode }) {
  const { userId } = useAuth();
  const { theme } = useTheme();

  const channelId = env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID ?? "no-channel-id";
  const apiKey =
    (env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY as string) || "no-api-key";

  return (
    <KnockProvider apiKey={apiKey} userId={userId ?? "Anonymous User"}>
      <KnockFeedProvider
        colorMode={theme === "dark" ? "dark" : "light"}
        feedId={channelId}
      >
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
