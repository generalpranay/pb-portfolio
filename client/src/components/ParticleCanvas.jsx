import { useEffect, useRef } from 'react';

const GRID = 58;
const REPEL = 115;
const CONNECT = 88;

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mouse = { x: -9999, y: -9999 };
    let dots = [];

    // Theme-aware colors (updated via MutationObserver)
    const colors = { dot: '108,92,231', line: '108,92,231' };

    const syncColors = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      colors.dot = isLight ? '0,169,142' : '108,92,231';
      colors.line = isLight ? '0,169,142' : '108,92,231';
    };
    syncColors();

    const observer = new MutationObserver(syncColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const buildDots = () => {
      dots = [];
      const w = canvas.width;
      const h = canvas.height;
      for (let x = GRID / 2; x < w + GRID; x += GRID) {
        for (let y = GRID / 2; y < h + GRID; y += GRID) {
          dots.push({
            ox: x, oy: y,
            x, y,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildDots();
    };

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const t = performance.now() / 1000;

      for (const d of dots) {
        const dx = d.ox - mouse.x;
        const dy = d.oy - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL && dist > 0.1) {
          const force = ((REPEL - dist) / REPEL) * 50;
          const tx = d.ox + (dx / dist) * force;
          const ty = d.oy + (dy / dist) * force;
          d.x += (tx - d.x) * 0.18;
          d.y += (ty - d.y) * 0.18;
        } else {
          d.x += (d.ox - d.x) * 0.08;
          d.y += (d.oy - d.y) * 0.08;
        }
      }

      // Connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          if (Math.abs(dx) > CONNECT) continue;
          const dy = dots[i].y - dots[j].y;
          if (Math.abs(dy) > CONNECT) continue;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT) {
            const alpha = (1 - dist / CONNECT) * 0.22;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(${colors.line},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const d of dots) {
        const pulse = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.2 + d.phase));
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.dot},${pulse})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse = { x: -9999, y: -9999 };
    };

    resize();
    draw();

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
