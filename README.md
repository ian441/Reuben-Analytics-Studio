## Reuben Analytics Studio – Data Analyst Consultant Website

Marketing site and portfolio for data analytics consulting. Built as a static HTML/CSS/JS site, served with `serve` and integrated with Contentful to manage portfolio projects.

### Tech stack

- **Frontend**: Static HTML, CSS, vanilla JavaScript
- **Build/serve**: Node.js + `serve`
- **CMS**: Contentful (client-side API consumption)

### Local development

1. Install dependencies (Node.js 18+ recommended):

```bash
npm install
```

2. Start local server:

```bash
npm run dev
```

3. Open `http://localhost:3000/` in your browser.

### Contentful integration (portfolio)

Portfolio projects on `portfolio.html` are loaded from Contentful via `js/contentful-portfolio.js`.

1. Create a Contentful space and a content type:
   - **Content type ID**: `project`
   - Fields:
     - `tag` (Short text)
     - `title` (Short text)
     - `description` (Long text)
     - `outcome` (Long text)
     - `tools` (Short text, list)
     - `imageLabel` (Short text)
     - (optional) `order` (Integer) for manual ordering

2. Create and publish entries for each project.

3. In `js/contentful-portfolio.js`, set your credentials:

```js
var CONTENTFUL_SPACE_ID = 'YOUR_SPACE_ID';
var CONTENTFUL_ENVIRONMENT_ID = 'master'; // or your env
var CONTENTFUL_DELIVERY_TOKEN = 'YOUR_DELIVERY_TOKEN';
```

The portfolio grid will then populate automatically from Contentful.

### Deployment

This site can be deployed to any static host (e.g. Vercel, Netlify, GitHub Pages). The only requirement is that outbound HTTPS requests to Contentful are allowed from the browser.

