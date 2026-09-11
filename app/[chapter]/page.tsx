import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { chapters } from '@/lib/case-study';
import { pagePath } from '@/lib/site-path';
import { SourceContent } from '@/components/source-content';
import { ChapterToc } from '@/components/chapter-toc';
type Props = { params: Promise<{ chapter: string }> };
export function generateStaticParams() {
  return chapters.map((c) => ({ chapter: c.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter } = await params;
  const entry = chapters.find((c) => c.slug === chapter);
  return entry
    ? { title: `${entry.title} — Trigate`, description: entry.description }
    : { title: 'Chapter not found — Trigate' };
}
export default async function ChapterPage({ params }: Props) {
  const { chapter } = await params;
  const entry = chapters.find((c) => c.slug === chapter);
  if (!entry) notFound();
  const index = chapters.findIndex((c) => c.slug === chapter);
  const previous = chapters[index - 1];
  const next = chapters[index + 1];
  return (
    <main id="main-content">
      <div className="chapter-header page-width" id="top">
        <a className="back-link" href={pagePath('/')}>
          <ArrowLeft size={16} /> Overview
        </a>
        <div className="chapter-heading-row">
          <div>
            <p className="eyebrow">{entry.eyebrow}</p>
            <h1>{entry.title}</h1>
          </div>
          <span className="chapter-numeral" aria-hidden="true">
            {entry.number}
          </span>
        </div>
        <div className="chapter-deck">
          <span>Chapter {entry.number} of 05</span>
          <span>{entry.takeaway}</span>
        </div>
      </div>
      <div className="chapter-layout page-width">
        <ChapterToc chapter={entry} />
        <article
          className="chapter-content"
          aria-label={`${entry.title} case study`}
        >
          <SourceContent
            start={entry.range[0]}
            end={entry.range[1]}
            omit={[entry.titleId]}
          />
        </article>
      </div>
      <nav
        className="chapter-pagination page-width"
        aria-label="Previous and next chapters"
      >
        <a href={pagePath(previous ? `/${previous.slug}` : '/')}>
          <span>
            <ArrowLeft size={17} />
            {previous ? 'Previous chapter' : 'Back to overview'}
          </span>
          <strong>
            {previous?.title || 'The complete story, in two minutes'}
          </strong>
        </a>
        <a href={pagePath(next ? `/${next.slug}` : '/')} className="next-chapter">
          <span>
            {next ? `Next · Chapter ${next.number}` : 'Return to overview'}
            <ArrowRight size={17} />
          </span>
          <strong>
            {next?.title || 'TRIGATE: An Innovation Management Platform'}
          </strong>
        </a>
      </nav>
      <div className="back-to-top page-width">
        <a href="#top">
          Back to top <ArrowUp size={16} />
        </a>
      </div>
    </main>
  );
}
