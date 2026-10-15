import { NAV } from '../data/facilities';
import { useLang } from '../i18n/LanguageContext';

export default function PageDots({ index, theme, onGo }) {
  const { t, L } = useLang();
  return (
    <nav className={`page-dots page-dots--${theme}`} aria-label={t('dots.label')}>
      {NAV.map((n, i) => (
        <button
          key={n.id}
          className={`page-dots__dot ${i === index ? 'is-active' : ''}`}
          onClick={() => onGo(i)}
          aria-label={L(n.label)}
          aria-current={i === index ? 'true' : undefined}
        >
          <span className="page-dots__label">{L(n.label)}</span>
        </button>
      ))}
    </nav>
  );
}
