(function () {
  "use strict";

  const STORE_KEY = "iso27001-game-v3";

  const app = document.getElementById("app");
  const homeBtn = document.getElementById("homeBtn");
  document.getElementById("brand").textContent = CONFIG.brand;
  homeBtn.addEventListener("click", () => { stopTimer(); showHub(); });

  const fresh = () => ({ company: "", results: {}, survey: null });
  let state = load();
  let timerId = null;

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
  const uniq = (a) => a.filter((x, i) => a.indexOf(x) === i);
  // Brändin viivaikonit (assets/icons/<nimi>.png), väritetään CSS-maskilla
  const icon = (name) => `<span class="ico" aria-hidden="true" style="--icon:url('assets/icons/${name}.png')"></span>`;

  function render(html, { showHome = false } = {}) {
    app.innerHTML = `<div class="fade">${html}</div>`;
    homeBtn.hidden = !showHome;
    window.scrollTo(0, 0);
  }

  // --- Aloitus ---------------------------------------------------------------
  function showStart() {
    render(`
      <p class="eyebrow">ISO/IEC 27001:2022</p>
      <h1>Onko yrityksenne valmis ISO 27001 -sertifiointiin?</h1>
      <p class="lead">Selvittäkää muutamassa minuutissa, mitä hyötyä sertifikaatista olisi liiketoiminnallenne ja missä vaiheessa organisaationne on. Saatte lopuksi suositellun etenemispolun.</p>
      <label for="company" class="label">Yrityksen nimi (vapaaehtoinen)</label>
      <input id="company" type="text" maxlength="40" autocomplete="organization" value="${esc(state.company)}">
      <button class="btn" id="go">Aloita</button>
      <p class="note">Vastauksia ei tallenneta eikä lähetetä minnekään.</p>
    `);
    onClick("go", () => {
      state.company = byId("company").value.trim();
      save();
      showHub();
    });
  }

  // --- Valikko ---------------------------------------------------------------
  function showHub() {
    const status = (done, text) => done ? `<span class="status done">${text}</span>` : "";
    const cards = GAMES.map((g) => {
      const r = state.results[g.id];
      return `<button class="tile" data-id="${g.id}">
        ${icon(g.id)}
        <span class="tag">${esc(g.tag)}</span>
        <span class="tile-title">${esc(g.title)}</span>
        <span class="tile-sub">${esc(g.subtitle)}</span>
        ${status(r, r ? `${r.correct}/${g.questions.length} oikein` : "")}
      </button>`;
    }).join("");
    render(`
      ${state.company ? `<p class="eyebrow">${esc(state.company)}</p>` : ""}
      <h2>Valitkaa osio</h2>
      <button class="tile featured" id="surveyCard">
        ${icon("survey")}
        <span class="tag">${esc(SURVEY.tag)}</span>
        <span class="tile-title">${esc(SURVEY.title)}</span>
        <span class="tile-sub">${esc(SURVEY.subtitle)}</span>
        ${state.survey ? status(true, "Tehty") : `<span class="status">Suosittelemme aloittamaan tästä</span>`}
      </button>
      <h3 class="section">Testatkaa ISO 27001 -osaamisenne</h3>
      <div class="grid">${cards}</div>
      ${anyDone() ? `<button class="btn" id="final">Näytä yhteenveto ja suositukset</button>
        <button class="btn ghost" id="reset">Aloita alusta</button>` : ""}
    `);
    onClick("surveyCard", () => showSurveyQuestion([], 0));
    app.querySelectorAll(".tile[data-id]").forEach((el) => el.onclick = () => startGame(GAMES.find((g) => g.id === el.dataset.id)));
    onClick("final", showFinal);
    onClick("reset", () => { state = fresh(); save(); showStart(); });
  }

  // --- Tarvekartoitus --------------------------------------------------------
  function showSurveyQuestion(answers, i) {
    const q = SURVEY.questions[i];
    render(`
      <div class="panel">
        <div class="progress"><span>Tarvekartoitus</span><span>${i + 1} / ${SURVEY.questions.length}</span></div>
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
    const level = surveyLevel();
    render(`
      <div class="panel">
        <p class="eyebrow">Tarvekartoituksen tulos</p>
        <h1 class="result-title">${esc(level.title)}</h1>
        ${meterHtml(score)}
        <p>${esc(level.text)}</p>
      </div>
      ${reasonsHtml(4)}
      <button class="btn" id="final">Näytä suositeltu etenemispolku</button>
      <button class="btn ghost" id="hub">Testaa ISO 27001 -osaamisenne</button>
    `, { showHome: true });
    onClick("hub", showHub);
    onClick("final", showFinal);
  }

  function surveyLevel() {
    return SURVEY.levels.find((l) => state.survey.score >= l.min);
  }

  function meterHtml(score) {
    const max = SURVEY.questions.reduce((s, q) => s + Math.max(...q.options.map((o) => o.points)), 0);
    return `<div class="meter" role="img" aria-label="Tarve ${score} / ${max}">
      <div style="width:${Math.max(4, (score / max) * 100)}%"></div></div>
      <div class="meter-scale"><span>Vähäinen</span><span>Kohtalainen</span><span>Suuri</span></div>`;
  }

  function reasonsHtml(max) {
    const keys = state.survey ? state.survey.reasons.slice(0, max) : ["tenders", "data", "growth"];
    return `<section class="block">
      <h2>Liiketoimintahyödyt ${state.survey ? "teille" : ""}</h2>
      ${keys.map((k) => `<div class="item"><h4>${esc(REASONS[k].title)}</h4><p>${esc(REASONS[k].text)}</p></div>`).join("")}
    </section>`;
  }

  // --- Tietovisat ------------------------------------------------------------
  function startGame(game) {
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
      const title = idx === null ? "Aika päättyi" : ok ? "Oikein" : "Väärin";
      const last = run.i === order.length - 1;
      byId("fb").innerHTML = `
        <div class="feedback ${ok ? "ok" : "bad"}"><strong>${title}</strong>${esc(q.explain || "")}</div>
        <button class="btn" id="next">${last ? "Näytä tulos" : "Seuraava"}</button>`;
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
    const nextGame = GAMES.find((g) => !state.results[g.id]);
    render(`
      <div class="panel">
        <p class="eyebrow">${esc(game.title)}</p>
        <div class="score">${run.correct} <span>/ ${game.questions.length}</span></div>
        <p>${esc(knowledgeLevel(run.correct / game.questions.length).text)}</p>
      </div>
      ${topicsHtml(run.topics, 2)}
      ${!state.survey ? `<button class="btn" id="survey">${esc(SURVEY.title)}</button>` : ""}
      <button class="btn ${state.survey ? "" : "ghost"}" id="final">Näytä yhteenveto ja suositukset</button>
      ${nextGame ? `<button class="btn ghost" id="next">Seuraava osio: ${esc(nextGame.title)}</button>` : ""}
    `, { showHome: true });
    onClick("survey", () => showSurveyQuestion([], 0));
    onClick("next", () => startGame(nextGame));
    onClick("final", showFinal);
  }

  function knowledgeLevel(pct) {
    if (pct >= 0.85) return { title: "Vahva osaaminen", text: "Organisaatiollanne on hyvät valmiudet. Sertifikaatti tekisi osaamisesta todennettavaa myös asiakkaille." };
    if (pct >= 0.6) return { title: "Hyvä perusta", text: "Perusteet ovat hallussa. Gap-analyysi osoittaa, mitä sertifiointiin vielä tarvitaan." };
    return { title: "Kehityskohteita", text: "Tämä on tyypillinen lähtötilanne. Jäsennelty käyttöönotto vie sertifiointiin hallitusti ja ennustettavasti." };
  }

  // --- Yhteenveto ------------------------------------------------------------
  function showFinal() {
    const results = Object.values(state.results);
    const topics = mergeTopics();
    const summary = [];
    if (state.survey) {
      summary.push(`<div class="stat"><span class="stat-label">Liiketoimintatarve</span><strong>${esc(surveyLevel().title)}</strong></div>`);
    }
    if (results.length) {
      const correct = results.reduce((s, r) => s + r.correct, 0);
      const totalQ = results.reduce((s, r) => s + r.total, 0);
      summary.push(`<div class="stat"><span class="stat-label">ISO 27001 -osaaminen</span><strong>${esc(knowledgeLevel(correct / totalQ).title)}</strong><span class="stat-sub">${correct}/${totalQ} oikein</span></div>`);
    }
    const path = recommendedPath(topics);
    render(`
      <p class="eyebrow">Yhteenveto${state.company ? ` · ${esc(state.company)}` : ""}</p>
      <h1>Teidän polkunne ISO 27001 -sertifikaattiin</h1>
      ${summary.length ? `<div class="stats">${summary.join("")}</div>` : ""}
      ${!state.survey ? `<button class="btn" id="survey">Tehkää tarvekartoitus tarkempaa suositusta varten</button>` : ""}
      ${reasonsHtml(3)}
      <section class="block">
        <h2>Suositeltu etenemispolku</h2>
        <ol class="path">
          ${path.map((k) => `<li>${icon(k)}<h4>${esc(SERVICES[k].name)}</h4><p>${esc(SERVICES[k].text)}</p></li>`).join("")}
        </ol>
      </section>
      <div class="talkbox">
        <h2>${esc(CONFIG.talkTitle)}</h2>
        <p>${esc(CONFIG.talkText)}</p>
        <div class="chips">${path.slice(0, 3).map((k) => `<span class="chip">${esc(SERVICES[k].name)}</span>`).join("")}</div>
        <p class="note">Tavattavissa ${esc(CONFIG.stand)}.</p>
      </div>
      ${GAMES.some((g) => !state.results[g.id]) ? `<button class="btn ghost" id="hub">Jatka testejä</button>` : `<button class="btn ghost" id="hub">Takaisin valikkoon</button>`}
    `, { showHome: true });
    onClick("survey", () => showSurveyQuestion([], 0));
    onClick("hub", showHub);
  }

  // Etenemispolku: lähtötilanteen mukainen runko + vastausten perusteella nousseet palvelut
  function recommendedPath(topics) {
    const ready = state.survey && state.survey.reasons.includes("ready");
    const extra = [];
    if (state.survey) state.survey.reasons.slice(0, 3).forEach((k) => extra.push(REASONS[k].service));
    weakTopics(topics, 3).forEach((k) => extra.push(TOPICS[k].service));
    const start = ready ? ["gap"] : ["gap", "implementation"];
    const middle = uniq(["risk"].concat(extra)).filter((k) => !start.includes(k) && !["readiness", "internal_audit", "continuous"].includes(k));
    const end = ["internal_audit", "readiness"];
    if (extra.includes("continuous")) end.push("continuous");
    return uniq(start.concat(middle.slice(0, 2), end)).slice(0, 6);
  }

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
            <p class="service"><span>Palvelumme</span> ${esc(s.name)}</p></div>`;
        }).join("")
      : `<div class="item"><h4>Osaaminen on vahvaa</h4><p>Sertifikaatti tekee osaamisestanne todennettavaa asiakkaille. Valmiusarviointi osoittaa, kuinka lähellä sertifiointia olette.</p>
          <p class="service"><span>Palvelumme</span> ${esc(SERVICES.readiness.name)}</p></div>`;
    return `<section class="block"><h2>Mitä tämä tarkoittaa liiketoiminnallenne</h2>${items}</section>`;
  }

  if (state.company || anyDone()) showHub(); else showStart();
})();
