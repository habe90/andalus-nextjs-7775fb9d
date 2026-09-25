import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { taxonomySlug } from "../../../../lib/articles";
import { getArticles } from "../../../../lib/content";
import { productImageSrc } from "../../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticles();
  const tag = articles
    .flatMap((a) => a.tags)
    .find((t) => taxonomySlug(t) === slug);
  return tag
    ? {
        title: `Oznaka: ${tag}`,
        description: `Andalus članci označeni: ${tag}.`,
        alternates: { canonical: `/blog/oznaka/${taxonomySlug(tag)}` },
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticles();
  const tag = articles
    .flatMap((a) => a.tags)
    .find((t) => taxonomySlug(t) === slug);
  if (!tag) notFound();
  const list = articles.filter((article) => article.tags.includes(tag));
  return (
    <main className="container section">
      <p className="eyebrow">BLOG OZNAKA</p>
      <h1>#{tag}</h1>
      <div className="article-grid taxonomy-grid">
        {list.map((article) => (
          <article className="article-card" key={article.slug}>
            <Link href={`/blog/${article.slug}`}>
              <img src={productImageSrc(article.image)} alt={article.title} />
            </Link>
            <div>
              <p className="eyebrow">{article.category}</p>
              <Link href={`/blog/${article.slug}`}>
                <h2>{article.title}</h2>
              </Link>
              <p>{article.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
