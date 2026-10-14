(function () {
  "use strict";

  const POINTS = 100;      // per oikea vastaus
  const SPEED_BONUS = 50;  // max lisäpisteet ajastetuissa peleissä
  const STORE_KEY = "iso27001-game-v2";

  const app = document.getElementById("app");
  const homeBtn = document.getElementById("homeBtn");
  const totalEl = document.getElementById("totalScore");
  document.getElementById("brand").textContent = CONFIG.brand;
  homeBtn.addEventListener("click", () => { stopTimer(); showHub(); });

  const fresh = () => ({ name: "", results: {}, survey: null });
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
  const total = () => Object.values(state.results).reduce((s, r) => s + r.score, 0);
  const maxFor = (g) => g.questions.length * (POINTS + (g.timer ? SPEED_BONUS : 0));
  const anyDone = () => state.survey || Object.keys(state.results).length > 0;
  const byId = (id) => document.getElementById(id);
  const onClick = (id, fn) => { const el = byId(id); if (el) el.onclick = fn; };

  function render(html, { showHome = false } = {}) {
    app.innerHTML = `<div class="pop">${html}</div>`;
    homeBtn.hidden = !showHome;
    const t = total();
    totalEl.hidden = t === 0;
    totalEl.textContent = `${t} p`;
    window.scrollTo(0, 0);
  }

  // --- Aloitus ---------------------------------------------------------------
  function showStart() {
    render(`
      <div class="big-emoji">🛡️</div>
      <h1>Mitä ISO 27001 voisi tehdä teidän yrityksellenne?</h1>
      <p class="lead">Selvitä parissa minuutissa, tarvitseeko yrityksesi tietoturvasertifikaatin – ja testaa samalla, kuinka hyvin tunnet ISO 27001:n. 😎</p>
      <label for="name" class="lead">Nimimerkki (vapaaehtoinen)</label>
      <input id="name" type="text" maxlength="24" placeholder="esim. Kontrolli-Kaisa" value="${esc(state.name)}">
      <button class="btn" id="go">Aloitetaan!</button>
    `);
    onClick("go", () => {
      state.name = byId("name").value.trim();
      save();
      showHub();
    });
  }

  // --- Valikko ---------------------------------------------------------------
  function showHub() {
    const surveyCard = `<button class="game-card featured" id="surveyCard">
        ${state.survey ? `<span class="done">✓</span>` : `<span class="badge">Aloita tästä</span>`}
        <div class="icon">${SURVEY.icon}</div>
        <div class="title">${esc(SURVEY.title)}</div>
        <div class="sub">${esc(SURVEY.subtitle)}</div>
      </button>`;
    const cards = GAMES.map((g) => {
      const r = state.results[g.id];
      return `<button class="game-card" data-id="${g.id}">
        ${r ? `<span class="done">${r.correct}/${g.questions.length}</span>` : ""}
        <div class="icon">${g.icon}</div>
        <div class="title">${esc(g.title)}</div>
        <div class="sub">${esc(g.subtitle)}</div>
      </button>`;
    }).join("");
    render(`
      <h2>${state.name ? `Hei ${esc(state.name)}! ` : ""}Mistä aloitetaan?</h2>
      ${surveyCard}
      <h3 class="section">🎮 Testaa tietosi</h3>
      <div class="grid">${cards}</div>
      ${anyDone() ? `<button class="btn" id="final">📋 Katso yhteenveto</button>
        <button class="btn secondary" id="reset">Aloita alusta</button>` : ""}
    `);
    onClick("surveyCard", () => showSurveyQuestion([], 0));
    app.querySelectorAll(".game-card[data-id]").forEach((el) => el.onclick = () => startGame(GAMES.find((g) => g.id === el.dataset.id)));
    onClick("final", showFinal);
    onClick("reset", () => { state = Object.assign(fresh(), { name: state.name }); save(); showHub(); });
  }

  // --- Tarvekartoitus --------------------------------------------------------
  function showSurveyQuestion(answers, i) {
    const q = SURVEY.questions[i];
    render(`
      <div class="qcard">
        <div class="progress"><span>${SURVEY.icon} Tarvekartoitus</span><span>${i + 1}/${SURVEY.questions.length}</span></div>
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
    confetti();
    render(`
      <div class="result">
        <div class="big-emoji">${level.icon}</div>
        <p class="lead">ISO 27001 -tarve yrityksellenne:</p>
        <h1>${esc(level.title)}</h1>
        ${meterHtml(score)}
        <p class="lead">${esc(level.text)}</p>
      </div>
      ${reasonsHtml(4)}
      <div class="result">
        <button class="btn" id="hub">🎮 Testaa seuraavaksi tietosi</button>
        <button class="btn secondary" id="final">📋 Yhteenveto</button>
      </div>
    `, { showHome: true });
    onClick("hub", showHub);
    onClick("final", showFinal);
  }

  function surveyLevel() {
    return SURVEY.levels.find((l) => state.survey.score >= l.min);
  }

  function meterHtml(score) {
    const max = SURVEY.questions.reduce((s, q) => s + Math.max(...q.options.map((o) => o.points)), 0);
    return `<div class="meter"><div style="width:${Math.max(6, (score / max) * 100)}%"></div></div>`;
  }

  function reasonsHtml(max) {
    const keys = state.survey ? state.survey.reasons.slice(0, max) : ["tenders", "data", "growth"];
    return `<section class="suggestions">
      <h2 class="s-title">💡 Miksi ISO 27001 ${state.survey ? "teille" : "kannattaa"}</h2>
      ${keys.map((k) => card(REASONS[k].icon, REASONS[k].title, REASONS[k].text)).join("")}
    </section>`;
  }

  // --- Tietovisat ------------------------------------------------------------
  function startGame(game) {
    const run = { game, order: shuffle(game.questions), i: 0, score: 0, correct: 0, topics: {} };
    // Auditoijan silmin: lämmittelykysymys pidetään aina ensimmäisenä
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
      <div class="qcard">
        <div class="progress"><span>${game.icon} ${esc(game.title)}</span><span>${i + 1}/${order.length}</span></div>
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

    const started = Date.now();
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
      let gained = 0;
      if (ok) {
        gained = POINTS;
        if (game.timer) {
          const left = Math.max(0, game.timer - (Date.now() - started) / 1000);
          gained += Math.round(SPEED_BONUS * (left / game.timer));
        }
        run.score += gained;
        run.correct++;
      }
      app.querySelectorAll(".opt").forEach((b) => {
        b.disabled = true;
        const bi = Number(b.dataset.idx);
        if (bi === q.correct) b.classList.add("correct");
        else if (bi === idx) b.classList.add("wrong");
      });
      const title = idx === null ? "⏰ Aika loppui!" : ok ? `✅ Oikein! +${gained} p` : "❌ Ei ihan";
      const last = run.i === order.length - 1;
      byId("fb").innerHTML = `
        <div class="feedback ${ok ? "ok" : "bad"}"><strong>${title}</strong>${esc(q.explain || "")}</div>
        <button class="btn" id="next">${last ? "Katso tulos" : "Seuraava →"}</button>`;
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
    const prev = state.results[game.id];
    // Paras tulos jää voimaan, mutta ehdotukset perustuvat viimeisimpään pelikertaan
    const best = !prev || run.score > prev.score ? run : prev;
    state.results[game.id] = { score: best.score, correct: best.correct, topics: run.topics };
    save();
    const ratio = run.correct / game.questions.length;
    const stars = ratio >= 0.9 ? 3 : ratio >= 0.6 ? 2 : ratio > 0 ? 1 : 0;
    const msg = ["Harjoitus tekee mestarin! 💪", "Hyvä alku! 👍", "Vahvaa osaamista! 🔥", "Auditoija olisi ylpeä! 🏅"][stars];
    if (stars >= 2) confetti();
    const nextGame = GAMES.find((g) => !state.results[g.id]);
    render(`
      <div class="result">
        <div class="big-emoji">${game.icon}</div>
        <h2>${esc(game.title)}</h2>
        <div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
        <div class="score">${run.score} p</div>
        <p class="lead">${run.correct}/${game.questions.length} oikein · ${msg}</p>
      </div>
      ${topicsHtml(run.topics, 2)}
      <div class="result">
        ${!state.survey ? `<button class="btn" id="survey">${SURVEY.icon} Tarvitseeko yrityksesi ISO 27001:n?</button>` : ""}
        ${nextGame ? `<button class="btn ${state.survey ? "" : "secondary"}" id="next">Seuraava peli: ${nextGame.icon} ${esc(nextGame.title)}</button>` : ""}
        <button class="btn secondary" id="final">📋 Yhteenveto</button>
        <button class="btn secondary" id="again">Pelaa uudestaan</button>
      </div>
    `, { showHome: true });
    onClick("survey", () => showSurveyQuestion([], 0));
    onClick("next", () => startGame(nextGame));
    onClick("final", showFinal);
    onClick("again", () => startGame(game));
  }

  // --- Yhteenveto ------------------------------------------------------------
  function showFinal() {
    const played = GAMES.filter((g) => state.results[g.id]);
    const t = total();
    let head;
    if (played.length) {
      const pct = t / played.reduce((s, g) => s + maxFor(g), 0);
      const level =
        pct >= 0.85 ? { e: "🏆", t: "Tietoturvamestari", d: "Osaaminen on vahvaa – sertifikaatti tekisi siitä näkyvää myös asiakkaillenne." } :
        pct >= 0.6 ? { e: "🥈", t: "Hyvällä pohjalla", d: "Perusteet ovat hallussa. Pienellä tuella sertifiointi on lähempänä kuin luulet." } :
        pct >= 0.35 ? { e: "🛠️", t: "Hyvällä matkalla", d: "Tärkeimmät asiat ovat tuttuja – loput opitaan matkan varrella." } :
        { e: "🌱", t: "Gap-analyysin paikka", d: "Hyvä uutinen: jokainen sertifioitu yritys on aloittanut jostain!" };
      head = `<div class="big-emoji">${level.e}</div><h1>${esc(level.t)}</h1>
        ${state.name ? `<p class="lead">${esc(state.name)}</p>` : ""}
        <div class="score">${t} p</div><p class="lead">${level.d}</p>`;
    } else {
      head = `<div class="big-emoji">📋</div><h1>Yhteenveto</h1>${state.name ? `<p class="lead">${esc(state.name)}</p>` : ""}`;
    }
    if (state.survey) {
      const sl = surveyLevel();
      head += `<div class="need"><span>ISO 27001 -tarve:</span> <strong>${sl.icon} ${esc(sl.title)}</strong>${meterHtml(state.survey.score)}</div>`;
    }

    const topics = mergeTopics();
    confetti();
    render(`
      <div class="result">${head}</div>
      ${reasonsHtml(3)}
      ${!state.survey ? `<button class="btn" id="survey">${SURVEY.icon} Selvitä, tarvitseeko yrityksesi ISO 27001:n</button>` : ""}
      ${played.length ? topicsHtml(topics, 2, true) : ""}
      <div class="talkbox">
        <strong>${esc(CONFIG.talkTitle)}</strong>
        <p>${esc(CONFIG.talkText)}</p>
        <div class="chips">${talkChips(topics).map((c) => `<span class="chip">${c.icon} ${esc(c.title)}</span>`).join("")}</div>
      </div>
      <div class="result">
        ${GAMES.some((g) => !state.results[g.id]) ? `<button class="btn secondary" id="hub">🎮 Pelaa lisää</button>` : `<button class="btn secondary" id="hub">Takaisin valikkoon</button>`}
      </div>
    `, { showHome: true });
    onClick("survey", () => showSurveyQuestion([], 0));
    onClick("hub", showHub);
  }

  // Keskustelun aiheet asiantuntijalle: tärkeimmät syyt + heikoimmat aiheet
  function talkChips(topics) {
    const reasons = (state.survey ? state.survey.reasons.slice(0, 2) : []).map((k) => REASONS[k]);
    const weak = weakTopics(topics, 2).map((k) => TOPICS[k]);
    const chips = reasons.concat(weak);
    return chips.length ? chips : [TOPICS.certification, TOPICS.risk];
  }

  // --- Ehdotukset vastausten perusteella -------------------------------------
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

  function card(icon, title, text) {
    return `<div class="suggestion">
        <div class="s-head"><span class="s-icon">${icon}</span><strong>${esc(title)}</strong></div>
        <p>${esc(text)}</p>
      </div>`;
  }

  function topicsHtml(topics, max, isFinal) {
    const weak = weakTopics(topics, max);
    const strong = Object.entries(topics).filter(([k, v]) => TOPICS[k] && v.missed === 0).map(([k]) => TOPICS[k]);
    let html = `<h2 class="s-title">${isFinal ? "🎯 Tästä kannattaa jutella" : "💡 Miksi tällä on väliä"}</h2>`;
    html += weak.length
      ? weak.map((k) => card(TOPICS[k].icon, TOPICS[k].title, TOPICS[k].pitch)).join("")
      : card(PERFECT_PITCH.icon, PERFECT_PITCH.title, PERFECT_PITCH.pitch);
    html += `<p class="s-link">💬 Kysy lisää ${esc(CONFIG.stand)}</p>`;
    if (isFinal && strong.length) {
      html += `<div class="strengths"><strong>💪 Vahvuutesi</strong><ul>${strong.map((t) => `<li>${esc(t.strong)}</li>`).join("")}</ul></div>`;
    }
    return `<section class="suggestions">${html}</section>`;
  }

  // --- Konfetti --------------------------------------------------------------
  function confetti() {
    const box = byId("confetti");
    const colors = ["#00b8d9", "#7c3aed", "#facc15", "#22c55e", "#f472b6"];
    for (let i = 0; i < 80; i++) {
      const c = document.createElement("div");
      c.className = "confetto";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = 1.8 + Math.random() * 1.8 + "s";
      c.style.animationDelay = Math.random() * 0.4 + "s";
      box.appendChild(c);
      setTimeout(() => c.remove(), 4500);
    }
  }

  if (state.name || anyDone()) showHub(); else showStart();
})();
