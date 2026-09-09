'use client';
import { usePathname } from 'next/navigation';
import { chapters } from '@/lib/case-study';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
export default function SiteNav() {
  const pathname = usePathname();
  const current = chapters.find((c) => pathname === `/${c.slug}`);
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Trigate case study overview">
        <img src="/assets/trigate-logo.svg" width={32} height={32} alt="" />
        <span>
          trigate<span className="brand-dot">.</span>
        </span>
      </a>
      <span className="header-context">A product design case study</span>
      <nav className="header-nav" aria-label="Main navigation">
        <a
          href="/"
          className="overview-link"
          aria-current={!current ? 'page' : undefined}
        >
          Overview
        </a>
        <details className="chapter-menu" key={pathname}>
          <summary>
            {current ? `Chapter ${current.number}` : 'Chapters'}{' '}
            <ChevronDown size={16} />
          </summary>
          <div className="chapter-menu-panel">
            <span className="menu-label">The complete story</span>
            {chapters.map((c) => (
              <a
                key={c.slug}
                href={`/${c.slug}`}
                aria-current={current?.slug === c.slug ? 'page' : undefined}
              >
                <span>{c.number}</span>
                <strong>{c.title}</strong>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
