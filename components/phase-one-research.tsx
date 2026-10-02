import content from '@/content/phase-one.json';
import { assetPath } from '@/lib/site-path';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Paragraph = { text: string; list: boolean; icons: string[] };

function ResearchCard({ paragraphs }: { paragraphs: Paragraph[] }) {
  const elements = [];
  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    if (p.icons.length) elements.push(
      <div className="research-icons" key={`icons-${i}`}>
        {p.icons.map((src) => <img key={src} src={assetPath(src)} width={40} height={40} alt="" loading="lazy" />)}
      </div>,
    );
    if (!p.text) continue;
    if (p.list) {
      const items = [p.text];
      while (paragraphs[i + 1]?.list) items.push(paragraphs[++i].text);
      elements.push(<ul key={i}>{items.map((text, j) => <li key={j}>{text}</li>)}</ul>);
    } else elements.push(<h4 key={i}>{p.text}</h4>);
  }
  return <article>{elements}</article>;
}

export function PhaseOneResearch() {
  // Transpose the wide source table: each competitor stays paired with all six attributes.
  const rows = content.comparison[0].slice(1).map((_, column) =>
    content.comparison.map((row) => row[column + 1].map((p) => p.text).join('\n')),
  );
  return (
    <div className="phase-one-research" data-source-id="36">
      <h3>{content.headings[0]}</h3>
      <div className="research-cards">
        {content.objectives.map((paragraphs, i) => <ResearchCard key={i} paragraphs={paragraphs} />)}
      </div>
      <h3>{content.headings[1]}</h3>
      <div className="research-cards">
        {content.results.map((paragraphs, i) => <ResearchCard key={i} paragraphs={paragraphs} />)}
      </div>
      <h3 id="phase-one-competitive-analysis">{content.headings[2]}</h3>
      <p>{content.headings[3]}</p>
      <div className="comparison-wrap phase-one-comparison">
        <div className="table-label"><span>Competitive analysis</span><span className="table-hint">Scroll to compare</span></div>
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Phase one competitive analysis">
          <Table className="comparison-table">
            <TableHeader><TableRow>
              {content.comparison.map((row, i) => <TableHead key={i} scope="col">{row[0].map((p) => p.text).join('\n')}</TableHead>)}
            </TableRow></TableHeader>
            <TableBody>{rows.map((row, i) => <TableRow key={i}>
              {row.map((text, j) => j === 0
                ? <TableHead key={j} scope="row">{text}</TableHead>
                : <TableCell key={j}>{text}</TableCell>)}
            </TableRow>)}</TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
