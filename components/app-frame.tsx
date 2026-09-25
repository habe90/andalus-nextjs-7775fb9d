"use client";
import { usePathname } from 'next/navigation';
import { ShopProvider, Header, Footer } from './store';
import type { Product } from '../lib/catalog';

export function AppFrame({ children, catalog }: { children: React.ReactNode; catalog: Product[] }) {
  const path = usePathname();
  if (path === '/admin' || path.startsWith('/admin/')) return <>{children}</>;
  return <ShopProvider catalog={catalog}><a className="skip" href="#main">Preskoči na sadržaj</a><Header /><main id="main">{children}</main><Footer /></ShopProvider>;
}
