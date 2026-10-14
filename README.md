# ISO 27001 -haaste 🛡️

An expo game for company representatives visiting our stand. The goal is to show **why their company would need and/or want an ISO 27001 certificate** – and to give our experts a natural conversation starter.

Visitors scan a QR code and get:

| Part | Content |
|---|---|
| 🧭 **Tarvitseeko yrityksesi ISO 27001:n?** | 7-question self-assessment about their company (customer demands, data, NIS2, suppliers, incidents, growth, current practices). No wrong answers. Result: a "need level" meter + the business reasons that apply to them. |
| 🧠 Pikavisa | ISO 27001 basics (SoA, number of Annex A controls, themes…) |
| 🔍 Auditoijan silmin | "Which clause fails most often?" (9.2) + auditor findings → pick the clause |
| 🗂️ Lajittelupeli | Sort Annex A controls into the four themes |
| ⚡ Tosi vai tarua? | Timed true/false |

After each quiz, the topics the player got wrong are shown with a short "why this matters for your business / how we help" pitch.

The **summary screen** (available after any game) shows the need level, the reasons ISO 27001 suits their company, the topics worth discussing, their strengths, and a "come talk to us – show this screen to our expert" box. That box has topic chips so staff know right away what to talk about.

## Editing content
Everything is in **`questions.js`**: `CONFIG` (stand name and texts), `SURVEY` + `REASONS` (self-assessment), `TOPICS` (quiz pitches) and `GAMES` (quiz questions). No build step.

## Publishing (GitHub Pages)
1. Repo → Settings → Pages → *Deploy from a branch* → choose the branch and `/ (root)`.
2. Open `https://<user>.github.io/<repo>/qr.html` – it shows a printable QR code pointing to the game.

## Run locally
`python3 -m http.server` and open http://localhost:8000
