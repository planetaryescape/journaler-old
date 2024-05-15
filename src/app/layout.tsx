import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title:
    "Journaler - Enhance Your Journaling with Top Prompts and Community Insights",
  description:
    "Join Journaler to explore top journal prompts, share your own, and engage with a community of reflective writers. Start your mindful journaling journey today!",
  openGraph: {
    type: "website",
    title:
      "Journaler - Enhance Your Journaling with Top Prompts and Community Insights",
    description:
      "Join Journaler to explore top journal prompts, share your own, and engage with a community of reflective writers. Start your mindful journaling journey today!",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Journaler Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Journaler - Enhance Your Journaling with Top Prompts and Community Insights",
    description:
      "Join Journaler to explore top journal prompts, share your own, and engage with a community of reflective writers. Start your mindful journaling journey today!",
    images: [
      {
        url: "/logo.png",
        alt: "Journaler Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
