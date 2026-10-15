import { useEffect, useRef, useState } from 'react';
import { useScreenCurrent } from './useFullPage';

/** Becomes true once the element scrolls into view (and stays true). */
export function useInView({ threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    }, { threshold, rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, threshold, rootMargin]);
  return [ref, inView];
}

/**
 * Visibility for entrance animations.
 * Paging mode: visible while its screen is current, so content animates in on every visit.
 * Scrolling mode: visible once scrolled into view.
 */
export function useReveal() {
  const current = useScreenCurrent();
  const [ref, inView] = useInView();
  return [ref, current === null ? inView : current];
}
