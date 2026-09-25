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
  const category = articles
    .map((a) => a.category)
    .find((c) => taxonomySlug(c) === slug);
  return category
    ? {
        title: `${category} | Blog`,
        description: `Andalus članci: ${category}.`,
        alternates: { canonical: `/blog/kategorija/${taxonomySlug(category)}` },
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
  const category = articles
    .map((a) => a.category)
    .find((c) => taxonomySlug(c) === slug);
  if (!category) notFound();
  const list = articles.filter((article) => article.category === category);
  return (
    <main className="container section">
      <p className="eyebrow">BLOG KATEGORIJA</p>
      <h1>{category}</h1>
      <p className="muted">Provjereni edukativni članci iz ove teme.</p>
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
