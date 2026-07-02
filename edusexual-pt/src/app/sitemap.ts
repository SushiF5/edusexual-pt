import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://edusexual.pt";
  const locales = ["pt", "en", "es"];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "pt": `${baseUrl}?lang=pt`,
          "en": `${baseUrl}?lang=en`,
          "es": `${baseUrl}?lang=es`,
        },
      },
    },
  ];
}
