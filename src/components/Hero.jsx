import { useRef, useState } from 'react';
import CountUp from './CountUp';
import { img, lowestRate } from '../data/rooms';
import Screen from './Screen';
import { useLang } from '../i18n/LanguageContext';

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { t } = useLang();
  const [glow, setGlow] = useState({ x: '60%', y: '30%' });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setGlow({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px` });
  };

  return (
    <Screen id="home" theme="dark" className="hero">
      <div className="hero__stage" ref={ref} onMouseMove={onMove}>
      <div className="hero__media">
        <img src={img('hero-building.jpg')} alt={t('hero.alt')} />
      </div>
      <div className="hero__shade" />
      <div className="hero__glow" style={{ left: glow.x, top: glow.y }} />

      <div className="hero__content">
        <p className="eyebrow hero__eyebrow"><span>{t('hero.eyebrow')}</span></p>
        <h1 className="hero__title">
          <span className="line"><span>{t('hero.title1')}</span></span>
          <span className="line"><span><em>{t('hero.title2')}</em></span></span>
        </h1>
        <p className="hero__lead">
          {t('hero.lead')}
        </p>
        <div className="hero__actions">
          <a href="#rooms" className="btn btn--glow">{t('hero.ctaRooms')}</a>
          <a href="#location" className="btn btn--ghost">{t('hero.ctaLocation')}</a>
        </div>
      </div>

      <div className="hero__card">
        <span className="hero__card-label">{t('hero.from')}</span>
        <span className="hero__card-price">RM <b><CountUp to={lowestRate} start={ready} /></b></span>
        <span className="hero__card-note">{t('hero.note')}</span>
      </div>

      <svg className="waves" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path className="wave wave--1" d="M-120,64 C120,112 360,16 600,64 C840,112 1080,16 1320,64 C1440,88 1500,70 1560,64 L1560,120 L-120,120 Z" />
        <path className="wave wave--2" d="M-120,80 C120,40 360,120 600,80 C840,40 1080,120 1320,80 C1440,60 1500,76 1560,80 L1560,120 L-120,120 Z" />
      </svg>
      </div>
    </Screen>
  );
}
