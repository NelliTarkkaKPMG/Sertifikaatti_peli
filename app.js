(function () {
  "use strict";

  // Vaihda versio, kun sisältö muuttuu merkittävästi: vanha tallennettu eteneminen nollautuu.
  const STORE_KEY = "iso27001-game-v6";
  const LANGS = { fi: "Suomi", en: "English" };

  const app = document.getElementById("app");
  const homeBtn = document.getElementById("homeBtn");
  const langBtn = document.getElementById("langBtn");
  homeBtn.addEventListener("click", () => { stopTimer(); showHub(); });
  // Kielen vaihto otsikkopalkista: piirretään nykyinen näkymä uudelleen toisella kielellä
  langBtn.addEventListener("click", () => {
    setLang(state.lang === "fi" ? "en" : "fi");
    if (currentScreen) currentScreen();
  });

  // Tablettitila (osoitteen perään ?kiosk): messuosaston jaetuille laitteille.
  // Näyttää "Uusi pelaaja" -napin ja palaa kielivalintaan, kun laitetta ei ole käytetty hetkeen.
  const KIOSK = new URLSearchParams(location.search).has("kiosk");
  const KIOSK_IDLE_MS = 3 * 60 * 1000;
  // Positiivinen sävy: valmiusprosentti näytetään vasta tästä alkaen, sitä ennen pelkkä taso ja teksti
  const SHOW_PCT_FROM = 40;

  const fresh = (lang = null) => ({ lang, company: "", profile: {}, results: {}, survey: null });
  let state = load();
  let timerId = null;
  let currentScreen = null;
  // Valitun kielen sisältö (content-fi.js / content-en.js)
  let UI, CONFIG, PROFILE, STANDARDS, SERVICES, SURVEY, REASONS, TOPICS, GAMES;

  function setLang(lang) {
    state.lang = lang;
    ({ UI, CONFIG, PROFILE, STANDARDS, SERVICES, SURVEY, REASONS, TOPICS, GAMES } = CONTENT[lang]);
    document.documentElement.lang = lang;
    document.title = CONFIG.brand;
    byId("brand").textContent = CONFIG.brand;
    homeBtn.textContent = UI.menu;
    langBtn.textContent = lang === "fi" ? "EN" : "FI";
    langBtn.setAttribute("aria-label", lang === "fi" ? "Switch to English" : "Vaihda suomeksi");
    save();
  }

  function load() {
    try { return Object.assign(fresh(), JSON.parse(localStorage.getItem(STORE_KEY))); }
    catch (e) { return fresh(); }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ei tallennusta */ }
  }

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const anyDone = () => state.survey || Object.keys(state.results).length > 0;
  const byId = (id) => document.getElementById(id);
  const onClick = (id, fn) => { const el = byId(id); if (el) el.onclick = fn; };
  // Brändin viivaikonit (assets/icons/<nimi>.png), väritetään CSS-maskilla
  const icon = (name) => `<span class="ico" aria-hidden="true" style="--icon:url('assets/icons/${name}.png')"></span>`;

  // screen: näkymän piirtofunktio, jos näkymässä saa vaihtaa kieltä (ei kesken kysymysten)
  function render(html, { showHome = false, screen = null } = {}) {
    app.innerHTML = `<div class="fade">${html}</div>`;
    homeBtn.hidden = !showHome;
    currentScreen = screen;
    langBtn.hidden = !screen || !state.lang;
    window.scrollTo(0, 0);
  }

  // --- Kielivalinta ----------------------------------------------------------
  function newPlayer() {
    stopTimer();
    state = fresh();
    save();
    showLanguage();
  }

  if (KIOSK) {
    let idleId = null;
    const resetIdle = () => {
      clearTimeout(idleId);
      idleId = setTimeout(() => { if (state.lang || anyDone()) newPlayer(); }, KIOSK_IDLE_MS);
    };
    ["pointerdown", "keydown", "scroll"].forEach((ev) => window.addEventListener(ev, resetIdle, { passive: true }));
    resetIdle();
  }

  function showLanguage() {
    render(`
      <p class="eyebrow">ISO/IEC 27001:2022</p>
      <h1>Valitse kieli<br><span class="h1-alt">Choose your language</span></h1>
      <div class="langs">
        ${Object.entries(LANGS).map(([k, name]) => `<button class="btn lang" data-lang="${k}" lang="${k}">${name}</button>`).join("")}
      </div>
    `);
    app.querySelectorAll("[data-lang]").forEach((b) => b.onclick = () => { setLang(b.dataset.lang); showStart(); });
  }

  // --- Aloitus ---------------------------------------------------------------
  function showStart() {
    render(`
      <p class="eyebrow">${esc(UI.startEyebrow)}</p>
      <h1>${esc(UI.startTitle)}</h1>
      <p class="lead">${esc(UI.startLead)}</p>
      <label for="company" class="label">${esc(UI.companyLabel)}</label>
      <input id="company" type="text" maxlength="40" autocomplete="organization" value="${esc(state.company)}">
      <button class="btn" id="go">${esc(UI.startBtn)}</button>
      <p class="note">${esc(UI.privacy)}</p>
    `, { screen: showStart });
    onClick("go", () => {
      state.company = byId("company").value.trim();
      save();
      showProfileQuestion(0);
    });
  }

  // --- Alkukysymykset (tekoäly, jatkuvuus) ----------------------------------
  function showProfileQuestion(i) {
    const q = PROFILE.questions[i];
    render(`
      <div class="panel">
        <div class="progress"><span>${esc(PROFILE.eyebrow)}</span><span>${i + 1} / ${PROFILE.questions.length}</span></div>
        <div class="bar"><div style="width:${(i / PROFILE.questions.length) * 100}%"></div></div>
        <p class="question">${esc(q.q)}</p>
        <div class="options">
          ${q.options.map((o, idx) => `<button class="opt" data-idx="${idx}">${esc(o.label)}</button>`).join("")}
        </div>
      </div>
    `);
    app.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
      state.profile = Object.assign({}, state.profile, { [q.id]: q.options[Number(b.dataset.idx)].points });
      save();
      if (i + 1 < PROFILE.questions.length) showProfileQuestion(i + 1);
      else showHub();
    });
  }

  // ISO 27001:n rinnalle suositeltavat standardit alkukysymysten perusteella
  function extraStandards() {
    return PROFILE.questions
      .filter((q) => (state.profile || {})[q.id] >= PROFILE.threshold)
      .map((q) => q.recommend);
  }

  // Valikon tila: luku näytetään vain, kun se on kannustava, muuten "Tehty"
  function tileStatus(g, r) {
    if (g.type === "checklist") { const pct = readinessPct(r); return pct >= SHOW_PCT_FROM ? UI.readinessOf(pct) : UI.done; }
    return r.correct > 0 ? UI.correctOf(r.correct, g.questions.length) : UI.done;
  }

  // --- Valikko ---------------------------------------------------------------
  function showHub() {
    const status = (done, text) => done ? `<span class="status done">${text}</span>` : "";
    const tile = (g) => {
      const r = state.results[g.id];
      return `<button class="tile" data-id="${g.id}">
        ${icon(g.id)}
        <span class="tag">${esc(g.tag)}</span>
        <span class="tile-title">${esc(g.title)}</span>
        <span class="tile-sub">${esc(g.subtitle)}</span>
        ${status(r, r ? esc(tileStatus(g, r)) : "")}
      </button>`;
    };
    const orgGames = GAMES.filter((g) => g.type === "checklist").map(tile).join("");
    const quizzes = GAMES.filter((g) => g.type !== "checklist").map(tile).join("");
    render(`
      ${state.company ? `<p class="eyebrow">${esc(state.company)}</p>` : ""}
      <h2>${esc(UI.chooseSection)}</h2>
      <h3 class="section">${esc(UI.orgSection)}</h3>
      <button class="tile featured" id="surveyCard">
        ${icon("survey")}
        <span class="tag">${esc(SURVEY.tag)}</span>
        <span class="tile-title">${esc(SURVEY.title)}</span>
        <span class="tile-sub">${esc(SURVEY.subtitle)}</span>
        ${state.survey ? status(true, esc(UI.done)) : `<span class="status">${esc(UI.recommendStart)}</span>`}
      </button>
      <div class="list">${orgGames}</div>
      <h3 class="section">${esc(UI.testSection)}</h3>
      <div class="list">${quizzes}</div>
      ${anyDone() ? `<button class="btn" id="final">${esc(UI.showSummary)}</button>
        <button class="btn ghost" id="reset">${esc(UI.restart)}</button>` : ""}
    `, { screen: showHub });
    onClick("surveyCard", () => showSurveyQuestion([], 0));
    app.querySelectorAll(".tile[data-id]").forEach((el) => el.onclick = () => startGame(GAMES.find((g) => g.id === el.dataset.id)));
    onClick("final", showFinal);
    onClick("reset", () => { if (KIOSK) newPlayer(); else { state = fresh(state.lang); save(); showStart(); } });
  }

  // --- Tarvekartoitus --------------------------------------------------------
  function showSurveyQuestion(answers, i) {
    const q = SURVEY.questions[i];
    render(`
      <div class="panel">
        <div class="progress"><span>${esc(UI.surveyLabel)}</span><span>${i + 1} / ${SURVEY.questions.length}</span></div>
        <div class="bar"><div style="width:${(i / SURVEY.questions.length) * 100}%"></div></div>
        <p class="question">${esc(q.q)}</p>
        <div class="options">
          ${q.options.map((o, idx) => `<button class="opt" data-idx="${idx}">${esc(o.label)}</button>`).join("")}
        </div>
      </div>
    `, { showHome: true });
    app.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
      const next = answers.concat(q.options[Number(b.dataset.idx)]);
      if (i + 1 < SURVEY.questions.length) showSurveyQuestion(next, i + 1);
      else finishSurvey(next);
    });
  }

  function finishSurvey(answers) {
    const score = answers.reduce((s, a) => s + a.points, 0);
    // Eniten painoa saaneet syyt ensin
    const reasons = answers.filter((a) => a.reason && REASONS[a.reason])
      .sort((a, b) => b.points - a.points).map((a) => a.reason);
    state.survey = { score, reasons };
    save();
    showSurveyResult();
  }

  function showSurveyResult() {
    const level = surveyLevel();
    render(`
      <div class="panel">
        <p class="eyebrow">${esc(UI.surveyResult)}</p>
        <h1 class="result-title">${esc(level.title)}</h1>
        ${meterHtml(state.survey.score)}
        <p>${esc(level.text)}</p>
      </div>
      ${reasonsHtml(4)}
      <button class="btn" id="final">${esc(UI.showPath)}</button>
      <button class="btn ghost" id="hub">${esc(UI.testKnowledge)}</button>
    `, { showHome: true, screen: showSurveyResult });
    onClick("hub", showHub);
    onClick("final", showFinal);
  }

  function surveyLevel() {
    return SURVEY.levels.find((l) => state.survey.score >= l.min);
  }

  function meterHtml(score) {
    const max = SURVEY.questions.reduce((s, q) => s + Math.max(...q.options.map((o) => o.points)), 0);
    return `<div class="meter" role="img" aria-label="${esc(UI.meterAria)} ${score} / ${max}">
      <div style="width:${Math.max(4, (score / max) * 100)}%"></div></div>
      <div class="meter-scale">${UI.meterScale.map((t) => `<span>${esc(t)}</span>`).join("")}</div>`;
  }

  function reasonsHtml(max) {
    const keys = state.survey ? state.survey.reasons.slice(0, max) : ["tenders", "data", "growth"];
    return `<section class="block">
      <h2>${esc(state.survey ? UI.benefitsYou : UI.benefits)}</h2>
      ${keys.map((k) => `<div class="item"><h4>${esc(REASONS[k].title)}</h4><p>${esc(REASONS[k].text)}</p></div>`).join("")}
    </section>`;
  }

  // --- Tietovisat ------------------------------------------------------------
  function startGame(game) {
    if (game.type === "checklist") return showChecklistQuestion(game, {}, 0);
    const run = { game, order: shuffle(game.questions), i: 0, correct: 0, topics: {} };
    // Auditoijan näkökulma: johdantokysymys pidetään aina ensimmäisenä
    if (game.id === "auditor") run.order = [game.questions[0], ...shuffle(game.questions.slice(1))];
    showQuestion(run);
  }

  function showQuestion(run) {
    const { game, order, i } = run;
    const q = order[i];
    const labels = game.fixedOptions || q.options;
    // Kiinteitä vaihtoehtoja ei sekoiteta, muut sekoitetaan
    const opts = labels.map((label, idx) => ({ label, idx }));
    const shown = game.fixedOptions ? opts : shuffle(opts);
    const two = shown.length === 2;

    render(`
      <div class="panel">
        <div class="progress"><span>${esc(game.title)}</span><span>${i + 1} / ${order.length}</span></div>
        <div class="bar"><div style="width:${(i / order.length) * 100}%"></div></div>
        ${game.timer ? `<div class="bar timer"><div id="tbar" style="width:100%"></div></div>` : ""}
        ${game.prompt ? `<p class="prompt">${esc(game.prompt)}</p>` : ""}
        <p class="question">${esc(q.q)}</p>
        <div class="options ${two ? "two" : ""}">
          ${shown.map((o) => `<button class="opt" data-idx="${o.idx}">${esc(o.label)}</button>`).join("")}
        </div>
        <div id="fb"></div>
      </div>
    `, { showHome: true });

    let answered = false;
    const answer = (idx) => {
      if (answered) return;
      answered = true;
      stopTimer();
      const ok = idx === q.correct;
      const topic = q.topic || game.topic;
      if (topic) {
        const t = run.topics[topic] || (run.topics[topic] = { asked: 0, missed: 0 });
        t.asked++;
        if (!ok) t.missed++;
      }
      if (ok) run.correct++;
      app.querySelectorAll(".opt").forEach((b) => {
        b.disabled = true;
        const bi = Number(b.dataset.idx);
        if (bi === q.correct) b.classList.add("correct");
        else if (bi === idx) b.classList.add("wrong");
      });
      const title = esc(idx === null ? UI.timeUp : ok ? UI.correct : UI.wrong);
      const last = run.i === order.length - 1;
      byId("fb").innerHTML = `
        <div class="feedback ${ok ? "ok" : "bad"}"><strong>${title}</strong>${esc(q.explain || "")}</div>
        <button class="btn" id="next">${esc(last ? UI.showResult : UI.next)}</button>`;
      onClick("next", () => {
        if (last) finishGame(run);
        else { run.i++; showQuestion(run); }
      });
      byId("next").scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    app.querySelectorAll(".opt").forEach((b) => b.onclick = () => answer(Number(b.dataset.idx)));

    if (game.timer) {
      const tbar = byId("tbar");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        tbar.style.transition = `width ${game.timer}s linear`;
        tbar.style.width = "0%";
      }));
      timerId = setTimeout(() => answer(null), game.timer * 1000);
    }
  }

  function stopTimer() { if (timerId) { clearTimeout(timerId); timerId = null; } }

  function finishGame(run) {
    const { game } = run;
    state.results[game.id] = { correct: run.correct, total: game.questions.length, topics: run.topics };
    save();
    showGameResult(game.id, run.topics);
  }

  // Pelin tulos; piirretään tallennetusta tilasta, jotta kielen vaihto toimii
  function showGameResult(id, topics) {
    const game = GAMES.find((g) => g.id === id);
    const r = state.results[id];
    const nextGame = GAMES.find((g) => !state.results[g.id]);
    render(`
      <div class="panel">
        <p class="eyebrow">${esc(game.title)}</p>
        <h1 class="result-title">${esc(knowledgeLevel(r.correct / r.total).title)}</h1>
        ${r.correct > 0 ? `<div class="score small">${esc(UI.correctOf(r.correct, r.total))}</div>` : ""}
        <p>${esc(knowledgeLevel(r.correct / r.total).text)}</p>
      </div>
      ${topicsHtml(topics, 2)}
      ${!state.survey ? `<button class="btn" id="survey">${esc(SURVEY.title)}</button>` : ""}
      <button class="btn ${state.survey ? "" : "ghost"}" id="final">${esc(UI.showSummary)}</button>
      ${nextGame ? `<button class="btn ghost" id="next">${esc(UI.nextSection)} ${esc(nextGame.title)}</button>` : ""}
    `, { showHome: true, screen: () => showGameResult(id, topics) });
    onClick("survey", () => showSurveyQuestion([], 0));
    onClick("next", () => startGame(nextGame));
    onClick("final", showFinal);
  }

  // --- Nykytilan tarkistuslista ("Onko teillä tehty...?") ---------------------
  function showChecklistQuestion(game, answers, i) {
    const q = game.questions[i];
    render(`
      <div class="panel">
        <div class="progress"><span>${esc(game.title)}</span><span>${i + 1} / ${game.questions.length}</span></div>
        <div class="bar"><div style="width:${(i / game.questions.length) * 100}%"></div></div>
        <p class="prompt">${esc(q.ref)}</p>
        <p class="question">${esc(q.q)}</p>
        <div class="options two">
          ${game.scale.map((o, idx) => `<button class="opt" data-idx="${idx}">${esc(o.label)}</button>`).join("")}
        </div>
      </div>
    `, { showHome: true });
    app.querySelectorAll(".opt").forEach((b) => b.onclick = () => {
      answers[q.id] = game.scale[Number(b.dataset.idx)].points;
      if (i + 1 < game.questions.length) showChecklistQuestion(game, answers, i + 1);
      else {
        state.results[game.id] = { type: "checklist", answers };
        save();
        showChecklistResult(game.id);
      }
    });
  }

  const checklistGame = () => GAMES.find((g) => g.type === "checklist");

  function readinessPct(r) {
    const vals = Object.values(r.answers);
    return Math.round((vals.reduce((s, v) => s + v, 0) / (vals.length * 2)) * 100);
  }

  // Puuttuvat ensin, sitten osittaiset
  function checklistGaps(r) {
    return checklistGame().questions.filter((q) => r.answers[q.id] < 2)
      .sort((a, b) => r.answers[a.id] - r.answers[b.id]);
  }

  function showChecklistResult(id) {
    const game = GAMES.find((g) => g.id === id);
    const r = state.results[id];
    const pct = readinessPct(r);
    const level = game.levels.find((l) => pct / 100 >= l.min);
    const gaps = checklistGaps(r);
    const inPlace = game.questions.filter((q) => r.answers[q.id] === 2);
    const nextGame = GAMES.find((g) => !state.results[g.id]);
    render(`
      <div class="panel">
        <p class="eyebrow">${esc(game.title)}</p>
        <h1 class="result-title">${esc(level.title)}</h1>
        <div class="meter" role="img" aria-label="${esc(UI.readinessOf(pct))}"><div style="width:${Math.max(4, pct)}%"></div></div>
        ${pct >= SHOW_PCT_FROM ? `<p class="stat-sub">${esc(UI.readinessOf(pct))}</p>` : ""}
        <p>${esc(level.text)}</p>
      </div>
      ${gaps.length ? `<section class="block"><h2>${esc(UI.gapsTitle)}</h2>
        ${gaps.slice(0, 4).map((q) => `<div class="item"><h4>${esc(q.short)}</h4><p>${esc(q.why)}</p>
          <p class="service"><span>${esc(UI.ourService)}</span> ${esc(SERVICES[q.service].name)}</p></div>`).join("")}
      </section>` : ""}
      ${inPlace.length ? `<div class="strengths"><strong>${esc(UI.inPlaceTitle)}</strong>
        <ul>${inPlace.map((q) => `<li>${esc(q.short)}</li>`).join("")}</ul></div>` : ""}
      ${!state.survey ? `<button class="btn" id="survey">${esc(SURVEY.title)}</button>` : ""}
      <button class="btn ${state.survey ? "" : "ghost"}" id="final">${esc(UI.showSummary)}</button>
      ${nextGame ? `<button class="btn ghost" id="next">${esc(UI.nextSection)} ${esc(nextGame.title)}</button>` : ""}
    `, { showHome: true, screen: () => showChecklistResult(id) });
    onClick("survey", () => showSurveyQuestion([], 0));
    onClick("next", () => startGame(nextGame));
    onClick("final", showFinal);
  }

  function knowledgeLevel(pct) {
    return UI.knowledgeLevels.find((l) => pct >= l.min);
  }

  // --- Yhteenveto ------------------------------------------------------------
  function showFinal() {
    const results = Object.values(state.results).filter((r) => r.type !== "checklist");
    const check = checklistGame() && state.results[checklistGame().id];
    const topics = mergeTopics();
    const summary = [];
    if (state.survey) {
      summary.push(`<div class="stat"><span class="stat-label">${esc(UI.needLabel)}</span><strong>${esc(surveyLevel().title)}</strong></div>`);
    }
    if (check) {
      const pct = readinessPct(check);
      const level = checklistGame().levels.find((l) => pct / 100 >= l.min);
      summary.push(`<div class="stat"><span class="stat-label">${esc(UI.readinessLabel)}</span><strong>${esc(level.title)}</strong>${pct >= SHOW_PCT_FROM ? `<span class="stat-sub">${esc(UI.readinessOf(pct))}</span>` : ""}</div>`);
    }
    if (results.length) {
      const correct = results.reduce((s, r) => s + r.correct, 0);
      const totalQ = results.reduce((s, r) => s + r.total, 0);
      summary.push(`<div class="stat"><span class="stat-label">${esc(UI.knowledgeLabel)}</span><strong>${esc(knowledgeLevel(correct / totalQ).title)}</strong>${correct > 0 ? `<span class="stat-sub">${esc(UI.correctOf(correct, totalQ))}</span>` : ""}</div>`);
    }
    const path = recommendedPath(topics);
    const standards = extraStandards();
    render(`
      <p class="eyebrow">${esc(UI.summary)}${state.company ? ` · ${esc(state.company)}` : ""}</p>
      <h1>${esc(UI.finalTitle)}</h1>
      ${summary.length ? `<div class="stats">${summary.join("")}</div>` : ""}
      ${!state.survey ? `<button class="btn" id="survey">${esc(UI.doSurvey)}</button>` : ""}
      ${reasonsHtml(3)}
      <section class="block">
        <h2>${esc(UI.pathTitle)}</h2>
        <p class="lead">${esc(pathIsTailored() ? UI.pathLead : UI.pathLeadGeneric)}</p>
        <ol class="path">
          ${path.map((p) => `<li>${icon(p.key)}<h4>${esc(SERVICES[p.key].name)}</h4>
            <p class="why"><span>${esc(UI.whyLabel)}</span> ${esc(p.why)}</p>
            <p>${esc(SERVICES[p.key].text)}</p></li>`).join("")}
          <li class="goal">${icon("truefalse")}<p class="goal-label">${esc(UI.goal.label)}</p>
            <h4>${esc(UI.goal.title)}</h4><p>${esc(UI.goal.text)}</p></li>
        </ol>
      </section>
      ${standards.length ? `<section class="block">
        <h2>${esc(STANDARDS.title)}</h2>
        <p class="lead">${esc(STANDARDS.lead)}</p>
        ${standards.map((k) => `<div class="item std"><h4>${esc(STANDARDS[k].name)}</h4><p>${esc(STANDARDS[k].text)}</p></div>`).join("")}
      </section>` : ""}
      <p class="note-box">${esc(STANDARDS.iso9001)}</p>
      <div class="talkbox">
        <h2>${esc(CONFIG.talkTitle)}</h2>
        <p>${esc(CONFIG.talkText)}</p>
        <div class="chips">${path.map((p) => esc(SERVICES[p.key].name))
          .concat(standards.map((k) => esc(STANDARDS[k].code)))
          .map((t) => `<span class="chip">${t}</span>`).join("")}</div>
        <p class="note">${esc(UI.findUs)} ${esc(CONFIG.stand)}.</p>
      </div>
      <button class="btn ghost" id="hub">${esc(GAMES.some((g) => !state.results[g.id]) ? UI.continueTests : UI.backToMenu)}</button>
      ${KIOSK ? `<button class="btn" id="newPlayer">${esc(UI.newPlayer)}</button>` : ""}
    `, { showHome: true, screen: showFinal });
    onClick("survey", () => showSurveyQuestion([], 0));
    onClick("hub", showHub);
    onClick("newPlayer", newPlayer);
  }

  // Räätälöity etenemispolku. Jokaiselle vaiheelle perustelu ("Miksi teille"), ja polun päässä
  // tavoite: ISO 27001 -sertifikaatti (UI.goal). Vaiheiden runko riippuu lähtötilanteesta:
  //   alkuvaihe:      gap-analyysi → ISMS:n käyttöönotto → tärkein tarve
  //   keskivaihe:     gap-analyysi → tärkein tarve → sertifiointivalmius
  //   lähes valmis:   tärkein tarve → sisäinen auditointi → sertifiointivalmius (lyhyempi, jos tarpeita ei ole)
  // Jatkuva tuki kuuluu sertifioinnin jälkeiseen aikaan, joten se mainitaan tavoitteen tekstissä.
  // Tarpeet painojärjestyksessä: nykytilan puutteet, tarvekartoituksen syyt, visojen aiheet.
  function recommendedPath(topics) {
    const check = checklistGame() && state.results[checklistGame().id];
    const pct = check ? readinessPct(check) : null;
    const reasons = state.survey ? state.survey.reasons : [];
    const early = check ? pct < 40 : reasons.includes("structure");
    const ready = check ? pct >= 75 : reasons.includes("ready");

    const needs = [];
    if (check) checklistGaps(check).forEach((q) => needs.push({ key: q.service, why: UI.whyChecklist(q.short) }));
    reasons.filter((k) => k !== "ready").forEach((k) => needs.push({ key: REASONS[k].service, why: UI.whySurvey(REASONS[k].title) }));
    weakTopics(topics, 3).forEach((k) => needs.push({ key: TOPICS[k].service, why: UI.whyQuiz(TOPICS[k].title) }));
    const topNeed = (exclude) => needs.find((n) => !exclude.includes(n.key));
    const step = (key, why) => ({ key, why: why || UI.whyStep[key] });

    if (ready) {
      const n = topNeed(["readiness", "continuous"]);
      if (!n) return [step("internal_audit", UI.whyStep.internalAuditReady), step("readiness")];
      if (n.key === "internal_audit") return [step(n.key, n.why), step("readiness")];
      return [step(n.key, n.why), step("internal_audit", UI.whyStep.internalAuditRequired), step("readiness")];
    }
    if (early) {
      const n = topNeed(["gap", "implementation", "continuous"]);
      return [step("gap", UI.whyStep.gapEarly), step("implementation"), n ? step(n.key, n.why) : step("readiness")];
    }
    const n = topNeed(["gap", "readiness", "continuous"]);
    return [step("gap"), n ? step(n.key, n.why) : step("implementation"), step("readiness")];
  }

  // Onko polku räätälöity vastausten perusteella (muuten näytetään yleinen ehdotus)
  const pathIsTailored = () => Boolean(state.survey || (checklistGame() && state.results[checklistGame().id]) || weakTopics(mergeTopics(), 1).length);



  // --- Aiheet vastausten perusteella -----------------------------------------
  function mergeTopics() {
    const all = {};
    Object.values(state.results).forEach((r) => Object.entries(r.topics || {}).forEach(([k, v]) => {
      const t = all[k] || (all[k] = { asked: 0, missed: 0 });
      t.asked += v.asked;
      t.missed += v.missed;
    }));
    return all;
  }

  // Eniten virheitä (suhteessa kysymyksiin) ensin
  function weakTopics(topics, max) {
    return Object.entries(topics).filter(([k, v]) => TOPICS[k] && v.missed > 0)
      .sort((a, b) => b[1].missed / b[1].asked - a[1].missed / a[1].asked || b[1].missed - a[1].missed)
      .slice(0, max).map(([k]) => k);
  }

  function topicsHtml(topics, max) {
    const weak = weakTopics(topics, max);
    const items = weak.length
      ? weak.map((k) => {
          const t = TOPICS[k], s = SERVICES[t.service];
          return `<div class="item"><h4>${esc(t.title)}</h4><p>${esc(t.pitch)}</p>
            <p class="service"><span>${esc(UI.ourService)}</span> ${esc(s.name)}</p></div>`;
        }).join("")
      : `<div class="item"><h4>${esc(UI.strongTitle)}</h4><p>${esc(UI.strongText)}</p>
          <p class="service"><span>${esc(UI.ourService)}</span> ${esc(SERVICES.readiness.name)}</p></div>`;
    return `<section class="block"><h2>${esc(UI.whatItMeans)}</h2>${items}</section>`;
  }

  if (!CONTENT[state.lang]) { state.lang = null; showLanguage(); }
  else {
    setLang(state.lang);
    const profileDone = PROFILE.questions.every((q) => (state.profile || {})[q.id] !== undefined);
    if (!(state.company || anyDone())) showStart();
    else if (!profileDone) showProfileQuestion(PROFILE.questions.findIndex((q) => (state.profile || {})[q.id] === undefined));
    else showHub();
  }
})();
