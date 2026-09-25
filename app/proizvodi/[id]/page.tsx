import { ProductDetail } from "../../../components/pages";
import { getCatalog } from "../../../lib/content";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const catalog = await getCatalog();
  return { title: catalog.find((p) => p.id === id)?.name || "Proizvod" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const catalog = await getCatalog();
  const p = catalog.find((p) => p.id === id);
  if (!p) notFound();
  return <ProductDetail product={p} />;
}
