# Customization Guide

## 1. Colors
All colors are CSS variables defined once at the top of `assets/css/style.css`:
```css
:root {
  --primary: #7a1010;     /* Royal Red */
  --secondary: #b8860b;   /* Antique Gold */
  --bg: #fbf7f0;          /* Cream background */
  --ink: #241a15;         /* Body text */
}
```
Change these two values (`--primary`, `--secondary`) and the whole site — buttons, links, badges, hero overlays — updates. Dark-mode equivalents live in `assets/css/dark-mode.css`.

## 2. Fonts
Loaded via Google Fonts `@import` at the top of `style.css`:
- **Playfair Display** — all headings (`--font-display`)
- **Poppins** — body text and UI (`--font-body`)

To swap fonts, replace the `@import` URL and the two `--font-*` variable values.

## 3. Logo
The header/footer "logo" is a text wordmark (`Royal <em>Feast</em>`) plus a circular icon (`.brand-mark`). To use an image logo instead, replace the `<span class="brand-mark">…</span>` SVG with `<img src="assets/images/logo.svg" alt="Royal Feast Catering" height="32">` in every page's header — or better, do a project-wide find/replace since the header markup is identical on every page.

## 4. Replacing placeholder images
Every image uses `https://placehold.co/...` placeholder URLs with a descriptive label baked into the filename query, e.g. `?text=Wedding+Buffet+Spread`. Search the HTML for `placehold.co` and swap each `src` for real photography — the labels tell you exactly what each image should show. Recommended folders are already scaffolded under `assets/images/` (`hero/`, `menu/`, `gallery/`, `chefs/`, `events/`, `testimonials/`, `icons/`).

## 5. Content
Menu items, pricing, testimonials, team members, blog posts and FAQs are plain HTML in each page — search for the section heading (e.g. `<h2>Meet Our Chefs</h2>`) and edit the surrounding cards directly.

## 6. Navigation
The main nav (including the Home 1/Home 2 dropdown) is repeated in the `<header>` of every page. Add, remove or rename links there. The active-page highlight is automatic (`assets/js/main.js`, `initActiveNav`) based on the current filename.

## 7. Dark mode & RTL
- Dark mode: toggled via the moon icon, persisted in `localStorage` under `rf-theme`, and also respects the visitor's OS preference on first visit.
- RTL: toggled via the globe icon, persisted under `rf-dir`. All spacing/alignment flips are in `assets/css/rtl.css`.

## 8. Admin Portal branding
The admin sidebar and topbar reuse the same CSS variables, so a color change in `style.css` automatically restyles the dashboard too.
