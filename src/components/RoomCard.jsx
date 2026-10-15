import { useReveal } from '../hooks/useInView';
import { img, minRate } from '../data/rooms';
import { useLang } from '../i18n/LanguageContext';

export default function RoomCard({ room, wingLabel, index, onOpen }) {
  const [ref, inView] = useReveal();
  const { t, L } = useLang();
  const name = L(room.name);
  const open = () => onOpen(room);
  const cls = ['room-card', inView && 'is-visible'].filter(Boolean).join(' ');

  return (
    <article
      ref={ref}
      className={cls}
      style={{ '--d': `${Math.min(index, 3) * 0.1}s` }}
      tabIndex={0}
      role="button"
      aria-label={`${name}, ${t('rooms.details')}`}
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open())}
    >
      <div className="room-card__media">
        <span className="room-card__tag">{L(room.tag) || wingLabel}</span>
        {room.photos.length > 1 && <span className="room-card__photos">{t('rooms.photos', { n: room.photos.length })}</span>}
        <img src={img(room.photos[0])} alt={`${name}, ${t('rooms.wing', { wing: wingLabel })}`} loading="lazy" />
      </div>
      <div className="room-card__body">
        <h3 className="room-card__title">{name}</h3>
        <p className="room-card__beds"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 15h18M6 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M12 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>{L(room.beds)}</p>
        <ul className="room-card__chips">
          {room.chips.map((c) => <li key={c.en}>{L(c)}</li>)}
        </ul>
        <div className="room-card__foot">
          <div className="room-card__price"><small>{t('rooms.from')}</small><b>RM {minRate(room)}</b><em>{t('rooms.night')}</em></div>
          <span className="room-card__more">{t('rooms.details')} <i /></span>
        </div>
      </div>
    </article>
  );
}
