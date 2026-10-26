# ISO 27001 -valmiustesti

An expo tool for company representatives visiting our stand. It shows **why their company would benefit from ISO 27001 certification** and leads them to our related consulting services, ending in a personalised "recommended path" that our consultants use to start the conversation.

Visitors scan a QR code, choose **Finnish or English**, and get:

| Part | Content |
|---|---|
| **Tarvekartoitus** (needs assessment) | 7 questions about their company: customer demands, confidential data, NIS2, suppliers, incidents, growth plans, current practices. Result: business-need level and the business benefits that apply to them. |
| ISO 27001:n perusteet | Basics: SoA, Annex A, themes, certification |
| Auditoijan näkökulma | Auditor findings: which clause does it relate to (incl. 9.2) |
| Mitä organisaatiossanne on jo tehty? | 10 "Onko teillä…?" questions about practices already in place (policy, risks, assets, access, MFA, backups, incidents, suppliers, training, audit). Answer Yes / Partly / No / Don't know. Result: readiness %, areas to develop with the matching service, and what is already in place. Gaps feed into the recommended path. |
| Pitääkö paikkansa? | Timed true/false on common beliefs |

After each quiz, topics they got wrong are shown with a business explanation and the matching service ("Palvelumme: …").

The **summary** shows business need, knowledge level, business benefits, a **numbered recommended path of our services** (e.g. Gap-analyysi → ISMS:n käyttöönotto → Riskienarviointi ja SoA → Sisäinen auditointi → Sertifiointivalmiuden arviointi), and a box asking them to show the screen to a consultant at the stand.

Nothing is stored or sent anywhere; answers stay in the visitor's browser.

## Languages
The first screen asks for the language (Suomi / English). The whole game follows that choice, and an FI/EN button in the header switches language on any menu or result screen without losing progress.

## Editing content
Finnish content is in **`content-fi.js`**, English in **`content-en.js`**. Both have the same structure; keep the keys (`id`, `topic`, `service`, `reason`), answer order and `correct` indexes identical in both files. Each file contains:
- `UI` – all buttons, headings and labels
- `CONFIG` – stand name and texts
- `SERVICES` – your consulting services (edit to match your offering)
- `SURVEY` + `REASONS` – needs assessment and business benefits (each reason points to a service)
- `TOPICS` – quiz topics, business explanations, linked service
- `GAMES` – quiz questions

## Branding
Follows the KPMG visual package: KPMG blue / Cobalt primary colours, Purple–Cobalt linear gradient, traffic-light colours for right/wrong, Arial body text (headings use KPMG Bold when installed, else Arial). The logo (`assets/logo-*.svg`) and line icons (`assets/icons/`) come from the Visuals and Iconography decks; icons are coloured with CSS masks.

## Deploying to Render
The game is a static site (no build, no server, no database), so any number of devices can play at the same time – each runs its own copy in the browser.

1. In Render: **New → Static Site** and connect this GitHub repository.
2. Branch: the branch with this code (e.g. `main` after merging).
3. Build command: *(leave empty)*. Publish directory: `.`
4. Create. The game is live at `https://<name>.onrender.com/`.

Alternatively use **New → Blueprint**, which reads `render.yaml` from the repo.

## Addresses
| Address | Use |
|---|---|
| `https://<name>.onrender.com/` | Visitors' own phones (behind the QR code) |
| `https://<name>.onrender.com/?kiosk` | **Tablets at the stand.** Adds a "Valmis – uusi pelaaja / Done – new player" button to the summary, and resets to the language screen after 3 minutes without use, so the next visitor never sees the previous visitor's answers. |
| `https://<name>.onrender.com/qr.html` | Printable QR poster pointing to the game |

## Run locally
`python3 -m http.server` and open http://localhost:8000
