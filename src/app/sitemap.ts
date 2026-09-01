import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://edusexual-pt.vercel.app";

  const now = new Date();
  // Include main hubs for better SEO discoverability
  const hubs = ["", "/#ferramentas", "/#podcast", "/#direitos"] as const;

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          pt: baseUrl,
          en: `${baseUrl}/en`,
          es: `${baseUrl}/es`,
        },
      },
    },
    ...hubs.slice(1).map((hub) => ({
      url: `${baseUrl}${hub}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
