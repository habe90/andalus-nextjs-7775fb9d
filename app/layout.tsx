import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { AppFrame } from '../components/app-frame';
import { getCatalog } from "../lib/content";
import "./globals.css";
import "./blog.css";
import "./cms.css";
const bodyFont = Montserrat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
});
const headingFont = Open_Sans({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-heading",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3017",
  ),
  title: {
    default: "Andalus | Priroda. Zdravlje. Ravnoteža.",
    template: "%s | Andalus",
  },
  description:
    "Otkrijte Andalus prirodna ulja, ćurekot i proizvode za njegu. Naručite online uz plaćanje pouzećem.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "bs_BA",
    siteName: "Andalus",
    title: "Andalus | Priroda. Zdravlje. Ravnoteža.",
    description: "Prirodna ulja, njega i savjeti za svakodnevnu rutinu.",
  },
};
export const dynamic = "force-dynamic";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const catalog = await getCatalog();
  return (
    <html lang="bs">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <AppFrame catalog={catalog}>{children}</AppFrame>
      </body>
    </html>
  );
}
