import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AssetImage, CaseImage } from './case-image';
import {
  blocks,
  standaloneHeadings,
  mixedHeadings,
  subHeadings,
  callouts,
  visualLabels,
  type Paragraph,
  type SourceTable,
  type Run,
} from '@/lib/case-study';
export function RichText({ runs }: { runs: Run[] }) {
  return (
    <>
      {runs.map((r, i) => {
        const content = r.text
          .replace(/\uF0B7/g, '•')
          .split('\n')
          .map((line, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {line}
            </Fragment>
          ));
        return r.bold ? (
          <strong key={i}>{content}</strong>
        ) : r.italic ? (
          <em key={i}>{content}</em>
        ) : (
          <Fragment key={i}>{content}</Fragment>
        );
      })}
    </>
  );
}
function SliceText({ block, from = 0 }: { block: Paragraph; from?: number }) {
  let pos = 0;
  const runs = block.runs.flatMap((r) => {
    const start = pos;
    pos += r.text.length;
    return pos > from
      ? [{ ...r, text: r.text.slice(Math.max(0, from - start)) }]
      : [];
  });
  return <RichText runs={runs} />;
}
export function Flow({ steps, label }: { steps: string[]; label: string }) {
  return (
    <ol className="flow-steps" aria-label={label}>
      {steps.map((step, i) => (
        <li key={i}>
          <span className="step-index">{String(i + 1).padStart(2, '0')}</span>
          <span>{step}</span>
          {i < steps.length - 1 && (
            <ArrowRight aria-hidden="true" className="step-arrow" size={17} />
          )}
        </li>
      ))}
    </ol>
  );
}
function Gallery({ names }: { names: string[] }) {
  return (
    <div
      className={`evidence-gallery ${names.length > 1 ? 'gallery-pair' : ''}`}
    >
      {names.map((name) => (
        <CaseImage
          key={name}
          name={name}
          alt={visualLabels[name] || 'Trigate product interface'}
        />
      ))}
    </div>
  );
}
function CellContent({ paragraphs }: { paragraphs: Paragraph[] }) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <Fragment key={i}>
          {p.images.map((name) => (
            <AssetImage
              key={name}
              name={name}
              alt=""
              className="cell-illustration"
              sizes="260px"
            />
          ))}
          {p.text.trim() && (
            <p>
              <RichText runs={p.runs} />
            </p>
          )}
        </Fragment>
      ))}
    </>
  );
}
function SourceTableView({ block }: { block: SourceTable }) {
  if ([35, 39, 70, 74, 79, 127].includes(block.id)) {
    const mode = (
      {
        35: 'interviews',
        39: 'findings',
        70: 'pilot-metrics',
        74: 'implications',
        79: 'role-needs',
        127: 'user-paths',
      } as Record<number, string>
    )[block.id];
    return (
      <div className={`source-cards ${mode}`} data-source-id={block.id}>
        {block.rows.flat().map((cell, i) => (
          <article key={i}>
            <CellContent paragraphs={cell.paragraphs} />
          </article>
        ))}
      </div>
    );
  }
  const label =
    block.id === 114
      ? 'Trigate plan comparison'
      : block.id === 241
        ? 'Co-founder matching competitive analysis'
        : 'Strategic approach comparison';
  const rows = block.rows.filter((row) =>
    row.some((cell) =>
      cell.paragraphs.some((p) => p.text.trim() || p.images.length),
    ),
  );
  return (
    <div
      className={`comparison-wrap ${block.id === 241 ? 'competitor-table' : ''}`}
      data-source-id={block.id}
    >
      <div className="table-label">
        <span>{label}</span>
        <span className="table-hint">
          Scroll to compare <ArrowRight size={15} />
        </span>
      </div>
      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label={label}
      >
        <Table className="comparison-table">
          <TableHeader>
            <TableRow>
              {rows[0].map((cell, i) => (
                <TableHead key={i} scope="col">
                  <CellContent paragraphs={cell.paragraphs} />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.slice(1).map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <TableHead scope="row" key={j}>
                      <CellContent paragraphs={cell.paragraphs} />
                    </TableHead>
                  ) : (
                    <TableCell key={j}>
                      <CellContent paragraphs={cell.paragraphs} />
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export function SourceContent({
  start,
  end,
  omit = [],
}: {
  start: number;
  end: number;
  omit?: number[];
}) {
  const selected = blocks.filter(
    (b) => b.id >= start && b.id <= end && !omit.includes(b.id),
  );
  const output = [];
  for (let i = 0; i < selected.length; i++) {
    const b = selected[i];
    if (b.type === 'table') {
      output.push(<SourceTableView key={b.id} block={b} />);
      continue;
    }
    if ([187, 193, 208].includes(b.id)) {
      const last = b.id === 187 ? 190 : b.id === 193 ? 197 : 213;
      const group = selected.filter(
        (x) => x.id >= b.id && x.id <= last,
      ) as Paragraph[];
      const steps = group.map((x) =>
        x.id === 188
          ? 'Add a report'
          : x.id === 189
            ? 'Input Summary, Topic, & overall team status'
            : x.text.trim(),
      );
      output.push(
        <div key={b.id} data-source-ids={group.map((x) => x.id).join(',')}>
          <Flow
            steps={steps}
            label={
              b.id === 187
                ? 'Redesigned in-product flow'
                : b.id === 193
                  ? 'Decoupled task workflow'
                  : 'Telegram workflow'
            }
          />
        </div>,
      );
      while (i + 1 < selected.length && selected[i + 1].id <= last) i++;
      continue;
    }
    if ([133, 143, 166, 247, 250].includes(b.id)) {
      let text = b.text.trim();
      let heading = '';
      if (b.id === 250) {
        [heading, text] = text.split('\n');
      }
      if (b.id === 166) text = text.replace(/^Original Flow:\s*/, '');
      const steps = text
        .split(b.id === 133 || b.id === 143 ? '\n' : '→')
        .map((s) => s.trim())
        .filter((s) => s && s !== 'Key Design Improvements:');
      output.push(
        <div key={b.id} className="source-flow" data-source-id={b.id}>
          {heading && <h2 id={`section-${b.id}`}>{heading}</h2>}
          {b.id === 166 && <h3>Original Flow:</h3>}
          <Flow steps={steps} label={heading || 'User flow'} />
          {b.images.length > 0 && <Gallery names={b.images} />}{' '}
          {b.id === 143 && (
            <h3 id="key-design-improvements">Key Design Improvements:</h3>
          )}
        </div>,
      );
      continue;
    }
    if (standaloneHeadings.has(b.id) || mixedHeadings.has(b.id)) {
      const split = b.text.indexOf('\n');
      const heading = (
        mixedHeadings.has(b.id) && split >= 0 ? b.text.slice(0, split) : b.text
      ).trim();
      const Heading = subHeadings.has(b.id) ? 'h3' : 'h2';
      output.push(
        <div
          key={b.id}
          className={`source-section ${[117, 153, 214].includes(b.id) ? 'outcome-section' : ''}`}
          data-source-id={b.id}
        >
          <Heading id={`section-${b.id}`}>{heading}</Heading>
          {mixedHeadings.has(b.id) && split >= 0 && (
            <p>
              <SliceText block={b} from={split + 1} />
            </p>
          )}
          {b.images.length > 0 && <Gallery names={b.images} />}
        </div>,
      );
      continue;
    }
    if (b.list && b.text.trim()) {
      const list = [b];
      while (i + 1 < selected.length) {
        const next = selected[i + 1];
        if (
          next.type !== 'paragraph' ||
          next.list !== b.list ||
          !next.text.trim() ||
          standaloneHeadings.has(next.id)
        )
          break;
        list.push(next);
        i++;
      }
      output.push(
        <ul
          key={b.id}
          className={`source-list ${list.length >= 3 ? 'list-grid' : ''}`}
        >
          {list.map((p) => (
            <li key={p.id} data-source-id={p.id}>
              <RichText runs={p.runs} />
              {p.images.length > 0 && <Gallery names={p.images} />}
            </li>
          ))}
        </ul>,
      );
      continue;
    }
    if (!b.text.trim() && b.images.length) {
      const names = [...b.images];
      const ids = [b.id];
      while (i + 1 < selected.length) {
        const next = selected[i + 1];
        if (
          next.type !== 'paragraph' ||
          next.text.trim() ||
          !next.images.length ||
          names.length >= 3
        )
          break;
        if (next.images.some((n) => ['image31.png', 'image45.png'].includes(n)))
          break;
        names.push(...next.images);
        ids.push(next.id);
        i++;
      }
      if (
        names.every((n) =>
          ['image26.png', 'image31.png', 'image45.png'].includes(n),
        )
      ) {
        output.push(
          <div
            key={b.id}
            className="section-illustration"
            data-source-ids={ids.join(',')}
          >
            {names.map((n) => (
              <AssetImage key={n} name={n} alt={visualLabels[n]} />
            ))}
          </div>,
        );
      } else
        output.push(
          <div key={b.id} data-source-ids={ids.join(',')}>
            <Gallery names={names} />
          </div>,
        );
      continue;
    }
    output.push(
      <div
        key={b.id}
        data-source-id={b.id}
        className={callouts.has(b.id) ? 'source-callout' : 'source-paragraph'}
      >
        {b.text.trim() && (
          <p>
            <RichText runs={b.runs} />
          </p>
        )}
        {b.images.length > 0 && <Gallery names={b.images} />}
      </div>,
    );
  }
  return <>{output}</>;
}
