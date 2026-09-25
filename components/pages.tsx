"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { categories, money, Product, productImageSrc } from "../lib/catalog";
import type { Banner, Article } from "../lib/content";
import { taxonomySlug } from "../lib/articles";
import {
  Benefits,
  ProductCard,
  Newsletter,
  useShop,
  Quantity,
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
  Heart,
  Trash2,
  Mail,
  MapPin,
  Check,
} from "./store";
import {
  ShoppingCart,
  SlidersHorizontal,
  ArrowLeft,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
} from "lucide-react";
const categoryIcons = [
  "crni-kim",
  "sidra",
  "curekot",
  "kozmetika",
  "setovi",
  "med",
];
export function Home({
  banners,
  articles,
}: {
  banners: Banner[];
  articles: Article[];
}) {
  const { catalog } = useShop();
  const [banner, setBanner] = useState(0);
  const [promoMuted, setPromoMuted] = useState(true);
  return (
    <>
      <section className="hero" aria-label="Andalus kolekcija">
        <h1 className="sr-only">Čisto. Prirodno. Andalus.</h1>
        {banners.length > 0 && (
        <Link href={banners[banner].href} className="hero-link desktop-banner">
          <img
            className="hero-fill"
            src={productImageSrc(banners[banner].image)}
            alt=""
            aria-hidden="true"
          />
          <img
            className="hero-main"
            src={productImageSrc(banners[banner].image)}
            alt={banners[banner].alt}
            fetchPriority="high"
          />
        </Link>
        )}
        <div className="mobile-hero">
          <div>
            <p className="eyebrow">PRIRODA U SVOM NAJBOLJEM OBLIKU</p>
            <h2>
              Čisto. Prirodno.
              <br />
              <em>Andalus.</em>
            </h2>
            <p>Vrhunska prirodna ulja i pažljivo odabrani proizvodi.</p>
            <Link className="button" href="/proizvodi">
              Pogledaj proizvode <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        {banners.length > 1 && (
        <div className="hero-controls">
          <button
            onClick={() => setBanner((banner + banners.length - 1) % banners.length)}
            aria-label="Prethodni banner"
          >
            <ChevronLeft size={18} />
          </button>
          {banners.map((b, i) => (
            <button
              key={b.id}
              className={`dot ${banner === i ? "active" : ""}`}
              onClick={() => setBanner(i)}
              aria-label={`Prikaži banner ${i + 1}`}
              aria-pressed={banner === i}
            />
          ))}
          <button
            onClick={() => setBanner((banner + 1) % banners.length)}
            aria-label="Sljedeći banner"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        )}
      </section>
      <section className="category-strip">
        <div className="container categories">
          {categories.map((c, i) => (
            <Link
              href={`/proizvodi?kategorija=${encodeURIComponent(c)}`}
              key={c}
            >
              <span className="category-icon">
                <img src={`/assets/icons/${categoryIcons[i]}.webp`} alt="" />
              </span>
              <span>{c}</span>
            </Link>
          ))}
          <Link className="nature-note" href="/proizvodi">
            <Leaf />
            <div>
              <h2>
                Snaga prirodnih
                <br />
                sastojaka.
              </h2>
              <p>Otkrijte našu prirodnu kolekciju.</p>
              <span className="text-link">Pogledaj sve →</span>
            </div>
          </Link>
        </div>
      </section>
      <section className="container section featured">
        <div className="section-heading">
          <div>
            <h2>Izdvajamo iz ponude</h2>
            <p>Pažljivo odabrani proizvodi iz naše kolekcije.</p>
          </div>
          <Link className="text-link" href="/proizvodi">
            Pogledaj sve proizvode <ArrowRight size={16} />
          </Link>
        </div>
        <div className="product-grid four">
          {catalog.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="container story">
        <div className="story-image">
          <video
            autoPlay
            muted={promoMuted}
            loop
            playsInline
            preload="metadata"
            poster="/assets/promo-poster.jpg"
            aria-label="Andalus promo video"
          >
            <source src="/assets/promo.webm" type="video/webm" />
            <source src="/assets/promo.mp4" type="video/mp4" />
          </video>
          <Link href="/o-nama" className="story-image-link">
            <span>
              UPOZNAJTE NAŠU PRIČU <ArrowRight size={18} />
            </span>
          </Link>
          <button
            type="button"
            className="story-mute"
            onClick={(e) => {
              e.preventDefault();
              setPromoMuted((m) => !m);
            }}
            aria-label={promoMuted ? "Uključi zvuk" : "Isključi zvuk"}
          >
            {promoMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
        <div>
          <p className="eyebrow">O NAMA</p>
          <h2>Blagodati prirodnih sastojaka</h2>
          <p>
            Andalus je više od brenda – naša misija je da kvalitetne prirodne
            proizvode učinimo dostupnim svima koji žele kvalitetniji život.
          </p>
          <p>
            Naši proizvodi nastaju s pažnjom, znanjem i poštovanjem prema
            prirodi.
          </p>
          <Link className="button" href="/o-nama">
            Upoznajte nas <ArrowRight size={16} />
          </Link>
        </div>
        <Benefits compact />
      </section>
      <section className="container section blog-section">
        <div className="section-heading">
          <div>
            <h2>Korisni savjeti i članci</h2>
            <p>Upoznajte prirodu, sastojke i male svakodnevne rituale.</p>
          </div>
          <Link className="text-link" href="/blog">
            Pogledaj sve članke <ArrowRight size={16} />
          </Link>
        </div>
        <ArticleGrid articles={articles} limit={3} />
      </section>
      <Newsletter />
    </>
  );
}
function ArticleGrid({
  articles,
  filter = "Svi članci",
  limit,
}: {
  articles: Article[];
  filter?: string;
  limit?: number;
}) {
  const list = articles
    .filter((a) => filter === "Svi članci" || a.category === filter)
    .slice(0, limit);
  return list.length ? (
    <div className="article-grid">
      {list.map((a) => (
        <article className="article-card" key={a.slug}>
          <Link href={`/blog/${a.slug}`}>
            <img src={productImageSrc(a.image)} alt={a.title} loading="lazy" />
          </Link>
          <div>
            <p className="eyebrow">
              <Link href={`/blog/kategorija/${taxonomySlug(a.category)}`}>
                {a.category}
              </Link>
            </p>
            <Link href={`/blog/${a.slug}`}>
              <h3>{a.title}</h3>
            </Link>
            <p>{a.excerpt}</p>
            <div className="card-tags">
              {a.tags.slice(0, 3).map((tag) => (
                <Link key={tag} href={`/blog/oznaka/${taxonomySlug(tag)}`}>
                  #{tag}
                </Link>
              ))}
            </div>
            <Link className="text-link" href={`/blog/${a.slug}`}>
              Pročitaj više <ArrowRight size={15} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  ) : (
    <p className="empty">Trenutno nema članaka u ovoj kategoriji.</p>
  );
}
export function Catalog() {
  const { catalog } = useShop();
  const params = useSearchParams();
  const [chosen, setChosen] = useState<string[]>(
      params.get("kategorija") ? [params.get("kategorija")!] : [],
    ),
    [max, setMax] = useState(150),
    [sort, setSort] = useState("recommended"),
    [query, setQuery] = useState(params.get("q") || ""),
    [filterOpen, setFilterOpen] = useState(false);
  let list = catalog.filter(
    (p) =>
      (!chosen.length || chosen.includes(p.category)) &&
      (p.price === null || p.price <= max) &&
      p.name.toLocaleLowerCase("bs").includes(query.toLocaleLowerCase("bs")),
  );
  if (sort === "low")
    list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
  if (sort === "high")
    list.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
  if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <section className="catalog-hero">
        <div className="container">
          <h1>Naši proizvodi</h1>
          <p>Prirodna rješenja za vašu svakodnevicu.</p>
        </div>
      </section>
      <div className="container">
        <Breadcrumb current="Proizvodi" />
        <div className="catalog-layout">
          <button
            className="filter-toggle button outline"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <SlidersHorizontal size={17} /> Filteri
          </button>
          <aside className={`filters ${filterOpen ? "show" : ""}`}>
            <h3>Kategorije</h3>
            {categories.map((c) => (
              <label className="checkbox" key={c}>
                <input
                  type="checkbox"
                  checked={chosen.includes(c)}
                  onChange={() =>
                    setChosen((old) =>
                      old.includes(c)
                        ? old.filter((x) => x !== c)
                        : [...old, c],
                    )
                  }
                />
                <span>
                  {c}{" "}
                  <small>
                    ({catalog.filter((p) => p.category === c).length})
                  </small>
                </span>
              </label>
            ))}
            <h3>Cijena (KM)</h3>
            <input
              aria-label="Maksimalna cijena"
              type="range"
              min="0"
              max="150"
              value={max}
              onChange={(e) => setMax(+e.target.value)}
            />
            <div className="range-label">
              <span>0 KM</span>
              <span>{max} KM</span>
            </div>
            <button
              className="text-link reset"
              onClick={() => {
                setChosen([]);
                setMax(150);
                setQuery("");
              }}
            >
              <RotateCcw size={14} /> Poništi filtere
            </button>
            <Benefits compact />
          </aside>
          <section className="catalog-products">
            <div className="catalog-toolbar">
              <span>
                {list.length} {list.length === 1 ? "proizvod" : "proizvoda"}
              </span>
              <label>
                Sortiraj po:{" "}
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="recommended">Izdvojeno</option>
                  <option value="low">Najniža cijena</option>
                  <option value="high">Najviša cijena</option>
                  <option value="name">Naziv A–Ž</option>
                </select>
              </label>
            </div>
            <input
              className="catalog-search"
              type="search"
              placeholder="Pretražite proizvode…"
              aria-label="Pretražite proizvode"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {list.length ? (
              <div className="product-grid">
                {list.map((p) => (
                  <ProductCard product={p} key={p.id} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <Leaf />
                <h2>Nema pronađenih proizvoda</h2>
                <p>Pokušajte drugi pojam ili promijenite filtere.</p>
                <button
                  className="button"
                  onClick={() => {
                    setChosen([]);
                    setMax(150);
                    setQuery("");
                  }}
                >
                  Prikaži sve proizvode
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      <section className="container section">
        <Benefits />
      </section>
    </>
  );
}
function Breadcrumb({ current }: { current: string }) {
  return (
    <div className="breadcrumb">
      <Link href="/">Početna</Link>
      <span>›</span>
      {current !== "Proizvodi" && (
        <>
          <Link href="/proizvodi">Proizvodi</Link>
          <span>›</span>
        </>
      )}
      <span>{current}</span>
    </div>
  );
}
export function ProductDetail({ product: p }: { product: Product }) {
  const { add, favorites, favorite, catalog } = useShop(),
    [quantity, setQuantity] = useState(1),
    [tab, setTab] = useState("Opis"),
    [selected, setSelected] = useState(0);
  const images = [p.image];
  return (
    <div className="container product-page">
      <Breadcrumb current={p.name} />
      <div className="product-detail">
        <div className="gallery">
          <div className="thumbs">
            {images.map((im, i) => (
              <button
                aria-label={`Fotografija ${i + 1}`}
                className={selected === i ? "active" : ""}
                onClick={() => setSelected(i)}
                key={im}
              >
                <img src={productImageSrc(im)} alt="" />
              </button>
            ))}
          </div>
          <div className="main-product-image">
            <img src={productImageSrc(images[selected])} alt={p.name} />
            <span className={`badge ${p.badge === "Ušteda" ? "orange" : ""}`}>
              {p.badge}
            </span>
          </div>
        </div>
        <div className="product-description">
          <p className="eyebrow">
            <Leaf size={16} /> {p.category}
          </p>
          <h1>{p.name}</h1>
          <p className="tagline">Čisto. Prirodno. Andalus.</p>
          <p className="description">{p.description}</p>
          <Benefits />
          <div className="detail-price">
            <strong>{money(p.price)}</strong>
            <span>{p.size}</span>
          </div>
          <div className="purchase">
            {p.price > 0 ? (
              <>
                <Quantity value={quantity} onChange={setQuantity} />
                <button className="button" onClick={() => add(p.id, quantity)}>
                  <ShoppingCart size={20} /> Dodaj u korpu
                </button>
              </>
            ) : (
              <Link className="button" href="/kontakt">
                <Mail size={20} /> Pitajte za cijenu
              </Link>
            )}
            <button
              className={`button outline ${favorites.includes(p.id) ? "selected" : ""}`}
              aria-label="Sačuvaj proizvod"
              aria-pressed={favorites.includes(p.id)}
              onClick={() => favorite(p.id)}
            >
              <Heart />
            </button>
          </div>
          <div className="delivery-notes">
            <span>
              <Truck />
              Dostava širom BiH
            </span>
            <span>
              <ShieldCheck />
              Plaćanje pouzećem
            </span>
            <span>
              <Heart />
              Podrška pri kupovini
            </span>
          </div>
          <p className="muted small">
            Dostupnost i trošak dostave potvrđujemo prije slanja.
          </p>
        </div>
      </div>
      <div className="product-lower">
        <div>
          <div
            className="tabs"
            role="tablist"
            aria-label="Informacije o proizvodu"
          >
            {["Opis", "Način upotrebe", "Sastav"].map((t) => (
              <button
                role="tab"
                aria-selected={tab === t}
                aria-controls="product-tab"
                key={t}
                onClick={() => setTab(t)}
                className={tab === t ? "active" : ""}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="tab-content" role="tabpanel" id="product-tab">
            <img src="/assets/seeds.webp" alt="Prirodno crno sjeme" />
            <div>
              <h2>{tab === "Opis" ? "Priroda u svakodnevnoj njezi" : tab}</h2>
              <p>
                {tab === "Opis"
                  ? p.description
                  : tab === "Način upotrebe"
                    ? p.usage ||
                      "Slijedite upute na deklaraciji proizvoda. Za detaljnije informacije o primjeni kontaktirajte nas prije kupovine."
                    : p.composition ||
                      "Potpuni sastav i informacije o alergenima navedeni su na deklaraciji proizvoda. Kontaktirajte nas za detalje prije naručivanja."}
              </p>
              <Link className="text-link" href="/kontakt">
                Imate pitanje? Pišite nam <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
        <div className="faq">
          <h3>Često postavljana pitanja</h3>
          {[
            [
              "Kako mogu platiti?",
              "Plaćate gotovinom dostavljaču prilikom preuzimanja paketa.",
            ],
            [
              "Koliko košta dostava?",
              "Trošak dostave potvrđujemo s vama prije slanja narudžbe.",
            ],
            [
              "Kako se proizvod čuva?",
              "Pratite upute na pakovanju i čuvajte proizvod dalje od direktne sunčeve svjetlosti.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>Možda će vam se svidjeti</h2>
          <Link href="/proizvodi" className="text-link">
            Svi proizvodi →
          </Link>
        </div>
        <div className="product-grid four">
          {catalog
            .filter((x) => x.id !== p.id)
            .slice(0, 4)
            .map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
        </div>
      </section>
    </div>
  );
}
function Cart() {
  const { items, ready, setQuantity, total, catalog } = useShop();
  if (!ready) return <div className="empty">Učitavanje korpe…</div>;
  return (
    <div className="container section">
      <p className="eyebrow">VAŠ ODABIR</p>
      <h1>Vaša korpa</h1>
      {!items.length ? (
        <div className="empty">
          <ShoppingCart size={48} />
          <h2>Vaša korpa je prazna</h2>
          <p>Pronađite svoj mali ritual iz prirode.</p>
          <Link className="button" href="/proizvodi">
            Pogledaj proizvode <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {items.map((item) => {
              const p = catalog.find((x) => x.id === item.id)!;
              return (
                <article className="cart-line" key={item.id}>
                  <Link href={`/proizvodi/${p.id}`}>
                    <img src={productImageSrc(p.image)} alt={p.name} />
                  </Link>
                  <div>
                    <Link href={`/proizvodi/${p.id}`}>
                      <h3>{p.name}</h3>
                    </Link>
                    <p>{p.size}</p>
                    <span>{money(p.price)}</span>
                  </div>
                  <Quantity
                    value={item.quantity}
                    onChange={(n) => setQuantity(p.id, n)}
                  />
                  <strong>{money(p.price * item.quantity)}</strong>
                  <button
                    className="remove"
                    aria-label={`Ukloni ${p.name}`}
                    onClick={() => setQuantity(p.id, 0)}
                  >
                    <Trash2 size={17} />
                  </button>
                </article>
              );
            })}
            <Link className="text-link" href="/proizvodi">
              <ArrowLeft size={15} /> Nastavi kupovinu
            </Link>
          </div>
          <aside className="summary">
            <h2>Pregled narudžbe</h2>
            <div>
              <span>Proizvodi</span>
              <strong>{money(total)}</strong>
            </div>
            <div>
              <span>Dostava</span>
              <span>Potvrda prije slanja</span>
            </div>
            <div className="summary-total">
              <span>Ukupno bez dostave</span>
              <strong>{money(total)}</strong>
            </div>
            <Link className="button wide" href="/naplata">
              Nastavi na naplatu <ArrowRight size={16} />
            </Link>
            <p>
              <ShieldCheck size={15} /> Plaćanje pouzećem
            </p>
          </aside>
        </div>
      )}
      <Benefits />
    </div>
  );
}
function Checkout() {
  const { items, total, clear, ready, catalog } = useShop(),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [result, setResult] = useState<{
      id: string;
      total: number;
      shipping: number | null;
    } | null>(null),
    [key] = useState(() =>
      typeof crypto !== "undefined" ? crypto.randomUUID() : "",
    );
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const values = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, items, idempotencyKey: key }),
      });
      const data = await res.json();
      if (!res.ok) throw Error(data.error || "Narudžbu nije moguće poslati.");
      setResult(data);
      clear();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Veza je prekinuta. Pokušajte ponovo.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (result)
    return (
      <div className="container empty success">
        <span className="success-icon">
          <Check size={38} />
        </span>
        <p className="eyebrow">HVALA NA POVJERENJU</p>
        <h1>Vaša narudžba je primljena!</h1>
        <p>
          Broj narudžbe: <strong>{result.id}</strong>
        </p>
        <p>
          Vrijednost proizvoda: <strong>{money(result.total)}</strong>
        </p>
        <p>
          {result.shipping === null
            ? "Dostavu i dostupnost potvrđujemo prije slanja."
            : `Dostava: ${money(result.shipping)}. Ukupno za plaćanje: ${money(result.total + result.shipping)}.`}
          <br />
          Plaćanje gotovinom prilikom preuzimanja.
        </p>
        <p>Sačuvajte broj narudžbe za provjeru statusa.</p>
        <Link className="button" href="/moj-racun">
          Prati narudžbu
        </Link>
      </div>
    );
  if (!ready) return <div className="empty">Učitavanje…</div>;
  if (!items.length) return <Cart />;
  return (
    <div className="container section">
      <Link className="text-link" href="/korpa">
        ← Nazad na korpu
      </Link>
      <h1>Završite narudžbu</h1>
      <form className="checkout-layout" onSubmit={submit}>
        <section className="form-panel">
          <h2>Podaci za dostavu</h2>
          <div className="form-grid">
            <label>
              Ime i prezime
              <input
                name="name"
                autoComplete="name"
                minLength={3}
                maxLength={120}
                required
              />
            </label>
            <label>
              Telefon
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                minLength={6}
                maxLength={30}
                placeholder="+387…"
                required
              />
            </label>
            <label className="span-2">
              Email adresa
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={180}
              />
            </label>
            <label className="span-2">
              Ulica i broj
              <input
                name="address"
                autoComplete="street-address"
                minLength={4}
                maxLength={200}
                required
              />
            </label>
            <label>
              Grad
              <input
                name="city"
                autoComplete="address-level2"
                required
                maxLength={100}
              />
            </label>
            <label>
              Poštanski broj
              <input
                name="postalCode"
                autoComplete="postal-code"
                pattern="[0-9]{5}"
                title="Unesite petocifreni poštanski broj"
                maxLength={5}
                required
              />
            </label>
            <label className="span-2">
              Napomena (opcionalno)
              <textarea name="note" maxLength={1000} rows={3} />
            </label>
          </div>
          <p className="muted">Dostavljamo na adrese u Bosni i Hercegovini.</p>
        </section>
        <aside className="summary">
          <h2>Vaša narudžba</h2>
          {items.map((x) => (
            <div key={x.id}>
              <span>
                {catalog.find((p) => p.id === x.id)?.name} × {x.quantity}
              </span>
              <strong>
                {money(catalog.find((p) => p.id === x.id)!.price * x.quantity)}
              </strong>
            </div>
          ))}
          <div className="summary-total">
            <span>Proizvodi ukupno</span>
            <strong>{money(total)}</strong>
          </div>
          <p>Trošak dostave i dostupnost potvrđujemo prije slanja.</p>
          <div className="payment-method">
            <ShieldCheck />
            <span>
              <strong>Plaćanje pouzećem</strong>
              <br />
              Gotovinom pri preuzimanju.
            </span>
          </div>
          <label className="checkbox">
            <input required name="consent" type="checkbox" />
            <span>
              Prihvatam{" "}
              <Link href="/uslovi-kupovine" target="_blank">
                uslove kupovine
              </Link>{" "}
              i{" "}
              <Link href="/privatnost" target="_blank">
                politiku privatnosti
              </Link>
              .
            </span>
          </label>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button disabled={busy} className="button wide">
            {busy ? "Slanje narudžbe…" : "Potvrdi narudžbu"}{" "}
            <ArrowRight size={16} />
          </button>
        </aside>
      </form>
    </div>
  );
}
function Contact() {
  const [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false);
  return (
    <div className="container section contact-page">
      <div>
        <p className="eyebrow">KONTAKT</p>
        <h1>Tu smo za vas</h1>
        <p>
          Imate pitanje o proizvodima ili narudžbi?
          <br />
          Pišite ili nazovite – rado ćemo vam pomoći.
        </p>
        <div className="contact-item">
          <Mail />
          <div>
            <h3>
              <a href="mailto:info@andalusproducts.com">
                info@andalusproducts.com
              </a>
            </h3>
            <p>Odgovaramo na vaša pitanja o proizvodima i narudžbama.</p>
          </div>
        </div>
        <div className="contact-item">
          <MapPin />
          <div>
            <h3>
              <a href="tel:+387603316528">+387 60 331 6528</a>
            </h3>
            <p>Tu smo za vaš poziv i podršku pri kupovini.</p>
          </div>
        </div>
        <div className="contact-item">
          <Truck />
          <div>
            <h3>Dostava širom BiH</h3>
            <p>Plaćanje pouzećem prilikom preuzimanja.</p>
          </div>
        </div>
        <p className="signature">
          Dar prirode
          <br />
          za vaš svaki dan.
        </p>
      </div>
      <form
        className="form-panel"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const form = e.currentTarget;
          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(Object.fromEntries(new FormData(form))),
            });
            const data = await res.json();
            setStatus(data.message || data.error);
            if (res.ok) form.reset();
          } catch {
            setStatus("Poruka nije poslana. Pokušajte ponovo.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <h2>Pošaljite nam poruku</h2>
        <label>
          Ime i prezime
          <input
            required
            name="name"
            minLength={2}
            maxLength={120}
            autoComplete="name"
            placeholder="Vaše ime"
          />
        </label>
        <label>
          Email adresa
          <input
            required
            type="email"
            name="email"
            maxLength={180}
            autoComplete="email"
            placeholder="Vaš email"
          />
        </label>
        <label>
          Poruka
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={6}
            placeholder="Kako vam možemo pomoći?"
          />
        </label>
        <label className="checkbox">
          <input type="checkbox" name="consent" required />
          <span>
            Prihvatam obradu podataka radi odgovora na poruku.{" "}
            <Link href="/privatnost">Privatnost</Link>
          </span>
        </label>
        <button className="button wide" disabled={busy}>
          {busy ? "Slanje…" : "Pošalji poruku"} <ArrowRight size={16} />
        </button>
        {status && <p role="status">{status}</p>}
      </form>
    </div>
  );
}
function Account() {
  const [order, setOrder] = useState<{
      id: string;
      status: string;
      total: number;
      createdAt: string;
    } | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const { favorites, catalog } = useShop();
  return (
    <div className="container section">
      <p className="eyebrow">VAŠ ANDALUS</p>
      <h1>Moje narudžbe</h1>
      <div className="account-layout">
        <form
          className="form-panel"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError("");
            setOrder(null);
            try {
              const res = await fetch("/api/orders/lookup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                  Object.fromEntries(new FormData(e.currentTarget)),
                ),
              });
              const d = await res.json();
              if (!res.ok) throw Error(d.error);
              setOrder(d);
            } catch (e) {
              setError(e instanceof Error ? e.message : "Pokušajte ponovo.");
            } finally {
              setBusy(false);
            }
          }}
        >
          <h2>Provjerite status narudžbe</h2>
          <p>Unesite broj narudžbe i email korišten pri kupovini.</p>
          <label>
            Broj narudžbe
            <input name="id" required placeholder="AND-…" />
          </label>
          <label>
            Email adresa
            <input name="email" type="email" required />
          </label>
          <button className="button" disabled={busy}>
            {busy ? "Provjera…" : "Pronađi narudžbu"}
          </button>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          {order && (
            <div className="order-result" role="status">
              <h3>{order.id}</h3>
              <p>
                Status: <strong>{order.status}</strong>
              </p>
              <p>Proizvodi ukupno: {money(order.total)}</p>
              <p>
                Datum: {new Date(order.createdAt).toLocaleDateString("bs-BA")}
              </p>
            </div>
          )}
        </form>
        <div className="account-intro">
          <Leaf size={42} />
          <h2>
            Vaša prirodna rutina,
            <br />
            na jednom mjestu.
          </h2>
          <p>
            Za kupovinu vam nije potreban korisnički račun. Status narudžbe
            možete provjeriti u bilo kojem trenutku.
          </p>
        </div>
      </div>
      <section className="section">
        <h2>Omiljeni proizvodi</h2>
        {favorites.length ? (
          <div className="product-grid four">
            {catalog
              .filter((p) => favorites.includes(p.id))
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        ) : (
          <p>Sačuvajte proizvode klikom na srce u našoj ponudi.</p>
        )}
      </section>
    </div>
  );
}
export function ContentPage({
  page,
  articles = [],
  articleCategories = [],
  allArticleTags = [],
}: {
  page: string;
  articles?: Article[];
  articleCategories?: string[];
  allArticleTags?: string[];
}) {
  const [filter, setFilter] = useState("Svi članci");
  if (page === "korpa") return <Cart />;
  if (page === "naplata") return <Checkout />;
  if (page === "kontakt") return <Contact />;
  if (page === "moj-racun") return <Account />;
  if (page === "blog")
    return (
      <>
        <section className="blog-hero">
          <div className="container">
            <h1>Blog</h1>
            <p>
              Korisni savjeti, priče o prirodi
              <br />i inspiracija za svaki dan.
            </p>
          </div>
        </section>
        <div className="container section">
          <div className="filter-pills">
            {["Svi članci", ...articleCategories].map((c) => (
              <button
                className={filter === c ? "active" : ""}
                onClick={() => setFilter(c)}
                key={c}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="blog-tag-links" aria-label="Blog oznake">
            {allArticleTags.map((tag) => (
              <Link key={tag} href={`/blog/oznaka/${taxonomySlug(tag)}`}>
                #{tag}
              </Link>
            ))}
          </div>
          <div className="guides-strip" aria-label="Vodiči">
            <span>Detaljni vodiči:</span>
            <Link className="button outline" href="/sidr-za-kosu">
              Sidr za kosu
            </Link>
            <Link className="button outline" href="/ulje-crnog-kima">
              Ulje crnog kima
            </Link>
            <Link className="button outline" href="/dvojna-terapija">
              Dvojna terapija
            </Link>
          </div>
          <ArticleGrid articles={articles} filter={filter} />
        </div>
        <Newsletter />
      </>
    );
  if (page === "o-nama")
    return (
      <>
        <section className="about-hero">
          <div className="container">
            <div>
              <p className="eyebrow">O NAMA</p>
              <h1>
                Vjerujemo
                <br />u snagu prirode
              </h1>
              <p>
                Andalus je više od brenda – to je naša misija da prirodna blaga
                učinimo dostupnim svima koji žele kvalitetniji život.
              </p>
              <a href="#nasa-prica" className="button">
                Naša priča <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <div className="container section">
          <Benefits />
        </div>
        <section id="nasa-prica" className="container about-story section">
          <img src="/assets/seeds.webp" alt="Sjeme crnog kima" />
          <div>
            <p className="eyebrow">PRIRODA. ZDRAVLJE. RAVNOTEŽA.</p>
            <h2>
              Više od proizvoda.
              <br />
              Prirodna briga za vas.
            </h2>
            <p>
              Inspiraciju pronalazimo u prirodi i tradiciji. Naša kolekcija
              okuplja prirodna ulja, ćurekot i proizvode za njegu, odabrane za
              male svakodnevne rituale.
            </p>
            <p>
              Vjerujemo u pažljiv odabir, jasne informacije i odnos pun
              povjerenja. Tu smo da vam pomognemo da upoznate našu ponudu i
              odaberete ono što vam odgovara.
            </p>
            <Link href="/proizvodi" className="button">
              Istražite kolekciju <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <Newsletter />
      </>
    );
  return (
    <div className="container article section">
      <p className="eyebrow">ANDALUS</p>
      <h1>
        {page === "privatnost" ? "Politika privatnosti" : "Uslovi kupovine"}
      </h1>
      {page === "privatnost" ? (
        <>
          <h2>Podaci koje nam ostavljate</h2>
          <p>
            Podatke iz narudžbe koristimo za obradu, dogovor o dostavi i
            isporuku. Obavezni podaci su ime, telefon, email i adresa dostave.
            Poruke iz kontakt forme čuvamo radi odgovora na vaš upit.
          </p>
          <h2>Korpa i omiljeni proizvodi</h2>
          <p>
            Korpu i odabrane proizvode pamtimo u vašem pregledniku. Ti podaci
            ostaju na vašem uređaju. Sajt ne koristi marketinške kolačiće.
          </p>
          <h2>Newsletter</h2>
          <p>
            Email za newsletter pohranjujemo samo nakon vaše prijave. Za odjavu
            ili zahtjev za pristup i brisanje podataka koristite kontakt formu.
          </p>
          <h2>Podrška</h2>
          <p>
            Za pitanja o podacima i njihovoj obradi{" "}
            <Link href="/kontakt">pošaljite nam poruku</Link>.
          </p>
        </>
      ) : (
        <>
          <h2>Naručivanje i plaćanje</h2>
          <p>
            Cijene su iskazane u konvertibilnim markama (KM). Narudžbu šaljete
            putem korpe, a plaćate gotovinom dostavljaču pri preuzimanju.
            Dostupnost proizvoda potvrđujemo prije slanja.
          </p>
          <h2>Dostava</h2>
          <p>
            Dostavljamo unutar Bosne i Hercegovine. Trošak i rok dostave
            dogovaramo prije slanja. Iznos prikazan uz proizvode ne uključuje
            dostavu kada ona nije posebno iskazana.
          </p>
          <h2>Izmjene, otkazivanje i reklamacije</h2>
          <p>
            Za izmjenu ili otkazivanje narudžbe te reklamaciju ili povrat,
            pošaljite poruku putem kontakt forme i navedite broj narudžbe.
            Dogovorite postupak s nama prije povratnog slanja.
          </p>
          <h2>Informacije o proizvodima</h2>
          <p>
            Za sastav, alergene, način upotrebe i čuvanja mjerodavna je
            deklaracija na proizvodu. Ako trebate dodatne informacije prije
            kupovine, obratite nam se.
          </p>
        </>
      )}
    </div>
  );
}
