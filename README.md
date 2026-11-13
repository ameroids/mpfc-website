# MPFC Freight Carrier website

Static site (HTML, CSS, vanilla JS). No build step, no dependencies.

## Run locally
1. Unzip the folder.
2. Open a terminal inside it and run ONE of:
   - `python3 -m http.server 8000`  then open http://localhost:8000
   - `npx serve .`
   (Double-clicking index.html also works, but a local server is more reliable for video seeking.)
3. Scroll the page. The hero is scroll-driven; scrolling back reverses it.

## Edit your details
Open `assets/config.js` and change company name, about text, address, phone, email,
WhatsApp number (digits only, with country code) and the list of cities.

## Deploy
Upload the whole folder to any static host (Netlify drag-and-drop, Vercel, Cloudflare Pages,
GitHub Pages, or regular cPanel hosting into public_html). Needs HTTPS for best video behaviour.

## Files
- index.html: page structure (hero, about, coverage, quote form, footer)
- assets/style.css: all styling
- assets/hero.js: scroll-driven video hero
- assets/site.js: fills content from config and powers the quote form
- assets/config.js: YOUR editable details

## Notes
- Hero video is streamed from the original CloudFront URLs. For production, download the clips
  and set `MPFC_VIDEO_HI` / `MPFC_VIDEO_LO` in config.js to your own copies.
- Fonts load from Google Fonts. To self-host, download the latin woff2 files and add @font-face rules.
- The hero video shows a generic reach-stacker and truck, not MPFC's own fleet or branding.
- Debug recorder mode: add `?rec=1` to the URL.

## Content you must verify
A web search did not find a verified company called "MPFC Freight Carrier"; "MPFC" mostly refers to
the Madhya Pradesh Financial Corporation, which is unrelated. All company facts here are placeholders.
Regional statements (Indore/Bhopal/Gwalior as logistics hubs, Dankuni-Surat freight corridor passing
through MP, approved Indore logistics park) come from public news reports; re-check before publishing.
Do not publish stats, licences or client names you cannot prove.
