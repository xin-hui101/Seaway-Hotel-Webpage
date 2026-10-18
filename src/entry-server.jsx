// Used only at build time: turns the app into plain HTML for each language (see scripts/prerender.mjs).
import { renderToString } from 'react-dom/server';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';

export { SEO, SITE_URL, LANG_PATH, OG_IMAGE, hotelSchema } from './data/site';

export const render = (lang) => renderToString(
  <LanguageProvider initial={lang}>
    <App />
  </LanguageProvider>,
);
