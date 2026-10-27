import { useEffect, useState } from 'react';

/** Live countdown from 05:42:10 so the screen feels alive in the prototype. */
export function useCountdown(start = 5 * 3600 + 42 * 60 + 10) {
  const [s, setS] = useState(start);
  useEffect(() => {
    const t = setInterval(() => setS((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
}

