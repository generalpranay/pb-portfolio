import { useState, useEffect, useRef, useCallback } from 'react';

// In dev, Vite proxies /api/* to localhost:4000.
// In production, Vercel serverless functions handle /api/* on the same domain.
const API_BASE = '/api';

/* ─── useFetch ─── */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(d => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

/* ─── useProjects ─── */
export function useProjects() {
  return useFetch(`${API_BASE}/projects`);
}

/* ─── useGithubRepos ─── */
export function useGithubRepos() {
  return useFetch(`${API_BASE}/github/repos`);
}

/* ─── useCalgaryTime ─── */
export function useCalgaryTime() {
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('gray'); // 'green' | 'amber' | 'gray'
  const [isWork, setIsWork] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const calgary = new Date(
        now.toLocaleString('en-US', { timeZone: 'America/Edmonton' })
      );
      const h = calgary.getHours();
      const m = calgary.getMinutes();
      const s = calgary.getSeconds();
      const day = calgary.getDay();
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;

      setTime(
        `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} ${ampm} MT`
      );

      const weekday = day >= 1 && day <= 5;
      if (weekday && h >= 9 && h < 18) {
        setStatus('green');
        setIsWork(true);
      } else if (h >= 18 && h < 22) {
        setStatus('amber');
        setIsWork(false);
      } else {
        setStatus('gray');
        setIsWork(false);
      }
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, status, isWork };
}

/* ─── useReveal ─── */
export function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── useActiveSection ─── */
export function useActiveSection(sectionIds) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.15, rootMargin: '-80px 0px 0px 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, [sectionIds]);

  return active;
}
