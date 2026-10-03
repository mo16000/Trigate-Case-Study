import content from '@/content/main-version.json';
import { assetPath, pagePath } from '@/lib/site-path';
import { AssetImage, CaseImage } from './case-image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

function Copy({ block }: { block: { runs?: { text: string; bold: boolean; italic: boolean }[] } }) {
  return <>{block.runs?.map((run, index) => run.bold ? <strong key={index}>{run.text}</strong> : run.italic ? <em key={index}>{run.text}</em> : <span key={index}>{run.text}</span>)}</>;
}

export function ProgramContent() {
  const p = content.p;
  return <div className="main-version-import" data-source-id="91">
    <p><Copy block={p[2]} /></p>
    <div className="program-capabilities">
      {[3, 5, 7, 9, 11].map((index) => <article key={index}>
        <AssetImage name={p[index].images[0]} alt="" sizes="40px" />
        <p><Copy block={p[index + 1]} /></p>
      </article>)}
    </div>
    <h4>{p[13].text}</h4>
    <video className="program-video" controls playsInline preload="metadata" aria-label="Create Program demonstration">
      <source src={assetPath('/assets/main-version/program.mp4')} type="video/mp4" />
      <a href={assetPath('/assets/main-version/program.mp4')}>Watch the Create Program demonstration</a>
    </video>
    <h4>{p[15].text}</h4>
    <div className="evidence-gallery">
      <CaseImage name={p[16].images[0]} alt="Startup application assessment overview" showCaption={false} />
      <CaseImage name={p[17].images[0]} alt="Startup application evaluation details" showCaption={false} />
    </div>
  </div>;
}

export function CoachingContent() {
  return <div data-source-id="101" className="evidence-gallery main-coaching-gallery">
    {[2, 4, 6].map((index) => <CaseImage key={index} name={content.c[index].images[0]} alt={content.c[index + 1].text} />)}
  </div>;
}

export function MainVersionResults() {
  const r = content.r;
  const rows = r[3].table!;
  return <section data-source-id="117" className="source-section outcome-section main-version-results">
    <h2 id="section-117">{r[0].text}</h2>
    <p><Copy block={r[1]} /></p>
    <h3>{r[2].text}</h3>
    <div className="table-shell">
      <Table className="comparison-table" aria-label="Nine-month impact before and after launch">
        <TableHeader><TableRow>{rows[0].map((cell, index) => <TableHead key={index} scope="col">{cell.join('\n')}</TableHead>)}</TableRow></TableHeader>
        <TableBody>{rows.slice(1).map((row, index) => <TableRow key={index}>{row.map((cell, column) => column === 0 ? <TableHead key={column} scope="row">{cell.join('\n')}</TableHead> : <TableCell key={column}>{cell.join('\n')}</TableCell>)}</TableRow>)}</TableBody>
      </Table>
    </div>
    <h3>{r[4].text}</h3>
    <div className="evidence-gallery event-gallery">
      {r[5].images!.map((name, index) => <CaseImage key={name} name={name} alt={`Event held through Trigate — example ${index + 1}`} showCaption={false} />)}
    </div>
  </section>;
}

export function DeepDiveLinks() {
  return <nav className="deep-dive-links" aria-label="Explore the deep dives">
    <a className="primary-link" href={pagePath('/removing-the-drop-off')}>Deep Dive 1 · Removing the Drop-off</a>
    <a className="primary-link" href={pagePath('/coaching-report-workflow')}>Deep Dive 2 · Streamlining the Coaching Report Workflow</a>
    <a className="primary-link" href={pagePath('/co-founder-matching')}>Deep Dive 3 · Designing a High-Trust Co-Founder Matching Framework</a>
  </nav>;
}
