import { config } from "@/lib/config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/api", "/api/*", "/_next", "/_next/*"],
    },
    sitemap: `${config.baseUrl}/sitemap.xml`,
  };
}
