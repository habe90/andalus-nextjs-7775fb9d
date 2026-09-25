import type { Metadata } from "next";
import { LandingPage } from "../../components/landing-template";
import { landingPages } from "../../lib/landing-pages";
import { getCatalog } from "../../lib/content";

const data = landingPages["ulje-crnog-kima"];

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  alternates: { canonical: `/${data.slug}` },
};

export default async function Page() {
  const catalog = await getCatalog();
  const product = catalog.find((p) => p.id === data.productId);
  return <LandingPage data={data} product={product} />;
}
