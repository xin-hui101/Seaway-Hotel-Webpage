import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider, preferredLang } from './i18n/LanguageContext';
import { LANG_PATH, langFromPath } from './data/site';
import './styles/global.css';

const lang = langFromPath(location.pathname);

// A visitor who prefers Chinese and lands on the English home page goes to /zh/
if (lang === 'en' && location.pathname === '/' && preferredLang() === 'zh') {
  location.replace(LANG_PATH.zh + location.search + location.hash);
} else {
  const app = (
    <React.StrictMode>
      <LanguageProvider initial={lang}>
        <App />
      </LanguageProvider>
    </React.StrictMode>
  );
  const root = document.getElementById('root');
  // Built pages already contain the HTML (for search engines); the dev server starts empty
  if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
  else ReactDOM.createRoot(root).render(app);
}
