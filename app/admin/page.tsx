"use client";
import { FormEvent, useEffect, useState } from "react";
import { money, productImageSrc } from "../../lib/catalog";
import type { ManagedProduct, Banner, ManagedArticle } from "../../lib/content";
import { RichTextEditor } from "../../components/rich-text-editor";

type Data = {
  owner: { email: string; twoFactorEnabled: boolean };
  catalog: ManagedProduct[];
  settings: Record<string, string>;
  banners: Banner[];
  articles: ManagedArticle[];
  orders: {
    id: string;
    customer: {
      name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      postalCode: string;
      note: string;
    };
    items: { name: string; quantity: number }[];
    total: number;
    status: string;
    created_at: string;
  }[];
  messages: {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
  }[];
  subscribers: { email: string; created_at: string }[];
};
const blank = (): ManagedProduct => ({
  id: "",
  name: "",
  size: "",
  price: 0,
  category: "",
  badge: "",
  image: "",
  description: "",
  enabled: true,
  sort: 999,
});
const blankBanner = (): Banner => ({
  id: "",
  image: "",
  href: "",
  alt: "",
  sort: 999,
  enabled: true,
});
const blankArticle = (): ManagedArticle => ({
  slug: "",
  title: "",
  category: "",
  tags: [],
  image: "",
  excerpt: "",
  bodyHtml: "",
  enabled: true,
  sort: 999,
});
export default function Admin() {
  const [data, setData] = useState<Data | null>(null),
    [tab, setTab] = useState("orders"),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false),
    [otpRequired, setOtpRequired] = useState(false),
    [editing, setEditing] = useState<ManagedProduct | null>(null),
    [editingBanner, setEditingBanner] = useState<Banner | null>(null),
    [editingArticle, setEditingArticle] = useState<ManagedArticle | null>(null),
    [productQuery, setProductQuery] = useState(""),
    [articleQuery, setArticleQuery] = useState(""),
    [totp, setTotp] = useState<{ secret: string; uri: string } | null>(null);
  async function refresh() {
    const r = await fetch("/api/admin");
    if (r.ok) setData(await r.json());
    else setData(null);
  }
  useEffect(() => {
    refresh();
  }, []);
  async function call(body: unknown) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const r = await fetch("/api/admin", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await r.json();
      if (!r.ok) throw Error(json.error);
      setNotice("Sačuvano.");
      await refresh();
      return json;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Pokušajte ponovo.");
      return null;
    } finally {
      setBusy(false);
    }
  }
  if (!data)
    return (
      <main className="cms-login">
        <a href="/" className="cms-login-brand"><img src="/assets/logo-andalus.png" alt="Andalus" width="194" height="65" /></a>
        <p className="eyebrow">ANDALUS CMS</p>
        <h1>Sigurna prijava</h1>
        <form
          className="form-panel"
          style={{ maxWidth: 480, marginTop: 25 }}
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError("");
            try {
              const form = new FormData(e.currentTarget);
              const r = await fetch("/api/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(form)),
              });
              const response = await r.json();
              if (!r.ok) throw Error(response.error);
              if (response.twoFactor) {
                setOtpRequired(true);
                return;
              }
              await refresh();
            } catch (e) {
              setError(e instanceof Error ? e.message : "Pokušajte ponovo.");
            } finally {
              setBusy(false);
            }
          }}
        >
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="username"
              placeholder="admin@andalus.local"
              required
            />
          </label>
          <label>
            Lozinka
            <input
              name="password"
              type="password"
              minLength={16}
              autoComplete="current-password"
              required
            />
          </label>
          {otpRequired && (
            <label>
              Authenticator kod
              <input
                name="otp"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                autoComplete="one-time-code"
                required
              />
            </label>
          )}
          <button className="button" disabled={busy}>
            {busy ? "Prijava…" : otpRequired ? "Potvrdi kod" : "Prijavi se"}
          </button>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <p className="muted small">
            Lozinka ima najmanje 16 znakova; prijava je ograničena, a sesija
            ističe nakon osam sati.
          </p>
        </form>
      </main>
    );
  return (
    <div className="cms-shell">
      <aside className="cms-sidebar">
        <a className="cms-brand" href="/">
          <img src="/assets/logo-andalus.png" alt="Andalus" />
        </a>
        <p>ADMINISTRACIJA</p>
        <nav className="admin-nav">
          {[
            ["orders", `Narudžbe (${data.orders.length})`],
            ["products", `Proizvodi (${data.catalog.length})`],
            ["banners", `Baneri (${data.banners.length})`],
            ["blog", `Blog (${data.articles.length})`],
            ["settings", "Postavke"],
            ["messages", `Poruke (${data.messages.length})`],
            ["subscribers", `Newsletter (${data.subscribers.length})`],
            ["security", "Sigurnost"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={tab === id ? "active" : ""}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="cms-sidebar-bottom">
          <button onClick={refresh}>↻ Osvježi podatke</button>
          <button
            onClick={async () => {
              await fetch("/api/admin", { method: "DELETE" });
              setData(null);
            }}
          >
            Odjavi se
          </button>
        </div>
      </aside>
      <main className="cms-main">
        <header className="cms-topbar">
          <div>
            <p className="eyebrow">ANDALUS CMS</p>
            <h1>Upravljanje shopom</h1>
          </div>
          <div className="cms-user">
            <span>{data.owner.email}</span>
            <a href="/" target="_blank">
              Pogledaj shop ↗
            </a>
          </div>
        </header>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        {notice && <p role="status">{notice}</p>}
        {tab === "orders" && (
          <div className="admin-wrap">
            {!data.orders.length ? (
              <p className="admin-empty">Još nema narudžbi.</p>
            ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Narudžba</th>
                  <th>Kupac i dostava</th>
                  <th>Proizvodi</th>
                  <th>Iznos</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.orders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <strong>{o.id}</strong>
                      <br />
                      {new Date(o.created_at).toLocaleString("bs-BA")}
                    </td>
                    <td>
                      {o.customer.name}
                      <br />
                      {o.customer.phone}
                      <br />
                      {o.customer.email}
                      <br />
                      {o.customer.address}
                      <br />
                      {o.customer.postalCode} {o.customer.city}
                      <br />
                      {o.customer.note}
                    </td>
                    <td>
                      {o.items.map((i, n) => (
                        <div key={n}>
                          {i.quantity} × {i.name}
                        </div>
                      ))}
                    </td>
                    <td>{money(o.total / 100)}</td>
                    <td>
                      <select
                        value={o.status}
                        onChange={(e) =>
                          call({
                            action: "order",
                            id: o.id,
                            status: e.target.value,
                          })
                        }
                      >
                        {[
                          "Primljena",
                          "Potvrđena",
                          "Poslana",
                          "Isporučena",
                          "Otkazana",
                        ].map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        )}
        {tab === "products" &&
          (editing ? (
            <ProductForm
              product={editing}
              close={() => setEditing(null)}
              save={async (product) => {
                const result = await call({ action: "product", product });
                if (result) setEditing(null);
              }}
              busy={busy}
            />
          ) : (
            <>
              <div className="admin-toolbar">
                <button className="button" onClick={() => setEditing(blank())}>
                  Dodaj proizvod
                </button>
                <input
                  type="search"
                  className="admin-search"
                  placeholder="Pretraži proizvode…"
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  aria-label="Pretraži proizvode"
                />
              </div>
              <div className="admin-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Proizvod</th>
                      <th>Kategorija</th>
                      <th>Cijena</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const q = productQuery.trim().toLowerCase();
                      const filtered = !q
                        ? data.catalog
                        : data.catalog.filter(
                            (p) =>
                              p.name.toLowerCase().includes(q) ||
                              p.category.toLowerCase().includes(q) ||
                              p.size.toLowerCase().includes(q) ||
                              p.id.toLowerCase().includes(q),
                          );
                      if (!filtered.length)
                        return (
                          <tr>
                            <td colSpan={4} className="admin-empty">
                              Nema proizvoda za &quot;{productQuery}&quot;.
                            </td>
                          </tr>
                        );
                      return filtered.map((p) => (
                      <tr key={p.id}>
                        <td>
                          {p.name}
                          <br />
                          <small>{p.size}</small>
                        </td>
                        <td>
                          {p.category}
                          {!p.enabled && <small> (skriven)</small>}
                        </td>
                        <td>
                          {p.price > 0 ? money(p.price) : "Cijena na upit"}
                        </td>
                        <td>
                          <button
                            className="text-link"
                            onClick={() => setEditing(p)}
                          >
                            Uredi
                          </button>
                          <button
                            className="text-link"
                            onClick={() =>
                              call({
                                action: "product",
                                product: { ...p, enabled: !p.enabled },
                              })
                            }
                          >
                            {p.enabled ? "Sakrij" : "Prikaži"}
                          </button>
                        </td>
                      </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </>
          ))}
        {tab === "banners" &&
          (editingBanner ? (
            <BannerForm
              banner={editingBanner}
              close={() => setEditingBanner(null)}
              save={async (banner) => {
                const result = await call({ action: "banner", banner });
                if (result) setEditingBanner(null);
              }}
              busy={busy}
            />
          ) : (
            <>
              <div className="admin-toolbar">
                <button
                  className="button"
                  onClick={() => setEditingBanner(blankBanner())}
                >
                  Dodaj baner
                </button>
              </div>
              <div className="admin-wrap">
                {!data.banners.length ? (
                  <p className="admin-empty">Još nema banera.</p>
                ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Slika</th>
                      <th>Link</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.banners.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <img
                            src={productImageSrc(b.image)}
                            alt=""
                            style={{
                              width: 90,
                              height: 45,
                              objectFit: "cover",
                              borderRadius: 4,
                            }}
                          />
                        </td>
                        <td>
                          {b.href}
                          {!b.enabled && <small> (skriven)</small>}
                        </td>
                        <td>
                          <button
                            className="text-link"
                            onClick={() => setEditingBanner(b)}
                          >
                            Uredi
                          </button>
                          <button
                            className="text-link"
                            onClick={() =>
                              call({
                                action: "banner",
                                banner: { ...b, enabled: !b.enabled },
                              })
                            }
                          >
                            {b.enabled ? "Sakrij" : "Prikaži"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}
              </div>
            </>
          ))}
        {tab === "blog" &&
          (editingArticle ? (
            <ArticleForm
              article={editingArticle}
              close={() => setEditingArticle(null)}
              save={async (article) => {
                const result = await call({ action: "article", article });
                if (result) setEditingArticle(null);
              }}
              busy={busy}
            />
          ) : (
            <>
              <div className="admin-toolbar">
                <button
                  className="button"
                  onClick={() => setEditingArticle(blankArticle())}
                >
                  Novi članak
                </button>
                <input
                  type="search"
                  className="admin-search"
                  placeholder="Pretraži članke…"
                  value={articleQuery}
                  onChange={(e) => setArticleQuery(e.target.value)}
                  aria-label="Pretraži članke"
                />
              </div>
              <div className="admin-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Naslov</th>
                      <th>Kategorija</th>
                      <th>Oznake</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const q = articleQuery.trim().toLowerCase();
                      const filtered = !q
                        ? data.articles
                        : data.articles.filter(
                            (a) =>
                              a.title.toLowerCase().includes(q) ||
                              a.category.toLowerCase().includes(q) ||
                              a.tags.some((t) => t.toLowerCase().includes(q)) ||
                              a.slug.toLowerCase().includes(q),
                          );
                      if (!filtered.length)
                        return (
                          <tr>
                            <td colSpan={4} className="admin-empty">
                              Nema članaka za &quot;{articleQuery}&quot;.
                            </td>
                          </tr>
                        );
                      return filtered.map((a) => (
                        <tr key={a.slug}>
                          <td>
                            {a.title}
                            <br />
                            <small>/blog/{a.slug}</small>
                          </td>
                          <td>
                            {a.category}
                            {!a.enabled && <small> (skriveno)</small>}
                          </td>
                          <td>{a.tags.join(", ")}</td>
                          <td>
                            <button
                              className="text-link"
                              onClick={() => setEditingArticle(a)}
                            >
                              Uredi
                            </button>
                            <button
                              className="text-link"
                              onClick={() =>
                                call({
                                  action: "article",
                                  article: { ...a, enabled: !a.enabled },
                                })
                              }
                            >
                              {a.enabled ? "Sakrij" : "Prikaži"}
                            </button>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </>
          ))}
        {tab === "settings" && (
          <form
            className="form-panel"
            style={{ maxWidth: 600 }}
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              call({ action: "settings", settings: Object.fromEntries(f) });
            }}
          >
            <h2>Postavke prodavnice</h2>
            <label>
              Naziv prodavnice
              <input
                name="storeName"
                defaultValue={data.settings.storeName || "Andalus"}
                required
              />
            </label>
            <label>
              Dostava (KM)
              <input
                name="shippingBam"
                inputMode="decimal"
                defaultValue={data.settings.shippingBam || ""}
                placeholder="npr. 8,00"
              />
            </label>
            <label>
              Besplatna dostava iznad (KM)
              <input
                name="freeShippingFrom"
                inputMode="decimal"
                defaultValue={data.settings.freeShippingFrom || ""}
                placeholder="npr. 100,00"
              />
            </label>
            <p className="muted small">
              Prazno polje dostave znači da kupcu potvrđujete trošak prije
              slanja.
            </p>
            <button className="button" disabled={busy}>
              Sačuvaj postavke
            </button>
          </form>
        )}
        {tab === "messages" && (
          <div className="admin-wrap">
            {!data.messages.length ? (
              <p className="admin-empty">Još nema poruka.</p>
            ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Ime i email</th>
                  <th>Poruka</th>
                </tr>
              </thead>
              <tbody>
                {data.messages.map((m) => (
                  <tr key={m.id}>
                    <td>{new Date(m.created_at).toLocaleString("bs-BA")}</td>
                    <td>
                      {m.name}
                      <br />
                      {m.email}
                    </td>
                    <td style={{ whiteSpace: "pre-wrap" }}>{m.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        )}
        {tab === "subscribers" && (
          <div className="admin-wrap">
            {!data.subscribers.length ? (
              <p className="admin-empty">Još nema prijava na newsletter.</p>
            ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Datum prijave</th>
                </tr>
              </thead>
              <tbody>
                {data.subscribers.map((s) => (
                  <tr key={s.email}>
                    <td>{s.email}</td>
                    <td>{new Date(s.created_at).toLocaleString("bs-BA")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
          </div>
        )}
        {tab === "security" && (
          <section className="form-panel" style={{ maxWidth: 650 }}>
            <h2>Sigurnost računa</h2>
            <p>
              2FA:{" "}
              <strong>
                {data.owner.twoFactorEnabled ? "uključen" : "isključen"}
              </strong>
            </p>
            {!data.owner.twoFactorEnabled && !totp && (
              <button
                className="button"
                onClick={async () => {
                  const r = await call({ action: "totp-begin" });
                  if (r) setTotp(r);
                }}
              >
                Postavi authenticator 2FA
              </button>
            )}
            {totp && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  call({
                    action: "totp-confirm",
                    otp: new FormData(e.currentTarget).get("otp"),
                  }).then((r) => {
                    if (r) setTotp(null);
                  });
                }}
              >
                <p>
                  Dodajte ovaj tajni ključ u Google Authenticator, Microsoft
                  Authenticator ili sličnu aplikaciju:
                </p>
                <code style={{ wordBreak: "break-all" }}>{totp.secret}</code>
                <label>
                  Šestocifreni kod
                  <input
                    name="otp"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                  />
                </label>
                <button className="button" disabled={busy}>
                  Uključi 2FA
                </button>
              </form>
            )}
            {data.owner.twoFactorEnabled && (
              <p className="muted">
                2FA se može isključiti samo uz trenutnu lozinku i authenticator
                kod.
              </p>
            )}
            <form
              style={{ marginTop: 28 }}
              onSubmit={(e) => {
                e.preventDefault();
                const values = Object.fromEntries(
                  new FormData(e.currentTarget),
                );
                call({ action: "password", ...values }).then((result) => {
                  if (result) e.currentTarget.reset();
                });
              }}
            >
              <h3>Promijeni lozinku</h3>
              <label>
                Trenutna lozinka
                <input
                  name="currentPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </label>
              <label>
                Nova lozinka (najmanje 16 znakova)
                <input
                  name="nextPassword"
                  type="password"
                  minLength={16}
                  autoComplete="new-password"
                  required
                />
              </label>
              <label>
                Potvrdite novu lozinku
                <input
                  name="confirmPassword"
                  type="password"
                  minLength={16}
                  autoComplete="new-password"
                  required
                />
              </label>
              {data.owner.twoFactorEnabled && (
                <label>
                  Authenticator kod
                  <input
                    name="otp"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                  />
                </label>
              )}
              <button className="button" disabled={busy}>
                Sačuvaj novu lozinku
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}
function ProductForm({
  product,
  close,
  save,
  busy,
}: {
  product: ManagedProduct;
  close: () => void;
  save: (p: ManagedProduct) => void;
  busy: boolean;
}) {
  const [image, setImage] = useState(product.image);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setUploadError("Slika je prevelika (maksimalno 4 MB).");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const r = await fetch("/api/admin/upload-image", {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const json = await r.json();
      if (!r.ok) throw Error(json.error);
      setImage(json.id);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Otpremanje nije uspjelo.",
      );
    } finally {
      setUploading(false);
    }
  }
  return (
    <>
      <button type="button" className="text-link admin-back" onClick={close}>
        ← Nazad na proizvode
      </button>
      <form
        className="form-panel"
        onSubmit={(e) => {
          e.preventDefault();
          const x = Object.fromEntries(new FormData(e.currentTarget));
          save({
            ...product,
            ...x,
            price: Number(x.price),
            sort: Number(x.sort),
          });
        }}
      >
        <h2>{product.id ? "Uredi proizvod" : "Novi proizvod"}</h2>
        <div className="form-grid">
        <label>
          Naziv
          <input name="name" defaultValue={product.name} required />
        </label>
        <label>
          Pakovanje
          <input name="size" defaultValue={product.size} required />
        </label>
        <label>
          URL identifikator
          <input
            name="id"
            defaultValue={product.id}
            required
            pattern="[a-z0-9-]+"
          />
        </label>
        <label>
          Cijena (0 = na upit)
          <input
            name="price"
            defaultValue={product.price}
            type="number"
            min="0"
            step="0.01"
            required
          />
        </label>
        <label>
          Kategorija
          <input name="category" defaultValue={product.category} required />
        </label>
        <label>
          Oznaka
          <input name="badge" defaultValue={product.badge} />
        </label>
        <label>
          Redoslijed
          <input
            name="sort"
            defaultValue={product.sort || 999}
            type="number"
            min="0"
            step="1"
          />
        </label>
        <label className="span-2">
          Slika proizvoda
          <input
            type="file"
            accept="image/webp,image/jpeg,image/png"
            onChange={handleFile}
            disabled={uploading}
          />
          <input type="hidden" name="image" value={image} readOnly />
          {uploading && <small>Otpremanje…</small>}
          {uploadError && (
            <small className="error" style={{ display: "block" }}>
              {uploadError}
            </small>
          )}
          {image ? (
            <img
              src={productImageSrc(image)}
              alt=""
              style={{
                width: 90,
                height: 90,
                objectFit: "cover",
                borderRadius: 6,
                marginTop: 8,
              }}
            />
          ) : (
            <small>Nije postavljena slika.</small>
          )}
        </label>
        <label className="span-2">
          Opis
          <textarea
            name="description"
            defaultValue={product.description}
            required
            rows={4}
          />
        </label>
        <label className="span-2">
          Način upotrebe
          <textarea
            name="usage"
            defaultValue={product.usage || ""}
            rows={3}
            placeholder="Npr. Nekoliko kapi utrljajte u vlasište i kosu, nježno masirajući."
          />
        </label>
        <label className="span-2">
          Sastav
          <textarea
            name="composition"
            defaultValue={product.composition || ""}
            rows={3}
            placeholder="Npr. 100% hladno cijeđeno ulje crnog kima (Nigella sativa)."
          />
        </label>
        </div>
        <button className="button" disabled={busy}>
          Sačuvaj proizvod
        </button>
        <button type="button" className="button outline" onClick={close}>
          Otkaži
        </button>
      </form>
    </>
  );
}
function BannerForm({
  banner,
  close,
  save,
  busy,
}: {
  banner: Banner;
  close: () => void;
  save: (b: Banner) => void;
  busy: boolean;
}) {
  const [image, setImage] = useState(banner.image);
  const [ratio, setRatio] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setUploadError("Slika je prevelika (maksimalno 4 MB).");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const r = await fetch("/api/admin/upload-image", {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const json = await r.json();
      if (!r.ok) throw Error(json.error);
      setImage(json.id);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Otpremanje nije uspjelo.",
      );
    } finally {
      setUploading(false);
    }
  }
  return (
    <>
      <button type="button" className="text-link admin-back" onClick={close}>
        ← Nazad na banere
      </button>
      <form
        className="form-panel"
        onSubmit={(e) => {
          e.preventDefault();
          const x = Object.fromEntries(new FormData(e.currentTarget));
          save({ ...banner, ...x, sort: Number(x.sort) } as unknown as Banner);
        }}
      >
        <h2>{banner.id ? "Uredi baner" : "Novi baner"}</h2>
        <div className="form-grid">
          <label>
            Identifikator
            <input
              name="id"
              defaultValue={banner.id}
              required
              pattern="[a-z0-9-]+"
            />
          </label>
          <label>
            Link (kad se klikne na baner)
            <input
              name="href"
              defaultValue={banner.href}
              placeholder="/proizvodi/curekot-250"
              required
            />
          </label>
          <label>
            Redoslijed
            <input
              name="sort"
              defaultValue={banner.sort || 999}
              type="number"
              min="0"
              step="1"
            />
          </label>
          <label className="span-2">
            Alternativni tekst (SEO/pristupačnost)
            <input name="alt" defaultValue={banner.alt} required />
          </label>
          <label className="span-2">
            Slika banera
            <small>
              Preporučena dimenzija: 1920×1080 px (omjer 16:9). Slika drugog
              omjera prikazuje se cijela, ali sa zamućenim rubovima.
            </small>
            <input
              type="file"
              accept="image/webp,image/jpeg,image/png"
              onChange={handleFile}
              disabled={uploading}
            />
            <input type="hidden" name="image" value={image} readOnly />
            {uploading && <small>Otpremanje…</small>}
            {uploadError && (
              <small className="error" style={{ display: "block" }}>
                {uploadError}
              </small>
            )}
            {image ? (
              <>
                <img
                  src={productImageSrc(image)}
                  alt=""
                  onLoad={(e) =>
                    setRatio(
                      e.currentTarget.naturalWidth /
                        e.currentTarget.naturalHeight,
                    )
                  }
                  style={{
                    width: 224,
                    height: 126,
                    objectFit: "contain",
                    background: "#151c11",
                    borderRadius: 6,
                    marginTop: 8,
                  }}
                />
                {ratio && Math.abs(ratio - 16 / 9) > 0.05 && (
                  <small className="error" style={{ display: "block" }}>
                    Ova slika je omjera {ratio.toFixed(2)}:1, a ne 16:9 (1.78:1)
                    — na sajtu će imati zamućene rubove.
                  </small>
                )}
              </>
            ) : (
              <small>Nije postavljena slika.</small>
            )}
          </label>
        </div>
        <button className="button" disabled={busy}>
          Sačuvaj baner
        </button>
        <button type="button" className="button outline" onClick={close}>
          Otkaži
        </button>
      </form>
    </>
  );
}
function ArticleForm({
  article,
  close,
  save,
  busy,
}: {
  article: ManagedArticle;
  close: () => void;
  save: (a: ManagedArticle) => void;
  busy: boolean;
}) {
  const [image, setImage] = useState(article.image);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      setUploadError("Slika je prevelika (maksimalno 4 MB).");
      return;
    }
    setUploading(true);
    setUploadError("");
    try {
      const r = await fetch("/api/admin/upload-image", {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const json = await r.json();
      if (!r.ok) throw Error(json.error);
      setImage(json.id);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Otpremanje nije uspjelo.",
      );
    } finally {
      setUploading(false);
    }
  }
  return (
    <>
      <button type="button" className="text-link admin-back" onClick={close}>
        ← Nazad na blog
      </button>
      <form
        className="form-panel"
        onSubmit={(e) => {
          e.preventDefault();
          const x = Object.fromEntries(new FormData(e.currentTarget)) as Record<
            string,
            string
          >;
          save({
            ...article,
            ...x,
            tags: x.tags,
            sort: Number(x.sort),
          } as unknown as ManagedArticle);
        }}
      >
        <h2>{article.slug ? "Uredi članak" : "Novi članak"}</h2>
        <div className="form-grid">
          <label>
            Naslov
            <input name="title" defaultValue={article.title} required />
          </label>
          <label>
            URL identifikator
            <input
              name="slug"
              defaultValue={article.slug}
              required
              pattern="[a-z0-9-]+"
            />
          </label>
          <label>
            Kategorija
            <input name="category" defaultValue={article.category} required />
          </label>
          <label>
            Oznake (odvojene zarezom)
            <input
              name="tags"
              defaultValue={article.tags.join(", ")}
              placeholder="npr. ćurekot, crni kim"
            />
          </label>
          <label>
            Redoslijed
            <input
              name="sort"
              defaultValue={article.sort || 999}
              type="number"
              min="0"
              step="1"
            />
          </label>
          <label className="span-2">
            Kratak opis (za pregled i SEO)
            <textarea
              name="excerpt"
              defaultValue={article.excerpt}
              required
              rows={2}
            />
          </label>
          <label className="span-2">
            Naslovna slika
            <input
              type="file"
              accept="image/webp,image/jpeg,image/png"
              onChange={handleFile}
              disabled={uploading}
            />
            <input type="hidden" name="image" value={image} readOnly />
            {uploading && <small>Otpremanje…</small>}
            {uploadError && (
              <small className="error" style={{ display: "block" }}>
                {uploadError}
              </small>
            )}
            {image ? (
              <img
                src={productImageSrc(image)}
                alt=""
                style={{
                  width: 200,
                  height: 110,
                  objectFit: "cover",
                  borderRadius: 6,
                  marginTop: 8,
                }}
              />
            ) : (
              <small>Nije postavljena slika.</small>
            )}
          </label>
          <label className="span-2">
            Sadržaj članka
            <RichTextEditor name="bodyHtml" defaultValue={article.bodyHtml} />
          </label>
        </div>
        <button className="button" disabled={busy}>
          Sačuvaj članak
        </button>
        <button type="button" className="button outline" onClick={close}>
          Otkaži
        </button>
      </form>
    </>
  );
}
