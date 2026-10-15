export default function ScrollProgress({ progress }) {
  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />;
}
