import { Home } from "../components/pages";
import { getBanners, getArticles } from "../lib/content";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [banners, articles] = await Promise.all([getBanners(), getArticles()]);
  return <Home banners={banners} articles={articles} />;
}
