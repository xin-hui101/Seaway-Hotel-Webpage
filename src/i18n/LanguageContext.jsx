import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STRINGS } from './strings';
import { LANG_PATH, SEO } from '../data/site';

export const LANG_KEY = 'seaway-lang';
const LanguageContext = createContext(null);

/** Language the visitor picked before, or their browser language. */
export const preferredLang = () => {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en' || saved === 'zh') return saved;
  } catch { /* storage blocked: fall through */ }
  return navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en';
};

/** `initial` comes from the page address (/ or /zh/), so the pre-rendered page and the app agree. */
export function LanguageProvider({ initial = 'en', children }) {
  const [lang, setLang] = useState(initial);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    root.dataset.lang = lang;
    document.title = SEO[lang].title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', SEO[lang].description);
    // Keep the address in step with the language, so a shared link opens the same version
    if (location.pathname !== LANG_PATH[lang]) {
      history.replaceState(null, '', LANG_PATH[lang] + location.search + location.hash);
    }
    try { localStorage.setItem(LANG_KEY, lang); } catch { /* ignore */ }
  }, [lang]);

  /** UI string by key, with {placeholders}. */
  const t = useCallback((key, vars = {}) => {
    const s = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
    return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
  }, [lang]);

  /** Data value that may be a plain string or an { en, zh } pair. */
  const L = useCallback((v) => (v && typeof v === 'object' && 'en' in v ? v[lang] ?? v.en : v), [lang]);

  const value = useMemo(() => ({ lang, setLang, t, L }), [lang, t, L]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
