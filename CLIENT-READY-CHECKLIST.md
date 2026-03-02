# Client-ready checklist — Data Analyst Consultation Website

Use this list to make sure your site is **professional, complete, and ready for clients** before launch.

---

## Site structure (multi-page)

| Page | URL | Purpose |
|------|-----|---------|
| **Home** | index.html | Hero, featured services, tools ticker, testimonials preview, CTA |
| **Services** | services.html | Full services grid with all 6 offerings |
| **About** | about.html | Bio, credentials, photo placeholder |
| **Pricing** | pricing.html | Starter, Growth, Enterprise tiers |
| **Process** | process.html | How it works (3 steps) |
| **Testimonials** | testimonials.html | All client stories |
| **FAQ** | faq.html | Accordion FAQ |
| **Contact** | contact.html | Form, Calendly embed, contact details |
| **Privacy** | privacy.html | Privacy policy |
| **Terms** | terms.html | Terms of service |

---

## Already done on your site

| Item | Status |
|------|--------|
| **Multi-page** | Dedicated pages for Services, About, Pricing, Process, Testimonials, FAQ, Contact |
| **Dynamic nav** | Active page highlighting via data-page attribute |
| **Page transitions** | Fade-in on load for smoother navigation feel |
| **SEO** | Meta description, keywords, canonical URL, Open Graph & Twitter cards per page |
| **Favicon** | Inline SVG favicon (IA) so the browser tab looks branded |
| **Contact form** | Works via mailto by default; optional Formspree for server-side delivery |
| **Form UX** | Honeypot (spam), labels, validation, success/error messages, company field |
| **Legal** | Privacy Policy and Terms of Service pages (placeholders — review and tailor) |
| **Accessibility** | Skip link, focus-visible styles, prefers-reduced-motion, semantic main |
| **Calendly** | Book a Call CTAs and inline embed on Contact page |
| **Mobile** | Responsive layout, hamburger menu, touch-friendly targets |

---

## 🔧 Before going live — do these

1. **Set your real domain in meta tags**  
   In `index.html`, replace `https://iananayiro.com/` in:
   - `<link rel="canonical" href="...">`
   - `og:url`
   - `og:image` (use full URL to your image)

2. **Add a real share image (Open Graph)**  
   Create or add an image (e.g. 1200×630 px), upload it to your site, and set:
   - `<meta property="og:image" content="https://yourdomain.com/og-image.png">`  
   Otherwise social shares may have no preview image.

3. **Optional: Formspree for contact form**  
   - Sign up at [formspree.io](https://formspree.io), create a form, and get your form endpoint.
   - In `index.html`, find `const FORMSPREE_ENDPOINT = '';` and set it to your endpoint, e.g. `'https://formspree.io/f/xxxxxxxx'`.
   - Submissions will be sent to your Formspree dashboard and you can get email notifications.

4. **Review legal pages**  
   - Open `privacy.html` and `terms.html`.
   - Adjust names, contact email, and any specifics (e.g. analytics, cookies, jurisdictions) to match how you actually run the site and deliver services.

5. **Update year and dates**  
   - Footer: “© 2025” — update yearly if you prefer.
   - Privacy/Terms: “Last updated: February 2025” — change when you edit those pages.

---

## 📌 Optional but recommended

- **Analytics**  
  If you want to measure traffic, add a privacy-friendly option (e.g. Plausible, Fathom, or Google Analytics with consent). Add a short note in your Privacy Policy if you use cookies or tracking.

- **Case studies / portfolio**  
  Add a “Work” or “Case studies” section (or a separate page) with 1–2 anonymized examples (e.g. “Dashboard for a fintech client”, “Churn model for SaaS”) to build trust.

- **Test the form**  
  Submit the contact form (with and without Formspree if you use it) and book a test Calendly slot to confirm everything works on your device and email.

- **Favicon file**  
  You can replace the inline favicon with a real `favicon.ico` or `favicon.svg` in the root and link it in the `<head>` for better caching.

- **SSL**  
  Host the site over HTTPS (most hosts offer free SSL). Update all links to use `https://` so mixed content doesn’t break.

---

## 🚀 When you’re ready

- Upload the site to your host (e.g. Netlify, Vercel, GitHub Pages, or your own server).
- Point your domain to the host and set the canonical URL (and og:url / og:image) to your live domain.
- Do a final pass: click every link, submit the form, book a call, and check on mobile.

Your site is already in great shape; the items above will make it **professional, complete, and functional** for client use.
