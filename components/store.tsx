"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Search,
  UserRound,
  ShoppingCart,
  Menu,
  X,
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
  Heart,
  Minus,
  Plus,
  Trash2,
  Mail,
  MapPin,
  Check,
  ChevronDown,
} from "lucide-react";
import { money, Product, productImageSrc } from "../lib/catalog";
export {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
  Heart,
  Minus,
  Plus,
  Trash2,
  Mail,
  MapPin,
  Check,
};
type Line = { id: string; quantity: number };
type CartContext = {
  catalog: Product[];
  items: Line[];
  ready: boolean;
  add: (id: string, n?: number) => void;
  setQuantity: (id: string, n: number) => void;
  clear: () => void;
  total: number;
  count: number;
  notice: string;
  favorites: string[];
  favorite: (id: string) => void;
};
const Context = createContext<CartContext>(null!);
export const useShop = () => useContext(Context);
export function ShopProvider({
  children,
  catalog,
}: {
  children: React.ReactNode;
  catalog: Product[];
}) {
  const [items, setItems] = useState<Line[]>([]),
    [ready, setReady] = useState(false),
    [notice, setNotice] = useState(""),
    [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem("andalus-cart") || "[]");
      if (Array.isArray(value))
        setItems(
          value.filter(
            (x: Line) =>
              catalog.some((p) => p.id === x.id && p.price > 0) &&
              Number.isInteger(x.quantity) &&
              x.quantity > 0 &&
              x.quantity <= 99,
          ),
        );
      const fav = JSON.parse(localStorage.getItem("andalus-favorites") || "[]");
      if (Array.isArray(fav))
        setFavorites(
          fav.filter((id: string) => catalog.some((p) => p.id === id)),
        );
    } catch {}
    setReady(true);
  }, [catalog]);
  useEffect(() => {
    if (ready) {
      localStorage.setItem("andalus-cart", JSON.stringify(items));
      localStorage.setItem("andalus-favorites", JSON.stringify(favorites));
    }
  }, [items, favorites, ready]);
  useEffect(() => {
    if (notice) {
      const t = setTimeout(() => setNotice(""), 3500);
      return () => clearTimeout(t);
    }
  }, [notice]);
  const setQuantity = (id: string, n: number) =>
    setItems((old) =>
      n <= 0
        ? old.filter((x) => x.id !== id)
        : old.map((x) =>
            x.id === id ? { ...x, quantity: Math.min(99, n) } : x,
          ),
    );
  const add = (id: string, n = 1) => {
    const product = catalog.find((p) => p.id === id);
    if (!product || product.price <= 0) return;
    setItems((old) =>
      old.some((x) => x.id === id)
        ? old.map((x) =>
            x.id === id ? { ...x, quantity: Math.min(99, x.quantity + n) } : x,
          )
        : [...old, { id, quantity: Math.min(99, n) }],
    );
    setNotice(`${product.name} je dodan u korpu.`);
  };
  return (
    <Context.Provider
      value={{
        catalog,
        items,
        ready,
        add,
        setQuantity,
        clear: () => setItems([]),
        total: items.reduce(
          (s, x) =>
            s + (catalog.find((p) => p.id === x.id)?.price || 0) * x.quantity,
          0,
        ),
        count: items.reduce((s, x) => s + x.quantity, 0),
        notice,
        favorites,
        favorite: (id) =>
          setFavorites((old) =>
            old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
          ),
      }}
    >
      {children}
      <div role="status" className={`toast ${notice ? "visible" : ""}`}>
        <Check size={18} />
        {notice}
        <Link href="/korpa">Korpa →</Link>
      </div>
    </Context.Provider>
  );
}
export function Header() {
  const path = usePathname(),
    router = useRouter(),
    { count } = useShop();
  const [menu, setMenu] = useState(false),
    [search, setSearch] = useState(false),
    [scrolled, setScrolled] = useState(false),
    [q, setQ] = useState("");
  const overlay = path === "/";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [path]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearch(false);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);
  return (
    <header
      className={`header${overlay ? " transparent" : ""}${menu || search || scrolled ? " solid" : ""}`}
    >
      <div className="container nav">
        <Link className="logo" href="/" aria-label="Andalus početna">
          <img src="/assets/logo-andalus.png" alt="Andalus" />
        </Link>
        <nav
          className={menu ? "nav-links open" : "nav-links"}
          aria-label="Glavna navigacija"
        >
          {[
            ["/", "Početna"],
            ["/proizvodi", "Proizvodi"],
            ["/o-nama", "O nama"],
            ["/blog", "Blog"],
            ["/kontakt", "Kontakt"],
          ].map(([url, name]) => (
            <Link
              key={url}
              className={
                path === url || (url !== "/" && path.startsWith(url))
                  ? "active"
                  : ""
              }
              href={url}
            >
              {name}
              {name === "Proizvodi" && (
                <ChevronDown className="chevron" size={14} strokeWidth={2} />
              )}
            </Link>
          ))}
        </nav>
        <div className="nav-tools">
          <button
            aria-label="Pretraga proizvoda"
            aria-expanded={search}
            onClick={() => setSearch(!search)}
          >
            <Search />
          </button>
          <Link href="/moj-racun" aria-label="Moje narudžbe">
            <UserRound />
          </Link>
          <Link
            className="cart-icon"
            href="/korpa"
            aria-label={`Korpa, ${count} proizvoda`}
          >
            <ShoppingCart />
            <span>{count}</span>
          </Link>
          <Link className="button nav-cta" href="/proizvodi">
            Naruči odmah
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={menu}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {search && (
        <form
          className="search-bar container"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/proizvodi?q=${encodeURIComponent(q)}`);
            setSearch(false);
          }}
        >
          <Search />
          <input
            autoFocus
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Koji proizvod tražite?"
            aria-label="Naziv proizvoda"
          />
          <button className="button">Pretraži</button>
          <button
            type="button"
            onClick={() => setSearch(false)}
            aria-label="Zatvori pretragu"
          >
            <X />
          </button>
        </form>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="logo" href="/">
            <img src="/assets/logo-andalus.png" alt="Andalus" />
          </Link>
          <p>Priroda. Zdravlje. Ravnoteža.</p>
        </div>
        <div>
          <h3>Brzi linkovi</h3>
          <Link href="/">Početna</Link>
          <Link href="/proizvodi">Proizvodi</Link>
          <Link href="/o-nama">O nama</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/kontakt">Kontakt</Link>
        </div>
        <div>
          <h3>Vodiči</h3>
          <Link href="/sidr-za-kosu">Sidr za kosu</Link>
          <Link href="/ulje-crnog-kima">Ulje crnog kima</Link>
          <Link href="/dvojna-terapija">Dvojna terapija</Link>
        </div>
        <div>
          <h3>Tu smo za vas</h3>
          <a href="tel:+387603316528">
            <UserRound size={15} /> +387 60 331 6528
          </a>
          <a href="mailto:info@andalusproducts.com">
            <Mail size={15} /> info@andalusproducts.com
          </a>
          <p>
            <MapPin size={15} /> Dostava širom BiH
          </p>
        </div>
        <div>
          <h3>Vaša kupovina</h3>
          <Link href="/moj-racun">Pratite narudžbu</Link>
          <Link href="/korpa">Moja korpa</Link>
          <Link href="/uslovi-kupovine">Dostava i povrat</Link>
          <p>
            <Truck size={15} /> Plaćanje pouzećem
          </p>
        </div>
        <p className="signature">
          Zdraviji ljudi.
          <br />
          Sretniji svijet.
        </p>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Andalus. Sva prava zadržana.</span>
        <div>
          <Link href="/uslovi-kupovine">Uslovi kupovine</Link>
          <Link href="/privatnost">Politika privatnosti</Link>
        </div>
      </div>
    </footer>
  );
}
export function Benefits({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`benefits ${compact ? "compact" : ""}`}>
      {[
        [Leaf, "100% prirodni sastojci"],
        [ShieldCheck, "Provjeren kvalitet"],
        [Truck, "Plaćanje pouzećem"],
        [Heart, "Pažljivo odabrano"],
      ].map(([Icon, label]) => {
        const I = Icon as typeof Leaf;
        return (
          <div key={label as string}>
            <I strokeWidth={1.3} />
            <span>{label as string}</span>
          </div>
        );
      })}
    </div>
  );
}
export function ProductCard({ product: p }: { product: Product }) {
  const { add, favorites, favorite } = useShop();
  const unavailable = p.price <= 0;
  return (
    <article className="product-card">
      <div className="product-image">
        <Link href={`/proizvodi/${p.id}`} tabIndex={-1}>
          <img src={productImageSrc(p.image)} alt={p.name} loading="lazy" />
        </Link>
        <span className={`badge ${p.badge === "Ušteda" ? "orange" : ""}`}>
          {p.badge}
        </span>
        <button
          className={`favorite ${favorites.includes(p.id) ? "selected" : ""}`}
          aria-label={`${favorites.includes(p.id) ? "Ukloni iz" : "Dodaj u"} omiljene: ${p.name}`}
          aria-pressed={favorites.includes(p.id)}
          onClick={() => favorite(p.id)}
        >
          <Heart size={18} />
        </button>
      </div>
      <div className="product-info">
        <Link href={`/proizvodi/${p.id}`}>
          <h3>{p.name}</h3>
        </Link>
        <p>{p.size}</p>
        <div className="product-bottom">
          <strong className={unavailable ? "on-request" : ""}>
            {money(p.price)}
          </strong>
          {unavailable ? (
            <Link
              className="button cart-add"
              href="/kontakt"
              aria-label={`Pitajte za cijenu: ${p.name}`}
            >
              <Mail size={16} />
            </Link>
          ) : (
            <button
              className="button cart-add"
              aria-label={`Dodaj u korpu: ${p.name}`}
              onClick={() => add(p.id)}
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
export function Quantity({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="quantity">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label="Smanji količinu"
      >
        <Minus size={14} />
      </button>
      <span aria-label="Količina">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(99, value + 1))}
        disabled={value >= 99}
        aria-label="Povećaj količinu"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
export function Newsletter() {
  const [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false);
  return (
    <section className="newsletter container">
      <div>
        <Leaf size={34} />
        <div>
          <h2>Budite prvi koji saznaju!</h2>
          <p>Prijavite se za novosti iz svijeta Andalusa.</p>
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          setBusy(true);
          try {
            const res = await fetch("/api/newsletter", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: new FormData(form).get("email") }),
            });
            const data = await res.json();
            setStatus(data.message || data.error);
            if (res.ok) form.reset();
          } catch {
            setStatus("Prijava nije uspjela. Pokušajte ponovo.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Vaš email
        </label>
        <input
          required
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="Vaš email"
        />
        <button disabled={busy} className="button">
          {busy ? "Slanje…" : "Prijavi se"}
        </button>
        <small>
          Prijavom pristajete na{" "}
          <Link href="/privatnost">politiku privatnosti</Link>. Odjava je
          dostupna u svakoj poruci.
        </small>
        {status && <p role="status">{status}</p>}
      </form>
    </section>
  );
}
