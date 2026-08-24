import { MetadataRoute } from "next";
import speciesCatalog from "../data/curated-species.json";
import type { Species } from "../types/species";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://geofauna.carlosrodriguezpardo.es";
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
  const speciesPages: MetadataRoute.Sitemap = (speciesCatalog as unknown as Species[]).map((species) => ({
    url: `${baseUrl}/species/${species.id}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticPages, ...speciesPages];
}
