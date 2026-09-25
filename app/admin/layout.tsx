import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Administracija', robots: { index: false, follow: false }, alternates: { canonical: null } };
export default function AdminLayout({ children }: { children: React.ReactNode }) { return children; }
