import { useEffect, useRef, useState } from 'react';
import Screen from './Screen';
import Reveal from './Reveal';
import RoomCard from './RoomCard';
import { useLang } from '../i18n/LanguageContext';
import { WINGS } from '../data/rooms';
import { prefersReducedMotion } from '../hooks/useReducedMotion';

export default function Rooms({ onOpenRoom }) {
  const [wingId, setWingId] = useState(WINGS[0].id);
  const { t, L } = useLang();
  const [switching, setSwitching] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false });
  const track = useRef(null);
  const wing = WINGS.find((w) => w.id === wingId);

  const updateEdges = () => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };

  useEffect(() => {
    track.current?.scrollTo({ left: 0 });
    updateEdges();
  }, [wingId]);

  useEffect(() => {
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, []);

  const choose = (id) => {
    if (id === wingId) return;
    setSwitching(true);
    setTimeout(() => {
      setWingId(id);
      setSwitching(false);
    }, prefersReducedMotion() ? 0 : 350);
  };

  const slide = (dir) => {
    const el = track.current;
    const card = el?.querySelector('.room-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <Screen id="rooms" theme="light" className="rooms">
      <div className="container screen__inner">
        <div className="rooms__head">
          <Reveal className="section-head">
            <p className="eyebrow">{t('rooms.eyebrow')}</p>
            <h2 className="title">{t('rooms.title1')}<em>{t('rooms.title2')}</em></h2>
            <span className="glowline" />
          </Reveal>

          <Reveal className="wing-tabs" role="tablist" data-active={wingId} delay={0.1}>
            {WINGS.map((w) => (
              <button
                key={w.id}
                role="tab"
                aria-selected={w.id === wingId}
                className={`wing-tab ${w.id === wingId ? 'is-active' : ''}`}
                onClick={() => choose(w.id)}
              >
                <span className="wing-tab__name">{w.label}</span>
                <span className="wing-tab__desc">{L(w.desc)}</span>
              </button>
            ))}
            <span className="wing-tabs__indicator" />
          </Reveal>
        </div>

        <div className={`room-slider ${switching ? 'is-switching' : ''}`}>
          <div className="room-grid" ref={track} onScroll={updateEdges}>
            {wing.rooms.map((room, i) => (
              <RoomCard key={`${wingId}-${i}`} room={room} index={i} wingLabel={wing.label} onOpen={(r) => onOpenRoom(r, wing.label, `${wing.id}|${i}`)} />
            ))}
          </div>
          <div className="room-slider__controls">
            <span className="room-slider__count">{t('rooms.count', { n: wing.rooms.length, wing: wing.label })}</span>
            <button className="room-slider__btn" onClick={() => slide(-1)} disabled={edges.start} aria-label={t('rooms.prev')}>‹</button>
            <button className="room-slider__btn" onClick={() => slide(1)} disabled={edges.end} aria-label={t('rooms.next')}>›</button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
