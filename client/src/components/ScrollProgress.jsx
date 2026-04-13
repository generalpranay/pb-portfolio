import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${total > 0 ? scrolled / total : 0})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent))',
        backgroundSize: '200% 100%',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        zIndex: 9999,
        pointerEvents: 'none',
        animation: 'progressShimmer 3s linear infinite',
      }}
    />
  );
}
