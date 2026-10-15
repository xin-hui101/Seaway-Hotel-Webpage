import { useEffect, useState } from 'react';
import { NAV } from '../data/facilities';
import LangToggle from './LangToggle';
import { useLang } from '../i18n/LanguageContext';

export default function Navbar({ activeId, solid }) {
  const [open, setOpen] = useState(false);
  const { t, L } = useLang();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const cls = ['nav', solid && 'is-scrolled', open && 'is-open'].filter(Boolean).join(' ');

  return (
    <header className={cls}>
      <a href="#home" className="nav__brand">
        <span className="nav__brand-main">Seaway</span>
        <span className="nav__brand-sub">Hotel</span>
      </a>
      <nav className="nav__links" aria-label="Main">
        {NAV.map((n) => (
          <a key={n.id} href={`#${n.id}`} className={activeId === n.id ? 'is-active' : ''} onClick={() => setOpen(false)}>
            {L(n.label)}
          </a>
        ))}
      </nav>
      <LangToggle />
      <a href="#contact" className="btn btn--glow nav__cta">{t('nav.book')}</a>
      <button
        className="nav__toggle"
        aria-label={open ? t('nav.menuClose') : t('nav.menuOpen')}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span />
      </button>
    </header>
  );
}
