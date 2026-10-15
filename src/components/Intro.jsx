import Reveal from './Reveal';
import CountUp from './CountUp';
import { useInView } from '../hooks/useInView';
import { WINGS, totalRooms, totalTypes } from '../data/rooms';

const MARQUEE = ['Wabi-Tatami', 'Business Axis', 'Rooftop Garden', 'Courtyard', 'Mersing'];

function Stat({ value, label, delay, suffix }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`stat reveal ${inView ? 'is-visible' : ''}`} style={{ '--d': `${delay}s` }}>
      <b>{suffix ? value : <CountUp to={value} start={inView} />}{suffix && <small>{suffix}</small>}</b>
      <span>{label}</span>
    </div>
  );
}

export default function Intro() {
  return (
    <section className="intro" id="intro">
      <div className="container intro__grid">
        <Reveal className="intro__text">
          <p className="eyebrow">Welcome to Seaway</p>
          <h2 className="title">Two wings, <em>one calm</em> place to land.</h2>
          <span className="glowline" />
          <p>
            Seaway Hotel sits on Jalan Abu Bakar, right in Mersing town. Choose the low, grounded comfort of our{' '}
            <strong>Wabi-Tatami</strong> wing with its raised oak platforms, or the crisp charcoal lines of the{' '}
            <strong>Business Axis</strong> wing. Either way, you wake up close to the jetty, the market and the sea.
          </p>
        </Reveal>
        <div className="intro__stats">
          <Stat value={totalRooms} label="Rooms" delay={0} />
          <Stat value={WINGS.length} label="Room wings" delay={0.1} />
          <Stat value={totalTypes} label="Room types" delay={0.2} />
          <Stat value={24} suffix="h" label="Free Wi-Fi" delay={0.3} />
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="marquee__item"><span>{w}</span><i>✦</i></span>
          ))}
        </div>
      </div>
    </section>
  );
}
