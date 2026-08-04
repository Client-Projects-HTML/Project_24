# Installation Guide

## Option 1 — Open directly
Unzip the template and double-click `index.html`. Every page works without a server because all assets use relative paths and no page requires server-side code.

## Option 2 — Local static server (recommended for testing forms/JS)
From the project root:
```bash
# Python
python3 -m http.server 8080

# Node
npx serve .
```
Then visit `http://localhost:8080`.

## Option 3 — Deploy as static hosting
Upload the whole `royal-feast-catering/` folder as-is to any static host (Netlify, Vercel, GitHub Pages, S3 + CloudFront, or a standard shared-hosting `public_html`). No build step, no dependencies to install.

## Connecting the forms
All forms (`enquiry.html`, `contact.html`, footer newsletter) currently show a client-side success state only — nothing is sent anywhere. To make them functional:
1. **Formspree / Netlify Forms** — add `action="https://formspree.io/f/your-id" method="POST"` (or a `data-netlify="true"` attribute) to the relevant `<form>` tag.
2. Remove or adjust the `data-validate` JS-only submit handler in `assets/js/main.js` if you want a real network submission instead of the in-page success message.

## Connecting the newsletter
The footer newsletter form is a static UI. Point its `action` at your Mailchimp/ConvertKit form endpoint, or swap in their embed snippet.

## Maps
`contact.html` uses a placeholder map image. Replace the `<img>` in the map container with a Google Maps `<iframe>` embed using your business address.

## Admin Portal
The Admin Portal (`/admin/`) is a **static UI mockup** — there is no login, database or backend wired up. It's built to be the front-end shell you connect to your booking/CMS system of choice (or a custom backend). The page is marked `noindex, nofollow` so search engines won't list it.
