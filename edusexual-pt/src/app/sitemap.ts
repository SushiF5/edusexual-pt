import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://edusexual.pt";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
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
  ];
}
