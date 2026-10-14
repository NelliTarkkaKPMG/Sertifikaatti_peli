// Kaikki sisällöt ovat tässä tiedostossa – muokkaa vapaasti.
// Visakysymysten oikea vastaus merkitään kentällä "correct" (vaihtoehdon indeksi, 0 = ensimmäinen).

const CONFIG = {
  brand: "ISO 27001 -valmiustesti",
  // Messuosaston nimi/numero, esim. "osastolla B12"
  stand: "osastollamme",
  // Yhteenvedon lopun keskustelulaatikko – kävijä näyttää ruudun konsultille
  talkTitle: "Keskustellaan teidän tilanteestanne",
  talkText: "Näyttäkää tämä yhteenveto konsultillemme. Käymme läpi nykytilanteenne ja arvioimme, mitä sertifiointi teille edellyttäisi ja kuinka nopeasti siihen on realistista päästä.",
};

// ---------------------------------------------------------------------------
// PALVELUT
// Tulokset ohjaavat näihin. Muokkaa vastaamaan omaa palveluvalikoimaanne.
// ---------------------------------------------------------------------------
const SERVICES = {
  gap: {
    name: "Gap-analyysi",
    text: "Kartoitamme nykytilanne suhteessa ISO 27001:n vaatimuksiin ja liite A:n kontrolleihin. Tuloksena on priorisoitu toimenpidesuunnitelma ja realistinen aikataulu sertifiointiin.",
  },
  implementation: {
    name: "ISMS:n käyttöönotto",
    text: "Rakennamme kanssanne tietoturvan hallintajärjestelmän: politiikat, prosessit ja dokumentaation, jotka on mitoitettu organisaationne kokoon ja riskeihin.",
  },
  risk: {
    name: "Riskienarviointi ja SoA",
    text: "Fasilitoimme riskienarvioinnin ja laadimme soveltamislausunnon, joka perustelee kontrollivalinnat ja kestää auditoijan tarkastelun.",
  },
  training: {
    name: "Johdon ja henkilöstön koulutus",
    text: "Tietoturvakoulutukset johdolle ja henkilöstölle sekä dokumentoitu näyttö osaamisesta auditointia varten.",
  },
  internal_audit: {
    name: "Sisäinen auditointi",
    text: "Toteutamme riippumattoman sisäisen auditoinnin tai koulutamme omat sisäiset auditoijanne.",
  },
  readiness: {
    name: "Sertifiointivalmiuden arviointi",
    text: "Esiauditointi, joka simuloi sertifiointiauditointia ja varmistaa, ettei varsinaisessa auditoinnissa tule yllätyksiä.",
  },
  nis2: {
    name: "NIS2-vaatimustenmukaisuus",
    text: "Arvioimme kyberturvallisuuslain velvoitteet ja yhdistämme ne ISO 27001 -työhön, jotta samaa työtä ei tehdä kahteen kertaan.",
  },
  continuous: {
    name: "Jatkuva tuki",
    text: "Tuemme sertifioinnin jälkeen: mittarit, johdon katselmukset, määräaikaisauditointeihin valmistautuminen ja tarvittaessa ulkoistettu tietoturvapäällikkö.",
  },
};

// ---------------------------------------------------------------------------
// TARVEKARTOITUS: "Tarvitseeko yrityksenne ISO 27001 -sertifikaatin?"
// Ei oikeita vastauksia. Jokainen vaihtoehto antaa pisteitä (0–2) ja voi nostaa
// esiin liiketoimintasyyn (REASONS).
// ---------------------------------------------------------------------------
const SURVEY = {
  id: "needs",
  tag: "Tarvekartoitus · 7 kysymystä",
  title: "Tarvitseeko yrityksenne ISO 27001 -sertifikaatin?",
  subtitle: "Arvio liiketoimintatarpeesta vastaustenne perusteella.",
  questions: [
    {
      q: "Edellyttävätkö asiakkaat tai tarjouspyynnöt näyttöä tietoturvastanne?",
      options: [
        { label: "Usein", points: 2, reason: "tenders" },
        { label: "Joskus", points: 1, reason: "tenders" },
        { label: "Ei", points: 0 },
      ],
    },
    {
      q: "Käsitteleekö yrityksenne asiakkaiden tai henkilöiden luottamuksellisia tietoja?",
      options: [
        { label: "Merkittävässä määrin", points: 2, reason: "data" },
        { label: "Jonkin verran", points: 1, reason: "data" },
        { label: "Vähäisesti", points: 0 },
      ],
    },
    {
      q: "Kuuluuko yrityksenne tai asiakkaanne NIS2:n (kyberturvallisuuslain) piiriin?",
      options: [
        { label: "Kyllä", points: 2, reason: "nis2" },
        { label: "Emme ole varmoja", points: 1, reason: "nis2" },
        { label: "Ei", points: 0 },
      ],
    },
    {
      q: "Kuinka paljon toimintanne nojaa pilvipalveluihin ja alihankkijoihin?",
      options: [
        { label: "Lähes kokonaan", points: 2, reason: "suppliers" },
        { label: "Osittain", points: 1, reason: "suppliers" },
        { label: "Vähän", points: 0 },
      ],
    },
    {
      q: "Onko teillä ollut tietoturvapoikkeamia tai läheltä piti -tilanteita viime vuosina?",
      options: [
        { label: "Kyllä", points: 2, reason: "incident" },
        { label: "Emme tiedä", points: 2, reason: "incident" },
        { label: "Ei", points: 0 },
      ],
    },
    {
      q: "Tavoitteleeko yrityksenne kasvua, suurempia asiakkuuksia tai uusia markkinoita?",
      options: [
        { label: "Kyllä", points: 2, reason: "growth" },
        { label: "Mahdollisesti", points: 1, reason: "growth" },
        { label: "Ei lähiaikoina", points: 0 },
      ],
    },
    {
      q: "Onko tietoturvan vastuut ja käytännöt määritelty ja dokumentoitu?",
      options: [
        { label: "Ei juurikaan", points: 2, reason: "structure" },
        { label: "Osittain", points: 1, reason: "structure" },
        { label: "Kattavasti", points: 0, reason: "ready" },
      ],
    },
  ],
  // Tulostasot pisteiden mukaan (max 14). Ensimmäinen, jonka min täyttyy, valitaan.
  levels: [
    { min: 9, title: "Selvä liiketoimintatarve", text: "Sertifikaatista olisi teille suoraa liiketoimintahyötyä, ja asiakkaanne todennäköisesti edellyttävät sitä lähivuosina." },
    { min: 5, title: "Merkittävä hyöty", text: "Sertifikaatti vahvistaisi kilpailuasemaanne ja vähentäisi asiakkaiden tietoturvakyselyihin kuluvaa työtä." },
    { min: 0, title: "Strateginen etu", text: "Välitöntä tarvetta ei välttämättä ole, mutta vaatimukset kiristyvät. Ajoissa aloitettu työ on kustannustehokkainta." },
  ],
};

// Liiketoimintasyyt. "service" kertoo, mihin palveluun syy ohjaa.
const REASONS = {
  tenders: {
    title: "Kilpailukyky tarjouskilpailuissa",
    text: "Yhä useampi asiakas ja julkinen hankinta edellyttää näyttöä tietoturvasta. Sertifikaatti vastaa vaatimukseen kerralla ja vähentää yksittäisiin tietoturvakyselyihin kuluvaa työtä.",
    service: "readiness",
  },
  data: {
    title: "Asiakkaiden luottamus",
    text: "Kun käsittelette muiden tietoja, sertifikaatti osoittaa riippumattomasti, että ne on suojattu asianmukaisesti. Se tukee myös tietosuojavelvoitteiden täyttämistä.",
    service: "risk",
  },
  nis2: {
    title: "NIS2 ja kyberturvallisuuslaki",
    text: "ISO 27001 ei ole lakisääteinen vaatimus, mutta se on vakiintunut tapa toteuttaa ja osoittaa lain edellyttämä riskienhallinta. NIS2-yritykset edellyttävät sitä yhä useammin myös toimittajiltaan.",
    service: "nis2",
  },
  suppliers: {
    title: "Toimitusketjun hallinta",
    text: "Standardi kattaa toimittajasuhteet ja pilvipalvelut. Tiedätte, kenen hallussa tietonne ovat ja mitä heiltä edellytetään.",
    service: "risk",
  },
  incident: {
    title: "Häiriöiden ennaltaehkäisy",
    text: "Järjestelmällinen riskienhallinta ja poikkeamien käsittely tarkoittavat, että ongelmat havaitaan aiemmin ja niistä toivutaan nopeammin.",
    service: "gap",
  },
  growth: {
    title: "Kasvun mahdollistaja",
    text: "Kansainvälisesti tunnettu sertifikaatti avaa ovia suurempiin asiakkuuksiin ja uusille markkinoille.",
    service: "gap",
  },
  structure: {
    title: "Selkeät vastuut ja käytännöt",
    text: "Hallintajärjestelmä tekee tietoturvasta johdettua toimintaa, joka ei ole yksittäisten henkilöiden varassa.",
    service: "implementation",
  },
  ready: {
    title: "Vahva lähtötilanne",
    text: "Dokumentoiduilla käytännöillä sertifiointi on usein lyhyempi askel kuin oletetaan. Valmiusarviointi osoittaa jäljellä olevat puutteet.",
    service: "readiness",
  },
};

// ---------------------------------------------------------------------------
// TIETOVISAT
// Jokainen kysymys liittyy aiheeseen (kenttä "topic"). Väärin menneet aiheet
// näytetään pelin lopussa: miksi aihe on liiketoiminnalle olennainen ja mikä palvelumme auttaa.
// ---------------------------------------------------------------------------
const TOPICS = {
  internal_audit: {
    title: "Sisäinen auditointi",
    pitch: "Sisäinen auditointi (9.2) on yleisimpiä poikkeamien lähteitä sertifiointiauditoinneissa. Sen tehtävä on löytää puutteet ennen asiakasta tai hyökkääjää.",
    service: "internal_audit",
  },
  risk: {
    title: "Riskienhallinta ja SoA",
    pitch: "ISO 27001 ei edellytä kaikkea vaan oikeat asiat teidän riskienne perusteella. Siksi se sopii myös pienemmille organisaatioille.",
    service: "risk",
  },
  controls: {
    title: "Liite A:n kontrollit",
    pitch: "93 kontrollia kattavat etätyöstä pilvipalveluihin ja turvalliseen ohjelmistokehitykseen. Useimmilla organisaatioilla osa niistä on jo käytössä.",
    service: "gap",
  },
  management: {
    title: "Johdon vastuu",
    pitch: "ISO 27001 tekee tietoturvasta johtamisen välineen eikä pelkästään IT:n asiaa. Myös NIS2 asettaa johdolle henkilökohtaisia velvoitteita.",
    service: "training",
  },
  awareness: {
    title: "Henkilöstön osaaminen",
    pitch: "Merkittävä osa tietoturvapoikkeamista alkaa inhimillisestä virheestä. Standardi edellyttää koulutusta ja näyttöä osaamisesta.",
    service: "training",
  },
  improvement: {
    title: "Mittarit ja jatkuva parantaminen",
    pitch: "Sertifiointi ei ole kertaluonteinen projekti. Mitattavat tavoitteet ja toimiva poikkeamaprosessi pitävät järjestelmän hyödyllisenä vuodesta toiseen.",
    service: "continuous",
  },
  certification: {
    title: "Sertifiointiprosessi",
    pitch: "Sertifiointi on selkeä prosessi, kun vaiheet ja aikataulu ovat tiedossa. Valmiusarviointi poistaa epävarmuuden ennen varsinaista auditointia.",
    service: "readiness",
  },
  basics: {
    title: "ISMS:n perusteet",
    pitch: "Hallintajärjestelmä kuulostaa raskaalta, mutta oikein mitoitettuna se on kevyt ja tukee liiketoimintaa.",
    service: "implementation",
  },
};

const GAMES = [
  {
    id: "quiz",
    tag: "Perusteet · 8 kysymystä",
    title: "ISO 27001:n perusteet",
    subtitle: "Käsitteet, rakenne ja sertifiointi.",
    questions: [
      {
        topic: "risk", q: "Mistä sanoista lyhenne SoA tulee?",
        options: ["Statement of Applicability", "Scope of Audit", "Security of Assets", "System of Accountability"],
        correct: 0,
        explain: "Statement of Applicability eli soveltamislausunto (6.1.3 d) listaa liite A:n kontrollit, niiden valintaperusteet ja toteutustilanteen.",
      },
      {
        topic: "controls", q: "Montako kontrollia ISO 27001:2022:n liite A sisältää?",
        options: ["114", "93", "72", "120"],
        correct: 1,
        explain: "93 kontrollia. Vuoden 2013 versiossa niitä oli 114.",
      },
      {
        topic: "controls", q: "Mikä seuraavista ei ole liite A:n teema?",
        options: ["Organisatoriset", "Ihmisiin liittyvät", "Taloudelliset", "Teknologiset"],
        correct: 2,
        explain: "Teemat ovat organisatoriset (5), ihmisiin liittyvät (6), fyysiset (7) ja teknologiset (8) kontrollit.",
      },
      {
        topic: "basics", q: "Mistä sanoista lyhenne ISMS tulee?",
        options: ["Integrated Security Monitoring System", "Information Security Management System", "International Standard for Managed Security", "IT Service Management Standard"],
        correct: 1,
        explain: "Information Security Management System eli tietoturvallisuuden hallintajärjestelmä.",
      },
      {
        topic: "basics", q: "Mitä tietoturvan CIA-kolmio tarkoittaa?",
        options: ["Cyber Incident Assessment", "Control, Inspection, Audit", "Confidentiality, Integrity, Availability", "Compliance, Information, Assurance"],
        correct: 2,
        explain: "Luottamuksellisuus, eheys ja saatavuus ovat tietoturvan kolme perusominaisuutta.",
      },
      {
        topic: "controls", q: "Kuinka monta uutta kontrollia vuoden 2022 versioon lisättiin?",
        options: ["3", "11", "24", "Ei yhtään"],
        correct: 1,
        explain: "11 uutta kontrollia, muun muassa uhkatiedustelu (5.7), pilvipalvelujen tietoturva (5.23) ja turvallinen ohjelmointi (8.28).",
      },
      {
        topic: "certification", q: "Kuinka pitkään ISO 27001 -sertifikaatti on voimassa?",
        options: ["1 vuoden", "3 vuotta", "5 vuotta", "Toistaiseksi"],
        correct: 1,
        explain: "Kolme vuotta. Sertifiointijakson aikana tehdään vuosittaiset määräaikaisauditoinnit.",
      },
      {
        topic: "management", q: "Mikä lauseke käsittelee johdon katselmusta?",
        options: ["5.1", "7.4", "9.3", "10.2"],
        correct: 2,
        explain: "9.3 Johdon katselmus. Johdon on katselmoitava hallintajärjestelmä suunnitelluin väliajoin.",
      },
    ],
  },
  {
    id: "auditor",
    tag: "Lausekkeet 4–10 · 7 kysymystä",
    title: "Auditoijan näkökulma",
    subtitle: "Tunnistatteko, mihin vaatimukseen havainto liittyy?",
    questions: [
      {
        topic: "internal_audit", q: "Mikä lauseke on kokemuksemme mukaan yleisin poikkeamien lähde sertifiointiauditoinneissa?",
        options: ["4.3 Soveltamisala", "7.5 Dokumentoitu tieto", "9.2 Sisäinen auditointi", "5.2 Politiikka"],
        correct: 2,
        explain: "9.2 Sisäinen auditointi. Tyypillisiä puutteita: auditointiohjelma puuttuu, kaikkia osa-alueita ei auditoida tai auditoija arvioi omaa työtään.",
      },
      {
        topic: "internal_audit", q: "Havainto: Sisäisen auditoinnin tekijä auditoi itse laatimiaan prosesseja.",
        options: ["7.2 Pätevyys", "9.2 Sisäinen auditointi", "9.3 Johdon katselmus", "5.3 Roolit ja vastuut"],
        correct: 1,
        explain: "9.2 edellyttää, että auditoijat valitaan ja auditoinnit toteutetaan objektiivisesti ja puolueettomasti.",
      },
      {
        topic: "risk", q: "Havainto: Liite A:n kontrolleja on jätetty pois ilman dokumentoituja perusteluja.",
        options: ["6.1.3 Riskien käsittely (SoA)", "4.1 Toimintaympäristö", "8.1 Toiminnan suunnittelu", "10.1 Jatkuva parantaminen"],
        correct: 0,
        explain: "Soveltamislausunnon on sisällettävä perustelut sekä valituille että poisjätetyille kontrolleille (6.1.3 d).",
      },
      {
        topic: "management", q: "Havainto: Johto ei ole käsitellyt hallintajärjestelmän suorituskykyä eikä auditointituloksia.",
        options: ["9.1 Seuranta ja mittaus", "9.3 Johdon katselmus", "5.2 Politiikka", "7.4 Viestintä"],
        correct: 1,
        explain: "Johdon katselmuksen syötteisiin kuuluvat muun muassa auditointitulokset, poikkeamat ja tavoitteiden toteutuminen.",
      },
      {
        topic: "awareness", q: "Havainto: Henkilöstön tietoturvakoulutuksesta ei ole dokumentoitua näyttöä.",
        options: ["7.2 Pätevyys / 7.3 Tietoisuus", "8.3 Riskien käsittely", "4.2 Sidosryhmät", "9.2 Sisäinen auditointi"],
        correct: 0,
        explain: "Pätevyydestä on säilytettävä dokumentoitua tietoa, ja henkilöstön on oltava tietoinen tietoturvapolitiikasta.",
      },
      {
        topic: "improvement", q: "Havainto: Korjaavat toimenpiteet on toteutettu, mutta niiden vaikuttavuutta ei ole arvioitu.",
        options: ["6.2 Tavoitteet", "10.2 Poikkeamat ja korjaavat toimenpiteet", "9.3 Johdon katselmus", "7.1 Resurssit"],
        correct: 1,
        explain: "10.2 edellyttää myös toteutettujen korjaavien toimenpiteiden vaikuttavuuden katselmointia.",
      },
      {
        topic: "improvement", q: "Havainto: Tietoturvatavoitteet on kirjattu, mutta niiden toteutumista ei seurata.",
        options: ["6.2 Tietoturvatavoitteet", "5.1 Johtajuus", "8.2 Riskien arviointi", "4.4 Hallintajärjestelmä"],
        correct: 0,
        explain: "Tavoitteiden on oltava mitattavia, mikäli mahdollista, ja niiden toteutumista on seurattava (6.2).",
      },
    ],
  },
  {
    id: "sort",
    tag: "Liite A · 10 kontrollia",
    title: "Liite A:n teemat",
    subtitle: "Mihin neljästä teemasta kontrolli kuuluu?",
    topic: "controls", // oletusaihe kaikille tämän pelin kysymyksille
    fixedOptions: ["Organisatoriset (5)", "Ihmisiin liittyvät (6)", "Fyysiset (7)", "Teknologiset (8)"],
    prompt: "Mihin teemaan kontrolli kuuluu?",
    questions: [
      { q: "Uhkatiedustelu", correct: 0, explain: "5.7 Uhkatiedustelu on yksi vuoden 2022 version uusista kontrolleista." },
      { q: "Etätyö", correct: 1, explain: "6.7 Etätyö kuuluu ihmisiin liittyviin kontrolleihin." },
      { q: "Puhdas pöytä ja tyhjä näyttö", correct: 2, explain: "7.7 Puhdas pöytä ja tyhjä näyttö on fyysinen kontrolli." },
      { q: "Turvallinen ohjelmointi", correct: 3, explain: "8.28 Turvallinen ohjelmointi on uusi teknologinen kontrolli." },
      { q: "Taustatarkistukset", correct: 1, explain: "6.1 Taustatarkistukset tehdään ennen palvelussuhteen alkua." },
      { q: "Pilvipalvelujen käytön tietoturva", correct: 0, explain: "5.23 on uusi organisatorinen kontrolli." },
      { q: "Fyysisen turvallisuuden valvonta", correct: 2, explain: "7.4 Fyysisen turvallisuuden valvonta lisättiin vuoden 2022 versioon." },
      { q: "Tietovuotojen estäminen", correct: 3, explain: "8.12 Tietovuotojen estäminen (DLP) on uusi teknologinen kontrolli." },
      { q: "Salassapitosopimukset", correct: 1, explain: "6.6 Salassapito- tai vaitiolosopimukset." },
      { q: "Tallennusvälineet", correct: 2, explain: "7.10 Tallennusvälineet on fyysinen kontrolli." },
    ],
  },
  {
    id: "truefalse",
    tag: "Väittämät · 10 s / kysymys",
    title: "Pitääkö paikkansa?",
    subtitle: "Yleisiä käsityksiä ISO 27001:stä.",
    timer: 10,
    fixedOptions: ["Pitää paikkansa", "Ei pidä paikkaansa"],
    questions: [
      { topic: "risk", q: "Kaikki liite A:n kontrollit on toteutettava.", correct: 1, explain: "Ei pidä. Kontrollit valitaan riskien perusteella, ja poisjätöt perustellaan soveltamislausunnossa." },
      { topic: "certification", q: "ISO 27001 -sertifikaatti on voimassa kolme vuotta.", correct: 0, explain: "Pitää. Välissä tehdään vuosittaiset määräaikaisauditoinnit." },
      { topic: "certification", q: "ISO 27002 on standardi, johon organisaatio voi sertifioitua.", correct: 1, explain: "Ei pidä. ISO 27002 on ohjeistus kontrollien toteutukseen; sertifiointi tehdään ISO 27001:een." },
      { topic: "certification", q: "Siirtymäaika vuoden 2013 versiosta vuoden 2022 versioon päättyi lokakuussa 2025.", correct: 0, explain: "Pitää. Vuoden 2013 version sertifikaatit lakkasivat olemasta voimassa 31.10.2025." },
      { topic: "internal_audit", q: "Ulkoinen sertifiointiauditointi korvaa sisäisen auditoinnin.", correct: 1, explain: "Ei pidä. Sisäinen auditointi (9.2) on oma, pakollinen vaatimuksensa." },
      { topic: "basics", q: "ISO 27001 määrittelee, mitä tietoturvatuotteita organisaation on käytettävä.", correct: 1, explain: "Ei pidä. Standardi on teknologianeutraali: se määrittää mitä on hallittava, ei millä välineillä." },
      { topic: "controls", q: "Vuoden 2022 versiossa liite A:n kontrollit on jaettu neljään teemaan.", correct: 0, explain: "Pitää: organisatoriset, ihmisiin liittyvät, fyysiset ja teknologiset." },
      { topic: "management", q: "Ylimmän johdon on osoitettava johtajuutta ja sitoutumista hallintajärjestelmään.", correct: 0, explain: "Pitää. Lauseke 5.1 Johtajuus ja sitoutuminen." },
    ],
  },
];
