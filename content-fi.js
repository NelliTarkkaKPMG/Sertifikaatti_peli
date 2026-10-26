// SUOMENKIELINEN SISÄLTÖ: muokkaa vapaasti.
// Englanninkielinen vastine on tiedostossa content-en.js. Avaimet (id, topic, service, reason)
// on pidettävä samoina molemmissa tiedostoissa, jotta kielen vaihto toimii kesken pelin.
// Visakysymysten oikea vastaus merkitään kentällä "correct" (vaihtoehdon indeksi, 0 = ensimmäinen).

(window.CONTENT = window.CONTENT || {}).fi = (function () {

// Käyttöliittymän tekstit
const UI = {
  menu: "‹ Valikko",
  startEyebrow: "ISO/IEC 27001:2022",
  startTitle: "Onko yrityksenne valmis ISO 27001 -sertifiointiin?",
  startLead: "Muutamassa minuutissa näette, mitä hyötyä sertifikaatista olisi yrityksellenne ja missä vaiheessa olette nyt. Samalla voit testata, miten hyvin itse tunnet ISO 27001:n. Lopuksi saatte ehdotuksen siitä, miten edetä.",
  companyLabel: "Yrityksen nimi (vapaaehtoinen)",
  startBtn: "Aloita",
  privacy: "Vastauksia ei tallenneta eikä lähetetä minnekään. Testi ei sido teitä mihinkään.",
  chooseSection: "Valitkaa osio",
  done: "Tehty",
  recommendStart: "Aloita tästä",
  orgSection: "Yrityksenne",
  testSection: "Testaa oma ISO 27001 -osaamisesi",
  correctOf: (n, t) => `${n}/${t} oikein`,
  showSummary: "Näytä yhteenveto ja suositukset",
  restart: "Aloita alusta",
  surveyLabel: "Tarvekartoitus",
  surveyResult: "Tarvekartoituksen tulos",
  showPath: "Näytä ehdotuksemme",
  testKnowledge: "Testaa oma ISO 27001 -osaamisesi",
  meterAria: "Tarve",
  meterScale: ["Vähäinen", "Kohtalainen", "Suuri"],
  benefits: "Mitä hyötyä sertifikaatista on",
  benefitsYou: "Mitä hyötyä sertifikaatista olisi teille",
  timeUp: "Aika loppui. Oikea vastaus näkyy vihreällä.",
  correct: "Oikein",
  wrong: "Hyvä yritys. Oikea vastaus näkyy vihreällä.",
  showResult: "Näytä tulos",
  next: "Seuraava",
  nextSection: "Seuraava osio:",
  knowledgeLevels: [
    { min: 0.85, title: "Erinomainen tulos", text: "Tunnet standardin hyvin. Tällaisesta osaamisesta on paljon hyötyä, kun yritys valmistautuu sertifiointiin." },
    { min: 0.5, title: "Hyvä tulos", text: "Perusteet ovat hallussa, ja selityksistä löytyi ehkä pari uutta yksityiskohtaa. Niistä on hyötyä myös käytännön työssä." },
    { min: 0, title: "Hyvä alku", text: "Kiitos, että osallistuit. Kysymykset olivat osin visaisia, ja selityksistä näet oikeat vastaukset. Asiantuntijamme kertovat mielellään lisää." },
  ],
  needLabel: "Liiketoimintatarve",
  knowledgeLabel: "Oma ISO 27001 -osaamisesi",
  summary: "Yhteenveto",
  finalTitle: "Näin pääsette ISO 27001 -sertifikaattiin",
  doSurvey: "Tehkää tarvekartoitus, niin saatte tarkemman suosituksen",
  pathTitle: "Ehdotuksemme: näin etenisimme",
  whyLabel: "Miksi teille",
  pathLead: "Ehdotus perustuu vastauksiinne.",
  pathLeadGeneric: "Tämä on yleinen ehdotus. Vastatkaa tarvekartoitukseen tai nykytilan kysymyksiin, niin räätälöimme sen teille.",
  whyChecklist: (s) => `Nykytilassa kohta ”${s}” on vielä työn alla.`,
  whySurvey: (t) => `Tarvekartoituksessa korostui: ${t}.`,
  whyQuiz: (t) => `Visan perusteella aiheesta ”${t}” kannattaa jutella lisää.`,
  whyStep: {
    gap: "Näette, mikä on jo kunnossa ja mitä vielä tarvitaan.",
    gapEarly: "Aloitetaan selvittämällä lähtötilanne, niin työ etenee oikeassa järjestyksessä.",
    implementation: "Vastaustenne perusteella perusta kannattaa rakentaa kerralla kuntoon.",
    readiness: "Varmistaa, että sertifiointiauditointi sujuu ilman yllätyksiä.",
    internalAuditReady: "Käytäntönne ovat jo pitkällä, joten seuraavaksi ne kannattaa tarkistaa auditoijan silmin.",
    internalAuditRequired: "ISO 27001 edellyttää sisäistä auditointia ennen sertifiointia.",
    continuous: "Pitää järjestelmän hyödyllisenä myös sertifioinnin jälkeen.",
  },  goal: {
    label: "Tavoite",
    title: "ISO 27001 -sertifikaatti",
    text: "Akkreditoitu sertifiointielin tekee sertifiointiauditoinnin kahdessa vaiheessa. Autamme valmistautumaan ja tuemme teitä myös sertifioinnin jälkeen.",
  },

  findUs: "Tavattavissa",
  continueTests: "Jatka testejä",
  backToMenu: "Takaisin valikkoon",
  whatItMeans: "Hyvä tietää",
  ourService: "Palvelumme",
  strongTitle: "Tunnet aiheen hyvin",
  strongText: "Tiedät, mitä standardi vaatii. Valmiusarviointi näyttää, kuinka lähellä yrityksenne on sertifiointia.",
  newPlayer: "Uusi pelaaja",
  readinessOf: (p) => `Valmiusaste ${p} %`,
  readinessLabel: "Nykytila",
  gapsTitle: "Mistä kannattaa jatkaa",
  inPlaceTitle: "Nämä ovat jo kunnossa",
};

const CONFIG = {
  brand: "ISO 27001 -valmiustesti",
  // Messuosaston nimi/numero, esim. "osastolla B12"
  stand: "osastollamme",
  // Yhteenvedon lopun keskustelulaatikko: kävijä näyttää ruudun konsultille
  talkTitle: "Jutellaan tilanteestanne",
  talkText: "Näyttäkää tämä yhteenveto konsultillemme. Käydään yhdessä läpi, missä olette nyt, mitä sertifiointi teiltä vaatisi ja kuinka nopeasti siihen voisi päästä.",
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
      q: "Käyttääkö yrityksenne tekoälyä tuotteissa, palveluissa tai omassa toiminnassaan?",
      options: [
        { label: "Kyllä, laajasti", points: 2 },
        { label: "Jonkin verran tai kokeilemme", points: 1 },
        { label: "Ei", points: 0 },
      ],
    },
    {
      id: "continuity",
      recommend: "iso22301",
      q: "Mitä tapahtuisi, jos tärkeimmät järjestelmänne olisivat poissa käytöstä vuorokauden?",
      options: [
        { label: "Vaikutus olisi vakava", points: 2 },
        { label: "Haitallista, mutta selviäisimme", points: 1 },
        { label: "Ei suurta vaikutusta", points: 0 },
      ],
    },
  ],
};

// Muut johtamisjärjestelmästandardit, jotka nostetaan ISO 27001:n rinnalle.
const STANDARDS = {
  title: "Myös nämä voisivat sopia teille",
  lead: "Ensisijainen suosituksemme on ISO 27001. Vastaustenne perusteella sen rinnalle sopisivat myös nämä:",
  iso42001: {
    code: "ISO/IEC 42001",
    name: "ISO/IEC 42001: tekoälyn hallintajärjestelmä",
    text: "Kun tekoäly on osa liiketoimintaa, ISO 42001 auttaa hallitsemaan sen riskejä ja sopimaan vastuista. Standardi auttaa myös valmistautumaan EU:n tekoälyasetukseen, ja se rakentuu samalle pohjalle kuin ISO 27001.",
  },
  iso22301: {
    code: "ISO 22301",
    name: "ISO 22301: liiketoiminnan jatkuvuuden hallinta",
    text: "ISO 22301 auttaa varautumaan häiriöihin niin, että toiminta jatkuu ja palautuu hallitusti. Jatkuvuudenhallinta kuuluu myös NIS2:n vaatimuksiin, ja se täydentää ISO 27001:n kontrolleja.",
  },
  iso9001: "Onko teillä jo ISO 9001 -laatujärjestelmä? ISO 27001, 22301 ja 42001 noudattavat samaa rakennetta, joten ne on helppo yhdistää samaan johtamisjärjestelmään.",
};

const SERVICES = {
  gap: {
    name: "Gap-analyysi",
    text: "Selvitämme, miten nykyiset käytäntönne vastaavat ISO 27001:n vaatimuksia ja liite A:n kontrolleja. Saatte tärkeysjärjestykseen laitetun toimenpidelistan ja realistisen aikataulun sertifiointiin.",
  },
  implementation: {
    name: "ISMS:n käyttöönotto",
    text: "Rakennamme kanssanne tietoturvan hallintajärjestelmän. Politiikat, prosessit ja dokumentit mitoitetaan yrityksenne koon ja riskien mukaan.",
  },
  risk: {
    name: "Riskienarviointi ja SoA",
    text: "Vedämme riskienarvioinnin työpajan ja laadimme soveltamislausunnon (SoA), joka perustelee kontrollien valinnat ja kestää auditoijan tarkastelun.",
  },
  training: {
    name: "Johdon ja henkilöstön koulutus",
    text: "Koulutamme johdon ja henkilöstön tietoturva-asioissa ja dokumentoimme osaamisen auditointia varten.",
  },
  internal_audit: {
    name: "Sisäinen auditointi",
    text: "Teemme riippumattoman sisäisen auditoinnin tai koulutamme omat sisäiset auditoijanne.",
  },
  readiness: {
    name: "Sertifiointivalmiuden arviointi",
    text: "Esiauditoinnissa käydään läpi samat asiat kuin sertifiointiauditoinnissa. Näin varsinaisessa auditoinnissa ei tule yllätyksiä.",
  },
  nis2: {
    name: "NIS2-vaatimustenmukaisuus",
    text: "Arvioimme kyberturvallisuuslain velvoitteet ja yhdistämme ne ISO 27001 -työhön, jotta samaa työtä ei tehdä kahteen kertaan.",
  },
  continuous: {
    name: "Jatkuva tuki",
    text: "Tuemme myös sertifioinnin jälkeen: mittareissa, johdon katselmuksissa ja vuosittaisiin auditointeihin valmistautumisessa. Tarvittaessa toimimme ulkoistettuna tietoturvapäällikkönä.",
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
    { min: 0, title: "Strateginen etu", text: "Teillä on hyvä tilaisuus edetä omassa tahdissa. Ajoissa aloitettu työ on kustannustehokkainta ja tuo kilpailuetua." },
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
    title: "Tukea kasvulle",
    text: "Kansainvälisesti tunnettu sertifikaatti helpottaa pääsyä suurempiin asiakkuuksiin ja uusille markkinoille.",
    service: "gap",
  },
  structure: {
    title: "Selkeät vastuut ja käytännöt",
    text: "Kun vastuut ja käytännöt on sovittu, tietoturva ei ole yksittäisten ihmisten muistin varassa.",
    service: "implementation",
  },
  ready: {
    title: "Vahva lähtötilanne",
    text: "Kun käytännöt on jo dokumentoitu, sertifiointi on usein lähempänä kuin luulisi. Valmiusarviointi näyttää, mitä vielä puuttuu.",
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
    pitch: "Hyvin hoidettu sisäinen auditointi (9.2) tekee sertifioinnista sujuvan. Kehityskohteet löytyvät ajoissa, ja ne ehtii korjata omassa tahdissa.",
    service: "internal_audit",
  },
  risk: {
    title: "Riskienhallinta ja SoA",
    pitch: "ISO 27001 ei vaadi kaikkea, vaan sen, mikä on teidän riskienne kannalta olennaista. Siksi se sopii myös pienille yrityksille.",
    service: "risk",
  },
  controls: {
    title: "Liite A:n kontrollit",
    pitch: "Liite A:n 93 kontrollia kattavat kaiken etätyöstä pilvipalveluihin ja turvalliseen ohjelmistokehitykseen. Useimmilla yrityksillä osa niistä on jo käytössä.",
    service: "gap",
  },
  management: {
    title: "Johdon vastuu",
    pitch: "ISO 27001 tekee tietoturvasta johdon työkalun eikä pelkästään IT:n asiaa. Se tukee johtoa myös NIS2:n velvoitteissa.",
    service: "training",
  },
  awareness: {
    title: "Henkilöstön osaaminen",
    pitch: "Tietoturva on paljolti ihmisten arkisia valintoja. Standardi edellyttää säännöllistä koulutusta, ja osaaminen myös dokumentoidaan.",
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
    pitch: "Hallintajärjestelmän ei tarvitse olla raskas. Kun se mitoitetaan yrityksen koon mukaan, se tukee arjen työtä.",
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
        explain: "Statement of Applicability eli soveltamislausunto (6.1.3 d) luettelee liite A:n kontrollit, niiden valintaperusteet ja toteutustilanteen.",
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
        explain: "9.2 edellyttää, että auditoijat valitaan ja auditoinnit tehdään puolueettomasti.",
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
        explain: "10.2 edellyttää myös, että korjaavien toimenpiteiden vaikuttavuus arvioidaan.",
      },
      {
        topic: "improvement", q: "Havainto: Tietoturvatavoitteet on kirjattu, mutta niiden toteutumista ei seurata.",
        options: ["6.2 Tietoturvatavoitteet", "5.1 Johtajuus", "8.2 Riskien arviointi", "4.4 Hallintajärjestelmä"],
        correct: 0,
        explain: "Tavoitteiden on oltava mahdollisuuksien mukaan mitattavia, ja niiden toteutumista on seurattava (6.2).",
      },
    ],
  },
  {
    id: "maturity",
    type: "checklist", // ei oikeita vastauksia; mittaa, mitä organisaatiossa on jo tehty
    tag: "Nykytila · 10 kysymystä",
    title: "Mitä organisaatiossanne on jo tehty?",
    subtitle: "Arvio nykytilasta. Ei oikeita tai vääriä vastauksia.",
    // Vastausasteikko: points 2 = kunnossa, 1 = osittain, 0 = puuttuu
    scale: [
      { label: "Kyllä", points: 2 },
      { label: "Osittain", points: 1 },
      { label: "Ei", points: 0 },
      { label: "En tiedä", points: 0 },
    ],
    // Tulostasot valmiusasteen mukaan (0–1)
    levels: [
      { min: 0.75, title: "Vahva pohja", text: "Monet keskeiset käytännöt ovat jo käytössä, joten sertifiointi voi olla lähempänä kuin luulette. Valmiusarviointi näyttää, mitä vielä tarvitaan." },
      { min: 0.4, title: "Hyvässä vauhdissa", text: "Iso osa perustasta on jo olemassa. Gap-analyysi auttaa päättämään, mitä tehdä seuraavaksi, ja antaa realistisen aikataulun." },
      { min: 0, title: "Hyvä hetki aloittaa", text: "Tästä vaiheesta eteneminen on usein nopeaa, koska jokainen tehty asia näkyy heti. Autamme rakentamaan perustan oikeassa järjestyksessä." },
    ],
    // "short" näytetään Jo kunnossa -listassa, "why" ja "service" kehityskohteissa
    questions: [
      { id: "policy", ref: "5.2 · A.5.1", q: "Onko teillä johdon hyväksymä tietoturvapolitiikka, joka on viestitty koko henkilöstölle?", short: "Tietoturvapolitiikka", why: "Politiikka antaa tietoturvatyölle suunnan ja näyttää johdon tuen. Siitä on hyvä aloittaa.", service: "implementation" },
      { id: "risk", ref: "6.1.2 · 8.2", q: "Onko teillä arvioitu ja kirjattu tietoturvariskit viimeisen vuoden aikana?", short: "Riskienarviointi", why: "Ajantasainen riskiarvio kertoo, mihin tietoturvassa kannattaa käyttää aikaa ja rahaa.", service: "risk" },
      { id: "assets", ref: "A.5.9", q: "Onko teillä ajantasainen luettelo järjestelmistä, laitteista ja tiedoista sekä niiden omistajista?", short: "Tieto-omaisuuden luettelo", why: "Kun tiedätte, mitä teillä on, suojaukset osuvat oikeaan kohtaan. Luettelo on myös riskienarvioinnin lähtökohta.", service: "gap" },
      { id: "access", ref: "A.5.15 · A.5.18", q: "Onko teillä sovittu, että käyttöoikeudet myönnetään vain tarpeeseen ja tarkistetaan säännöllisesti?", short: "Käyttöoikeuksien hallinta", why: "Ajantasaiset käyttöoikeudet ovat yksinkertainen ja tehokas tapa suojata tietoa. Auditoija tarkistaa ne lähes aina.", service: "gap" },
      { id: "mfa", ref: "A.8.5", q: "Onko teillä kaikissa kriittisissä järjestelmissä käytössä monivaiheinen tunnistautuminen?", short: "Monivaiheinen tunnistautuminen", why: "Monivaiheinen tunnistautuminen on edullinen ja nopea ottaa käyttöön, ja se torjuu valtaosan kalastelluilla tunnuksilla tehdyistä hyökkäyksistä.", service: "gap" },
      { id: "backup", ref: "A.8.13", q: "Onko teillä kokeiltu käytännössä, että varmuuskopioiden palautus toimii?", short: "Testatut varmuuskopiot", why: "Kun palautus on kokeiltu, tiedätte, että toiminta saadaan häiriön jälkeen nopeasti käyntiin.", service: "gap" },
      { id: "incident", ref: "A.5.24–A.5.26", q: "Onko teillä sovittu, miten tietoturvapoikkeamat käsitellään ja kuka niistä vastaa?", short: "Poikkeamien käsittely", why: "Kun toimintatapa on sovittu etukäteen, poikkeama hoituu rauhallisesti. Se auttaa myös täyttämään NIS2:n ilmoitusvelvollisuuden.", service: "nis2" },
      { id: "suppliers", ref: "A.5.19–A.5.20", q: "Onko teillä kirjattu tietoturvavaatimukset toimittajien ja pilvipalvelujen sopimuksiin?", short: "Toimittajavaatimukset", why: "Kun vaatimukset on kirjattu sopimuksiin, molemmat osapuolet tietävät, mitä tietoturvalta odotetaan.", service: "risk" },
      { id: "training", ref: "7.2–7.3 · A.6.3", q: "Onko teillä henkilöstölle säännöllistä tietoturvakoulutusta, ja kirjataanko osallistuminen?", short: "Henkilöstön koulutus", why: "Säännöllinen koulutus pitää tietoturvan mielessä arjessa, ja osallistumiskirjaukset käyvät samalla näytöksi auditoinnissa.", service: "training" },
      { id: "audit", ref: "9.2", q: "Onko teillä auditoitu tietoturva sisäisesti tai ulkoisesti viimeisen vuoden aikana?", short: "Tietoturva-auditointi", why: "Säännöllinen auditointi löytää kehityskohteet ajoissa, ja ne ehtii korjata omassa tahdissa. ISO 27001 edellyttää sitä joka tapauksessa.", service: "internal_audit" },
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
      { topic: "basics", q: "ISO 27001 määrittelee, mitä tietoturvatuotteita organisaation on käytettävä.", correct: 1, explain: "Ei pidä. Standardi on teknologianeutraali: se määrittää, mitä on hallittava, mutta ei sitä, millä välineillä." },
      { topic: "controls", q: "Vuoden 2022 versiossa liite A:n kontrollit on jaettu neljään teemaan.", correct: 0, explain: "Pitää: organisatoriset, ihmisiin liittyvät, fyysiset ja teknologiset." },
      { topic: "management", q: "Ylimmän johdon on osoitettava johtajuutta ja sitoutumista hallintajärjestelmään.", correct: 0, explain: "Pitää. Lauseke 5.1 Johtajuus ja sitoutuminen." },
    ],
  },
];

return { UI, CONFIG, PROFILE, STANDARDS, SERVICES, SURVEY, REASONS, TOPICS, GAMES };
})();
