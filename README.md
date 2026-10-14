# ISO 27001 -haaste 🛡️

A mobile marketing game about ISO 27001:2022. A player scans a QR code, enters a nickname if they want, and plays four mini-games:

| Game | Content |
|---|---|
| 🧠 Pikavisa | Basics: what SoA stands for, number of Annex A controls, which of four is not an Annex A theme… |
| 🔍 Auditoijan silmin | "Which clause is failed most often?" (9.2) + auditor findings → pick the clause |
| 🗂️ Lajittelupeli | Sort Annex A controls into the four themes (5–8) |
| ⚡ Tosi vai tarua? | Timed true/false with speed bonus |

The final screen shows a level, total score, a "show this at our stand for a prize" box and a contact CTA.

## Editing content
All questions, texts and the contact link are in **`questions.js`** (`CONFIG` and `GAMES`). No build step.

## Publishing (GitHub Pages)
1. Repo → Settings → Pages → *Deploy from a branch* → choose the branch and `/ (root)`.
2. Open `https://<user>.github.io/<repo>/qr.html` – it shows a printable QR code pointing to the game.

## Run locally
`python3 -m http.server` and open http://localhost:8000
