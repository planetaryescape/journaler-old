import { AppKnockProvider } from "@/components/providers/knock-providers";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Merriweather, Open_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

import "@knocklabs/react/dist/index.css";
import "./globals.css";

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
});

const fontSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "700"],
});

export const viewport: Viewport = {
  themeColor: "#F5DEB3",
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
  applicationName: "Journaler",
  manifest: `${config.baseUrl}/site.webmanifest`,
  title:
    "Journaler - Enhance Your Journaling with Top Prompts and Community Insights",
  description:
    "Join Journaler to explore top journal prompts, share your own, and engage with a community of reflective writers. Start your mindful journaling journey today!",
  openGraph: {
    siteName: "Journaler",
    url: config.baseUrl,
    type: "website",
    title:
      "Journaler - Enhance Your Journaling with Top Prompts and Community Insights",
    description:
      "Join Journaler to explore top journal prompts, share your own, and engage with a community of reflective writers. Start your mindful journaling journey today!",
    images: [
      {
        url: "https://res.cloudinary.com/doqpfkbrx/image/upload/v1715858073/opengraph%20images/Journaler_Opengraph_Image_May_16_1_v6lpfn.webp",
        alt: "Journaler Cover Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@journaler_app",
    title:
      "Journaler - Enhance Your Journaling with Top Prompts and Community Insights",
    description:
      "Join Journaler to explore top journal prompts, share your own, and engage with a community of reflective writers. Start your mindful journaling journey today!",
    images: [
      {
        url: "https://res.cloudinary.com/doqpfkbrx/image/upload/v1715858073/opengraph%20images/Journaler_Opengraph_Image_May_16_1_v6lpfn.webp",
        alt: "Journaler Cover Image",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title:
      "Journaler - Enhance Your Journaling with Top Prompts and Community Insights",
    startupImage: "/logo.png",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <html lang="en" suppressHydrationWarning>
          <body
            className={cn(
              "relative min-h-screen bg-background font-sans antialiased",
              fontSerif.variable,
              fontSans.variable,
            )}
          >
            <ViewTransitions>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <AppKnockProvider>
                  <NextTopLoader color="#8FBC8F" />
                  {children}
                  <Toaster />
                  <SpeedInsights />
                  <Analytics />
                </AppKnockProvider>
              </ThemeProvider>
            </ViewTransitions>
          </body>
        </html>
      </ClerkProvider>
    </ReactQueryProvider>
  );
}
