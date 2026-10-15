import { useEffect } from 'react';

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [image, onClose]);

  return (
    <div className={`lightbox ${image ? 'is-open' : ''}`} aria-hidden={!image} onClick={onClose}>
      {image && (
        <>
          <img src={image.src} alt={image.alt} />
          <p>{image.caption}</p>
        </>
      )}
    </div>
  );
}
