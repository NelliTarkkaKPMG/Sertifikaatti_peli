// SUOMENKIELINEN SISÄLTÖ – muokkaa vapaasti.
// Englanninkielinen vastine on tiedostossa content-en.js. Avaimet (id, topic, service, reason)
// on pidettävä samoina molemmissa tiedostoissa, jotta kielen vaihto toimii kesken pelin.
// Visakysymysten oikea vastaus merkitään kentällä "correct" (vaihtoehdon indeksi, 0 = ensimmäinen).

(window.CONTENT = window.CONTENT || {}).fi = (function () {

// Käyttöliittymän tekstit
const UI = {
  menu: "‹ Valikko",
  startEyebrow: "ISO/IEC 27001:2022",
  startTitle: "Onko yrityksenne valmis ISO 27001 -sertifiointiin?",
  startLead: "Selvittäkää muutamassa minuutissa, mitä hyötyä sertifikaatista olisi liiketoiminnallenne ja missä vaiheessa organisaationne on – ja testaa samalla omat ISO 27001 -tietosi. Saatte lopuksi suositellun etenemispolun.",
  companyLabel: "Yrityksen nimi (vapaaehtoinen)",
  startBtn: "Aloita",
  privacy: "Vastauksia ei tallenneta eikä lähetetä minnekään.",
  chooseSection: "Valitkaa osio",
  done: "Tehty",
  recommendStart: "Suosittelemme aloittamaan tästä",
  orgSection: "Yrityksenne",
  testSection: "Testaa oma ISO 27001 -osaamisesi",
  correctOf: (n, t) => `${n}/${t} oikein`,
  showSummary: "Näytä yhteenveto ja suositukset",
  restart: "Aloita alusta",
  surveyLabel: "Tarvekartoitus",
  surveyResult: "Tarvekartoituksen tulos",
  showPath: "Näytä suositeltu etenemispolku",
  testKnowledge: "Testaa oma ISO 27001 -osaamisesi",
  meterAria: "Tarve",
  meterScale: ["Vähäinen", "Kohtalainen", "Suuri"],
  benefits: "Liiketoimintahyödyt",
  benefitsYou: "Liiketoimintahyödyt teille",
  timeUp: "Aika päättyi",
  correct: "Oikein",
  wrong: "Väärin",
  showResult: "Näytä tulos",
  next: "Seuraava",
  nextSection: "Seuraava osio:",
  knowledgeLevels: [
    { min: 0.85, title: "Asiantuntija", text: "Tunnet standardin erinomaisesti. Sinunlaisesi osaaja on ISO 27001 -projektin tärkein voimavara – me tuomme rinnalle menetelmät ja kokemuksen sertifiointiin asti." },
    { min: 0.6, title: "Hyvä perustietämys", text: "Tunnet standardin perusteet hyvin. Muutamat yksityiskohdat ovat juuri niitä, joihin auditoinneissa usein kompastutaan – niissä voimme auttaa." },
    { min: 0, title: "Hyvä hetki perehtyä", text: "ISO 27001 ei ole kaikille arkipäivää – siksi teemme sen kanssa töitä päivittäin. Kerromme mielellämme lisää osastollamme." },
  ],
  needLabel: "Liiketoimintatarve",
  knowledgeLabel: "Oma ISO 27001 -osaamisesi",
  summary: "Yhteenveto",
  finalTitle: "Teidän polkunne ISO 27001 -sertifikaattiin",
  doSurvey: "Tehkää tarvekartoitus tarkempaa suositusta varten",
  pathTitle: "Suositeltu etenemispolku",
  findUs: "Tavattavissa",
  continueTests: "Jatka testejä",
  backToMenu: "Takaisin valikkoon",
  whatItMeans: "Mitä tämä tarkoittaa liiketoiminnallenne",
  ourService: "Palvelumme",
  strongTitle: "Tunnet aiheen hyvin",
  strongText: "Tiedät, mitä standardi vaatii. Seuraava kysymys on, kuinka lähellä organisaationne on sertifiointia – sen kertoo valmiusarviointi.",
  newPlayer: "Valmis – uusi pelaaja",
  readinessOf: (p) => `Valmiusaste ${p} %`,
  readinessLabel: "Nykytila",
  gapsTitle: "Kehityskohteet",
  inPlaceTitle: "Jo kunnossa",
};

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
// ---------------------------------------------------------------------------
// ALKUKYSYMYKSET: kysytään heti aloituksen jälkeen. ISO 27001 on aina pääsuositus;
// näiden vastausten perusteella yhteenvetoon nostetaan lisäksi ISO 42001 ja/tai ISO 22301.
// "recommend": standardin avain (STANDARDS), "points" ≥ "threshold" → suositellaan.
// ---------------------------------------------------------------------------
const PROFILE = {
  eyebrow: "Kaksi kysymystä yrityksestänne",
  threshold: 1,
  questions: [
    {
      id: "ai",
      recommend: "iso42001",
      q: "Hyödyntääkö yrityksenne tekoälyä tuotteissa, palveluissa tai sisäisessä toiminnassa?",
      options: [
        { label: "Kyllä, laajasti", points: 2 },
        { label: "Jonkin verran tai kokeilemme", points: 1 },
        { label: "Ei", points: 0 },
      ],
    },
    {
      id: "continuity",
      recommend: "iso22301",
      q: "Kuinka kriittistä toimintanne jatkuvuus on? Mitä tapahtuisi, jos keskeiset järjestelmät olisivat poissa käytöstä päivän?",
      options: [
        { label: "Erittäin kriittistä – vaikutus olisi merkittävä", points: 2 },
        { label: "Haitallista, mutta selviäisimme", points: 1 },
        { label: "Ei merkittävää vaikutusta", points: 0 },
      ],
    },
  ],
};

// Muut johtamisjärjestelmästandardit, jotka nostetaan ISO 27001:n rinnalle.
const STANDARDS = {
  title: "Samalla kertaa",
  lead: "ISO 27001 on teille ensisijainen suositus. Vastaustenne perusteella sen rinnalle kannattaa harkita myös näitä:",
  iso42001: {
    name: "ISO/IEC 42001 – tekoälyn hallintajärjestelmä",
    text: "Kun tekoäly on osa liiketoimintaa, ISO 42001 tuo sen käyttöön hallitut riskit, vastuut ja läpinäkyvyyden. Se tukee myös EU:n tekoälysäädöksen vaatimuksiin valmistautumista ja rakentuu samalle pohjalle kuin ISO 27001.",
  },
  iso22301: {
    name: "ISO 22301 – liiketoiminnan jatkuvuuden hallinta",
    text: "Kun katkos olisi kriittinen, ISO 22301 varmistaa, että toiminta jatkuu häiriöissä ja palautuu hallitusti. Jatkuvuudenhallinta on myös osa NIS2:n vaatimuksia, ja se täydentää ISO 27001:n kontrolleja.",
  },
  iso9001: "Onko teillä jo ISO 9001 -laatujärjestelmä? ISO 27001, 22301 ja 42001 noudattavat samaa rakennetta, joten ne voidaan rakentaa yhdeksi integroiduksi johtamisjärjestelmäksi.",
};

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
    subtitle: "Tunnetko käsitteet, rakenteen ja sertifioinnin?",
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
    subtitle: "Tunnistatko, mihin vaatimukseen havainto liittyy?",
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
    id: "maturity",
    type: "checklist", // ei oikeita vastauksia – mittaa, mitä organisaatiossa on jo tehty
    tag: "Nykytila · 10 kysymystä",
    title: "Mitä organisaatiossanne on jo tehty?",
    subtitle: "Arvio nykytilasta – ei oikeita tai vääriä vastauksia.",
    // Vastausasteikko: points 2 = kunnossa, 1 = osittain, 0 = puuttuu
    scale: [
      { label: "Kyllä", points: 2 },
      { label: "Osittain", points: 1 },
      { label: "Ei", points: 0 },
      { label: "En tiedä", points: 0 },
    ],
    // Tulostasot valmiusasteen mukaan (0–1)
    levels: [
      { min: 0.75, title: "Vakiintunut", text: "Monet keskeiset käytännöt ovat jo käytössä. Sertifiointi voi olla lähempänä kuin arvaattekaan – valmiusarviointi kertoo, mitä vielä puuttuu." },
      { min: 0.4, title: "Kehittyvä", text: "Hyvä alku: osa käytännöistä on kunnossa, osa puuttuu. Gap-analyysi priorisoi loput ja näyttää realistisen aikataulun." },
      { min: 0, title: "Alkuvaihe", text: "Monet perusasiat ovat vielä tekemättä. Jäsennelty käyttöönotto etenee hallitusti, ja pääsette nopeasti vauhtiin." },
    ],
    // "short" näytetään Jo kunnossa -listassa, "why" ja "service" kehityskohteissa
    questions: [
      { id: "policy", ref: "5.2 · A.5.1", q: "Onko teillä johdon hyväksymä tietoturvapolitiikka, joka on viestitty koko henkilöstölle?", short: "Tietoturvapolitiikka", why: "Politiikka on hallintajärjestelmän perusta ja osoittaa johdon sitoutumisen – auditoija aloittaa usein siitä.", service: "implementation" },
      { id: "risk", ref: "6.1.2 · 8.2", q: "Onko teillä arvioitu ja dokumentoitu tietoturvariskit viimeisen vuoden aikana?", short: "Riskienarviointi", why: "Ilman ajantasaista riskiarviota suojaukset valitaan arvaamalla. Riskiarvio ohjaa koko standardin toteutusta.", service: "risk" },
      { id: "assets", ref: "A.5.9", q: "Onko teillä ajantasainen luettelo järjestelmistä, laitteista ja tiedoista sekä niiden omistajista?", short: "Tieto-omaisuuden luettelo", why: "Sitä ei voi suojata, mitä ei tunne. Omaisuusluettelo on riskienarvioinnin lähtökohta.", service: "gap" },
      { id: "access", ref: "A.5.15 · A.5.18", q: "Onko teillä käyttöoikeudet myönnetty tarpeen mukaan ja katselmoitu säännöllisesti?", short: "Käyttöoikeuksien hallinta", why: "Vanhentuneet ja liian laajat käyttöoikeudet ovat yksi yleisimmistä auditointihavainnoista ja tietomurtojen reiteistä.", service: "gap" },
      { id: "mfa", ref: "A.8.5", q: "Onko teillä monivaiheinen tunnistautuminen käytössä kaikissa kriittisissä järjestelmissä?", short: "Monivaiheinen tunnistautuminen", why: "Monivaiheinen tunnistautuminen estää valtaosan tunnusten kalasteluun perustuvista hyökkäyksistä.", service: "gap" },
      { id: "backup", ref: "A.8.13", q: "Onko teillä testattu varmuuskopioiden palauttaminen käytännössä?", short: "Testatut varmuuskopiot", why: "Varmuuskopio on arvokas vain, jos sen palauttaminen toimii. Testaamaton varmuuskopio on riski kiristyshaittaohjelmatilanteessa.", service: "gap" },
      { id: "incident", ref: "A.5.24–A.5.26", q: "Onko teillä sovittu prosessi ja vastuuhenkilöt tietoturvapoikkeamien käsittelyyn?", short: "Poikkeamien käsittely", why: "NIS2 edellyttää merkittävistä poikkeamista ilmoittamista tiukoissa määräajoissa – se onnistuu vain sovitulla prosessilla.", service: "nis2" },
      { id: "suppliers", ref: "A.5.19–A.5.20", q: "Onko teillä asetettu toimittajille ja pilvipalveluille tietoturvavaatimukset sopimuksissa?", short: "Toimittajavaatimukset", why: "Merkittävä osa tietoturvapoikkeamista tulee toimitusketjun kautta. Vaatimukset sopimuksissa ovat ensimmäinen suojakeino.", service: "risk" },
      { id: "training", ref: "7.2–7.3 · A.6.3", q: "Onko teillä henkilöstölle säännöllistä tietoturvakoulutusta, ja kirjataanko osallistuminen?", short: "Henkilöstön koulutus", why: "Inhimillinen virhe on yleinen poikkeaman alku. Standardi edellyttää myös näyttöä koulutuksesta.", service: "training" },
      { id: "audit", ref: "9.2", q: "Onko teillä auditoitu tietoturvaa sisäisesti tai ulkoisesti viimeisen vuoden aikana?", short: "Tietoturva-auditointi", why: "Säännöllinen auditointi löytää puutteet ennen asiakasta tai hyökkääjää – ja on pakollinen osa ISO 27001:tä.", service: "internal_audit" },
    ],
  },
  {
    id: "truefalse",
    tag: "Väittämät · 10 s / kysymys",
    title: "Pitääkö paikkansa?",
    subtitle: "Erotatko faktat yleisistä harhaluuloista?",
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

return { UI, CONFIG, PROFILE, STANDARDS, SERVICES, SURVEY, REASONS, TOPICS, GAMES };
})();
