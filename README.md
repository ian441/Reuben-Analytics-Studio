# Reuben Analytics Studio

**Data Analyst Consultant Website**

This repository contains the source code for Reuben Analytics Studio—a static marketing and portfolio site showcasing data analytics consulting services. The site is designed to be simple, fast, and easy to host anywhere that supports static assets.

---

## 🌐 Site Overview

The website mirrors the structure of a small consulting business, with the following key pages:

- `index.html` – Homepage with a short intro and call‑to‑action
- `about.html` – Background and mission statement
- `services.html` – List of offered services (BI, predictive analytics, strategy, etc.)
- `portfolio.html` – Case studies and project highlights
- `pricing.html` – Pricing tiers and engagement models
- `process.html` – Work approach and methodology
- `testimonials.html` – Client quotes and endorsements
- `faq.html` – Frequently asked questions
- `contact.html` – Contact form and scheduling links
- `terms.html`, `privacy.html` – Legal pages
- `CLIENT-READY-CHECKLIST.md` – Internal checklist for client deliverables

Content for the home sections (services, portfolio, testimonials) is driven by `data/site-data.json` so it can be updated without touching markup.

---

## 🛠️ Tech Stack

- **Frontend**: Static HTML, CSS (in `css/style.css`), and vanilla JavaScript (`js/main.js`).
- **Data**: `data/site-data.json` provides site text and structured content for dynamic sections.
- **Optional CMS**: The original version supported Contentful for the portfolio (see `js/contentful-portfolio.js`), but the current code reads from the local JSON file.
- **Build / Serve**: Node.js (18+) with `serve` for local development via `npm run dev`.

No frameworks or build tools are required; the site is intentionally minimal.

---

## ⚙️ Local Development

1. **Prerequisites**
   - Node.js 18+ installed.

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. Open `http://localhost:3000/` in your browser.

The server reloads automatically when HTML, CSS, JS, or JSON files change.

---

## 🧩 Data and Content

The file `data/site-data.json` contains the following sections:

- `site` – metadata (name, tagline, contact links)
- `portfolio` – array of portfolio items used by `portfolio.html`
- `services` – array describing each service block on the home/services pages
- `testimonials` – quotes used on `testimonials.html`

You can edit this JSON directly to update the site copy and projects.

If you prefer a headless CMS, uncomment and configure `js/contentful-portfolio.js` as explained below.




## 🚀 Deployment

Deploy the contents of this repository to any static host (Vercel, Netlify, GitHub Pages, etc.).

- Ensure the server serves the root directory and rewrites 404s to `index.html` if you use client-side navigation.
- Outbound HTTPS requests must be permitted if using Contentful.

No build step is necessary—just upload the files.

---

## 📄 Licensing & Credits

This site is provided as-is for portfolio/demo purposes. Feel free to reuse or adapt it under the MIT license.

---

_Last updated: March 2026_

