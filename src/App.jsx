import { useCallback, useEffect, useMemo, useState } from 'react';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import PageDots from './components/PageDots';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import RoomModal from './components/RoomModal';
import Facilities from './components/Facilities';
import Location from './components/Location';
import Contact from './components/Contact';
import Lightbox from './components/Lightbox';
import BackToTop from './components/BackToTop';
import { NAV } from './data/facilities';
import { FullPageContext, useFullPage, useFullPageEnabled } from './hooks/useFullPage';
import { prefersReducedMotion } from './hooks/useReducedMotion';

const IDS = NAV.map((n) => n.id);
const DARK = ['home', 'facilities', 'contact'];

export default function App() {
  const [loaded, setLoaded] = useState(false); // preloader lifted
  const [ready, setReady] = useState(false);   // hero intro animation
  const [modal, setModal] = useState(null);    // { room, wingLabel }
  const [zoom, setZoom] = useState(null);      // facility lightbox image
  const [enquiryRoom, setEnquiryRoom] = useState('');

  const enabled = useFullPageEnabled();
  const { index, goTo } = useFullPage(IDS, { enabled, blocked: Boolean(modal || zoom) || !loaded });
  const activeId = IDS[index];
  const fp = useMemo(() => ({ enabled, activeId, goTo }), [enabled, activeId, goTo]);

  // Preloader: show the logo animation briefly, then lift the curtain
  useEffect(() => {
    const finish = () => setLoaded(true);
    const delay = prefersReducedMotion() ? 0 : 1500;
    let t;
    const onLoad = () => (t = setTimeout(finish, delay));
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad);
    const fallback = setTimeout(finish, 4500);
    return () => {
      clearTimeout(t);
      clearTimeout(fallback);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    document.body.classList.remove('is-loading');
    const t = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(t);
  }, [loaded]);

  useEffect(() => {
    document.body.classList.toggle('is-ready', ready);
  }, [ready]);

  useEffect(() => {
    document.documentElement.classList.toggle('fp-on', enabled);
  }, [enabled]);

  const openRoom = useCallback((room, wingLabel, key) => setModal({ room, wingLabel, key }), []);
  const closeRoom = useCallback(() => setModal(null), []);
  const closeZoom = useCallback(() => setZoom(null), []);

  const sections = (
    <>
      <Hero ready={ready} />
      <Rooms onOpenRoom={openRoom} />
      <Facilities onZoom={setZoom} />
      <Location />
      <Contact room={enquiryRoom} onRoomChange={setEnquiryRoom} />
    </>
  );

  return (
    <FullPageContext.Provider value={fp}>
      <Preloader done={loaded} />
      <ScrollProgress progress={index / (IDS.length - 1)} />
      <Navbar activeId={activeId} solid={index > 0} />
      <PageDots index={index} theme={DARK.includes(activeId) ? 'dark' : 'light'} onGo={goTo} />

      {enabled ? (
        <main className="fp" onScroll={(e) => (e.currentTarget.scrollTop = 0)}>
          <div className="fp__track" style={{ transform: `translate3d(0, ${-index * 100}vh, 0)` }}>
            {sections}
          </div>
        </main>
      ) : (
        <main>{sections}</main>
      )}

      <BackToTop show={index > 0} />
      <RoomModal
        room={modal?.room}
        wingLabel={modal?.wingLabel}
        roomKey={modal?.key}
        onClose={closeRoom}
        onEnquire={(value) => {
          setEnquiryRoom(value);
          closeRoom();
        }}
      />
      <Lightbox image={zoom} onClose={closeZoom} />
    </FullPageContext.Provider>
  );
}
