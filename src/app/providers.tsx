"use client";

import { useAuth } from "@clerk/nextjs";
import { KnockFeedProvider, KnockProvider } from "@knocklabs/react";

export default function AppKnockProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useAuth();

  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY as string}
      userId={userId ?? "Anonymous User"}
    >
      <KnockFeedProvider
        feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_ID as string}
      >
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
