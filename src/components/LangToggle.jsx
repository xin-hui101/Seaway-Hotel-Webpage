import { useLang } from '../i18n/LanguageContext';

export default function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label={t('lang.switch')} data-active={lang}>
      <span className="lang-toggle__thumb" aria-hidden="true" />
      <button className={lang === 'en' ? 'is-active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">EN</button>
      <button className={lang === 'zh' ? 'is-active' : ''} aria-pressed={lang === 'zh'} onClick={() => setLang('zh')} lang="zh">中文</button>
    </div>
  );
}
