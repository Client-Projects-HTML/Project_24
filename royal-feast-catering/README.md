# Royal Feast — Catering Company HTML Template

A complete, responsive, multi-page HTML/CSS/JS template for a catering business, with two home page styles and a staff admin portal.

## What's inside
- **25 pages**: 2 home pages (Classic & Premium), About, Services, Service Details, Menu, Menu Details, Gallery, Events, Pricing, Testimonials, Enquiry, FAQ, Contact, Blog, Coming Soon, 404, plus an 8-page Admin Portal.
- **Design system**: single CSS variable palette (`assets/css/style.css`), responsive breakpoints (`responsive.css`), dark mode (`dark-mode.css`) and RTL layout (`rtl.css`).
- **No build step** — plain HTML/CSS/JS, works by opening any page in a browser or hosting the folder as static files.

See `documentation/` for the full installation and customization guide.

## Quick start
1. Open `index.html` in your browser, or serve the folder with any static file server.
2. To preview the Admin Portal, click **Admin Portal** in the header, or open `admin/index.html` directly.
3. Toggle dark mode and RTL layout using the icon buttons in the header — settings persist via `localStorage`.

## Folder structure
```
royal-feast-catering/
├── index.html              (Home 1 — Classic)
├── home-2.html              (Home 2 — Premium / Signature Collection)
├── about.html, services.html, service-details.html
├── menu.html, menu-details.html
├── gallery.html, events.html, pricing.html
├── testimonials.html, enquiry.html, faq.html, contact.html, blog.html
├── coming-soon.html, 404.html
├── admin/                   (Staff-only portal — noindex)
│   ├── index.html            (Dashboard Overview)
│   ├── enquiries.html, bookings.html, menu.html
│   ├── gallery.html, testimonials.html, customers.html, settings.html
├── assets/
│   ├── css/ (style.css, responsive.css, dark-mode.css, rtl.css)
│   ├── js/  (main.js, enquiry.js, gallery.js)
│   ├── images/ (placeholder folders — see Customization Guide)
│   └── fonts/ (loaded from Google Fonts by default — see below)
├── documentation/
└── README.md
```

## Placeholder content
Every photo in this template is a labelled placeholder generated at `https://placehold.co`, styled in the brand colors, so it's obvious what real photography should go where (e.g. "Wedding+Buffet+Spread"). Replace `<img src="...">` values with real photography before launch — see `documentation/customization-guide.md`.

## Credits
- Fonts: Playfair Display & Poppins (Google Fonts)
- Icons: hand-built inline SVG line icon set (no external icon library dependency)
- Placeholder images: placehold.co
