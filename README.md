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
The finished site is written to `dist/`. Upload that folder to any static host (Netlify, Vercel, GitHub Pages, cPanel…).

## Where to edit things
- Room names, prices, photos: `src/data/rooms.js`
- Facilities, travel directions, phone/email/socials: `src/data/facilities.js`
- Colours and fonts: top of `src/styles/global.css` (`:root` variables)
- Photos: `public/images/`
- Each page section is its own component in `src/components/`
