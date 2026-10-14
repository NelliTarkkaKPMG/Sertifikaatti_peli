// Kaikki pelien sisällöt ovat tässä tiedostossa – muokkaa vapaasti.
// Oikea vastaus merkitään kentällä "correct" (vaihtoehdon indeksi, 0 = ensimmäinen).

const CONFIG = {
  brand: "ISO 27001 -haaste",
  // Yhteydenottojen sähköposti. Ehdotuskorttien "Kysy tästä" -napit lisäävät aiheen otsikkoriville.
  contactEmail: "you@example.com",
  // Näytetään loppuruudussa. Vaihda omaan yhteystietoon / kampanjalinkkiin.
  ctaText: "Haluatko varmistaa, että teidän ISMS läpäisee auditoinnin? Jutellaan!",
  ctaLink: "mailto:you@example.com?subject=ISO%2027001",
  ctaButton: "Ota yhteyttä",
  prizeText: "Näytä tämä ruutu osastollamme ja nappaa palkinto! 🎁",
};

// Aihealueet, joihin kysymykset liittyvät (kysymyksen kenttä "topic").
// Kun pelaaja vastaa väärin, pelin lopussa näytetään aiheen "pitch" – eli miksi kannattaa jutella kanssamme.
// Jos aiheen kaikki kysymykset menivät oikein, näytetään "strong"-teksti vahvuutena.
const TOPICS = {
  internal_audit: {
    icon: "🔍",
    title: "Sisäinen auditointi",
    pitch: "Sisäinen auditointi (9.2) on yksi yleisimmistä poikkeamien lähteistä. Voimme toteuttaa sisäisen auditoinnin puolestanne riippumattomasti – tai kouluttaa omat auditoijanne.",
    strong: "Sisäisen auditoinnin vaatimukset ovat hallussa.",
  },
  risk: {
    icon: "⚖️",
    title: "Riskienhallinta ja SoA",
    pitch: "Riskiarvio ja soveltamislausunto ovat ISMS:n sydän – ja auditoijan ensimmäinen tarkastuskohde. Fasilitoimme riskityöpajan ja katselmoimme SoA:nne ennen auditointia.",
    strong: "Riskiperusteinen ajattelu ja SoA ovat tuttuja.",
  },
  controls: {
    icon: "🗂️",
    title: "Liite A:n kontrollit",
    pitch: "2022-versio toi 93 kontrollia, neljä teemaa ja 11 uutta kontrollia. Gap-analyysimme näyttää nopeasti, missä te olette ja mitä puuttuu.",
    strong: "Liite A:n rakenne ja kontrollit ovat hyvin hallussa.",
  },
  management: {
    icon: "👔",
    title: "Johdon sitoutuminen",
    pitch: "Ilman johdon sitoutumista ISMS jää paperiksi. Autamme rakentamaan johdon katselmuksen, joka on oikeasti hyödyllinen – ja täyttää lausekkeen 9.3.",
    strong: "Johdon rooli ISMS:ssä on selvä.",
  },
  awareness: {
    icon: "🎓",
    title: "Henkilöstön tietoisuus",
    pitch: "Ihmiset ovat paras puolustuslinja – kun he tietävät mitä tehdä. Rakennamme tietoturvakoulutusohjelman, josta jää myös näyttöä auditoijalle.",
    strong: "Pätevyys- ja tietoisuusvaatimukset ovat tuttuja.",
  },
  improvement: {
    icon: "📈",
    title: "Mittarit ja jatkuva parantaminen",
    pitch: "Tavoitteet, mittarit ja korjaavat toimenpiteet erottavat elävän ISMS:n mapissa pölyttyvästä. Autamme rakentamaan mittariston ja poikkeamaprosessin, jotka toimivat arjessa.",
    strong: "Jatkuvan parantamisen periaatteet ovat hallussa.",
  },
  certification: {
    icon: "🏅",
    title: "Sertifiointiprosessi",
    pitch: "Sertifiointi on selkeä prosessi, kun tietää mitä odottaa. Laadimme teille tiekartan ja teemme valmiusarvioinnin (pre-audit), jotta varsinainen auditointi ei yllätä.",
    strong: "Sertifiointiprosessi on tuttu.",
  },
  basics: {
    icon: "🧱",
    title: "ISMS:n perusteet",
    pitch: "Kaikki alkaa vahvasta perustasta. Autamme rakentamaan hallintajärjestelmän, joka sopii juuri teidän organisaatioonne – ei turhaa byrokratiaa.",
    strong: "ISMS:n perusteet ovat kunnossa.",
  },
};

// Näytetään, jos pelaaja vastasi kaikkiin oikein.
const PERFECT_PITCH = {
  icon: "🚀",
  title: "Osaaminen on huippuluokkaa!",
  pitch: "Oletteko jo sertifioituja? Tarjoamme riippumattomia sisäisiä auditointeja ja valmiusarviointeja, joilla varmistatte, että myös käytäntö vastaa osaamista.",
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
