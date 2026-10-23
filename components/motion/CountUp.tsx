'use client';

import * as React from 'react';

/**
 * Counts a figure up from zero the first time it scrolls into view, keeping
 * whatever surrounds the number: "₹25.7L", "3.2x", "1,100+", "₹23–24L".
 * The final text is server-rendered, so it reads correctly without script and
 * for assistive technology (the animated copy is aria-hidden).
 */
export function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [shown, setShown] = React.useState(value);
  const m = value.match(/^(.*?)([\d,]+(?:\.\d+)?)(.*)$/);

  React.useEffect(() => {
    if (!m || !ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ''));
    const decimals = (num.split('.')[1] || '').length;
    const comma = num.includes(',');
    const fmt = (v: number) => {
      const s = v.toFixed(decimals);
      return comma ? Number(s).toLocaleString('en-IN') : s;
    };
    setShown(pre + fmt(0) + post);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          setShown(pre + fmt(target * eased) + post);
          if (p < 1) requestAnimationFrame(step);
          else setShown(value);
        };
        requestAnimationFrame(step);
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(ref.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden>{shown}</span>
    </span>
  );
}
