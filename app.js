(function () {
  "use strict";

  const POINTS = 100;      // per oikea vastaus
  const SPEED_BONUS = 50;  // max lisäpisteet ajastetuissa peleissä
  const STORE_KEY = "iso27001-game-v1";

  const app = document.getElementById("app");
  const homeBtn = document.getElementById("homeBtn");
  const totalEl = document.getElementById("totalScore");
  document.getElementById("brand").textContent = CONFIG.brand;
  homeBtn.addEventListener("click", () => { stopTimer(); showHub(); });

  let state = load();
  let timerId = null;

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { name: "", results: {} }; }
    catch (e) { return { name: "", results: {} }; }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ei tallennusta */ }
  }

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const total = () => Object.values(state.results).reduce((s, r) => s + r.score, 0);
  const maxFor = (g) => g.questions.length * (POINTS + (g.timer ? SPEED_BONUS : 0));
  const allDone = () => GAMES.every((g) => state.results[g.id]);

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
      <h1>Kuinka hyvin tunnet ISO 27001:n?</h1>
      <p class="lead">${GAMES.length} pikkupeliä, muutama minuutti ja yksi kysymys: oletko valmis auditointiin? 😎</p>
      <label for="name" class="lead">Nimimerkki (vapaaehtoinen)</label>
      <input id="name" type="text" maxlength="24" placeholder="esim. Kontrolli-Kaisa" value="${esc(state.name)}">
      <button class="btn" id="go">Aloitetaan!</button>
    `);
    document.getElementById("go").onclick = () => {
      state.name = document.getElementById("name").value.trim();
      save();
      showHub();
    };
  }

  // --- Valikko ---------------------------------------------------------------
  function showHub() {
    const cards = GAMES.map((g) => {
      const r = state.results[g.id];
      return `<button class="game-card" data-id="${g.id}">
        ${r ? `<span class="done">${r.correct}/${g.questions.length}</span>` : ""}
        <div class="icon">${g.icon}</div>
        <div class="title">${esc(g.title)}</div>
        <div class="sub">${esc(g.subtitle)}</div>
      </button>`;
    }).join("");
    const doneCount = GAMES.filter((g) => state.results[g.id]).length;
    render(`
      <h2>${state.name ? `Hei ${esc(state.name)}! ` : ""}Valitse peli</h2>
      <p class="lead">Pelattu ${doneCount}/${GAMES.length}. Pelaa kaikki ja katso lopputuloksesi!</p>
      <div class="grid">${cards}</div>
      ${allDone() ? `<button class="btn" id="final">🏆 Katso lopputulos</button>` : ""}
      ${doneCount > 0 ? `<button class="btn secondary" id="reset">Aloita alusta</button>` : ""}
    `);
    app.querySelectorAll(".game-card").forEach((el) => el.onclick = () => startGame(GAMES.find((g) => g.id === el.dataset.id)));
    const f = document.getElementById("final"); if (f) f.onclick = showFinal;
    const r = document.getElementById("reset"); if (r) r.onclick = () => { state.results = {}; save(); showHub(); };
  }

  // --- Peli ------------------------------------------------------------------
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
      document.getElementById("fb").innerHTML = `
        <div class="feedback ${ok ? "ok" : "bad"}"><strong>${title}</strong>${esc(q.explain || "")}</div>
        <button class="btn" id="next">${last ? "Katso tulos" : "Seuraava →"}</button>`;
      document.getElementById("next").onclick = () => {
        if (last) finishGame(run);
        else { run.i++; showQuestion(run); }
      };
      document.getElementById("next").scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    app.querySelectorAll(".opt").forEach((b) => b.onclick = () => answer(Number(b.dataset.idx)));

    if (game.timer) {
      const tbar = document.getElementById("tbar");
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
    render(`
      <div class="result">
        <div class="big-emoji">${game.icon}</div>
        <h2>${esc(game.title)}</h2>
        <div class="stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
        <div class="score">${run.score} p</div>
        <p class="lead">${run.correct}/${game.questions.length} oikein · ${msg}</p>
      </div>
      ${suggestionsHtml(run.topics, 2)}
      <div class="result">
        ${allDone() ? `<button class="btn" id="final">🏆 Katso lopputulos</button>` : `<button class="btn" id="hub">Seuraava peli →</button>`}
        <button class="btn secondary" id="again">Pelaa uudestaan</button>
      </div>
    `, { showHome: true });
    const f = document.getElementById("final"); if (f) f.onclick = showFinal;
    const h = document.getElementById("hub"); if (h) h.onclick = showHub;
    document.getElementById("again").onclick = () => startGame(game);
  }

  // --- Lopputulos ------------------------------------------------------------
  function showFinal() {
    const t = total();
    const max = GAMES.reduce((s, g) => s + maxFor(g), 0);
    const pct = t / max;
    const level =
      pct >= 0.85 ? { e: "🏆", t: "Sertifioitu mestari", d: "Sinä voisit vetää seuraavan sisäisen auditoinnin." } :
      pct >= 0.6 ? { e: "🥈", t: "Auditointivalmis", d: "Pieniä poikkeamia, mutta ei mitään mitä korjaava toimenpide ei korjaisi." } :
      pct >= 0.35 ? { e: "🛠️", t: "Hyvällä matkalla", d: "Perusteet hallussa – SoA odottaa jo innolla." } :
      { e: "🌱", t: "Gap-analyysin paikka", d: "Hyvä uutinen: jokainen ISMS alkaa jostain!" };
    confetti();
    render(`
      <div class="result">
        <div class="big-emoji">${level.e}</div>
        <h1>${esc(level.t)}</h1>
        ${state.name ? `<p class="lead">${esc(state.name)}</p>` : ""}
        <div class="score">${t} p</div>
        <p class="lead">${level.d}</p>
      </div>
      ${suggestionsHtml(mergeTopics(), 3, true)}
      <div class="result">
        <div class="prize">${esc(CONFIG.prizeText)}<br><small>${new Date().toLocaleString("fi-FI")}</small></div>
        <p class="lead" style="margin-top:20px">${esc(CONFIG.ctaText)}</p>
        <a class="btn" href="${esc(CONFIG.ctaLink)}">${esc(CONFIG.ctaButton)}</a>
        <button class="btn secondary" id="share">Haasta kaveri 📲</button>
        <button class="btn secondary" id="hub">Takaisin valikkoon</button>
      </div>
    `, { showHome: true });
    document.getElementById("hub").onclick = showHub;
    document.getElementById("share").onclick = async () => {
      const text = `Sain ${t} pistettä ISO 27001 -haasteessa (${level.t})! Pystytkö parempaan?`;
      const url = location.href.split("#")[0];
      try {
        if (navigator.share) await navigator.share({ title: CONFIG.brand, text, url });
        else { await navigator.clipboard.writeText(`${text} ${url}`); alert("Linkki kopioitu!"); }
      } catch (e) { /* peruttu */ }
    };
  }

  // --- Ehdotukset vastausten perusteella ---------------------------------------
  function mergeTopics() {
    const all = {};
    Object.values(state.results).forEach((r) => Object.entries(r.topics || {}).forEach(([k, v]) => {
      const t = all[k] || (all[k] = { asked: 0, missed: 0 });
      t.asked += v.asked;
      t.missed += v.missed;
    }));
    return all;
  }

  function topicLink(title) {
    return `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent("ISO 27001: " + title)}`;
  }

  function suggestionsHtml(topics, max, isFinal) {
    const entries = Object.entries(topics).filter(([k]) => TOPICS[k]);
    // Eniten virheitä (suhteessa kysymyksiin) ensin
    const weak = entries.filter(([, v]) => v.missed > 0)
      .sort((a, b) => b[1].missed / b[1].asked - a[1].missed / a[1].asked || b[1].missed - a[1].missed)
      .slice(0, max);
    const strong = entries.filter(([, v]) => v.missed === 0 && v.asked > 0).map(([k]) => TOPICS[k]);

    const card = (t, link) => `
      <div class="suggestion">
        <div class="s-head"><span class="s-icon">${t.icon}</span><strong>${esc(t.title)}</strong></div>
        <p>${esc(t.pitch)}</p>
        <a class="s-link" href="${esc(link)}">Kysy tästä →</a>
      </div>`;

    let html = `<h2 class="s-title">${isFinal ? "📋 Teidän tietoturvan terveystarkastus" : "💡 Vastaustesi perusteella"}</h2>`;
    if (weak.length) {
      html += `<p class="lead">${isFinal ? "Näihin aiheisiin kannattaisi tarttua ensimmäisenä:" : "Tässä aiheessa voisimme auttaa:"}</p>`;
      html += weak.map(([k]) => card(TOPICS[k], topicLink(TOPICS[k].title))).join("");
    } else {
      html += card(PERFECT_PITCH, topicLink("Sisäinen auditointi / valmiusarviointi"));
    }
    if (isFinal && strong.length) {
      html += `<div class="strengths"><strong>💪 Vahvuutesi</strong><ul>${strong.map((t) => `<li>${esc(t.strong)}</li>`).join("")}</ul></div>`;
    }
    return `<section class="suggestions">${html}</section>`;
  }

  // --- Konfetti --------------------------------------------------------------
  function confetti() {
    const box = document.getElementById("confetti");
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

  if (state.name || Object.keys(state.results).length) showHub(); else showStart();
})();
