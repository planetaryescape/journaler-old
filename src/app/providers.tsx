"use client";

import { useAuth } from "@clerk/nextjs";
import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";
import { useTheme } from "next-themes";

export default function AppKnockProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useAuth();
  const { theme } = useTheme();

  console.log("userId:", userId);
  const channelId =
    process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID ?? "no-channel-id";

  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY as string}
      userId={userId ?? "Anonymous User"}
    >
      <KnockFeedProvider
        colorMode={theme === "dark" ? "dark" : "light"}
        feedId={channelId}
      >
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
