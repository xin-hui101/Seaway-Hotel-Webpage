import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STRINGS } from './strings';

const KEY = 'seaway-lang';
const LanguageContext = createContext(null);

const initialLang = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'zh') return saved;
  } catch { /* storage blocked: fall through */ }
  return navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en';
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    document.documentElement.dataset.lang = lang;
    try { localStorage.setItem(KEY, lang); } catch { /* ignore */ }
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
