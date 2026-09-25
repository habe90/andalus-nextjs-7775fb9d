import Link from "next/link";
import { Check, ArrowRight, Leaf } from "./store";
import { ProductCard } from "./store";
import type { Product } from "../lib/catalog";
import type { LandingPageData } from "../lib/landing-pages";

export function LandingPage({
  data,
  product,
}: {
  data: LandingPageData;
  product?: Product;
}) {
  return (
    <>
      <section
        className="landing-hero"
        style={
          {
            "--landing-bg": `url('/assets/${data.heroImage}')`,
          } as React.CSSProperties
        }
      >
        <div className="container">
          <div>
            <p className="eyebrow">
              <Leaf size={14} /> {data.eyebrow}
            </p>
            <h1>{data.h1}</h1>
            <p>{data.subtitle}</p>
            {product && (
              <Link className="button" href="#proizvod">
                Pogledaj proizvod <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="container section landing-section">
        {data.intro.map((section) => (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ))}

        <h2>{data.benefits.heading}</h2>
        <ul className="landing-list">
          {data.benefits.items.map((item) => (
            <li key={item}>
              <Check size={18} />
              {item}
            </li>
          ))}
        </ul>

        {data.prep && (
          <>
            <h2>{data.prep.heading}</h2>
            <img
              className="landing-image"
              src={`/assets/${data.prep.image}`}
              alt={data.prep.alt}
              loading="lazy"
            />
            {data.prep.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </>
        )}

        {data.steps && (
          <>
            <h2>{data.steps.heading}</h2>
            <div className="landing-steps">
              {data.steps.items.map((step, i) => (
                <div className="landing-step" key={step.title}>
                  <span>{i + 1}</span>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {product && (
          <>
            <h2 id="proizvod">Andalus {product.name.toLowerCase()}</h2>
            <div className="landing-product">
              <ProductCard product={product} />
            </div>
            {data.productCategoryLink && (
              <p>
                <Link className="text-link" href={data.productCategoryLink.href}>
                  {data.productCategoryLink.label} <ArrowRight size={15} />
                </Link>
              </p>
            )}
          </>
        )}

        <h2>Često postavljana pitanja</h2>
        <div className="faq">
          {data.faq.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <p className="muted small" style={{ marginTop: 20 }}>
          {data.disclaimer ||
            "Informacije su edukativne i ne zamjenjuju pregled, dijagnozu ni savjet ljekara ili dermatologa."}
        </p>
      </div>
    </>
  );
}
