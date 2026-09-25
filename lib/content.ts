import "server-only";
import { query, queryOne, execute } from "./db";
import { products as defaults, type Product } from "./catalog";
import { articles as legacyArticles } from "./articles";
import { sanitizeArticleHtml } from "./sanitize-html";

type Row = { id: string; data: string; enabled: boolean; sort_order: number };

export type ManagedProduct = Product & { enabled: boolean; sort: number };

export async function getCatalog(
  includeDisabled = false,
): Promise<Product[] | ManagedProduct[]> {
  const count = await queryOne<{ count: number }>(
    "SELECT COUNT(*)::int AS count FROM catalog_products",
  );
  if (!count?.count) {
    const now = new Date().toISOString();
    for (const [sort, product] of defaults.entries())
      await execute(
        "INSERT INTO catalog_products(id,data,enabled,sort_order,updated_at) VALUES($1,$2,$3,$4,$5) ON CONFLICT(id) DO NOTHING",
        [product.id, JSON.stringify(product), true, sort, now],
      );
  }
  const sql = includeDisabled
    ? "SELECT id,data,enabled,sort_order FROM catalog_products ORDER BY sort_order,id"
    : "SELECT id,data,enabled,sort_order FROM catalog_products WHERE enabled=true ORDER BY sort_order,id";
  const rows = await query<Row>(sql);
  return rows.map((row) =>
    includeDisabled
      ? ({
          ...(JSON.parse(row.data) as Product),
          enabled: row.enabled,
          sort: row.sort_order,
        } satisfies ManagedProduct)
      : (JSON.parse(row.data) as Product),
  );
}

export type Article = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  excerpt: string;
  bodyHtml: string;
  sources?: { label: string; url: string }[];
};
export type ManagedArticle = Article & { enabled: boolean; sort: number };
type ArticleRow = { id: string; data: string; enabled: boolean; sort_order: number };
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const legacyToHtml = (sections: { heading: string; text: string[] }[]) =>
  sections
    .map(
      (s) =>
        `<h2>${escapeHtml(s.heading)}</h2>` +
        s.text.map((p) => `<p>${escapeHtml(p)}</p>`).join(""),
    )
    .join("");
export async function getArticles(
  includeDisabled = false,
): Promise<Article[] | ManagedArticle[]> {
  const count = await queryOne<{ count: number }>(
    "SELECT COUNT(*)::int AS count FROM articles",
  );
  if (!count?.count) {
    const now = new Date().toISOString();
    for (const [sort, a] of legacyArticles.entries()) {
      const article: Article = {
        slug: a.slug,
        title: a.title,
        category: a.category,
        tags: a.tags,
        image: a.image,
        excerpt: a.excerpt,
        bodyHtml: legacyToHtml(a.sections),
        sources: a.sources,
      };
      await execute(
        "INSERT INTO articles(id,data,enabled,sort_order,updated_at) VALUES($1,$2,$3,$4,$5) ON CONFLICT(id) DO NOTHING",
        [a.slug, JSON.stringify(article), true, sort, now],
      );
    }
  }
  const sql = includeDisabled
    ? "SELECT id,data,enabled,sort_order FROM articles ORDER BY sort_order,id"
    : "SELECT id,data,enabled,sort_order FROM articles WHERE enabled=true ORDER BY sort_order,id";
  const rows = await query<ArticleRow>(sql);
  return rows.map((row) =>
    includeDisabled
      ? ({
          ...(JSON.parse(row.data) as Article),
          enabled: row.enabled,
          sort: row.sort_order,
        } satisfies ManagedArticle)
      : (JSON.parse(row.data) as Article),
  );
}
export async function saveArticle(article: Article & { enabled: boolean; sort: number }) {
  await execute(
    "INSERT INTO articles(id,data,enabled,sort_order,updated_at) VALUES($1,$2,$3,$4,$5) ON CONFLICT(id) DO UPDATE SET data=EXCLUDED.data,enabled=EXCLUDED.enabled,sort_order=EXCLUDED.sort_order,updated_at=EXCLUDED.updated_at",
    [
      article.slug,
      JSON.stringify({
        slug: article.slug,
        title: article.title,
        category: article.category,
        tags: article.tags,
        image: article.image,
        excerpt: article.excerpt,
        bodyHtml: sanitizeArticleHtml(article.bodyHtml),
        sources: article.sources,
      } satisfies Article),
      article.enabled,
      article.sort,
      new Date().toISOString(),
    ],
  );
}
export type Banner = {
  id: string;
  image: string;
  href: string;
  alt: string;
  sort: number;
  enabled: boolean;
};
type BannerRow = {
  id: string;
  image: string;
  href: string;
  alt: string;
  sort_order: number;
  enabled: boolean;
};
const defaultBanners = [
  {
    id: "kim",
    image: "hero-kim",
    href: "/proizvodi/curekot-250",
    alt: "Čisto. Prirodno. Andalus. Ulje crnog kima. Pogledaj proizvode.",
  },
  {
    id: "sidra",
    image: "hero-sidra",
    href: "/proizvodi/sidra",
    alt: "Ulje Sidra. Prirodna njega i vrhunski kvalitet. Saznaj više.",
  },
  {
    id: "legacy",
    image: "hero-legacy",
    href: "/kontakt",
    alt: "Legacy Beard Growth Serum. Njega i rast brade. Kontaktirajte nas za dostupnost.",
  },
];
export async function getBanners(includeDisabled = false): Promise<Banner[]> {
  const count = await queryOne<{ count: number }>(
    "SELECT COUNT(*)::int AS count FROM banners",
  );
  if (!count?.count) {
    const now = new Date().toISOString();
    for (const [sort, b] of defaultBanners.entries())
      await execute(
        "INSERT INTO banners(id,image,href,alt,sort_order,enabled,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT(id) DO NOTHING",
        [b.id, b.image, b.href, b.alt, sort, true, now],
      );
  }
  const sql = includeDisabled
    ? "SELECT id,image,href,alt,sort_order,enabled FROM banners ORDER BY sort_order,id"
    : "SELECT id,image,href,alt,sort_order,enabled FROM banners WHERE enabled=true ORDER BY sort_order,id";
  const rows = await query<BannerRow>(sql);
  return rows.map((r) => ({
    id: r.id,
    image: r.image,
    href: r.href,
    alt: r.alt,
    sort: r.sort_order,
    enabled: r.enabled,
  }));
}
export async function getSettings() {
  const rows = await query<{ key: string; value: string }>(
    "SELECT key,value FROM settings",
  );
  return Object.fromEntries(rows.map((row) => [row.key, row.value]));
}
