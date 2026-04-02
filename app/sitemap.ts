import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://myresume.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];
}
