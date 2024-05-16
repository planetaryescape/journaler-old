import { config } from "@/lib/config";

export default async function sitemap() {
  return [
    {
      url: config.baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${config.baseUrl}/pricing`,
      lastModified: new Date(),
    },
    {
      url: `${config.baseUrl}/dashboard`,
      lastModified: new Date(),
    },
    {
      url: `${config.baseUrl}/cookie-policy`,
      lastModified: new Date(),
    },
    {
      url: `${config.baseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
  ];
}
