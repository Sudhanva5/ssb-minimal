'use client';

import * as React from 'react';
import { Button, Logo } from '@kishanscaler/ssx-ui';

type SiteNavProps = {
  /** Where the logo links (the variant's own root). */
  home: string;
  /** Section links, as `#id` anchors on this page. */
  items: { href: string; label: string }[];
  /** Extra controls before Apply (the classic theme toggle). */
  children?: React.ReactNode;
};

/**
 * The edge-to-edge top bar, shared by both variants: frosted, sticky, content
 * on the 1200px measure. A soft indicator (from v4) slides under the link for
 * the section you are reading.
 */
export function SiteNav({ home, items, children }: SiteNavProps) {
  const list = React.useRef<HTMLUListElement>(null);
  const [active, setActive] = React.useState<string | null>(null);
  const [ind, setInd] = React.useState<{ x: number; w: number } | null>(null);

  React.useEffect(() => {
    const ids = items.map((n) => n.href.slice(1));
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  React.useLayoutEffect(() => {
    // Measure the <li>: the link's own offsetParent is its (positioned) <li>.
    const li = active ? list.current?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`)?.parentElement : null;
    setInd(li ? { x: li.offsetLeft, w: li.offsetWidth } : null);
  }, [active]);

  return (
    <header
      className="anim-fade sticky top-0 z-sticky bg-surface/55 backdrop-blur-[2rem]"
      style={{ ['--d' as string]: 0 }}
    >
      <div className="mx-auto flex h-16 max-w-(--site-content-max) items-center gap-2 px-gutter">
        <a href={home} aria-label="Scaler School of Business" className="me-auto flex shrink-0">
          <Logo size="md" className="md:h-10" />
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul ref={list} className="relative flex items-center">
            <span
              aria-hidden
              className="absolute top-0 left-0 h-full rounded-lg bg-surface-active transition-[transform,width,opacity] duration-500 ease-[var(--ease-out)]"
              style={{ width: ind?.w ?? 0, transform: `translateX(${ind?.x ?? 0}px)`, opacity: ind ? 1 : 0 }}
            />
            {items.map((l) => (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  aria-current={active === l.href.slice(1) ? 'true' : undefined}
                  className="block rounded-lg px-3 py-2 text-base text-content no-underline transition-colors hover:text-content-brand aria-[current]:text-content-brand"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {children}
        <Button asChild size="sm" className="ms-1">
          <a href="#apply">Apply</a>
        </Button>
      </div>
    </header>
  );
}
