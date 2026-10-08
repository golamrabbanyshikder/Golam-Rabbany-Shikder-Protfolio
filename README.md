# Personal Portfolio — Golam Rabbany Shikder

Modern, responsive single-page portfolio for **Golam Rabbany Shikder** — Software Engineer specializing in Java, Spring Boot, and microservices.

## Files

- `index.html` — main page
- `styles.css` — styling (dark + light themes)
- `script.js` — interactivity (theme toggle, scroll reveal, typewriter, mobile nav)
- `assets/profile.jpg` — profile photo

## Local preview

Just open `index.html` in a browser, or run a quick local server:

```bash
# Python 3
python -m http.server 8000

# Node
npx serve .
```

## Deploy to Netlify

### Option 1 — Drag & drop
1. Go to https://app.netlify.com/drop
2. Drag the entire `portfolio/` folder onto the page
3. Done — your site is up at `*.netlify.app`

### Option 2 — Git-based
1. Push this folder to a GitHub/GitLab/Bitbucket repo
2. In Netlify → **Add new site** → **Import an existing project**
3. Build settings:
   - Build command: *(leave empty)*
   - Publish directory: `./` (or `portfolio` if repo root is above it)
4. Deploy

The included `netlify.toml` handles SPA-friendly routing, security headers, and caching automatically.

## Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark / light theme toggle (persists across visits)
- ✅ Animated hero with typewriter effect
- ✅ Scroll-reveal animations
- ✅ Smooth-scroll & active section highlighting
- ✅ Accessible (semantic HTML, keyboard-friendly)
- ✅ Zero build tools — pure HTML/CSS/JS
- ✅ Fast (no frameworks, no external JS bundles)