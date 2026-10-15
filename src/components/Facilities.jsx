import Screen from './Screen';
import Reveal from './Reveal';
import { FACILITIES, AMENITIES } from '../data/facilities';
import { img } from '../data/rooms';
import { useLang } from '../i18n/LanguageContext';

export default function Facilities({ onZoom }) {
  const { t, L } = useLang();
  return (
    <Screen id="facilities" theme="dark" className="facilities">
      <div className="container screen__inner">
        <Reveal className="section-head section-head--light">
          <p className="eyebrow">{t('fac.eyebrow')}</p>
          <h2 className="title">{t('fac.title1')}<em>{t('fac.title2')}</em></h2>
          <span className="glowline" />
        </Reveal>

        <div className="bento">
          {FACILITIES.map((f, i) => (
            <Reveal
              as="figure"
              variant="img"
              key={f.img}
              delay={0.1 + i * 0.08}
              className={`tile ${f.size ? `tile--${f.size}` : ''}`}
              onClick={() => onZoom({ src: img(f.img), caption: L(f.title), alt: f.alt })}
            >
              <img src={img(f.img)} alt={f.alt} loading="lazy" />
              <figcaption>
                <span className="tile__num">{String(i + 1).padStart(2, '0')}</span>
                <b>{L(f.title)}</b>
                <small>{L(f.text)}</small>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <ul className="amenities">
          {AMENITIES.map((a, i) => (
            <Reveal as="li" key={a.label.en} delay={0.4 + i * 0.05}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d={a.path} /></svg>
              {L(a.label)}
            </Reveal>
          ))}
        </ul>
      </div>
    </Screen>
  );
}
