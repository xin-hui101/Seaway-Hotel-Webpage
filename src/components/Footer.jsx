import { NAV } from '../data/facilities';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">Seaway <em>Hotel</em></div>
        <nav className="footer__links">
          {NAV.map((n) => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} Seaway Hotel · Mersing, Johor</p>
      </div>
    </footer>
  );
}
