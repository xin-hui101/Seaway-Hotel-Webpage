import { useReveal } from '../hooks/useInView';

/** Fades/slides its children in. variant="img" uses the curtain-lift reveal. */
export default function Reveal({ as: Tag = 'div', variant = 'fade', delay = 0, className = '', style, children, ...rest }) {
  const [ref, visible] = useReveal();
  const base = variant === 'img' ? 'reveal-img' : 'reveal';
  return (
    <Tag
      ref={ref}
      className={`${base} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--d': `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
