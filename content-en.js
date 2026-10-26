// ENGLISH CONTENT – edit freely.
// The Finnish counterpart is in content-fi.js. Keys (id, topic, service, reason) must stay
// identical in both files so that switching language mid-game keeps the player's progress.
// A quiz question's right answer is set with "correct" (option index, 0 = first).

(window.CONTENT = window.CONTENT || {}).en = (function () {

// User interface texts
const UI = {
  menu: "‹ Menu",
  startEyebrow: "ISO/IEC 27001:2022",
  startTitle: "Is your company ready for ISO 27001 certification?",
  startLead: "Find out in a few minutes how certification would benefit your business and where your organisation stands today – and test your own ISO 27001 knowledge along the way. At the end you get a recommended path forward.",
  companyLabel: "Company name (optional)",
  startBtn: "Start",
  privacy: "Your answers are not stored or sent anywhere.",
  chooseSection: "Choose a section",
  done: "Done",
  recommendStart: "We recommend starting here",
  orgSection: "Your company",
  testSection: "Test your own ISO 27001 knowledge",
  correctOf: (n, t) => `${n}/${t} correct`,
  showSummary: "Show summary and recommendations",
  restart: "Start over",
  surveyLabel: "Needs assessment",
  surveyResult: "Needs assessment result",
  showPath: "Show recommended path",
  testKnowledge: "Test your own ISO 27001 knowledge",
  meterAria: "Need",
  meterScale: ["Low", "Moderate", "High"],
  benefits: "Business benefits",
  benefitsYou: "Business benefits for you",
  timeUp: "Time's up – here is the right answer",
  correct: "Correct!",
  wrong: "Good try! The right answer is marked in green.",
  showResult: "Show result",
  next: "Next",
  nextSection: "Next section:",
  knowledgeLevels: [
    { min: 0.85, title: "Top expert!", text: "Excellent – you know the standard inside out! With knowledge like this, ISO 27001 work is in strong hands." },
    { min: 0.5, title: "Great work!", text: "You know the standard well! Along the way you picked up a few useful details that come in handy in practice too." },
    { min: 0, title: "Great start!", text: "Great that you took part – now you know a little more about ISO 27001! Our experts are happy to tell you more." },
  ],
  needLabel: "Business need",
  knowledgeLabel: "Your ISO 27001 knowledge",
  summary: "Summary",
  finalTitle: "Your path to ISO 27001 certification",
  doSurvey: "Take the needs assessment for a more precise recommendation",
  pathTitle: "Recommended path",
  findUs: "Find us",
  continueTests: "Continue tests",
  backToMenu: "Back to menu",
  whatItMeans: "Good to know",
  ourService: "Our service",
  strongTitle: "You know your stuff",
  strongText: "You know what the standard requires. The next question is how close your organisation is to certification – a readiness assessment will tell.",
  newPlayer: "Done – new player",
  readinessOf: (p) => `Readiness ${p}%`,
  readinessLabel: "Current state",
  gapsTitle: "Next steps",
  inPlaceTitle: "Already in place – well done!",
};

const CONFIG = {
  brand: "ISO 27001 Readiness Test",
  // Stand name/number, e.g. "at stand B12"
  stand: "at our stand",
  // Talk box at the end of the summary – the visitor shows the screen to a consultant
  talkTitle: "Let's discuss your situation",
  talkText: "Show this summary to our consultant. We will go through your current situation and estimate what certification would require for you and how quickly you could realistically get there.",
};

// ---------------------------------------------------------------------------
// SERVICES
// Results point to these. Edit to match your own service offering.
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// OPENING QUESTIONS: asked right after the start screen. ISO 27001 is always the main
// recommendation; based on these answers ISO 42001 and/or ISO 22301 are added to the summary.
// "recommend": standard key (STANDARDS), "points" ≥ "threshold" → recommended.
// ---------------------------------------------------------------------------
const PROFILE = {
  eyebrow: "Two questions about your company",
  threshold: 1,
  questions: [
    {
      id: "ai",
      recommend: "iso42001",
      q: "Does your company use artificial intelligence in its products, services or internal operations?",
      options: [
        { label: "Yes, extensively", points: 2 },
        { label: "To some extent, or we are experimenting", points: 1 },
        { label: "No", points: 0 },
      ],
    },
    {
      id: "continuity",
      recommend: "iso22301",
      q: "How critical is the continuity of your operations? What would happen if your key systems were down for a day?",
      options: [
        { label: "Highly critical – the impact would be significant", points: 2 },
        { label: "Harmful, but we would manage", points: 1 },
        { label: "No significant impact", points: 0 },
      ],
    },
  ],
};

// Other management system standards recommended alongside ISO 27001.
const STANDARDS = {
  title: "At the same time",
  lead: "ISO 27001 is our primary recommendation for you. Based on your answers, it is also worth considering these alongside it:",
  iso42001: {
    name: "ISO/IEC 42001 – AI management system",
    text: "When AI is part of your business, ISO 42001 brings managed risks, responsibilities and transparency to its use. It also supports preparing for the EU AI Act and builds on the same foundation as ISO 27001.",
  },
  iso22301: {
    name: "ISO 22301 – business continuity management",
    text: "When an outage would be critical, ISO 22301 makes sure operations continue through disruptions and recover in a controlled way. Business continuity is also part of the NIS2 requirements, and it complements the ISO 27001 controls.",
  },
  iso9001: "Do you already have an ISO 9001 quality management system? ISO 27001, 22301 and 42001 share the same structure, so they can be built into one integrated management system.",
};

const SERVICES = {
  gap: {
    name: "Gap analysis",
    text: "We map your current state against the requirements of ISO 27001 and the Annex A controls. The result is a prioritised action plan and a realistic timeline to certification.",
  },
  implementation: {
    name: "ISMS implementation",
    text: "We build your information security management system with you: policies, processes and documentation sized to your organisation and its risks.",
  },
  risk: {
    name: "Risk assessment and SoA",
    text: "We facilitate the risk assessment and prepare a Statement of Applicability that justifies your control choices and stands up to an auditor's review.",
  },
  training: {
    name: "Management and staff training",
    text: "Information security training for management and staff, plus documented evidence of competence for the audit.",
  },
  internal_audit: {
    name: "Internal audit",
    text: "We carry out an independent internal audit or train your own internal auditors.",
  },
  readiness: {
    name: "Certification readiness assessment",
    text: "A pre-audit that simulates the certification audit and makes sure there are no surprises in the real one.",
  },
  nis2: {
    name: "NIS2 compliance",
    text: "We assess your obligations under the Finnish Cybersecurity Act and combine them with the ISO 27001 work, so nothing is done twice.",
  },
  continuous: {
    name: "Ongoing support",
    text: "Support after certification: metrics, management reviews, preparing for surveillance audits and, if needed, an outsourced information security manager.",
  },
};

// ---------------------------------------------------------------------------
// NEEDS ASSESSMENT: "Does your company need ISO 27001 certification?"
// No right answers. Each option gives points (0–2) and can raise a business reason (REASONS).
// ---------------------------------------------------------------------------
const SURVEY = {
  id: "needs",
  tag: "Needs assessment · 7 questions",
  title: "Does your company need ISO 27001 certification?",
  subtitle: "An estimate of the business need based on your answers.",
  questions: [
    {
      q: "Do customers or tenders require evidence of your information security?",
      options: [
        { label: "Often", points: 2, reason: "tenders" },
        { label: "Sometimes", points: 1, reason: "tenders" },
        { label: "No", points: 0 },
      ],
    },
    {
      q: "Does your company handle confidential information of customers or individuals?",
      options: [
        { label: "To a significant extent", points: 2, reason: "data" },
        { label: "To some extent", points: 1, reason: "data" },
        { label: "Very little", points: 0 },
      ],
    },
    {
      q: "Are your company or your customers in scope of NIS2 (the Finnish Cybersecurity Act)?",
      options: [
        { label: "Yes", points: 2, reason: "nis2" },
        { label: "We are not sure", points: 1, reason: "nis2" },
        { label: "No", points: 0 },
      ],
    },
    {
      q: "How much does your business rely on cloud services and subcontractors?",
      options: [
        { label: "Almost entirely", points: 2, reason: "suppliers" },
        { label: "Partly", points: 1, reason: "suppliers" },
        { label: "A little", points: 0 },
      ],
    },
    {
      q: "Have you had information security incidents or near misses in recent years?",
      options: [
        { label: "Yes", points: 2, reason: "incident" },
        { label: "We don't know", points: 2, reason: "incident" },
        { label: "No", points: 0 },
      ],
    },
    {
      q: "Is your company aiming for growth, larger customers or new markets?",
      options: [
        { label: "Yes", points: 2, reason: "growth" },
        { label: "Possibly", points: 1, reason: "growth" },
        { label: "Not in the near future", points: 0 },
      ],
    },
    {
      q: "Are information security responsibilities and practices defined and documented?",
      options: [
        { label: "Not really", points: 2, reason: "structure" },
        { label: "Partly", points: 1, reason: "structure" },
        { label: "Comprehensively", points: 0, reason: "ready" },
      ],
    },
  ],
  // Result levels by score (max 14). The first one whose min is met is chosen.
  levels: [
    { min: 9, title: "Clear business need", text: "Certification would bring you direct business benefits, and your customers are likely to require it within the next few years." },
    { min: 5, title: "Significant benefit", text: "Certification would strengthen your competitive position and reduce the work spent on customers' security questionnaires." },
    { min: 0, title: "Strategic advantage", text: "You have a good opportunity to move forward at your own pace. Work started early is the most cost-effective and builds a competitive edge." },
  ],
};

// Business reasons. "service" tells which service the reason points to.
const REASONS = {
  tenders: {
    title: "Competitiveness in tenders",
    text: "More and more customers and public procurements require evidence of information security. A certificate answers that requirement once and reduces the work spent on individual security questionnaires.",
    service: "readiness",
  },
  data: {
    title: "Customer trust",
    text: "When you handle other people's information, a certificate shows independently that it is properly protected. It also supports meeting data protection obligations.",
    service: "risk",
  },
  nis2: {
    title: "NIS2 and the Cybersecurity Act",
    text: "ISO 27001 is not a legal requirement, but it is the established way to implement and demonstrate the risk management the law requires. NIS2 companies increasingly require it from their suppliers too.",
    service: "nis2",
  },
  suppliers: {
    title: "Supply chain control",
    text: "The standard covers supplier relationships and cloud services. You know who holds your information and what is required of them.",
    service: "risk",
  },
  incident: {
    title: "Preventing disruptions",
    text: "Systematic risk management and incident handling mean problems are detected earlier and recovery is faster.",
    service: "gap",
  },
  growth: {
    title: "An enabler of growth",
    text: "An internationally recognised certificate opens doors to larger customers and new markets.",
    service: "gap",
  },
  structure: {
    title: "Clear responsibilities and practices",
    text: "A management system turns information security into managed activity that does not depend on individual people.",
    service: "implementation",
  },
  ready: {
    title: "A strong starting point",
    text: "With documented practices, certification is often a shorter step than expected. A readiness assessment shows the remaining gaps.",
    service: "readiness",
  },
};

// ---------------------------------------------------------------------------
// QUIZZES
// Each question has a topic ("topic"). Topics answered wrong are shown at the end of the game:
// why the topic matters to the business and which of our services helps.
// ---------------------------------------------------------------------------
const TOPICS = {
  internal_audit: {
    title: "Internal audit",
    pitch: "A well-run internal audit (9.2) is one of the best ways to ensure a smooth certification – it brings improvement ideas to light early and on your own terms.",
    service: "internal_audit",
  },
  risk: {
    title: "Risk management and SoA",
    pitch: "ISO 27001 does not require everything, only the right things based on your risks. That is why it also suits smaller organisations.",
    service: "risk",
  },
  controls: {
    title: "Annex A controls",
    pitch: "The 93 controls cover everything from remote working to cloud services and secure development. Most organisations already have some of them in place.",
    service: "gap",
  },
  management: {
    title: "Management responsibility",
    pitch: "ISO 27001 makes information security a management tool rather than just an IT matter – and also supports management with its NIS2 obligations.",
    service: "training",
  },
  awareness: {
    title: "Staff competence",
    pitch: "Skilled staff are an organisation's strongest security asset. The standard supports regular training and makes that competence visible.",
    service: "training",
  },
  improvement: {
    title: "Metrics and continual improvement",
    pitch: "Certification is not a one-off project. Measurable objectives and a working nonconformity process keep the system useful year after year.",
    service: "continuous",
  },
  certification: {
    title: "Certification process",
    pitch: "Certification is a clear process once you know the steps and the timeline. A readiness assessment removes uncertainty before the actual audit.",
    service: "readiness",
  },
  basics: {
    title: "ISMS basics",
    pitch: "A correctly sized management system is lightweight and supports the business day to day – at exactly your scale.",
    service: "implementation",
  },
};

const GAMES = [
  {
    id: "quiz",
    tag: "Basics · 8 questions",
    title: "ISO 27001 basics",
    subtitle: "Do you know the concepts, structure and certification?",
    questions: [
      {
        topic: "risk", q: "What does the abbreviation SoA stand for?",
        options: ["Statement of Applicability", "Scope of Audit", "Security of Assets", "System of Accountability"],
        correct: 0,
        explain: "The Statement of Applicability (6.1.3 d) lists the Annex A controls, the reasons for selecting them and their implementation status.",
      },
      {
        topic: "controls", q: "How many controls does Annex A of ISO 27001:2022 contain?",
        options: ["114", "93", "72", "120"],
        correct: 1,
        explain: "93 controls. The 2013 version had 114.",
      },
      {
        topic: "controls", q: "Which of these is not an Annex A theme?",
        options: ["Organisational", "People", "Financial", "Technological"],
        correct: 2,
        explain: "The themes are organisational (5), people (6), physical (7) and technological (8) controls.",
      },
      {
        topic: "basics", q: "What does the abbreviation ISMS stand for?",
        options: ["Integrated Security Monitoring System", "Information Security Management System", "International Standard for Managed Security", "IT Service Management Standard"],
        correct: 1,
        explain: "Information Security Management System.",
      },
      {
        topic: "basics", q: "What does the CIA triad mean in information security?",
        options: ["Cyber Incident Assessment", "Control, Inspection, Audit", "Confidentiality, Integrity, Availability", "Compliance, Information, Assurance"],
        correct: 2,
        explain: "Confidentiality, integrity and availability are the three core properties of information security.",
      },
      {
        topic: "controls", q: "How many new controls were added in the 2022 version?",
        options: ["3", "11", "24", "None"],
        correct: 1,
        explain: "11 new controls, including threat intelligence (5.7), information security for use of cloud services (5.23) and secure coding (8.28).",
      },
      {
        topic: "certification", q: "How long is an ISO 27001 certificate valid?",
        options: ["1 year", "3 years", "5 years", "Indefinitely"],
        correct: 1,
        explain: "Three years. Annual surveillance audits are carried out during the certification cycle.",
      },
      {
        topic: "management", q: "Which clause covers management review?",
        options: ["5.1", "7.4", "9.3", "10.2"],
        correct: 2,
        explain: "9.3 Management review. Top management must review the management system at planned intervals.",
      },
    ],
  },
  {
    id: "auditor",
    tag: "Clauses 4–10 · 7 questions",
    title: "The auditor's view",
    subtitle: "Can you tell which requirement a finding relates to?",
    questions: [
      {
        topic: "internal_audit", q: "In our experience, which clause is the most common source of nonconformities in certification audits?",
        options: ["4.3 Scope", "7.5 Documented information", "9.2 Internal audit", "5.2 Policy"],
        correct: 2,
        explain: "9.2 Internal audit. Typical gaps: no audit programme, not all areas are audited, or auditors assess their own work.",
      },
      {
        topic: "internal_audit", q: "Finding: The internal auditor audits processes they wrote themselves.",
        options: ["7.2 Competence", "9.2 Internal audit", "9.3 Management review", "5.3 Roles and responsibilities"],
        correct: 1,
        explain: "9.2 requires auditors to be selected and audits to be conducted objectively and impartially.",
      },
      {
        topic: "risk", q: "Finding: Annex A controls have been excluded without documented justification.",
        options: ["6.1.3 Risk treatment (SoA)", "4.1 Context of the organisation", "8.1 Operational planning", "10.1 Continual improvement"],
        correct: 0,
        explain: "The Statement of Applicability must justify both included and excluded controls (6.1.3 d).",
      },
      {
        topic: "management", q: "Finding: Management has not reviewed the performance of the management system or the audit results.",
        options: ["9.1 Monitoring and measurement", "9.3 Management review", "5.2 Policy", "7.4 Communication"],
        correct: 1,
        explain: "Inputs to management review include audit results, nonconformities and the fulfilment of objectives.",
      },
      {
        topic: "awareness", q: "Finding: There is no documented evidence of staff information security training.",
        options: ["7.2 Competence / 7.3 Awareness", "8.3 Risk treatment", "4.2 Interested parties", "9.2 Internal audit"],
        correct: 0,
        explain: "Documented information must be retained as evidence of competence, and staff must be aware of the information security policy.",
      },
      {
        topic: "improvement", q: "Finding: Corrective actions have been implemented, but their effectiveness has not been evaluated.",
        options: ["6.2 Objectives", "10.2 Nonconformity and corrective action", "9.3 Management review", "7.1 Resources"],
        correct: 1,
        explain: "10.2 also requires reviewing the effectiveness of the corrective actions taken.",
      },
      {
        topic: "improvement", q: "Finding: Information security objectives are written down, but their fulfilment is not monitored.",
        options: ["6.2 Information security objectives", "5.1 Leadership", "8.2 Risk assessment", "4.4 Management system"],
        correct: 0,
        explain: "Objectives must be measurable where practicable, and their fulfilment must be monitored (6.2).",
      },
    ],
  },
  {
    id: "maturity",
    type: "checklist", // no right answers – measures what the organisation has already done
    tag: "Current state · 10 questions",
    title: "What has your organisation already done?",
    subtitle: "An estimate of your current state – no right or wrong answers.",
    // Answer scale: points 2 = in place, 1 = partly, 0 = missing
    scale: [
      { label: "Yes", points: 2 },
      { label: "Partly", points: 1 },
      { label: "No", points: 0 },
      { label: "Don't know", points: 0 },
    ],
    // Result levels by readiness (0–1)
    levels: [
      { min: 0.75, title: "Strong foundation", text: "Great – many key practices are already in place! Certification may be closer than you think, and a readiness assessment shows the final steps." },
      { min: 0.4, title: "Well on your way", text: "Good work: much of the foundation already exists! A gap analysis helps prioritise the next steps and shows a realistic timeline." },
      { min: 0, title: "The journey begins", text: "You have a clear path ahead – and progress from this stage is often the fastest and most rewarding. We help you build the foundation in a controlled way." },
    ],
    // "short" is shown in the Already in place list, "why" and "service" in the areas to develop
    questions: [
      { id: "policy", ref: "5.2 · A.5.1", q: "Do you have an information security policy approved by management and communicated to all staff?", short: "Information security policy", why: "A policy gives security work its direction and shows management support – a great place to start.", service: "implementation" },
      { id: "risk", ref: "6.1.2 · 8.2", q: "Have you assessed and documented your information security risks within the last year?", short: "Risk assessment", why: "An up-to-date risk assessment helps you focus security resources where they bring the most benefit.", service: "risk" },
      { id: "assets", ref: "A.5.9", q: "Do you have an up-to-date inventory of systems, devices and information, with named owners?", short: "Asset inventory", why: "When you know what you have, safeguards land in the right place. The inventory is also the starting point for risk assessment.", service: "gap" },
      { id: "access", ref: "A.5.15 · A.5.18", q: "Do you grant access rights on a need basis and review them regularly?", short: "Access management", why: "Up-to-date access rights are a simple and effective way to protect information – and an auditor favourite.", service: "gap" },
      { id: "mfa", ref: "A.8.5", q: "Do you use multi-factor authentication in all critical systems?", short: "Multi-factor authentication", why: "Multi-factor authentication is one of the most cost-effective safeguards: quick to roll out and highly effective.", service: "gap" },
      { id: "backup", ref: "A.8.13", q: "Have you tested restoring your backups in practice?", short: "Tested backups", why: "A tested restore gives confidence that operations continue smoothly even when something goes wrong.", service: "gap" },
      { id: "incident", ref: "A.5.24–A.5.26", q: "Do you have an agreed process and named owners for handling security incidents?", short: "Incident handling", why: "An agreed process keeps incidents calm and under control – and helps meet the NIS2 reporting obligations.", service: "nis2" },
      { id: "suppliers", ref: "A.5.19–A.5.20", q: "Have you set information security requirements for suppliers and cloud services in contracts?", short: "Supplier requirements", why: "Clear requirements in contracts make cooperation safe and predictable across the whole supply chain.", service: "risk" },
      { id: "training", ref: "7.2–7.3 · A.6.3", q: "Do your staff receive regular information security training, and is participation recorded?", short: "Staff training", why: "Skilled staff are the best security asset – and regular training also creates evidence for the audit.", service: "training" },
      { id: "audit", ref: "9.2", q: "Have you audited your information security internally or externally within the last year?", short: "Security audit", why: "Regular auditing brings improvement ideas to light early and on your own terms – and is a natural part of ISO 27001.", service: "internal_audit" },
    ],
  },
  {
    id: "truefalse",
    tag: "Statements · 10 s each",
    title: "True or false?",
    subtitle: "Can you tell the facts from common misconceptions?",
    timer: 10,
    fixedOptions: ["True", "False"],
    questions: [
      { topic: "risk", q: "All Annex A controls must be implemented.", correct: 1, explain: "False. Controls are selected based on risks, and exclusions are justified in the Statement of Applicability." },
      { topic: "certification", q: "An ISO 27001 certificate is valid for three years.", correct: 0, explain: "True. Annual surveillance audits take place in between." },
      { topic: "certification", q: "ISO 27002 is a standard an organisation can be certified against.", correct: 1, explain: "False. ISO 27002 is guidance for implementing controls; certification is against ISO 27001." },
      { topic: "certification", q: "The transition period from the 2013 version to the 2022 version ended in October 2025.", correct: 0, explain: "True. Certificates to the 2013 version ceased to be valid on 31 October 2025." },
      { topic: "internal_audit", q: "The external certification audit replaces the internal audit.", correct: 1, explain: "False. Internal audit (9.2) is a separate, mandatory requirement." },
      { topic: "basics", q: "ISO 27001 specifies which security products an organisation must use.", correct: 1, explain: "False. The standard is technology-neutral: it defines what must be managed, not with which tools." },
      { topic: "controls", q: "In the 2022 version, the Annex A controls are grouped into four themes.", correct: 0, explain: "True: organisational, people, physical and technological." },
      { topic: "management", q: "Top management must demonstrate leadership and commitment to the management system.", correct: 0, explain: "True. Clause 5.1 Leadership and commitment." },
    ],
  },
];

return { UI, CONFIG, PROFILE, STANDARDS, SERVICES, SURVEY, REASONS, TOPICS, GAMES };
})();
