import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export const FullPageContext = createContext({ enabled: false, activeId: null, goTo: () => {} });
export const ScreenContext = createContext(null); // true/false = this screen is current; null = normal scrolling
export const useFullPageNav = () => useContext(FullPageContext);
export const useScreenCurrent = () => useContext(ScreenContext);

const DURATION = 1000; // slide time in ms, keep in sync with .fp__track transition

/** True when the screen is big enough for one-section-per-screen paging. */
export function useFullPageEnabled(query = '(min-width: 901px) and (min-height: 600px)') {
  // Starts false (like the pre-rendered page) and switches on after the first paint
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setEnabled(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return enabled;
}

/**
 * Full-screen paging: one wheel notch / swipe / arrow key moves exactly one section.
 * When disabled (small screens) it falls back to normal scrolling and tracks the visible section.
 */
export function useFullPage(ids, { enabled, blocked }) {
  const [index, setIndex] = useState(0);
  const lock = useRef(false);
  const indexRef = useRef(0);
  indexRef.current = index;

  const goTo = useCallback((target) => {
    const i = typeof target === 'number' ? target : ids.indexOf(target);
    if (i < 0 || i >= ids.length) return;
    if (!enabled) {
      document.getElementById(ids[i])?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (i === indexRef.current) return;
    lock.current = true;
    setIndex(i);
    setTimeout(() => (lock.current = false), DURATION + 150);
  }, [ids, enabled]);

  const step = useCallback((dir) => {
    if (lock.current) return;
    goTo(Math.max(0, Math.min(ids.length - 1, indexRef.current + dir)));
  }, [goTo, ids.length]);

  // wheel, keys and touch (paging mode only)
  useEffect(() => {
    if (!enabled) return;
    let wheelAcc = 0;
    let wheelTimer;
    const onWheel = (e) => {
      if (blocked) return;
      e.preventDefault();
      if (lock.current) return;
      wheelAcc += e.deltaY;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => (wheelAcc = 0), 200);
      if (Math.abs(wheelAcc) > 30) {
        step(wheelAcc > 0 ? 1 : -1);
        wheelAcc = 0;
      }
    };
    const onKey = (e) => {
      if (blocked) return;
      const tag = document.activeElement?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      const map = { ArrowDown: 1, PageDown: 1, ' ': 1, ArrowUp: -1, PageUp: -1 };
      if (e.key in map) { e.preventDefault(); step(map[e.key]); }
      if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      if (e.key === 'End') { e.preventDefault(); goTo(ids.length - 1); }
    };
    let touchY = null;
    const onTouchStart = (e) => (touchY = e.touches[0].clientY);
    const onTouchEnd = (e) => {
      if (blocked || touchY === null) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 50) step(dy > 0 ? 1 : -1);
      touchY = null;
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      clearTimeout(wheelTimer);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [enabled, blocked, step, goTo, ids.length]);

  // any in-page link (#rooms, #contact …) goes through goTo
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (!ids.includes(id)) return;
      e.preventDefault();
      goTo(id);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [ids, goTo]);

  // tabbing into another section moves the page there
  useEffect(() => {
    if (!enabled) return;
    const onFocus = (e) => {
      const screen = e.target.closest?.('.screen');
      if (screen && ids.includes(screen.id)) goTo(screen.id);
    };
    document.addEventListener('focusin', onFocus);
    return () => document.removeEventListener('focusin', onFocus);
  }, [enabled, ids, goTo]);

  // normal-scroll mode: keep index in sync with what's on screen
  useEffect(() => {
    if (enabled) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((en) => en.isIntersecting && setIndex(ids.indexOf(en.target.id)));
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [enabled, ids]);

  return { index, goTo };
}
