import { ScreenContext, useFullPageNav } from '../hooks/useFullPage';

/** One full-screen section. `theme` tells the page dots whether the background is dark or light. */
export default function Screen({ id, theme = 'light', className = '', children }) {
  const { enabled, activeId } = useFullPageNav();
  const current = enabled ? activeId === id : null;
  return (
    <ScreenContext.Provider value={current}>
      <section id={id} data-theme={theme} className={`screen screen--${theme} ${current ? 'is-current' : ''} ${className}`.trim()}>
        {children}
      </section>
    </ScreenContext.Provider>
  );
}
