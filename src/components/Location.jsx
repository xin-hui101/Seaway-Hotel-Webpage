import { useEffect, useState } from 'react';
import Screen from './Screen';
import Reveal from './Reveal';
import { LOCATION, CONTACT } from '../data/facilities';
import { useLang } from '../i18n/LanguageContext';

const ICONS = {
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  parking: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></>,
  copy: <><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></>,
  check: <path d="M5 12l5 5L20 7" />,
  pin: <><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
};
const Icon = ({ name }) => <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[name]}</svg>;

const CHECK_IN_HOUR = 15;

/** Current time in Mersing (UTC+8), refreshed every 30 seconds. */
function useMersingTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kuala_Lumpur', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(now).map((p) => [p.type, Number(p.value)]),
  );
  const label = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kuala_Lumpur', hour: 'numeric', minute: '2-digit' }).format(now);
  return { hour: parts.hour, minute: parts.minute, label };
}

export default function Location() {
  const { t, L } = useLang();
  const clock = useMersingTime();
  const canCheckIn = clock.hour >= CHECK_IN_HOUR;
  const minsLeft = (CHECK_IN_HOUR - clock.hour) * 60 - clock.minute;
  const q = encodeURIComponent(CONTACT.mapsQuery);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  const wazeUrl = `https://waze.com/ul?q=${q}&navigate=yes`;
  const [mapActive, setMapActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = [LOCATION.name, ...LOCATION.lines].join(' ');
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      document.body.append(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Screen id="location" theme="light" className="location">
      <div className="container screen__inner">
        <Reveal className="section-head location__head">
          <p className="eyebrow">{t('loc.eyebrow')}</p>
          <h2 className="title">{t('loc.title1')}<em>{t('loc.title2')}</em></h2>
          <p className="location__sub">{t('loc.sub')}</p>
        </Reveal>

        <div className="location__grid">
          <Reveal className="loc-card" delay={0.1}>
            <div className="loc-card__top">
              <p className="loc-card__label">{t('loc.label')}</p>
              <button className={`loc-card__copy ${copied ? 'is-copied' : ''}`} onClick={copy}>
                <Icon name={copied ? 'check' : 'copy'} />
                {copied ? t('loc.copied') : t('loc.copy')}
              </button>
            </div>
            <address className="loc-card__address" role="button" tabIndex={0} title={t('loc.tapCopy')}
              onClick={copy} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), copy())}>
              <strong>{LOCATION.name}</strong>
              {LOCATION.lines.map((l) => <span key={l}>{l}</span>)}
            </address>

            <ul className="loc-card__info">
              {LOCATION.info.map((it) => (
                <li key={it.icon}>
                  <Icon name={it.icon} />
                  <div>
                    <b>{L(it.title)}</b><span>{L(it.text)}</span>
                    {it.icon === 'clock' && (
                      <span className={`loc-live ${canCheckIn ? 'is-open' : ''}`}>
                        <i />{t('loc.now', { time: clock.label })} · {canCheckIn
                          ? t('loc.canCheckIn')
                          : t('loc.opensIn', { h: Math.floor(minsLeft / 60), m: minsLeft % 60 })}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="loc-card__actions">
              <a className="btn btn--dark" href={dirUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="pin" /> {t('loc.directions')}
              </a>
              <a className="btn btn--waze" href={wazeUrl} target="_blank" rel="noopener noreferrer">
                {t('loc.waze')}
              </a>
            </div>
          </Reveal>

          <Reveal variant="img" className="map" delay={0.2} onMouseLeave={() => setMapActive(false)}>
            <iframe title="Seaway Hotel on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${q}&z=16&output=embed`} />
            {!mapActive && (
              <button className="map__shield" onClick={() => setMapActive(true)} aria-label={t('loc.useMap')}>
                <span>{t('loc.useMap')}</span>
              </button>
            )}
            <a className="map__open" href={mapsUrl} target="_blank" rel="noopener noreferrer">↗ {t('loc.open')}</a>
          </Reveal>
        </div>
      </div>
    </Screen>
  );
}
