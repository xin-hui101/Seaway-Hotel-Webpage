import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useReducedMotion';

/** Animates from 0 to `to` once `start` becomes true. */
export default function CountUp({ to, start = true, duration = 1600 }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) return setValue(to);
    let frame;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, start, duration]);
  return <>{value}</>;
}
