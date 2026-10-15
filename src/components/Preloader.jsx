export default function Preloader({ done }) {
  return (
    <div className={`preloader ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="preloader__inner">
        <span className="preloader__word">Seaway Hotel</span>
        <span className="preloader__line" />
        <span className="preloader__sub">Mersing · Johor</span>
      </div>
    </div>
  );
}
