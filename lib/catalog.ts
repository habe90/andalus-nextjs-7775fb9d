export const categories = [
  "Ćurekotovo ulje",
  "Ulje sidra",
  "Dvojna terapija",
  "Kozmetika",
  "Setovi",
  "Muška linija",
];
export type Product = {
  id: string;
  name: string;
  size: string;
  price: number;
  category: string;
  badge: string;
  image: string;
  description: string;
  usage?: string;
  composition?: string;
};
export const products: Product[] = [
  {
    id: "legacy",
    name: "Andalus Legacy Beard Growth Serum",
    size: "30 ml",
    price: 35,
    category: "Muška linija",
    badge: "Novo",
    image: "legacy",
    description: "Serum za njegu brade iz Andalus Legacy kolekcije.",
  },
  {
    id: "curekot-100",
    name: "Ćurekotovo ulje",
    size: "100 ml",
    price: 0,
    category: "Ćurekotovo ulje",
    badge: "Novo",
    image: "curekot-250",
    description:
      "Hladno cijeđeno ćurekotovo ulje u pakovanju od 100 ml. Javite nam se za cijenu i dostupnost.",
  },
  {
    id: "curekot-250",
    name: "Ćurekotovo ulje",
    size: "250 ml",
    price: 22,
    category: "Ćurekotovo ulje",
    badge: "Popularno",
    image: "curekot-250",
    description: "Hladno cijeđeno ćurekotovo ulje u pakovanju od 250 ml.",
  },
  {
    id: "curekot-500",
    name: "Ćurekotovo ulje hladno cijeđeno",
    size: "500 ml",
    price: 40,
    category: "Ćurekotovo ulje",
    badge: "Ušteda",
    image: "curekot-500",
    description: "Hladno cijeđeno ćurekotovo ulje u pakovanju od 500 ml.",
  },
  {
    id: "dvojna-terapija-set",
    name: "Dvojna terapija paket + Ćurekotovo ulje",
    size: "Paket",
    price: 150,
    category: "Setovi",
    badge: "Paket",
    image: "dvojna-terapija-set",
    description: "Andalus paket Dvojna terapija uz ćurekotovo ulje.",
  },
  {
    id: "dvojna-terapija",
    name: "Dvojna terapija",
    size: "250 ml",
    price: 30,
    category: "Dvojna terapija",
    badge: "Popularno",
    image: "dvojna-terapija",
    description: "Andalus Dvojna terapija u pakovanju od 250 ml.",
  },
  {
    id: "balzam",
    name: "Prirodni balzam",
    size: "Balzam za bolove i masažu",
    price: 15,
    category: "Kozmetika",
    badge: "Prodaja",
    image: "balzam",
    description: "Prirodni Andalus balzam za bolove i masažu.",
  },
  {
    id: "sidra",
    name: "Ulje sidra",
    size: "100 ml",
    price: 0,
    category: "Ulje sidra",
    badge: "Novo",
    image: "sidra",
    description:
      "Andalus ulje sidra u pakovanju od 100 ml. Javite nam se za cijenu i dostupnost.",
  },
  {
    id: "sidr-prah-100",
    name: "Sidr prah",
    size: "100 g",
    price: 15,
    category: "Ulje sidra",
    badge: "Novo",
    image: "andalus-sidr-prah",
    description:
      "Mljeveni prah od lišća sidr drveta (Ziziphus), s dugom tradicijom upotrebe u njezi kose. Pakovanje od 100 g.",
  },
  {
    id: "sidr-prah",
    name: "Sidr prah",
    size: "200 g",
    price: 28,
    category: "Ulje sidra",
    badge: "Popularno",
    image: "andalus-sidr-prah",
    description:
      "Mljeveni prah od lišća sidr drveta (Ziziphus), s dugom tradicijom upotrebe u njezi kose. Pakovanje od 200 g.",
  },
  {
    id: "sidr-prah-400",
    name: "Sidr prah",
    size: "400 g",
    price: 52,
    category: "Ulje sidra",
    badge: "Ušteda",
    image: "andalus-sidr-prah",
    description:
      "Mljeveni prah od lišća sidr drveta (Ziziphus), s dugom tradicijom upotrebe u njezi kose. Pakovanje od 400 g.",
  },
];
export const money = (n: number) =>
  n === 0 ? "Cijena na upit" : n.toFixed(2).replace(".", ",") + " KM";
export const productImageSrc = (image: string) =>
  image.startsWith("up_") ? `/api/product-image/${image}` : `/assets/${image}.webp`;
/*
export const articles = [
  {
    slug: "upoznajte-crni-kim",
    title: "Upoznajte ulje crnog kima",
    category: "Prirodni savjeti",
    image: "seeds",
    excerpt:
      "Od sitnog sjemena do vaše svakodnevne rutine. Upoznajte prirodni sastojak s dugom tradicijom.",
    body: [
      "Crni kim, poznat i kao ćurekot, prepoznatljiv je po sitnim crnim sjemenkama i karakterističnoj aromi. U Andalus kolekciji možete ga pronaći kao ulje i u prahu.",
      "Pri odabiru ulja obratite pažnju na deklaraciju, način čuvanja i rok upotrebe. Proizvod čuvajte prema uputama na ambalaži, zaštićen od toplote i direktnog sunca.",
      "Za način i količinu upotrebe slijedite deklaraciju konkretnog proizvoda. Za pitanja o upotrebi uz terapiju obratite se ljekaru ili farmaceutu.",
    ],
  },
  {
    slug: "prirodna-svakodnevica",
    title: "Prirodni sastojci u svakodnevici",
    category: "Prehrana",
    image: "honey",
    excerpt:
      "Male, pažljivo odabrane navike i mjesto za prirodne sastojke u vašem danu.",
    body: [
      "Prirodni sastojci dio su mnogih porodičnih tradicija. Njihova vrijednost počinje pažljivim odabirom i promišljenom upotrebom.",
      "Pratite deklaraciju i sastav, posebno ako imate alergije. Raznovrsna prehrana, odmor i kretanje ostaju temelj svakodnevne brige o sebi.",
    ],
  },
  {
    slug: "prica-o-curekotu",
    title: "Ćurekot: mali cvijet, duga tradicija",
    category: "Prirodni savjeti",
    image: "flower",
    excerpt:
      "Upoznajte biljku koja stoji iza sitnog crnog sjemena i naše inspiracije.",
    body: [
      "Nježni cvjetovi i sitno crno sjeme čine ćurekot lako prepoznatljivim. Ova biljka nadahnjuje našu kolekciju i vizuelni identitet.",
      "Upoznajte različite oblike u ponudi i odaberite proizvod prema svojoj rutini. Detalje o sastavu i načinu upotrebe uvijek potražite na deklaraciji proizvoda.",
    ],
  },
];
*/
export {
  articles,
  articleCategories,
  allArticleTags,
  taxonomySlug,
} from "./articles";
