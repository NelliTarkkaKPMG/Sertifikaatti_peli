// Kaikki pelien sisällöt ovat tässä tiedostossa – muokkaa vapaasti.
// Oikea vastaus merkitään kentällä "correct" (vaihtoehdon indeksi, 0 = ensimmäinen).

const CONFIG = {
  brand: "ISO 27001 -haaste",
  // Messuosaston nimi/numero, esim. "osastolla B12"
  stand: "osastollamme",
  // Loppuruudun keskustelulaatikko – näytetään asiantuntijalle osastolla
  talkTitle: "Tule juttelemaan osastollamme! 👋",
  talkText: "Näytä tämä ruutu asiantuntijallemme – kerromme, mitä ISO 27001 tarkoittaisi juuri teidän yrityksellenne.",
};

// ---------------------------------------------------------------------------
// TARVEKARTOITUS: "Tarvitseeko yrityksesi ISO 27001:n?"
// Ei oikeita vastauksia. Jokainen vaihtoehto antaa pisteitä (0–2) ja voi nostaa
// esiin syyn (REASONS), miksi sertifikaatista olisi yritykselle hyötyä.
// ---------------------------------------------------------------------------
const SURVEY = {
  id: "needs",
  icon: "🧭",
  title: "Tarvitseeko yrityksesi ISO 27001:n?",
  subtitle: "7 nopeaa kysymystä – ei vääriä vastauksia",
  questions: [
    {
      q: "Kysyvätkö asiakkaat tai tarjouspyynnöt näyttöä tietoturvastanne?",
      options: [
        { label: "Usein", points: 2, reason: "tenders" },
        { label: "Joskus", points: 1, reason: "tenders" },
        { label: "Ei koskaan", points: 0 },
      ],
    },
    {
      q: "Käsittelettekö asiakkaiden tai henkilöiden luottamuksellisia tietoja?",
      options: [
        { label: "Paljon", points: 2, reason: "data" },
        { label: "Jonkin verran", points: 1, reason: "data" },
        { label: "Tuskin lainkaan", points: 0 },
      ],
    },
    {
      q: "Koskeeko NIS2 (Suomessa kyberturvallisuuslaki) teitä tai asiakkaitanne?",
      options: [
        { label: "Kyllä", points: 2, reason: "nis2" },
        { label: "En tiedä", points: 1, reason: "nis2" },
        { label: "Ei koske", points: 0 },
      ],
    },
    {
      q: "Kuinka paljon toimintanne nojaa pilvipalveluihin ja alihankkijoihin?",
      options: [
        { label: "Lähes täysin", points: 2, reason: "suppliers" },
        { label: "Osittain", points: 1, reason: "suppliers" },
        { label: "Vähän", points: 0 },
      ],
    },
    {
      q: "Onko teillä ollut tietoturvapoikkeamia tai läheltä piti -tilanteita?",
      options: [
        { label: "Kyllä", points: 2, reason: "incident" },
        { label: "Emme tiedä", points: 2, reason: "incident" },
        { label: "Ei", points: 0 },
      ],
    },
    {
      q: "Tavoitteletteko kasvua, isompia asiakkaita tai uusia markkinoita?",
      options: [
        { label: "Kyllä", points: 2, reason: "growth" },
        { label: "Ehkä", points: 1, reason: "growth" },
        { label: "Ei juuri nyt", points: 0 },
      ],
    },
    {
      q: "Onko tietoturvan vastuut ja käytännöt sovittu ja dokumentoitu?",
      options: [
        { label: "Ei oikeastaan", points: 2, reason: "structure" },
        { label: "Osittain", points: 1, reason: "structure" },
        { label: "Kyllä, kattavasti", points: 0, reason: "ready" },
      ],
    },
  ],
  // Tulostasot pisteiden mukaan (max 14). Ensimmäinen, jonka min täyttyy, valitaan.
  levels: [
    { min: 9, icon: "🔥", title: "Vahva tarve", text: "ISO 27001 -sertifikaatista olisi teille selvää liiketoimintahyötyä – ja todennäköisesti asiakkaanne odottavat sitä pian." },
    { min: 5, icon: "📈", title: "Selkeä hyöty", text: "Sertifikaatti vahvistaisi asemaanne ja helpottaisi asiakkaiden tietoturvakysymyksiin vastaamista." },
    { min: 0, icon: "🌱", title: "Kilpailuetu tulevaisuuteen", text: "Akuuttia tarvetta ei ehkä vielä ole, mutta vaatimukset kiristyvät – ajoissa aloittaminen on edullisinta." },
  ],
};

// Syyt, miksi sertifikaatista on hyötyä. Näytetään tarvekartoituksen tuloksissa.
const REASONS = {
  tenders: {
    icon: "💼",
    title: "Voitatte useampia tarjouskilpailuja",
    text: "Yhä useampi asiakas ja julkinen hankinta edellyttää näyttöä tietoturvasta. Sertifikaatti vastaa kysymykseen kerralla – ilman loputtomia tietoturvakyselylomakkeita.",
  },
  data: {
    icon: "🔐",
    title: "Asiakkaiden luottamus",
    text: "Kun käsittelette muiden tietoja, sertifikaatti osoittaa riippumattomasti, että ne ovat turvassa. Se tukee myös tietosuojavaatimusten täyttämistä.",
  },
  nis2: {
    icon: "⚖️",
    title: "NIS2 ja kyberturvallisuuslaki",
    text: "ISO 27001 ei ole lain vaatima, mutta se on tunnetuin tapa rakentaa ja osoittaa lain edellyttämä riskienhallinta. NIS2-yritykset vaativat sitä yhä useammin myös toimittajiltaan.",
  },
  suppliers: {
    icon: "🔗",
    title: "Toimitusketju hallintaan",
    text: "Standardi sisältää kontrollit toimittajasuhteille ja pilvipalveluille – tiedätte, kenen käsissä tietonne ovat ja mitä heiltä vaaditaan.",
  },
  incident: {
    icon: "🚨",
    title: "Vähemmän yllätyksiä",
    text: "Systemaattinen riskienhallinta ja poikkeamien käsittely tarkoittavat, että ongelmat havaitaan ajoissa ja niistä toivutaan nopeammin.",
  },
  growth: {
    icon: "🚀",
    title: "Kilpailuetu kasvuun",
    text: "Kansainvälisesti tunnettu sertifikaatti avaa ovia isompiin asiakkuuksiin ja uusille markkinoille.",
  },
  structure: {
    icon: "🧱",
    title: "Selkeät vastuut ja käytännöt",
    text: "Hallintajärjestelmä tekee tietoturvasta johdettua toimintaa, joka ei ole yksittäisten henkilöiden muistin varassa.",
  },
  ready: {
    icon: "🏁",
    title: "Olette jo puolimatkassa",
    text: "Kun käytännöt on dokumentoitu, sertifiointi on usein lyhyempi askel kuin luulisi. Valmiusarvio näyttää, mitä vielä puuttuu.",
  },
};

// ---------------------------------------------------------------------------
// TIETOVISAT
// Jokainen kysymys liittyy aiheeseen (kenttä "topic"). Väärin menneiden aiheiden
// "pitch" näytetään pelin lopussa: miksi aiheella on väliä yritykselle ja miten autamme.
// Jos aiheen kaikki kysymykset menivät oikein, näytetään "strong"-teksti vahvuutena.
// ---------------------------------------------------------------------------
const TOPICS = {
  internal_audit: {
    icon: "🔍",
    title: "Sisäinen auditointi",
    pitch: "Sertifioitu organisaatio tarkastaa toimintansa itse säännöllisesti – puutteet löytyvät ennen kuin asiakas tai hyökkääjä löytää ne. Autamme rakentamaan auditointikäytännön tai teemme auditoinnin puolestanne.",
    strong: "Sisäisen auditoinnin merkitys on hallussa.",
  },
  risk: {
    icon: "⚖️",
    title: "Riskienhallinta ja SoA",
    pitch: "ISO 27001 ei vaadi kaikkea – vaan oikeat asiat teidän riskienne perusteella. Siksi se sopii myös pienemmille yrityksille. Riskityöpajassa selviää nopeasti, mitkä asiat ovat teille olennaisia.",
    strong: "Riskiperusteinen ajattelu on tuttua.",
  },
  controls: {
    icon: "🗂️",
    title: "Liite A:n kontrollit",
    pitch: "93 kontrollia kattavat kaiken etätyöstä pilvipalveluihin ja turvalliseen ohjelmointiin. Gap-analyysimme näyttää, kuinka lähellä sertifiointivalmiutta olette jo nyt.",
    strong: "Liite A:n rakenne ja kontrollit ovat hyvin hallussa.",
  },
  management: {
    icon: "👔",
    title: "Johdon rooli",
    pitch: "ISO 27001 tekee tietoturvasta johdon työkalun eikä pelkkää IT:n asiaa – ja juuri sitä myös NIS2 edellyttää johdolta. Autamme johtoa ottamaan roolin haltuun.",
    strong: "Johdon rooli tietoturvassa on selvä.",
  },
  awareness: {
    icon: "🎓",
    title: "Henkilöstön tietoisuus",
    pitch: "Suuri osa tietoturvapoikkeamista alkaa inhimillisestä virheestä. ISO 27001 vaatii henkilöstön koulutusta ja tietoisuutta – ja me autamme rakentamaan ohjelman, joka oikeasti toimii.",
    strong: "Henkilöstön merkitys tietoturvassa on tuttu.",
  },
  improvement: {
    icon: "📈",
    title: "Mittarit ja jatkuva parantaminen",
    pitch: "Sertifikaatti ei ole kertaluonteinen projekti vaan tapa parantaa toimintaa vuosi vuodelta – mitattavasti. Autamme rakentamaan mittarit, jotka kertovat johdolle oikeasti jotain.",
    strong: "Jatkuvan parantamisen periaatteet ovat hallussa.",
  },
  certification: {
    icon: "🏅",
    title: "Sertifiointiprosessi",
    pitch: "Sertifiointi on selkeä prosessi, kun tietää mitä odottaa. Laadimme teille tiekartan nykytilasta sertifikaattiin – ja kerromme, kauanko se realistisesti kestää.",
    strong: "Sertifiointiprosessi on tuttu.",
  },
  basics: {
    icon: "🧱",
    title: "ISMS:n perusteet",
    pitch: "Tietoturvan hallintajärjestelmä kuulostaa raskaalta, mutta hyvin tehtynä se on kevyt ja palvelee liiketoimintaa. Autamme rakentamaan juuri teidän kokoisenne ratkaisun.",
    strong: "ISMS:n perusteet ovat kunnossa.",
  },
};

// Näytetään, jos pelaaja vastasi kaikkiin oikein.
const PERFECT_PITCH = {
  icon: "🚀",
  title: "Osaaminen on huippuluokkaa!",
  pitch: "Osaaminen on olemassa – onko sille jo todistus? Sertifikaatti tekee osaamisestanne näkyvää asiakkaille. Jutellaan, kuinka lähellä olette.",
};

const GAMES = [
  {
    id: "quiz",
    icon: "🧠",
    title: "Pikavisa",
    subtitle: "Testaa perustiedot",
    type: "choice",
    questions: [
      {
        topic: "risk", q: "Mistä sanoista lyhenne SoA tulee?",
        options: ["Statement of Applicability", "Scope of Audit", "Security of Assets", "System of Accountability"],
        correct: 0,
        explain: "Statement of Applicability eli soveltamislausunto (6.1.3 d) – listaa liite A:n kontrollit, niiden perustelut ja toteutustilanteen.",
      },
      {
        topic: "controls", q: "Montako kontrollia ISO 27001:2022:n liite A sisältää?",
        options: ["114", "93", "72", "120"],
        correct: 1,
        explain: "93 kontrollia. Vanhassa 2013-versiossa niitä oli 114.",
      },
      {
        topic: "controls", q: "Mikä näistä EI ole liite A:n osa-alue (teema)?",
        options: ["Organisatoriset", "Ihmisiin liittyvät", "Taloudelliset", "Teknologiset"],
        correct: 2,
        explain: "Teemat ovat organisatoriset (5), ihmisiin liittyvät (6), fyysiset (7) ja teknologiset (8) kontrollit.",
      },
      {
        topic: "basics", q: "Mistä sanoista ISMS tulee?",
        options: ["Integrated Security Monitoring System", "Information Security Management System", "International Standard for Managed Security", "IT Service Management Standard"],
        correct: 1,
        explain: "Information Security Management System eli tietoturvallisuuden hallintajärjestelmä.",
      },
      {
        topic: "basics", q: "Mitä CIA tarkoittaa tietoturvassa?",
        options: ["Central Intelligence Agency, tietysti", "Control, Inspection, Audit", "Confidentiality, Integrity, Availability", "Compliance, Information, Assurance"],
        correct: 2,
        explain: "Luottamuksellisuus, eheys ja saatavuus – tietoturvan kolme peruspilaria.",
      },
      {
        topic: "controls", q: "Kuinka monta uutta kontrollia 2022-versioon tuli?",
        options: ["3", "11", "24", "Ei yhtään"],
        correct: 1,
        explain: "11 uutta, mm. uhkatiedustelu (5.7), pilvipalvelujen tietoturva (5.23) ja turvallinen ohjelmointi (8.28).",
      },
      {
        topic: "certification", q: "Kuinka pitkä on ISO 27001 -sertifikaatin voimassaoloaika?",
        options: ["1 vuosi", "3 vuotta", "5 vuotta", "Ikuisesti, kunhan muistaa maksaa"],
        correct: 1,
        explain: "3 vuotta, ja välissä tehdään vuosittaiset määräaikaisauditoinnit.",
      },
      {
        topic: "management", q: "Mikä lauseke käsittelee johdon katselmusta?",
        options: ["5.1", "7.4", "9.3", "10.2"],
        correct: 2,
        explain: "9.3 Johdon katselmus. Johdon on katselmoitava ISMS suunnitelluin väliajoin.",
      },
    ],
  },
  {
    id: "auditor",
    icon: "🔍",
    title: "Auditoijan silmin",
    subtitle: "Mihin lausekkeeseen poikkeama liittyy?",
    type: "choice",
    questions: [
      {
        topic: "internal_audit", q: "Lämmittely: Mikä lauseke kaatuu auditoinneissa kaikkein useimmin?",
        options: ["4.3 Soveltamisala", "7.5 Dokumentoitu tieto", "9.2 Sisäinen auditointi", "5.2 Politiikka"],
        correct: 2,
        explain: "9.2 Sisäinen auditointi on klassinen kompastuskivi: ohjelma puuttuu, kaikkea ei auditoida tai auditoija tarkastaa omaa työtään.",
      },
      {
        topic: "internal_audit", q: "”Sisäisen auditoinnin tekijä auditoi itse laatimiaan prosesseja.”",
        options: ["7.2 Pätevyys", "9.2 Sisäinen auditointi", "9.3 Johdon katselmus", "5.3 Roolit ja vastuut"],
        correct: 1,
        explain: "9.2 vaatii, että auditoijat valitaan ja auditoinnit tehdään objektiivisesti ja puolueettomasti.",
      },
      {
        topic: "risk", q: "”Liite A:n kontrolleja on jätetty pois, mutta perusteluja ei löydy.”",
        options: ["6.1.3 Riskien käsittely (SoA)", "4.1 Toimintaympäristö", "8.1 Toiminnan suunnittelu", "10.1 Jatkuva parantaminen"],
        correct: 0,
        explain: "SoA:n on sisällettävä perustelut sekä mukaan otetuille että poisjätetyille kontrolleille (6.1.3 d).",
      },
      {
        topic: "management", q: "”Johto ei ole käsitellyt ISMS:n suorituskykyä tai auditointituloksia.”",
        options: ["9.1 Seuranta ja mittaus", "9.3 Johdon katselmus", "5.2 Politiikka", "7.4 Viestintä"],
        correct: 1,
        explain: "Johdon katselmuksen syötteisiin kuuluvat mm. auditointitulokset, poikkeamat ja tavoitteiden toteutuminen.",
      },
      {
        topic: "awareness", q: "”Henkilöstön tietoturvakoulutuksista ei ole mitään näyttöä.”",
        options: ["7.2 Pätevyys / 7.3 Tietoisuus", "8.3 Riskien käsittely", "4.2 Sidosryhmät", "9.2 Sisäinen auditointi"],
        correct: 0,
        explain: "Pätevyydestä on säilytettävä dokumentoitua tietoa, ja henkilöstön on oltava tietoinen tietoturvapolitiikasta.",
      },
      {
        topic: "improvement", q: "”Korjaavat toimenpiteet on tehty, mutta niiden vaikuttavuutta ei ole arvioitu.”",
        options: ["6.2 Tavoitteet", "10.2 Poikkeamat ja korjaavat toimenpiteet", "9.3 Johdon katselmus", "7.1 Resurssit"],
        correct: 1,
        explain: "10.2 vaatii myös toteutettujen korjaavien toimenpiteiden vaikuttavuuden katselmoinnin.",
      },
      {
        topic: "improvement", q: "”Tietoturvatavoitteet on kirjattu, mutta niiden toteutumista ei seurata.”",
        options: ["6.2 Tietoturvatavoitteet", "5.1 Johtajuus", "8.2 Riskien arviointi", "4.4 ISMS"],
        correct: 0,
        explain: "Tavoitteiden tulee olla mitattavia (jos mahdollista) ja niitä tulee seurata (6.2).",
      },
    ],
  },
  {
    id: "sort",
    icon: "🗂️",
    title: "Lajittelupeli",
    subtitle: "Mihin teemaan kontrolli kuuluu?",
    type: "choice",
    topic: "controls", // oletusaihe kaikille tämän pelin kysymyksille
    // Kaikissa kysymyksissä samat vaihtoehdot
    fixedOptions: ["🏢 Organisatoriset (5)", "🧑‍🤝‍🧑 Ihmisiin liittyvät (6)", "🔒 Fyysiset (7)", "💻 Teknologiset (8)"],
    prompt: "Mihin teemaan kontrolli kuuluu?",
    questions: [
      { q: "Uhkatiedustelu", correct: 0, explain: "5.7 Uhkatiedustelu – yksi 2022-version uusista kontrolleista." },
      { q: "Etätyö", correct: 1, explain: "6.7 Etätyö – ihmisiin liittyvä kontrolli." },
      { q: "Puhdas pöytä ja tyhjä näyttö", correct: 2, explain: "7.7 Puhdas pöytä ja tyhjä näyttö on fyysinen kontrolli." },
      { q: "Turvallinen ohjelmointi", correct: 3, explain: "8.28 Turvallinen ohjelmointi – uusi teknologinen kontrolli." },
      { q: "Henkilöiden taustatarkistukset", correct: 1, explain: "6.1 Taustatarkistukset tehdään ennen palvelussuhdetta." },
      { q: "Pilvipalvelujen käytön tietoturva", correct: 0, explain: "5.23 – uusi organisatorinen kontrolli." },
      { q: "Fyysisen turvallisuuden valvonta", correct: 2, explain: "7.4 Fyysisen turvallisuuden valvonta – uusi 2022-versiossa." },
      { q: "Tietovuotojen estäminen", correct: 3, explain: "8.12 Tietovuotojen estäminen (DLP) – uusi teknologinen kontrolli." },
      { q: "Salassapitosopimukset", correct: 1, explain: "6.6 Salassapito- tai vaitiolosopimukset." },
      { q: "Tallennusvälineet", correct: 2, explain: "7.10 Tallennusvälineet – fyysinen kontrolli." },
    ],
  },
  {
    id: "truefalse",
    icon: "⚡",
    title: "Tosi vai tarua?",
    subtitle: "Nopeat päättävät – aikaa 10 s",
    type: "choice",
    timer: 10,
    fixedOptions: ["✅ Tosi", "❌ Tarua"],
    questions: [
      { topic: "risk", q: "Kaikki liite A:n kontrollit on pakko toteuttaa.", correct: 1, explain: "Tarua. Kontrollit valitaan riskien perusteella, ja poisjätöt perustellaan SoA:ssa." },
      { topic: "certification", q: "ISO 27001 -sertifikaatti on voimassa kolme vuotta.", correct: 0, explain: "Tosi – välissä vuosittaiset määräaikaisauditoinnit." },
      { topic: "certification", q: "ISO 27002 on standardi, johon voi sertifioitua.", correct: 1, explain: "Tarua. ISO 27002 on ohjeistus kontrollien toteutukseen; sertifiointi tehdään ISO 27001:een." },
      { topic: "certification", q: "Siirtymäaika 2013-versiosta 2022-versioon päättyi lokakuussa 2025.", correct: 0, explain: "Tosi – 2013-version sertifikaatit lakkasivat olemasta voimassa 31.10.2025." },
      { topic: "internal_audit", q: "Ulkoinen sertifiointiauditointi korvaa sisäisen auditoinnin.", correct: 1, explain: "Tarua. Sisäinen auditointi (9.2) on oma pakollinen vaatimuksensa." },
      { topic: "basics", q: "ISO 27001 määrää, mitä tietoturvatyökaluja organisaation tulee käyttää.", correct: 1, explain: "Tarua. Standardi on teknologianeutraali – se määrittää mitä, ei millä." },
      { topic: "controls", q: "Vuoden 2022 versiossa liite A:n kontrollit on jaettu neljään teemaan.", correct: 0, explain: "Tosi: organisatoriset, ihmisiin liittyvät, fyysiset ja teknologiset." },
      { topic: "management", q: "Ylimmän johdon on osoitettava johtajuutta ja sitoutumista ISMS:ään.", correct: 0, explain: "Tosi – lauseke 5.1 Johtajuus ja sitoutuminen." },
    ],
  },
];
