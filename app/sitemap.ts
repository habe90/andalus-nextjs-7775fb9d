import type { MetadataRoute } from "next";
import { taxonomySlug } from "../lib/articles";
import { getArticles } from "../lib/content";

export const dynamic = "force-dynamic";

const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3017";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = [
    "",
    "/proizvodi",
    "/o-nama",
    "/blog",
    "/kontakt",
    "/uslovi-kupovine",
    "/privatnost",
  ];
  const articles = await getArticles();
  const articleCategories = Array.from(new Set(articles.map((a) => a.category)));
  const allArticleTags = Array.from(new Set(articles.flatMap((a) => a.tags)));
  return [
    ...pages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...articles.map((article) => ({
      url: `${base}/blog/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articleCategories.map((category) => ({
      url: `${base}/blog/kategorija/${taxonomySlug(category)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...allArticleTags.map((tag) => ({
      url: `${base}/blog/oznaka/${taxonomySlug(tag)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
