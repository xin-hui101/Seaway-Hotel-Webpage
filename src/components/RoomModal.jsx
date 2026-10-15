import { useEffect, useState } from 'react';
import { img } from '../data/rooms';
import { useLang } from '../i18n/LanguageContext';

export default function RoomModal({ room, wingLabel, roomKey, onClose, onEnquire }) {
  const { t, L } = useLang();
  const [index, setIndex] = useState(0);
  const open = Boolean(room);
  const photos = room?.photos ?? [];
  const multi = photos.length > 1;

  useEffect(() => setIndex(0), [room]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (multi && e.key === 'ArrowRight') setIndex((i) => (i + 1) % photos.length);
      if (multi && e.key === 'ArrowLeft') setIndex((i) => (i - 1 + photos.length) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, multi, photos.length, onClose]);

  const go = (d) => setIndex((i) => (i + d + photos.length) % photos.length);

  return (
    <div className={`modal ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="modal__backdrop" onClick={onClose} />
      {room && (
        <div className="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
          <button className="modal__close" onClick={onClose} aria-label={t('rooms.close')}>×</button>
          <div className="modal__gallery">
            <img key={photos[index]} className="modal__main" src={img(photos[index])} alt={L(room.name)} />
            {multi && (
              <>
                <button className="modal__nav modal__nav--prev" onClick={() => go(-1)} aria-label={t('rooms.prevPhoto')}>‹</button>
                <button className="modal__nav modal__nav--next" onClick={() => go(1)} aria-label={t('rooms.nextPhoto')}>›</button>
                <div className="modal__thumbs">
                  {photos.map((p, k) => (
                    <button key={p + k} className={k === index ? 'is-active' : ''} onClick={() => setIndex(k)} aria-label={`Photo ${k + 1}`}>
                      <img src={img(p)} alt="" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="modal__body">
            <p className="eyebrow">{t('rooms.wing', { wing: wingLabel })}</p>
            <h3 className="modal__title" id="modalTitle">{L(room.name)}</h3>
            <p className="modal__desc">{L(room.desc)}</p>
            <ul className="modal__features">
              {[room.beds, ...room.chips].map((f) => <li key={f.en}>{L(f)}</li>)}
            </ul>
            <div className="modal__rates">
              {room.rates.map(([view, count, price]) => (
                <div className="modal__rate" key={view.en}>
                  <span>{L(view)} <small>{t(count > 1 ? 'rooms.roomsCount' : 'rooms.roomCount', { n: count })}</small></span>
                  <b>RM {price}<em> {t('rooms.night')}</em></b>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn btn--glow btn--block modal__book" onClick={() => onEnquire(roomKey)}>
              {t('rooms.enquire')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
