import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { taxonomySlug } from "../../../lib/articles";
import { getArticles } from "../../../lib/content";
import { productImageSrc } from "../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [productImageSrc(article.image)],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getArticles();
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: productImageSrc(article.image),
    mainEntityOfPage: `/blog/${article.slug}`,
    author: { "@type": "Organization", name: "Andalus" },
    publisher: { "@type": "Organization", name: "Andalus" },
    keywords: article.tags.join(", "),
  };
  return (
    <article className="container article section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link className="text-link" href="/blog">
        ← Svi članci
      </Link>
      <p className="eyebrow">
        <Link href={`/blog/kategorija/${taxonomySlug(article.category)}`}>
          {article.category}
        </Link>
      </p>
      <h1>{article.title}</h1>
      <div className="article-tags" aria-label="Oznake članka">
        {article.tags.map((tag) => (
          <Link key={tag} href={`/blog/oznaka/${taxonomySlug(tag)}`}>
            #{tag}
          </Link>
        ))}
      </div>
      <img
        className="article-image"
        src={productImageSrc(article.image)}
        alt={article.title}
      />
      <div dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
      {article.sources && (
        <section className="article-sources">
          <h2>Izvori</h2>
          <ul>
            {article.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
      <p className="article-disclaimer">
        Informacije su edukativne i ne zamjenjuju pregled, dijagnozu ni savjet
        ljekara. Za zdravstvena ili vjersko-pravna pitanja obratite se
        kvalificiranom stručnjaku.
      </p>
      <Link className="button" href="/proizvodi">
        Istražite proizvode →
      </Link>
    </article>
  );
}
