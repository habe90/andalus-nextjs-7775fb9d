import Link from 'next/link';
export default function NotFound(){return <div className="empty container"><p className="eyebrow">404</p><h1>Ova stranica nije pronađena</h1><Link className="button" href="/">Povratak na početnu</Link></div>}
