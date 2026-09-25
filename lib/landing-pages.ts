export type LandingFaq = [question: string, answer: string];

export type LandingStep = { title: string; text: string };

export type LandingPageData = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  heroImage: string;
  heroAlt: string;
  intro: { heading: string; paragraphs: string[] }[];
  benefits: { heading: string; items: string[] };
  prep?: { heading: string; image: string; alt: string; paragraphs: string[] };
  steps?: { heading: string; items: LandingStep[] };
  productId: string;
  productCategoryLink?: { label: string; href: string };
  faq: LandingFaq[];
  disclaimer?: string;
};

export const landingPages: Record<string, LandingPageData> = {
  "sidr-za-kosu": {
    slug: "sidr-za-kosu",
    title: "Sidr za kosu – prirodna njega i tradicionalna upotreba",
    description:
      "Šta je sidr prah, zašto se tradicionalno koristi za njegu kose i kako ga pripremiti. Andalus sidr prah, dostupan u pakovanjima 100 g, 200 g i 400 g.",
    eyebrow: "PRIRODNA NJEGA",
    h1: "Sidr za kosu – prirodna njega i tradicionalna upotreba",
    subtitle:
      "Šta je sidr, zašto se dugo koristi u njezi kose i kako ga uklopiti u svoju rutinu – bez pretjeranih obećanja, uz jasne informacije.",
    heroImage: "andalus-sidr-prah.webp",
    heroAlt: "Andalus sidr prah u pakovanju, uz posudu prirodnog praha",
    intro: [
      {
        heading: "Šta je sidr?",
        paragraphs: [
          "Sidr (Ziziphus spina-christi), poznat i kao sidr drvo ili lotus drvo, je biljka s dugom tradicijom upotrebe u regijama Bliskog istoka i sjeverne Afrike. Njegovo lišće se suši i melje u fini prah koji se stoljećima koristi kao dio tradicionalne njege kose i vlasišta, često kao prirodna alternativa uobičajenim proizvodima za pranje kose.",
          "U Andalus ponudi sidr prah dolazi u pakovanjima od 100 g, 200 g i 400 g, mljeven od pažljivo odabranog lišća. Kao i kod svakog prirodnog proizvoda, iskustvo se razlikuje od osobe do osobe – zato preporučujemo da ga uvedete postepeno i pratite kako vam odgovara.",
          "Važno je razlikovati tradicionalnu upotrebu od medicinskih tvrdnji: sidr prah je kozmetički proizvod za njegu, a ne lijek. Za zdravstvena pitanja o koži ili vlasištu obratite se dermatologu.",
        ],
      },
    ],
    benefits: {
      heading: "Zašto se sidr koristi za njegu kose?",
      items: [
        "Tradicionalno se koristi za njegu kose vijekovima u više kultura.",
        "Pomaže u čišćenju vlasišta kao prirodna alternativa uobičajenim proizvodima.",
        "Pogodan je za uvođenje u prirodnu, jednostavnu rutinu njege kose.",
        "Jednostavan je za pripremu i korištenje kod kuće, bez posebne opreme.",
      ],
    },
    prep: {
      heading: "Kako pripremiti sidr za kosu?",
      image: "sidr-prah-priprema-za-kosu.webp",
      alt: "Sidr prah pripremljen za prirodnu njegu kose",
      paragraphs: [
        "Sidr prah se najčešće miješa s toplom vodom dok se ne dobije glatka, gusta pasta – slično pripremi prirodnog šampona. Količinu vode prilagodite dužini i gustoći kose. Pripremite svježu smjesu neposredno prije upotrebe, jer se prah najbolje koristi odmah nakon miješanja.",
      ],
    },
    steps: {
      heading: "Kako koristiti sidr",
      items: [
        {
          title: "Pripremite smjesu",
          text: "Pomiješajte sidr prah s toplom vodom u glatku pastu.",
        },
        {
          title: "Nanesite na vlažnu kosu",
          text: "Ravnomjerno rasporedite smjesu po vlasištu i kosi, nježno masirajući.",
        },
        {
          title: "Isperite temeljito",
          text: "Ostavite nekoliko minuta, a zatim dobro isperite mlakom vodom.",
        },
      ],
    },
    productId: "sidr-prah",
    productCategoryLink: {
      label: "Pogledaj sve veličine pakovanja",
      href: "/proizvodi?kategorija=Ulje%20sidra",
    },
    faq: [
      [
        "Koliko često se koristi sidr za kosu?",
        "Učestalost zavisi od vaše rutine njege i stanja kose. Mnogi ga koriste jednom do dva puta sedmično kao dio redovne njege vlasišta.",
      ],
      [
        "Kako se priprema sidr prah?",
        "Prah se obično pomiješa s toplom vodom dok se ne dobije glatka pasta, slično prirodnom šamponu. Tačan omjer zavisi od količine kose i ličnog iskustva.",
      ],
      [
        "Koliko dugo se drži na kosi?",
        "Uobičajeno se ostavlja nekoliko minuta na vlasištu i kosi prije ispiranja. Pratite vlastiti osjećaj i prekinite ako primijetite nadraženost.",
      ],
      [
        "Može li se sidr kombinovati s drugim proizvodima?",
        "Mnogi ga koriste samostalno kao prirodnu alternativu šamponu, a neki ga kombinuju s drugim sastojcima iz svoje rutine. Ako uvodite novu kombinaciju, testirajte je postepeno.",
      ],
      [
        "Da li sidr prah odgovara svim tipovima kose i vlasišta?",
        "Reakcija kože i vlasišta razlikuje se od osobe do osobe. Prije prve upotrebe preporučujemo kratak test na malom području, posebno ako imate osjetljivo vlasište.",
      ],
      [
        "Gdje kupiti sidr prah u BiH?",
        "Andalus sidr prah možete naručiti direktno putem našeg sajta, uz dostavu širom Bosne i Hercegovine i plaćanje pouzećem.",
      ],
    ],
  },
  "dvojna-terapija": {
    slug: "dvojna-terapija",
    title: "Dvojna terapija – ulje sidra i crnog kima u jednoj bočici",
    description:
      "Šta je Andalus Dvojna terapija, zašto spaja ulje sidra i ulje crnog kima u jednu bočicu i kako je uklopiti u rutinu njege kose. Pakovanje 250 ml.",
    eyebrow: "DVOJNA TERAPIJA",
    h1: "Dvojna terapija – ulje sidra i crnog kima u jednoj bočici",
    subtitle:
      "Dva prirodna ulja s dugom tradicijom upotrebe, spojena u jednu bočicu radi jednostavnije, praktičnije njege – bez pretjeranih obećanja, uz jasne informacije.",
    heroImage: "dvojna-terapija.webp",
    heroAlt: "Andalus Dvojna terapija, bočica od 250 ml",
    intro: [
      {
        heading: "Šta je Dvojna terapija?",
        paragraphs: [
          "Andalus Dvojna terapija je kombinacija ulja sidra i ulja crnog kima (ćurekota) u jednoj bočici od 250 ml. Umjesto da se dva ulja nabavljaju i doziraju posebno, Dvojna terapija ih spaja u jedan proizvod, radi jednostavnije upotrebe u svakodnevnoj rutini.",
          "Oba sastojka imaju dugu tradiciju upotrebe u njezi kose – ulje sidra se tradicionalno koristi za čišćenje i njegu vlasišta, dok se ulje crnog kima često dodaje u ulja i pripravke za kosu zbog svoje guste, karakteristične teksture. Kombinacija ne mijenja prirodu ulja, samo praktičnost korištenja.",
          "Kao i kod svakog prirodnog proizvoda, iskustvo se razlikuje od osobe do osobe. Dvojna terapija je kozmetički proizvod za njegu kose, a ne lijek – za zdravstvena pitanja o koži ili vlasištu obratite se dermatologu.",
        ],
      },
    ],
    benefits: {
      heading: "Zašto odabrati Dvojnu terapiju?",
      items: [
        "Spaja dva tradicionalna ulja u jednoj bočici, bez potrebe za posebnim doziranjem.",
        "Praktičnija za svakodnevnu rutinu od dva odvojena proizvoda.",
        "Pakovanje od 250 ml, dovoljno za duži period redovne upotrebe.",
        "Pogodna za uvođenje u jednostavnu, prirodnu njegu kose i vlasišta.",
      ],
    },
    prep: {
      heading: "Dva ulja, jedan proizvod",
      image: "sidra-detail.webp",
      alt: "Ulje sidra, jedan od dva sastojka Andalus Dvojne terapije",
      paragraphs: [
        "Ulje sidra u smjesi dolazi od istog sidr drveta (Ziziphus spina-christi) koje se tradicionalno koristi u njezi kose i vlasišta. U Dvojnoj terapiji je pomiješano s uljem crnog kima, tako da se u jednoj primjeni koriste oba sastojka odjednom.",
      ],
    },
    steps: {
      heading: "Kako koristiti Dvojnu terapiju",
      items: [
        {
          title: "Nanesite na vlasište i kosu",
          text: "Nekoliko kapi nježno utrljajte u vlasište i po dužini kose.",
        },
        {
          title: "Ostavite da djeluje",
          text: "Za dublju njegu ostavite ulje dovoljno dugo prije pranja, prema ličnom iskustvu.",
        },
        {
          title: "Koristite redovno",
          text: "Uklopite u rutinu njege kose onoliko često koliko vam odgovara.",
        },
      ],
    },
    productId: "dvojna-terapija",
    productCategoryLink: {
      label: "Pogledaj Dvojnu terapiju i pakete",
      href: "/proizvodi?kategorija=Dvojna%20terapija",
    },
    faq: [
      [
        "Šta tačno sadrži Dvojna terapija?",
        "Kombinaciju ulja sidra i ulja crnog kima (ćurekota) u jednoj bočici od 250 ml, namijenjenu njezi kose i vlasišta.",
      ],
      [
        "Da li Dvojna terapija zamjenjuje dva zasebna ulja?",
        "Sadrži oba sastojka u jednom proizvodu, tako da nema potrebe za posebnom nabavkom i doziranjem svakog ulja pojedinačno.",
      ],
      [
        "Kako se koristi Dvojna terapija?",
        "Nekoliko kapi nježno se utrlja u vlasište i kosu. Učestalost i količina zavise od ličnog iskustva i vrste kose.",
      ],
      [
        "Da li se Dvojna terapija ispire nakon nanošenja?",
        "Zavisi od lične rutine – neki je ostavljaju kraće prije pranja, drugi je koriste kao dio noćne njege. Pratite vlastiti osjećaj.",
      ],
      [
        "Da li Dvojna terapija odgovara svim tipovima kose i vlasišta?",
        "Reakcija se razlikuje od osobe do osobe. Prije prve upotrebe preporučujemo kratak test na malom području, posebno kod osjetljivog vlasišta.",
      ],
      [
        "Gdje kupiti Andalus Dvojnu terapiju u BiH?",
        "Dvojnu terapiju možete naručiti direktno putem našeg sajta, uz dostavu širom Bosne i Hercegovine i plaćanje pouzećem.",
      ],
    ],
  },
  "ulje-crnog-kima": {
    slug: "ulje-crnog-kima",
    title: "Ulje crnog kima – prirodno hladno cijeđeno ulje ćurekota",
    description:
      "Šta je ulje crnog kima (ćurekota), odakle dolazi i kako ga uklopiti u svakodnevnu rutinu. Andalus ulje crnog kima, hladno cijeđeno, u pakovanjima 100 ml, 250 ml i 500 ml.",
    eyebrow: "ĆUREKOT I ULJA",
    h1: "Ulje crnog kima – prirodno hladno cijeđeno ulje ćurekota",
    subtitle:
      "Šta je ulje crnog kima, odakle dolazi i kako ga uklopiti u svakodnevnu rutinu – jasne informacije bez pretjeranih obećanja.",
    heroImage: "andalus-ulje-crnog-kima.webp",
    heroAlt: "Andalus ulje crnog kima pored svježih sjemenki ćurekota",
    intro: [
      {
        heading: "Šta je ulje crnog kima?",
        paragraphs: [
          "Ulje crnog kima dobija se iz sjemena biljke Nigella sativa, poznate u regionu i kao ćurekot ili crni kim. Sjeme se hladno cijedi kako bi se sačuvala prirodna svojstva, a rezultat je tamno, gusto ulje karakteristične, blago pikantne arome.",
          "Naziv „crni kim“ ponekad se koristi i za druge biljke, pa je korisno provjeriti botanički naziv (Nigella sativa) na deklaraciji prije kupovine, posebno ako ste ranije koristili sličan proizvod pod drugim imenom.",
          "Andalus ulje crnog kima dolazi u tamnoj staklenoj bočici koja štiti sadržaj od svjetlosti, u pakovanjima od 100 ml, 250 ml i 500 ml.",
        ],
      },
    ],
    benefits: {
      heading: "Zašto odabrati Andalus ulje crnog kima?",
      items: [
        "Hladno cijeđeno, bez izlaganja visokoj temperaturi tokom prerade.",
        "Pakovano u tamnu staklenu bočicu koja usporava uticaj svjetlosti.",
        "Prirodan sastojak koji se jednostavno uklapa u svakodnevnu rutinu.",
        "Dostupno u tri veličine pakovanja, prema vašim potrebama.",
      ],
    },
    prep: {
      heading: "Od sjemena do ulja",
      image: "sjemenke-curekota-crni-kim.webp",
      alt: "Sjemenke ćurekota (crnog kima) pripremljene za hladno cijeđenje ulja",
      paragraphs: [
        "Sitno, tamno sjeme ćurekota ima izraženu aromu koja podsjeća na kombinaciju origana, luka i bibera. Hladnim cijeđenjem tog sjemena dobija se ulje koncentrisanijeg, jačeg okusa – zato se preporučuje da ga u ishranu uvodite postepeno, malim količinama.",
      ],
    },
    steps: {
      heading: "Kako koristiti ulje crnog kima",
      items: [
        {
          title: "Počnite malom količinom",
          text: "Prvi put probajte nekoliko kapi kako biste upoznali okus prije redovne upotrebe.",
        },
        {
          title: "Uklopite u obrok",
          text: "Dodajte ga salati, jogurtu ili drugom hladnom jelu – izlaganje visokoj temperaturi može uticati na kvalitet ulja.",
        },
        {
          title: "Čuvajte pravilno",
          text: "Bočicu dobro zatvorite i držite dalje od svjetlosti i izvora toplote nakon otvaranja.",
        },
      ],
    },
    productId: "curekot-250",
    productCategoryLink: {
      label: "Pogledaj sve veličine pakovanja",
      href: "/proizvodi?kategorija=Ćurekotovo%20ulje",
    },
    faq: [
      [
        "Koliko ulja crnog kima uzimati dnevno?",
        "Ne postoji univerzalna količina koja odgovara svima. Većina ga koristi u malim količinama, kapima, kao dodatak obroku, prilagođeno ličnom iskustvu.",
      ],
      [
        "Da li ulje crnog kima liječi bolesti?",
        "Ne. Ulje crnog kima je prirodna namirnica, a ne lijek. Za zdravstvena pitanja i terapiju obratite se ljekaru ili farmaceutu.",
      ],
      [
        "Kako se čuva ulje nakon otvaranja?",
        "Bočicu držite dobro zatvorenu, dalje od direktnog sunca i izvora toplote, i koristite u preporučenom roku nakon otvaranja.",
      ],
      [
        "Koja je razlika između ulja i sjemena ćurekota?",
        "Sjeme je čvrsto i koristi se kao začin, dok je ulje tečno, dobijeno hladnim cijeđenjem sjemena, i ima koncentrisaniji okus.",
      ],
      [
        "Da li se ulje crnog kima smije koristiti uz lijekove?",
        "Ako redovno uzimate lijekove, imate hronično oboljenje ili ste trudni/dojite, prije uvođenja bilo kojeg biljnog proizvoda posavjetujte se s ljekarom ili farmaceutom.",
      ],
      [
        "Gdje kupiti ulje crnog kima u BiH?",
        "Andalus ulje crnog kima možete naručiti direktno putem našeg sajta, uz dostavu širom Bosne i Hercegovine i plaćanje pouzećem.",
      ],
    ],
  },
};
