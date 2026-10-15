import { useLang } from '../i18n/LanguageContext';

export default function BackToTop({ show }) {
  const { t } = useLang();
  return (
    <a href="#home" className={`to-top ${show ? 'is-shown' : ''}`} aria-label={t('top.label')}>
      <svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6" /></svg>
    </a>
  );
}
