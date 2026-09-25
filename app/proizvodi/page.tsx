import { Catalog } from '../../components/pages';
import { Suspense } from 'react';
export const metadata = {title:'Naši proizvodi'};
export default function Page(){return <Suspense fallback={<div className="container section">Učitavanje proizvoda…</div>}><Catalog/></Suspense>}
