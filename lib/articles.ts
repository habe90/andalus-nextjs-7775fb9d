export type Article = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  excerpt: string;
  sections: { heading: string; text: string[] }[];
  sources?: { label: string; url: string }[];
};

const article = (
  slug: string,
  title: string,
  category: string,
  tags: string[],
  image: string,
  excerpt: string,
  sections: { heading: string; text: string[] }[],
  sources?: { label: string; url: string }[],
): Article => ({
  slug,
  title,
  category,
  tags,
  image,
  excerpt,
  sections,
  sources,
});

export const articleCategories = [
  "Ćurekot i ulja",
  "Njega i masaža",
  "Hidžama i tradicija",
  "Prehrana i navike",
  "Kvalitet i kupovina",
];

export const articles: Article[] = [
  article(
    "sta-je-curekot",
    "Šta je ćurekot i kako prepoznati Nigella sativa",
    "Ćurekot i ulja",
    ["ćurekot", "crni kim", "Nigella sativa"],
    "seeds",
    "Kratak vodič kroz naziv, aromu i mjesto ćurekota u svakodnevnoj kuhinji.",
    [
      {
        heading: "Nazivi koji se često miješaju",
        text: [
          "Ćurekot se u literaturi često navodi kao Nigella sativa, a u svakodnevnom govoru i kao crni kim ili black seed. Nazivi nisu uvijek jednako precizni, zato je korisno provjeriti botanički naziv na deklaraciji prije nego što proizvod uporedite s onim što ste ranije koristili.",
          "Zabuna dodatno nastaje jer se ime „crni kim“ ponekad koristi i za sasvim druge biljke iz drugih porodica, koje nemaju isti sastav ni aromu. Kad kupujete sjeme, ulje ili prah, botanički naziv na deklaraciji je pouzdaniji putokaz od samog imena na etiketi.",
        ],
      },
      {
        heading: "Kako izgleda i miriše",
        text: [
          "Sjeme ćurekota je sitno, tamno i blago hrapavo na dodir, s aromom koja podsjeća na kombinaciju origana, luka i bibera. Ta karakteristična gorkasto-pikantna nota je razlog zašto se dugo koristi kao začin u hljebu, pecivima i namazima na Balkanu i šire.",
          "Ulje ima izraženiji, koncentrisaniji okus od sjemena, pa mnogi koji ga prvi put probaju kažu da je „jače“ nego što su očekivali. Zbog toga se često preporučuje da se u ishranu uvodi postepeno, malim količinama, dok ne upoznate kako vam odgovara.",
        ],
      },
      {
        heading: "Sjeme, prah ili ulje",
        text: [
          "U Andalus ponudi ćurekot dolazi u obliku hladno cijeđenog ulja i mljevenog praha, a svaki oblik ima svoju uobičajenu namjenu: prah se lakše dozira u jelima i napitcima, dok se ulje koristi kapima ili kao dodatak gotovim obrocima.",
          "Oblik koji odaberete zavisi od toga kako namjeravate da ga koristite u svakodnevnoj rutini, ali princip ostaje isti: manje količine na početku, praćenje kako se osjećate i strpljenje umjesto očekivanja brzih promjena.",
        ],
      },
      {
        heading: "Počnite od deklaracije",
        text: [
          "Pogledajte sastav, rok upotrebe, način čuvanja i preporuku proizvođača prije prve upotrebe. Prirodni proizvod nije zamjena za propisanu terapiju, a deklaracija je jedini pouzdan izvor informacija o konkretnom pakovanju koje ste kupili.",
          "Ako niste sigurni da li vam ćurekot odgovara uz lijekove koje uzimate ili zdravstveno stanje koje imate, to je pitanje za ljekara ili farmaceuta, a ne za marketinški tekst na internetu.",
        ],
      },
    ],
  ),
  article(
    "kako-cuvati-hladno-cijedeno-ulje",
    "Kako čuvati hladno cijeđeno ulje",
    "Ćurekot i ulja",
    ["hladno cijeđeno", "čuvanje ulja", "ćurekot"],
    "curekot-500",
    "Svjetlost, toplota i zrak utiču na kvalitet ulja nakon otvaranja.",
    [
      {
        heading: "Zaštitite ulje od svjetlosti",
        text: [
          "Bočicu držite dobro zatvorenu i dalje od direktnog sunca i izvora toplote, poput šporeta, radijatora ili prozorske daske. Svjetlost i toplota ubrzavaju promjene u sastavu ulja, pa čak i kratko izlaganje tokom ljetnih mjeseci može uticati na miris i okus.",
          "Tamna staklena ambalaža, u kojoj se hladno cijeđena ulja najčešće i prodaju, dodatno usporava taj proces, ali nije zamjena za pravilno čuvanje nakon otvaranja. Najbolje mjesto je zatvoren ormarić, po mogućnosti dalje od kuhinjskog aparata koji se zagrijava.",
        ],
      },
      {
        heading: "Zrak i vlaga su tihi neprijatelji",
        text: [
          "Svaki put kad otvorite bočicu, u nju uđe malo zraka, a kiseonik postepeno mijenja sastav ulja. Zato je korisno zatvarati poklopac odmah nakon upotrebe i izbjegavati ostavljanje bočice otvorene duže vrijeme.",
          "Ako primijetite kondenzaciju unutar poklopca ili promjenu boje na vrhu tečnosti, to je znak da je vrijeme za pažljiviju provjeru prije nastavka korištenja.",
        ],
      },
      {
        heading: "Frižider ili ormarić",
        text: [
          "Neka ulja se u frižideru zgusnu ili postanu mutna, što ne mora značiti da su neupotrebljiva, ali može otežati doziranje. Ako proizvođač ne navodi drugačije, sobna temperatura u zatvorenom, tamnom prostoru obično je dovoljna za pakovanje koje trošite u razumnom roku.",
          "Kod većih pakovanja koja planirate koristiti duže vrijeme, dio količine možete presuti u manju bočicu za svakodnevnu upotrebu, a ostatak čuvati zatvoren i dalje od svjetlosti dok vam ne zatreba.",
        ],
      },
      {
        heading: "Pratite rok i miris",
        text: [
          "Koristite ulje u preporučenom roku nakon otvaranja, koji je obično naveden na etiketi ili u pratećoj dokumentaciji proizvoda. Rok prije otvaranja i rok nakon otvaranja nisu isto, pa je korisno zapisati datum kad ste bočicu prvi put otvorili.",
          "Ako primijetite neuobičajen miris, okus, boju ili izgled, poput taloga koji ranije nije bio prisutan, nemojte koristiti proizvod prije provjere s proizvođačem. Bolje je postaviti pitanje nego riskirati sa proizvodom u koji niste sigurni.",
        ],
      },
    ],
  ),
  article(
    "ulje-crnog-kima-u-ishrani",
    "Ulje crnog kima u ishrani: okus prije velikih obećanja",
    "Ćurekot i ulja",
    ["crni kim", "ishrana", "ulje"],
    "curekot-250",
    "Kako pristupiti ulju kao namirnici, uz realna očekivanja i pažnju prema vlastitom zdravlju.",
    [
      {
        heading: "Namirnica i rutina",
        text: [
          "Ulje crnog kima može biti dio prehrambene rutine ako vam odgovara okus i ako ga koristite prema deklaraciji. Nema univerzalne količine koja odgovara svima, jer se tjelesna reakcija, navike u ishrani i osjetljivost razlikuju od osobe do osobe.",
          "Mnogi ga uvode kapima uz jutarnji obrok ili kao dodatak salati, dok drugi radije koriste prah pomiješan s medom ili vodom. Bez obzira na način, ideja je da ulje dopunjuje već raznovrsnu ishranu, a ne da bude njena zamjena.",
        ],
      },
      {
        heading: "Okus prije svega",
        text: [
          "Prije nego što razmišljate o dugoročnoj rutini, vrijedi jednostavno probati mali dio i vidjeti da li vam okus odgovara. Ulje ima izraženu, pomalo ljutkastu notu koja nekima odmah prijatna, dok je drugima potrebno vrijeme da se naviknu.",
          "Ako vam okus previše smeta, kombinovanje s medom, jogurtom ili toplim napitkom može ga učiniti prihvatljivijim, ali to je stvar ličnog ukusa, a ne pravilo koje treba slijediti.",
        ],
      },
      {
        heading: "Kada pitati stručnjaka",
        text: [
          "Ako ste trudni, dojite, imate hroničnu bolest ili koristite lijekove, prije redovne upotrebe dodataka i biljnih proizvoda razgovarajte s ljekarom ili farmaceutom. Neki sastojci mogu imati interakciju s lijekovima ili nisu preporučeni u određenim životnim fazama.",
          "Isto vrijedi i za djecu, kod kojih doziranje i primjena prirodnih proizvoda zahtijevaju poseban oprez i, po potrebi, konsultaciju s pedijatrom.",
        ],
      },
    ],
    [
      {
        label: "LactMed: Black Seed",
        url: "https://www.ncbi.nlm.nih.gov/books/NBK501876/",
      },
    ],
  ),
  article(
    "predaja-o-curekotu",
    "Predaja o ćurekotu: značenje bez pretjerivanja",
    "Ćurekot i ulja",
    ["hadis", "ćurekot", "sunnetska medicina"],
    "hero-kim",
    "Vjerodostojna predaja o crnom sjemenu i odgovoran način njenog razumijevanja.",
    [
      {
        heading: "Vjerodostojan tekst",
        text: [
          "U Sahihu al-Buhariji i Sahihu Muslimu prenosi se predaja o crnom sjemenu i lijeku, uz izuzetak smrti. To je vjerski tekst kojem se pristupa s poštovanjem i znanjem, a ne kao marketinškoj poruci prilagođenoj prodaji proizvoda.",
          "Predaja se prenosi vijekovima i dio je šireg korpusa hadisa o ishrani i njezi tijela u ranoj islamskoj tradiciji. Njeno razumijevanje zahtijeva kontekst, a ne izdvajanje jedne rečenice iz cjeline.",
        ],
      },
      {
        heading: "Šta kažu učenjaci",
        text: [
          "Klasični i savremeni komentatori hadisa slažu se da riječ „lijek“ u ovom kontekstu ne znači da crno sjeme liječi svaku bolest niti da isključuje potrebu za drugim vidovima liječenja. Tumačenja se razlikuju u detaljima, ali dijele oprez prema doslovnom i pretjeranom čitanju.",
          "Neki učenjaci naglašavaju da se predaja odnosi na opću korist sjemena kao dio zdrave ishave, slično drugim namirnicama koje su spominjane u tradiciji, a ne na zamjenu za medicinsku njegu.",
        ],
      },
      {
        heading: "Ne praviti medicinske garancije",
        text: [
          "Učenjaci koji tumače predaju naglašavaju da liječenje ima svoje okolnosti, pravilnu primjenu i Allahovu odredbu. Iz toga ne slijedi da proizvod obećava izliječenje određene bolesti niti da treba prekidati liječenje propisano od strane ljekara.",
          "Odgovoran pristup znači cijeniti tradiciju i istovremeno se osloniti na savremenu medicinu kad je riječ o dijagnozi, terapiji i praćenju zdravstvenog stanja.",
        ],
      },
    ],
    [
      {
        label: "Sahih al-Bukhari 5688",
        url: "https://sunnah.com/bukhari:5688",
      },
      {
        label: "IslamQA: objašnjenje predaje",
        url: "https://islamqa.info/en/answers/154257",
      },
    ],
  ),
  article(
    "curekot-i-lijekovi",
    "Ćurekot i lijekovi: zašto je savjet stručnjaka važan",
    "Ćurekot i ulja",
    ["sigurnost", "lijekovi", "ćurekot"],
    "seeds",
    "Biljni proizvodi mogu biti dio rutine, ali terapiju uvijek vodi zdravstveni stručnjak.",
    [
      {
        heading: "Recite šta koristite",
        text: [
          "Pri pregledu ili u apoteci navedite sve suplemente, čajeve i ulja koje redovno uzimate, uključujući i one koji vam djeluju bezazleno jer su „prirodni“. To pomaže stručnjaku da procijeni vašu individualnu situaciju i eventualne interakcije.",
          "Mnogi pacijenti zaborave spomenuti biljne proizvode jer ih ne doživljavaju kao „lijek“, a upravo ta informacija ljekaru može biti ključna za tumačenje simptoma ili nalaza.",
        ],
      },
      {
        heading: "Zašto interakcije nisu uvijek očigledne",
        text: [
          "Biljni sastojci mogu uticati na to kako organizam metabolizira određene lijekove, čak i kad se to ne osjeti odmah. To posebno vrijedi za osobe koje redovno uzimaju terapiju za hronične bolesti.",
          "Umjesto da sami procjenjujete rizik na osnovu onoga što ste pročitali na internetu, konkretno pitanje farmaceutu o vašoj kombinaciji lijekova i dodataka daje pouzdaniji odgovor.",
        ],
      },
      {
        heading: "Poseban oprez",
        text: [
          "Ne uvodite dodatke na svoju ruku kao zamjenu za terapiju, posebno ne uz prekid propisanih lijekova. Ako se pojavi nelagoda ili alergijska reakcija, prekinite upotrebu i potražite savjet.",
          "Kod hroničnih stanja, trudnoće, dojenja ili planiranih operacija, unaprijed razgovarajte sa svojim ljekarom o tome da li i kako nastaviti s biljnim proizvodima u tom periodu.",
        ],
      },
    ],
  ),
  article(
    "curekot-kao-zacin",
    "Ćurekot kao začin: ideje za kuhinju",
    "Ćurekot i ulja",
    ["recept", "začin", "ćurekot"],
    "seeds",
    "Jednostavne ideje za korištenje sjemena u kuhinji, bez zdravstvenih obećanja.",
    [
      {
        heading: "Aroma u malim količinama",
        text: [
          "Sjeme se može koristiti kao začin na pecivu, salati ili u namazima, kada recept to traži. Počnite malom količinom da upoznate njegov okus, jer je aroma izražena i lako može preovladati nad drugim sastojcima jela.",
          "Tradicionalno se posipa po vrhu peciva prije pečenja, čime dobija blago hrskavu teksturu i karakterističan miris koji se širi tokom pečenja.",
        ],
      },
      {
        heading: "Kombinacije koje se dobro slažu",
        text: [
          "Ćurekot se prirodno slaže sa slanim tijestima, jogurtom, sirevima i povrćem poput tikvica ili patlidžana. U mnogim kuhinjama regiona koristi se i u kombinaciji s medom kao jednostavan namaz za doručak.",
          "Ako eksperimentišete prvi put, dodajte ga na kraju pripreme jela kako biste sačuvali aromu, umjesto da ga dugo izlažete visokoj temperaturi tokom kuvanja.",
        ],
      },
      {
        heading: "Kombinujte promišljeno",
        text: [
          "Uravnotežen obrok ne zavisi od jednog sastojka. Povrće, proteini, vlakna i dovoljno tečnosti ostaju važni dijelovi prehrane, a začin poput ćurekota samo dopunjuje ukupnu sliku obroka.",
          "Ne postoji potreba da ga koristite u svakom jelu ili u velikim količinama da bi „djelovao“ — umjerena, redovna upotreba kao dio raznovrsne kuhinje je sasvim dovoljna.",
        ],
      },
    ],
  ),
  article(
    "razlika-sjeme-i-ulje",
    "Ćurekot: razlika između sjemena i ulja",
    "Ćurekot i ulja",
    ["sjeme", "ulje", "ćurekot"],
    "curekot",
    "Dva oblika iste biljke, različite arome i različita mjesta u rutini.",
    [
      {
        heading: "Tekstura i okus",
        text: [
          "Sjeme je čvrsto i najčešće se koristi kao začin, dok je ulje tečno i koncentrisanijeg okusa. Deklaracija proizvoda govori vam koji oblik držite u ruci, a razlika u konzistenciji odmah je vidljiva pri otvaranju pakovanja.",
          "Prah nastao mljevenjem sjemena zauzima neku sredinu — zadržava dio teksture sjemena, ali se lakše miješa u tečnosti i namaze nego cijelo sjeme.",
        ],
      },
      {
        heading: "Postupak dobijanja",
        text: [
          "Ulje se dobija hladnim cijeđenjem sjemena, procesom koji nastoji sačuvati prirodna svojstva bez izlaganja visokoj temperaturi. Sjeme, s druge strane, ne prolazi kroz taj postupak i zadržava svoj izvorni oblik.",
          "Ovaj postupak proizvodnje razlog je zašto se ulje obično prodaje u manjim, tamnim bočicama — proces cijeđenja daje manju količinu tečnosti u odnosu na količinu upotrijebljenog sjemena.",
        ],
      },
      {
        heading: "Birajte prema namjeni",
        text: [
          "Za kuhinju ili njegu uvijek pročitajte namjenu navedenu na ambalaži. Ne pretpostavljajte da je svaki proizvod predviđen za istu upotrebu — neki oblici su namijenjeni isključivo ishrani, dok se drugi koriste i u kozmetičke svrhe.",
          "Ako niste sigurni koji oblik vam više odgovara za ono što planirate, jednostavnije je početi s manjim pakovanjem jednog oblika i procijeniti kako vam odgovara prije nego što kupite veću količinu.",
        ],
      },
    ],
  ),
  article(
    "kako-citati-deklaraciju-ulja",
    "Kako čitati deklaraciju ulja prije kupovine",
    "Ćurekot i ulja",
    ["deklaracija", "kvalitet", "ulje"],
    "curekot-250",
    "Četiri stavke koje vrijedi provjeriti prije nego što proizvod stavite u korpu.",
    [
      {
        heading: "Sastav i pakovanje",
        text: [
          "Provjerite puni naziv sastojka, neto količinu i upozorenja. Tamna i dobro zatvorena ambalaža može pomoći zaštiti proizvoda od svjetlosti, što je posebno važno kod hladno cijeđenih ulja osjetljivih na oksidaciju.",
          "Ako je proizvod mješavina više sastojaka, deklaracija bi trebalo da navede sve komponente po redoslijedu zastupljenosti, a ne samo naziv glavnog sastojka istaknut na prednjoj strani etikete.",
        ],
      },
      {
        heading: "Način proizvodnje",
        text: [
          "Termini poput „hladno cijeđeno“ ili „nerafinisano“ govore o postupku proizvodnje, ali ne zamjenjuju konkretne podatke o porijeklu i uslovima čuvanja. Ako vam je ovaj podatak važan, ne ustručavajte se pitati prodavca direktno.",
          "Transparentan proizvođač obično bez problema odgovara na pitanja o postupku proizvodnje, dok nejasni ili izbjegavajući odgovori mogu biti signal da provjerite i druge izvore prije kupovine.",
        ],
      },
      {
        heading: "Rok i kontakt",
        text: [
          "Pogledajte rok upotrebe i kontakt proizvođača. Ako vam nedostaje podatak o načinu korištenja, pitajte prije kupovine umjesto da se oslanjate na pretpostavke ili savjete s foruma.",
          "Ozbiljan prodavac će vam dati jasan odgovor o roku, uslovima čuvanja i preporučenom načinu upotrebe — ako tih informacija nema ni na upit, to je razlog za dodatan oprez.",
        ],
      },
      {
        heading: "Cijena kao pokazatelj",
        text: [
          "Neuobičajeno niska cijena u odnosu na slične proizvode na tržištu ponekad znači kompromis u kvalitetu sirovine, pakovanju ili postupku proizvodnje. To ne mora uvijek biti tako, ali vrijedi biti oprezan.",
          "Umjesto da birate isključivo prema cijeni, uporedite dostupne informacije o sastavu, količini i uslovima čuvanja između nekoliko proizvoda prije nego što donesete odluku.",
        ],
      },
    ],
  ),
  article(
    "balzam-za-masazu",
    "Balzam za masažu: kako napraviti ugodan ritual",
    "Njega i masaža",
    ["balzam", "masaža", "njega tijela"],
    "balzam",
    "Praktični koraci za ugodnu kućnu masažu i njegu kože.",
    [
      {
        heading: "Priprema",
        text: [
          "Operite ruke i nanesite malu količinu na čistu, neoštećenu kožu. Najprije napravite probu na malom dijelu kože, posebno ako imate osjetljivu kožu ili ranije niste koristili sličan proizvod.",
          "Idealno vrijeme za masažu je kad niste u žurbi — nekoliko minuta mira, bez ometanja, čini veću razliku u iskustvu nego sam proizvod koji koristite.",
        ],
      },
      {
        heading: "Postavljanje prostora",
        text: [
          "Ugodna temperatura prostorije, meki ručnik i mirno okruženje pomažu da se opustite prije nego što uopće počnete s masažom. Balzam zagrijan u dlanovima lakše se raspoređuje po koži nego direktno iz hladne bočice.",
          "Ako masirate drugu osobu, pitajte za povratnu informaciju o pritisku tokom cijelog procesa — ono što je jednoj osobi ugodno, drugoj može biti prejako.",
        ],
      },
      {
        heading: "Nježni pokreti",
        text: [
          "Masaža treba biti ugodna i bez jakog pritiska. Kružni pokreti dlanovima, počevši od šireg područja prema mjestima gdje osjećate napetost, obično daju bolji rezultat od koncentrisanog pritiska na jednu tačku.",
          "Nemojte nanositi balzam na rane, nadraženu kožu, oči ili sluznicu. Ako osjetite peckanje ili neugodnost tokom masaže, isperite područje i prekinite upotrebu.",
        ],
      },
      {
        heading: "Poslije masaže",
        text: [
          "Ostavite proizvod da se upije prije oblačenja kako biste izbjegli mrlje na odjeći. Popijte čašu vode i odvojite još nekoliko minuta mira prije nego što se vratite svakodnevnim obavezama.",
          "Redovnost je važnija od intenziteta — kratka, ali dosljedna rutina masaže nekoliko puta sedmično obično donosi veći osjećaj ugode nego rijetka, ali duga sesija.",
        ],
      },
    ],
  ),
  article(
    "balzam-i-osjetljiva-koza",
    "Balzam i osjetljiva koža: test prije prve upotrebe",
    "Njega i masaža",
    ["osjetljiva koža", "balzam", "patch test"],
    "balzam",
    "Mali test na koži može vam pomoći da oprezno uvedete novi kozmetički proizvod.",
    [
      {
        heading: "Zašto test ima smisla",
        text: [
          "Koža svake osobe reaguje drugačije na nove sastojke, čak i kad je riječ o proizvodima s prirodnim sastojcima. Test na malom području kože prije prve pune upotrebe pomaže da izbjegnete neugodno iskustvo na većoj površini tijela.",
          "Ovaj korak je posebno koristan ako imate poznatu osjetljivu kožu, ekcem ili ste ranije imali reakciju na kozmetičke proizvode, čak i kad su bili opisani kao blagi ili prirodni.",
        ],
      },
      {
        heading: "Testirajte na malom području",
        text: [
          "Nanesite malu količinu prema uputi proizvođača na ograničenu površinu kože, poput unutrašnje strane podlaktice, i pratite reakciju tokom 24 do 48 sati. Ako se pojave crvenilo, peckanje ili osip, prekinite korištenje.",
          "Izbjegavajte testiranje na licu ili osjetljivim područjima prije nego što ste provjerili reakciju na manje vidljivom dijelu tijela.",
        ],
      },
      {
        heading: "Šta znače različiti znakovi",
        text: [
          "Blago crvenilo koje brzo nestane obično nije razlog za brigu, dok trajno crvenilo, otok, mjehurići ili jak svrab zahtijevaju da odmah isperete područje i prekinete upotrebu proizvoda.",
          "Ako niste sigurni kako protumačiti reakciju, bolje je biti oprezan i posavjetovati se sa farmaceutom ili dermatologom nego nastaviti s upotrebom „da vidite hoće li proći“.",
        ],
      },
      {
        heading: "Kad potražiti pomoć",
        text: [
          "Kod jače reakcije, otoka lica ili disajnih poteškoća, riječ je o hitnoj situaciji koja zahtijeva medicinsku procjenu bez odgađanja. Kozmetički proizvod ne služi za liječenje kožnih oboljenja niti zamjenjuje dermatološki pregled.",
          "Ako sumnjate na alergiju, ponesite pakovanje proizvoda sa sobom kod ljekara — podatak o sastavu može olakšati procjenu uzroka reakcije.",
        ],
      },
    ],
  ),
  article(
    "masaža-nakon-aktivnosti",
    "Masaža nakon aktivnosti: vrijeme za smirivanje",
    "Njega i masaža",
    ["masaža", "oporavak", "rutina"],
    "nature",
    "Nježna njega može biti dio odmora nakon svakodnevnog kretanja.",
    [
      {
        heading: "Krenite polako",
        text: [
          "Nakon aktivnosti odvojite vrijeme za vodu, lagano istezanje ako vam odgovara i odmor. Balzam može doprinijeti osjećaju ugode pri masaži, ali nije zamjena za pregled kod povrede ili ozbiljnijeg bola.",
          "Prvih nekoliko minuta nakon fizičke aktivnosti tijelo je još „zagrijano“, pa je to dobar trenutak za lagano istezanje prije nego što pređete na mirniju masažu.",
        ],
      },
      {
        heading: "Fokusirajte se na napete zone",
        text: [
          "Ramena, listovi i donji dio leđa su područja koja se kod većine ljudi najviše zategnu nakon fizičke aktivnosti. Nježna masaža ovih zona, uz balzam koji vam odgovara, može pomoći da se opustite prije spavanja.",
          "Nema potrebe za jakim pritiskom da bi masaža bila djelotvorna — dovoljno je nekoliko minuta pažljivih, ravnomjernih pokreta na mjestu gdje osjećate napetost.",
        ],
      },
      {
        heading: "Slušajte tijelo",
        text: [
          "Iznenadan, jak ili dugotrajan bol zahtijeva procjenu zdravstvenog stručnjaka. Ne maskirajte simptome balzamom ili masažom da biste nastavili s opterećenjem koje bi moglo pogoršati postojeću povredu.",
          "Razlika između uobičajene mišićne napetosti i bola koji signalizira povredu ponekad nije očigledna — ako niste sigurni, bolje je napraviti pauzu i, po potrebi, potražiti savjet fizioterapeuta ili ljekara.",
        ],
      },
    ],
  ),
  article(
    "njega-brade-i-serum",
    "Rutina njege brade: jednostavni koraci",
    "Njega i masaža",
    ["brada", "serum", "njega"],
    "legacy",
    "Njega brade počinje čistom kožom, strpljenjem i realnim očekivanjima.",
    [
      {
        heading: "Osnovna rutina",
        text: [
          "Kožu i bradu držite čistima, a proizvod nanesite prema deklaraciji. Redovnost njege može poboljšati osjećaj urednosti i mekoće dlačica, ali rezultati zavise i od individualnih karakteristika kože i dlaka.",
          "Prije nanošenja seruma, koža ispod brade treba biti suha — nanošenje na vlažnu kožu može razrijediti proizvod i smanjiti njegovu djelotvornost u zadržavanju vlage.",
        ],
      },
      {
        heading: "Kako i kada nanositi",
        text: [
          "Nekoliko kapi razmazanih između dlanova, a zatim utrljanih od korijena prema vrhovima dlačica, obično je dovoljno za jednu primjenu. Većina korisnika serum koristi jednom dnevno, uveče, kao dio rutine prije spavanja.",
          "Nemojte pretjerivati s količinom — više proizvoda ne znači bolji rezultat, a masna koža ispod brade može uzrokovati nelagodu ili nadraženost umjesto pozitivnog efekta.",
        ],
      },
      {
        heading: "Bez obećanja rasta",
        text: [
          "Kozmetički serum nije lijek niti može garantovati rast brade. Njegova uloga je njega postojećih dlačica i kože, a ne stimulacija rasta novih folikula, bez obzira na to kako je proizvod predstavljen u marketinškim materijalima.",
          "Ako imate iznenadan gubitak dlaka, praznine u rastu brade ili promjene kože poput crvenila i perutanja, razgovarajte s dermatologom umjesto da rješenje tražite isključivo u kozmetičkim proizvodima.",
        ],
      },
    ],
  ),
  article(
    "sta-je-hidzama",
    "Šta je hidžama: termin, tradicija i granice",
    "Hidžama i tradicija",
    ["hidžama", "kupiranje", "sunnetska medicina"],
    "kim-landscape",
    "Kratko objašnjenje pojma i zašto se zdravstveni aspekt ne smije pojednostaviti.",
    [
      {
        heading: "Pojam",
        text: [
          "Hidžama se u klasičnoj upotrebi odnosi na cupping postupak koji uključuje stvaranje podpritiska na koži, a metode se razlikuju — od suhog kupiranja bez povrede kože do postupaka koji uključuju male incizije. Vjerski izvori govore o praksi, dok zdravstvene odluke traže stručnu procjenu.",
          "Termin se u različitim tradicijama i regijama primjenjuje na slične, ali ne identične postupke, pa je korisno razumjeti da „hidžama“ nije jedinstvena, standardizovana medicinska procedura, nego skup praksi s dugom historijom.",
        ],
      },
      {
        heading: "Zašto se ne smije pojednostaviti",
        text: [
          "Kada se o hidžami govori isključivo kroz tradiciju, lako se zanemari da svaki postupak koji uključuje kožu i moguć kontakt s krvlju nosi zdravstvene rizike koje treba ozbiljno shvatiti. Higijena, sterilizacija pribora i kvalifikacije osobe koja izvodi postupak su ključni faktori sigurnosti.",
          "Osobe koje razmatraju hidžamu trebale bi razlikovati vjersku i kulturnu vrijednost prakse od pitanja da li je postupak siguran za njihovu konkretnu zdravstvenu situaciju — to su dva odvojena pitanja.",
        ],
      },
      {
        heading: "Sigurnost je prva",
        text: [
          "Postupke koji uključuju kožu i krv ne radite kod nestručnih osoba, bez obzira na to koliko je pružalac usluge iskusan po sopstvenom navodu. Tražite jasne informacije o higijenskim standardima prije nego što pristanete na uslugu.",
          "Kod bolesti, trudnoće, lijekova poput antikoagulansa ili poremećaja zgrušavanja krvi obavezno se prvo obratite ljekaru prije razmatranja bilo kakvog postupka koji uključuje kožu.",
        ],
      },
    ],
    [
      { label: "Sahih Muslim 1577b", url: "https://sunnah.com/muslim:1577b" },
      {
        label: "IslamQA: hidžama",
        url: "https://islamqa.info/en/answers/21406",
      },
    ],
  ),
  article(
    "hidzama-i-medicinski-savjet",
    "Hidžama i medicinski savjet: šta treba znati prije odluke",
    "Hidžama i tradicija",
    ["hidžama", "sigurnost", "doktor"],
    "nature",
    "Vjerska inspiracija ne uklanja potrebu za sigurnim i stručnim pristupom.",
    [
      {
        heading: "Prvo procijenite okolnosti",
        text: [
          "Hidžama nije univerzalna preporuka za svaku osobu i svaki simptom. Ne odgađajte dijagnostiku ili hitnu pomoć zbog alternativnog postupka, posebno kod simptoma koji zahtijevaju brzu medicinsku procjenu.",
          "Odluka o hidžami treba doći nakon, a ne umjesto, razgovora sa svojim ljekarom o tome šta uzrokuje vaše simptome i da li postoji razlog za oprez u vašem konkretnom slučaju.",
        ],
      },
      {
        heading: "Ko ne bi trebao razmatrati postupak",
        text: [
          "Osobe koje uzimaju lijekove za razrjeđivanje krvi, imaju poremećaje zgrušavanja, teže hronične bolesti, trudnice i osobe s oslabljenim imunitetom trebale bi izbjegavati postupak bez prethodne konsultacije s ljekarom.",
          "Ako niste sigurni da li spadate u neku od rizičnih grupa, to pitanje postavite direktno svom ljekaru prije nego što zakažete termin, umjesto da se oslanjate na procjenu osobe koja izvodi postupak.",
        ],
      },
      {
        heading: "Pitajte prava pitanja",
        text: [
          "Pitajte ko izvodi postupak, kakvi su higijenski protokoli, da li se koristi pribor za jednokratnu upotrebu i da li postoji razlog da se postupak izbjegne u vašem slučaju. Za individualan savjet obratite se svom ljekaru.",
          "Transparentan pružalac usluge neće imati problem da odgovori na ova pitanja — nespremnost da se objasne osnovni higijenski standardi je razlog za dodatan oprez.",
        ],
      },
    ],
  ),
  article(
    "predaje-o-hidzami",
    "Predaje o hidžami: poštovanje izvora i odgovornost",
    "Hidžama i tradicija",
    ["hadis", "hidžama", "sunnetska medicina"],
    "hero-kim",
    "Kako razlikovati vjerodostojan izvor od neprovjerenih obećanja na internetu.",
    [
      {
        heading: "Provjerite izvor",
        text: [
          "Za vjerske navode pogledajte zbirku hadisa ili objašnjenje pouzdanog učenjaka. Ne dijelite slike s navodnim predajama bez provjere izvora i stepena vjerodostojnosti, jer se netačni ili izmišljeni tekstovi lako šire na društvenim mrežama.",
          "Provjera izvora obično traži nekoliko minuta — potražite predaju u priznatim zbirkama hadisa ili kod poznatih islamskih naučnih institucija umjesto da se oslonite na snimak zaslona nepoznatog porijekla.",
        ],
      },
      {
        heading: "Zašto se lažne predaje šire",
        text: [
          "Kratke, upečatljive tvrdnje lakše se dijele nego dugi, nijansirani tekstovi s kontekstom i objašnjenjem. To je poseban rizik kada se predaje kombinuju s prodajom proizvoda, jer prodavac ima interes da tekst predstavi na najuvjerljiviji mogući način.",
          "Zdrav skepticizam prema svakoj tvrdnji koja obećava jednostavno rješenje za složen zdravstveni problem koristan je bez obzira na to da li je tvrdnja predstavljena kao vjerska, naučna ili tradicionalna.",
        ],
      },
      {
        heading: "Vjera i odgovornost",
        text: [
          "Poštovanje sunneta ne znači obećavati dijagnozu ili izlječenje. Zdravstveni postupci nose rizike i zahtijevaju stručnost, higijenu i odgovarajuće okolnosti, bez obzira na to koliko je praksa ukorijenjena u tradiciji.",
          "Odgovoran odnos prema vjeri i zdravlju znači prihvatiti da su to dva povezana, ali ipak odvojena područja života, od kojih svako zahtijeva svoju vrstu znanja i opreza.",
        ],
      },
    ],
    [
      { label: "Sahih Muslim 1577b", url: "https://sunnah.com/muslim:1577b" },
      {
        label: "IslamQA: vrlina i korist hidžame",
        url: "https://islamqa.info/en/answers/21406",
      },
    ],
  ),
  article(
    "mitovi-o-hidzami",
    "Četiri pitanja prije nego što povjerujete tvrdnji o hidžami",
    "Hidžama i tradicija",
    ["hidžama", "mitovi", "sigurnost"],
    "landscape",
    "Okvir za kritičko čitanje marketinških tvrdnji o osjetljivim zdravstvenim temama.",
    [
      {
        heading: "Da li se obećava izliječenje",
        text: [
          "Tvrdnje da jedan postupak liječi svaku bolest nisu odgovorno zdravstveno savjetovanje. Posebno budite oprezni ako vas neko odvraća od pregleda ili propisane terapije u korist alternativnog postupka.",
          "Ozbiljan pružalac usluge govorit će o mogućoj koristi u okviru realnih očekivanja, a ne o čudesnim ishodima za stanja koja zahtijevaju medicinsko liječenje.",
        ],
      },
      {
        heading: "Ko stoji iza tvrdnje",
        text: [
          "Provjerite da li osoba koja iznosi tvrdnju ima ikakvu stručnu ili medicinsku pozadinu, ili se oslanja isključivo na lične priče i preporuke zadovoljnih klijenata. Anegdote nisu isto što i provjerene informacije.",
          "Kad se ista tvrdnja pojavljuje samo na profilima koji prodaju uslugu ili proizvod, a ne u nezavisnim izvorima, to je razlog za dodatnu opreznost prije nego što joj povjerujete.",
        ],
      },
      {
        heading: "Da li postoji siguran postupak",
        text: [
          "Provjerite kvalifikacije, higijenu i okolnosti u kojima se usluga nudi. Hitni simptomi zahtijevaju hitnu medicinsku procjenu, bez obzira na to koliko je alternativni postupak privlačan ili preporučen od poznanika.",
          "Ako pružalac usluge ne može jasno objasniti kako se pribor sterilizira ili odbija da odgovori na pitanja o higijeni, to je dovoljan razlog da potražite uslugu na drugom mjestu.",
        ],
      },
      {
        heading: "Da li imate drugo mišljenje",
        text: [
          "Kod važnih zdravstvenih odluka korisno je čuti mišljenje više od jedne osobe, posebno kad je riječ o simptomima koji traju ili se pogoršavaju. Drugo mišljenje ljekara nije znak nepovjerenja, nego uobičajen i razuman korak.",
          "Ako vam neko snažno preporučuje da izbjegnete standardnu medicinsku procjenu u korist jednog alternativnog rješenja, to je signal da usporite i preispitate izvor te preporuke.",
        ],
      },
    ],
  ),
  article(
    "navika-dorucka",
    "Mali ritual doručka koji možete održati",
    "Prehrana i navike",
    ["doručak", "navike", "prehrana"],
    "honey",
    "Održiva navika je često korisnija od savršenog plana koji brzo nestane.",
    [
      {
        heading: "Sastavite jednostavno",
        text: [
          "Kombinujte namirnice koje su vam dostupne i koje volite: izvor proteina, voće ili povrće, žitarice ili drugi izvor vlakana. Prilagodite izbor svojim potrebama i preporukama stručnjaka umjesto da slijedite tuđi strogi plan.",
          "Doručak ne mora biti komplikovan da bi bio koristan — jednostavna kombinacija koju ćete stvarno pripremiti svako jutro vrijednija je od elaboriranog recepta koji rijetko stignete da napravite.",
        ],
      },
      {
        heading: "Pripremite unaprijed kad možete",
        text: [
          "Za užurbana jutra, dio pripreme možete obaviti veče ranije — oprati voće, izmjeriti žitarice ili pripremiti sastojke koji se lako sklapaju. Ovo smanjuje šansu da doručak preskočite zbog nedostatka vremena.",
          "Čak i jednostavne opcije poput voća s jogurtom ili peciva s namazom mogu biti dio zdrave rutine ako se uklapaju u ostatak vaše svakodnevne ishrane.",
        ],
      },
      {
        heading: "Bez perfekcionizma",
        text: [
          "Jedan obrok ne određuje cijeli stil prehrane. Gradite rutinu korak po korak i planirajte ono što realno možete pripremiti, umjesto da svako jutro težite idealnom, ali nerealnom obroku.",
          "Ako jedno jutro doručak izostane ili ne bude onakav kakav ste planirali, to nije razlog za odustajanje od cijele navike — samo nastavite sa sljedećim obrokom kao i obično.",
        ],
      },
    ],
  ),
  article(
    "kako-piti-vise-vode",
    "Kako piti više vode bez kompliciranih pravila",
    "Prehrana i navike",
    ["voda", "hidratacija", "navike"],
    "nature",
    "Jednostavni podsjetnici mogu pomoći da voda postane redovan dio dana.",
    [
      {
        heading: "Povežite naviku s danom",
        text: [
          "Držite čašu ili bočicu na vidljivom mjestu i popijte vodu uz postojeću rutinu, poput obroka ili pauze na poslu. Potrebe za tečnošću razlikuju se od osobe do osobe, u zavisnosti od aktivnosti, klime i zdravstvenog stanja.",
          "Povezivanje pijenja vode s već postojećom navikom, poput čekanja da se skuha kafa ili pauze između sastanaka, olakšava da se ne zaboravi tokom užurbanog dana.",
        ],
      },
      {
        heading: "Prepoznajte signale žeđi",
        text: [
          "Osjećaj žeđi je prirodan signal tijela, ali mnogi ljudi ga ignorišu dok su zauzeti drugim aktivnostima. Ako primijetite glavobolju, umor ili smanjenu koncentraciju tokom dana, to ponekad može biti povezano s nedovoljnim unosom tečnosti.",
          "Boja urina je jednostavan, mada ne i savršen pokazatelj hidratacije — svijetla boja obično ukazuje na dovoljan unos tečnosti, dok tamnija boja može biti signal da popijete više vode.",
        ],
      },
      {
        heading: "Pratite svoje stanje",
        text: [
          "Kod zdravstvenih stanja koja zahtijevaju ograničenje tečnosti, poput određenih bubrežnih ili srčanih problema, slijedite preporuku ljekara. Ne oslanjajte se na opća pravila poput „osam čaša dnevno“ ako ste dobili individualne upute.",
          "Isto vrijedi za osobe koje su fizički vrlo aktivne ili borave u toplijoj klimi — njihove potrebe za tečnošću mogu biti veće od uobičajenih preporuka namijenjenih prosječnoj populaciji.",
        ],
      },
    ],
  ),
  article(
    "jabuka-u-dnevnoj-rutini",
    "Jabuka u dnevnoj rutini: praktične ideje",
    "Prehrana i navike",
    ["jabuka", "voće", "užina"],
    "honey",
    "Jednostavne ideje da voće bude pri ruci tokom radnog ili školskog dana.",
    [
      {
        heading: "Pripremite unaprijed",
        text: [
          "Operite voće, držite ga na vidljivom mjestu i ponesite ga kada izlazite. Jabuka može biti jednostavan dio užine uz namirnicu koja vam odgovara, poput orašastih plodova ili komada sira.",
          "Ako pripremite nekoliko komada voća unaprijed i stavite ih u torbu ili na sto, veća je vjerovatnoća da ćete ih zaista pojesti umjesto da posegnete za manje zdravom opcijom kad ogladnite.",
        ],
      },
      {
        heading: "Više od svježeg zalogaja",
        text: [
          "Jabuka se lako uklapa i u druge oblike obroka — narezana u zobenu kašu, pečena kao dio jednostavnog desertnog obroka ili kombinovana s namazom od orašastih plodova za sitiju užinu.",
          "Ako vam je dosadno jesti isto voće svaki dan, promjena pripreme, a ne samo vrste voća, može pomoći da navika ostane zanimljiva na duži rok.",
        ],
      },
      {
        heading: "Raznolikost ostaje važna",
        text: [
          "Mijenjajte vrste voća i povrća kroz sedmicu kako biste unijeli širi spektar vlakana i drugih sastojaka iz hrane. Ako imate posebne prehrambene potrebe, plan prilagodite uz savjet stručnjaka.",
          "Sezonsko voće je često pristupačnije i svježije, pa vrijedi prilagoditi izbor onome što je trenutno dostupno na tržnici ili u prodavnici.",
        ],
      },
    ],
  ),
  article(
    "ravnoteza-u-prehrani",
    "Ravnoteža u prehrani bez ekstremnih pravila",
    "Prehrana i navike",
    ["prehrana", "ravnoteža", "savjeti"],
    "landscape",
    "Za dugoročne navike važniji su obrazac i dosljednost nego kratkotrajna restrikcija.",
    [
      {
        heading: "Gledajte širu sliku",
        text: [
          "Uravnotežena prehrana podrazumijeva raznovrsne namirnice i obroke koji odgovaraju vašem životu. Niti jedna namirnica sama ne zamjenjuje cijeli obrazac prehrane, bez obzira na to koliko je „zdrava“ ili popularna u datom trenutku.",
          "Umjesto da tražite jednu namirnicu ili dodatak koji će „riješiti“ ishranu, korisnije je posmatrati cjelokupan obrazac obroka tokom sedmica i mjeseci.",
        ],
      },
      {
        heading: "Zašto ekstremna pravila često ne uspiju",
        text: [
          "Stroga ograničenja koja isključuju čitave grupe namirnica bez medicinskog razloga teško je održati na duži rok i mogu dovesti do osjećaja lišavanja koji rezultira odustajanjem od cijelog plana.",
          "Postepene, održive promjene — poput dodavanja više povrća obrocima ili smanjenja količine zaslađenih napitaka — obično imaju veći dugoročni efekat od naglih i drastičnih rezova.",
        ],
      },
      {
        heading: "Stručna podrška",
        text: [
          "Za mršavljenje, dijabetes, alergije ili druge zdravstvene potrebe razgovarajte s ljekarom ili nutricionistom umjesto da slijedite univerzalne savjete s interneta koji ne uzimaju u obzir vašu konkretnu situaciju.",
          "Individualni plan prehrane, prilagođen vašem zdravstvenom stanju i svakodnevnom životu, gotovo uvijek daje bolje i sigurnije rezultate od generičkih pravila namijenjenih širokoj publici.",
        ],
      },
    ],
  ),
  article(
    "planiranje-uzine",
    "Planiranje užine za užurban dan",
    "Prehrana i navike",
    ["užina", "planiranje", "navike"],
    "seeds",
    "Malo planiranja može olakšati izbor hrane kada dan postane brz.",
    [
      {
        heading: "Držite jednostavne opcije",
        text: [
          "Pripremite voće, orašaste plodove ako vam odgovaraju, jogurt ili druge namirnice koje možete lako ponijeti. Provjerite alergene i sastav pakovanih proizvoda prije nego što ih uvrstite u redovnu užinu.",
          "Male posude ili kese koje možete unaprijed napuniti olakšavaju da imate spremnu užinu pri ruci umjesto da u posljednjem trenutku posegnete za prvim dostupnim proizvodom.",
        ],
      },
      {
        heading: "Prilagodite užinu vremenu dana",
        text: [
          "Užina prije fizičke aktivnosti može biti lakša i bogatija ugljikohidratima, dok užina kasno navečer, ako vam uopšte treba, može biti manja i lakše svarljiva.",
          "Slušajte vlastiti osjećaj gladi umjesto da se strogo držite fiksnog rasporeda obroka koji ne odgovara vašem stvarnom dnevnom ritmu.",
        ],
      },
      {
        heading: "Bez krivnje",
        text: [
          "Prehrana nije test savršenstva. Vratite se uobičajenoj rutini pri sljedećem obroku bez kažnjavanja i ekstremnih ograničenja ako jedna užina ili obrok nisu ispali onako kako ste planirali.",
          "Fleksibilan, ali dosljedan pristup ishrani lakše se održava na duži rok nego kruta pravila koja ne ostavljaju prostor za svakodnevne promjene rasporeda i raspoloženja.",
        ],
      },
    ],
  ),
  article(
    "svjesno-kupovanje",
    "Svjesno kupovanje: manje impulsa, više informacija",
    "Prehrana i navike",
    ["kupovina", "prehrana", "planiranje"],
    "shop-banner",
    "Lista, deklaracija i realne potrebe čine kupovinu mirnijom.",
    [
      {
        heading: "Napravite kratku listu",
        text: [
          "Prije kupovine razmislite šta vam zaista treba za nekoliko dana. Lista može pomoći da izbjegnete višak i lakše iskoristite ono što već imate, umjesto da namirnice propadnu neiskorištene u frižideru.",
          "Kupovina na prazan stomak često dovodi do impulsivnih izbora — jedenje manjeg obroka prije odlaska u prodavnicu može olakšati da se držite planirane liste.",
        ],
      },
      {
        heading: "Prepoznajte marketinške trikove",
        text: [
          "Riječi poput „prirodno“, „bez dodataka“ ili „premium“ na pakovanju nisu zakonski precizno definisane u istoj mjeri kao stvarni sastav naveden u deklaraciji. Ne dozvolite da vas istaknuta riječ na etiketi zamijeni čitanje sastava.",
          "Popusti i posebne ponude mogu biti korisni, ali ne bi trebali biti jedini razlog za kupovinu proizvoda koji vam inače ne treba ili ne odgovara vašim potrebama.",
        ],
      },
      {
        heading: "Čitajte informacije",
        text: [
          "Kod proizvoda koji se koriste za prehranu ili njegu, deklaracija i upozorenja imaju prednost nad marketinškim sloganima. Nekoliko sekundi čitanja etikete može spriječiti neugodno iskustvo kasnije.",
          "Ako imate alergije ili posebne prehrambene potrebe, provjera sastava prije svake kupovine treba postati navika, čak i za proizvode koje redovno kupujete, jer se recepture mogu mijenjati.",
        ],
      },
    ],
  ),
  article(
    "hladno-cijedeno-sta-znaci",
    "Šta znači hladno cijeđeno ulje",
    "Kvalitet i kupovina",
    ["hladno cijeđeno", "kvalitet", "ulje"],
    "curekot-500",
    "Termin na etiketi je početak informisane kupovine, a ne zamjena za čitanje deklaracije.",
    [
      {
        heading: "Pitajte za porijeklo",
        text: [
          "Potražite jasne podatke o sastojku, pakovanju i čuvanju. Ako vam je važan način prerade, pitajte proizvođača konkretno pitanje umjesto da se oslanjate isključivo na termin istaknut na prednjoj strani etikete.",
          "Porijeklo sirovine, uslovi u kojima je sjeme uzgajano i skladišteno prije prerade takođe utiču na konačan kvalitet proizvoda, iako se ti podaci rjeđe ističu na pakovanju.",
        ],
      },
      {
        heading: "Šta postupak zapravo znači",
        text: [
          "Hladno cijeđenje podrazumijeva da se sirovina obrađuje bez izlaganja visokoj temperaturi, s ciljem očuvanja prirodnih svojstava sastojka. Postupak obično daje manju količinu ulja u odnosu na druge metode prerade, što djelomično objašnjava i višu cijenu.",
          "Sam termin na etiketi ne garantuje automatski viši kvalitet ako druge komponente proizvodnje, poput čuvanja sirovine prije prerade ili pakovanja, nisu takođe pažljivo kontrolisane.",
        ],
      },
      {
        heading: "Kvalitet je skup faktora",
        text: [
          "Bočica, rok, transport i čuvanje nakon kupovine utiču na iskustvo korištenja. Zato proizvod čuvajte prema uputi s etikete, bez obzira na to koliko pažljivo je bio proizveden prije nego što je stigao do vas.",
          "Ocjena kvaliteta jednog proizvoda rijetko zavisi od samo jednog faktora — kombinacija sirovine, postupka proizvodnje, pakovanja i vašeg načina čuvanja zajedno oblikuje konačan rezultat.",
        ],
      },
    ],
  ),
  article(
    "velicina-pakovanja-ulja",
    "Koju veličinu pakovanja ulja odabrati",
    "Kvalitet i kupovina",
    ["pakovanje", "ulje", "kupovina"],
    "curekot-250",
    "Veličinu bočice birajte prema tome koliko i kako ćete proizvod stvarno koristiti.",
    [
      {
        heading: "Počnite realno",
        text: [
          "Ako prvi put upoznajete okus ili proizvod, manje pakovanje može biti praktičan izbor. Veće pakovanje ima smisla kada znate da ćete ga koristiti u roku navedenom na deklaraciji i da vam odgovara.",
          "Manje bočice su takođe praktičnije za putovanje ili ako proizvod dijelite s drugim članom domaćinstva koji ga koristi rjeđe od vas.",
        ],
      },
      {
        heading: "Razmislite o tempu upotrebe",
        text: [
          "Procijenite koliko često i u kojoj količini stvarno koristite proizvod prije nego što se odlučite za veće pakovanje samo zbog niže cijene po mililitru. Ulje koje predugo stoji otvoreno gubi na kvalitetu, bez obzira na to koliko je jeftino po jedinici bilo pri kupovini.",
          "Ako niste sigurni koliko brzo ćete potrošiti veće pakovanje, sigurnija opcija je manja bočica koju ćete sigurno iskoristiti unutar preporučenog roka nakon otvaranja.",
        ],
      },
      {
        heading: "Pogledajte cijenu i rok",
        text: [
          "Ne uspoređujte samo ukupnu cijenu. Uzmite u obzir količinu, rok i mogućnost pravilnog čuvanja prije nego što donesete konačnu odluku o veličini pakovanja.",
          "Veće pakovanje po nižoj cijeni po jedinici je isplativo samo ako ćete stvarno iskoristiti cijelu količinu prije isteka roka — u suprotnom, ušteda na papiru pretvara se u bačen proizvod.",
        ],
      },
    ],
  ),
  article(
    "kupovina-prirodnih-proizvoda",
    "Kupovina prirodnih proizvoda: pitanja koja vrijedi postaviti",
    "Kvalitet i kupovina",
    ["prirodni proizvodi", "deklaracija", "kupovina"],
    "premium-set",
    "Dobra kupovina počinje jasnim informacijama, a ne velikim obećanjima.",
    [
      {
        heading: "Pitanja prije narudžbe",
        text: [
          "Koji je sastav? Kako se proizvod čuva? Koja je namjena prema deklaraciji? Kako kontaktirati prodavca? Ovo su korisna pitanja za svaki proizvod, bez obzira na to koliko izgleda jednostavno ili poznato.",
          "Ako prodavac ne može ili ne želi odgovoriti na neko od ovih osnovnih pitanja, to je razlog da razmotrite kupovinu na drugom mjestu, čak i ako je proizvod inače privlačno predstavljen.",
        ],
      },
      {
        heading: "Ocijenite dostupne informacije",
        text: [
          "Fotografije proizvoda, jasno navedena količina, rok upotrebe i podaci o proizvođaču su znakovi ozbiljne prodaje. Nedostatak ovih osnovnih podataka na stranici proizvoda trebao bi vas navesti da postavite dodatna pitanja prije kupovine.",
          "Recenzije drugih kupaca mogu biti korisne, ali ih čitajte kritički — pojedinačno iskustvo ne mora odražavati kvalitet cijele serije proizvoda niti zamjenjuje provjeru deklaracije.",
        ],
      },
      {
        heading: "Prepoznajte pretjerane tvrdnje",
        text: [
          "Budite oprezni s obećanjima brzog ili sigurnog izliječenja. Odgovoran prodavac ne zamjenjuje ljekara i ne obećava medicinski rezultat, bez obzira na to koliko je proizvod prirodnog porijekla.",
          "Formulacije poput „garantovan rezultat“ ili „djeluje kod svakoga“ su crvena zastavica kod bilo kojeg proizvoda namijenjenog ishrani, njezi ili zdravlju, jer individualni odgovor organizma nikada nije potpuno predvidiv.",
        ],
      },
    ],
  ),
  article(
    "rutina-njege-kod-kuce",
    "Rutina njege kod kuće: manje proizvoda, jasniji koraci",
    "Kvalitet i kupovina",
    ["njega", "rutina", "kozmetika"],
    "flower",
    "Jednostavna rutina olakšava da pratite šta vašoj koži odgovara.",
    [
      {
        heading: "Uvodite postepeno",
        text: [
          "Kada uvodite novi proizvod, mijenjajte jednu stvar odjednom i pratite reakciju kože. Tako ćete lakše prepoznati šta vam odgovara, umjesto da odjednom promijenite cijelu rutinu i ne znate koji proizvod je uzrokovao promjenu.",
          "Novom proizvodu obično je potrebno nekoliko sedmica redovne upotrebe prije nego što možete realno procijeniti njegov efekat — brzo odustajanje nakon jedne ili dvije primjene rijetko daje pouzdanu sliku.",
        ],
      },
      {
        heading: "Manje koraka, više dosljednosti",
        text: [
          "Jednostavna rutina od nekoliko koraka koju ćete zaista provoditi svaki dan korisnija je od opsežne rutine s mnogo proizvoda koju ćete brzo napustiti zbog nedostatka vremena.",
          "Fokusirajte se na osnovne korake — čišćenje, njegu i zaštitu — prije nego što dodajete specijalizovane proizvode koji rješavaju vrlo specifične potrebe kože.",
        ],
      },
      {
        heading: "Čuvajte proizvode pravilno",
        text: [
          "Zatvarajte ambalažu, ne dijelite proizvode koji dolaze u dodir s kožom i pratite rok upotrebe. Kod problema s kožom potražite stručni savjet umjesto da isprobavate sve dostupne proizvode redom.",
          "Proizvodi za njegu kože imaju ograničen rok trajanja nakon otvaranja, čak i kad izgledaju nepromijenjeno — provjerite oznaku PAO (period nakon otvaranja) ako je navedena na ambalaži.",
        ],
      },
    ],
  ),
];

export const allArticleTags = Array.from(
  new Set(articles.flatMap((article) => article.tags)),
).sort();
export const taxonomySlug = (value: string) =>
  value
    .toLocaleLowerCase("bs-BA")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
