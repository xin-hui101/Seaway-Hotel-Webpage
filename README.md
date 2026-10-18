# Seaway Hotel website (React + Vite)

## Run it on your computer
1. Install Node.js (version 18 or newer) from https://nodejs.org
2. Open a terminal in this folder and run:

```
npm install
npm run dev
```

3. Open the link it prints (usually http://localhost:5173).

## Build for hosting
```
npm run build
```
The finished site is written to `dist/`: the English page at `dist/index.html`, the Chinese page at `dist/zh/index.html`, plus `sitemap.xml` and `robots.txt`. The build writes out every page's text so search engines can read it without running JavaScript.

Host it on Cloudflare Pages with build command `npm run build` and output folder `dist`. The site must sit at the root of its domain (not in a sub-folder).

## Where to edit things
- Website address and Google search text (titles, descriptions, hotel info): `src/data/site.js`. Change `SITE_URL` to the real domain once it is connected, then rebuild.
- Tab icon and share preview image: `public/favicon.svg`, `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/og-image.jpg`
- Room names, prices, photos: `src/data/rooms.js`
- Facilities, travel directions, phone/email/socials: `src/data/facilities.js`
- Colours and fonts: top of `src/styles/global.css` (`:root` variables)
- Photos: `public/images/`
- Each page section is its own component in `src/components/`
