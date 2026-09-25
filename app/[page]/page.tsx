import { ContentPage } from '../../components/pages';
import { getArticles } from '../../lib/content';
import { notFound } from 'next/navigation';
const routes=['o-nama','blog','kontakt','korpa','naplata','moj-racun','privatnost','uslovi-kupovine'];
export const generateStaticParams=()=>routes.map(page=>({page}));
export async function generateMetadata({params}:{params:Promise<{page:string}>}){const {page}=await params;return {title:({'o-nama':'O nama',blog:'Blog',kontakt:'Kontakt',korpa:'Vaša korpa',naplata:'Završite narudžbu','moj-racun':'Moje narudžbe',privatnost:'Privatnost','uslovi-kupovine':'Uslovi kupovine'} as Record<string,string>)[page]}}
export default async function Page({params}:{params:Promise<{page:string}>}){
  const {page}=await params;
  if(!routes.includes(page))notFound();
  if(page==='blog'){
    const articles=await getArticles();
    const articleCategories=Array.from(new Set(articles.map(a=>a.category))).sort();
    const allArticleTags=Array.from(new Set(articles.flatMap(a=>a.tags))).sort();
    return <ContentPage page={page} articles={articles} articleCategories={articleCategories} allArticleTags={allArticleTags}/>;
  }
  return <ContentPage page={page}/>;
}
