import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const ref = useRef(null);
  const target = useRef({ x: -9999, y: -9999 });
  const current = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.07;
      current.current.y += dy * 0.07;

      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x - 300}px, ${current.current.y - 300}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(108,92,231,0.07) 0%, rgba(0,203,169,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
      }}
    />
  );
}
