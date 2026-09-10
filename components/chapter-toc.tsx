import { ArrowLeft, ChevronDown } from 'lucide-react';
import { sourceText, uiFeatureHeadings, type Chapter } from '@/lib/case-study';
export function ChapterToc({ chapter }: { chapter: Chapter }) {
  const links = chapter.sections.map((id) => (
    <a
      key={id}
      href={'#section-' + id}
      className={uiFeatureHeadings.has(id) ? 'toc-subheading' : undefined}
    >
      {sourceText(id).split('\n')[0]}
    </a>
  ));
  return (
    <aside className="chapter-aside">
      <nav className="desktop-toc" aria-label="On this page">
        <span className="aside-label">In this chapter</span>
        {links}
      </nav>
      <details className="mobile-toc">
        <summary>
          In this chapter <ChevronDown size={17} />
        </summary>
        <nav aria-label="On this page">{links}</nav>
      </details>
      <a className="aside-overview" href="/">
        <ArrowLeft size={15} /> Back to overview
      </a>
    </aside>
  );
}
