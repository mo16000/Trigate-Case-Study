import { Fragment } from 'react';
import { assetPath, pagePath } from '@/lib/site-path';
import { PhaseOneResearch } from './phase-one-research';
import { DashboardAnimation } from './dashboard-animation';
import { ProgramContent, CoachingContent, MainVersionResults, DeepDiveLinks } from './main-version-content';
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
const mvpFeatureIcons: Record<number, string> = {
  53: 'teacher.svg',
  54: 'Document Add.svg',
  55: 'calendar.svg',
  56: 'milk.svg',
  57: 'rocket-bold.svg',
};
const mvpMetricIcons: Record<string, string> = {
  'image20.png': 'profile-2user.svg',
  'image5.png': 'rocket-boldw.svg',
  'image1.png': 'bank.svg',
};
const uiFeatureIcons: Record<number, { name: string; sourceId?: number }> = {
  90: { name: 'image26.png', sourceId: 89 },
  94: { name: 'image31.png', sourceId: 93 },
  97: { name: 'image36.png' },
  100: { name: 'image41.png' },
  104: { name: 'image45.png', sourceId: 103 },
};
const coachingFlowTones: Record<number, (string | undefined)[]> = {
  166: ['dashboard', 'role', 'program', 'info', 'info', 'info', 'program'],
  187: ['dashboard', 'program', 'info', 'program'],
  193: ['dashboard', 'dashboard', 'program', 'info', 'program'],
  208: [undefined, 'info', 'info', 'info', 'program', undefined],
};
const coachingFlowImages: Record<number, string[]> = {
  187: ['coaching-redesign.svg'],
  193: ['coaching-tasks.svg', 'coaching-task-detail.svg'],
  208: ['coaching-telegram.svg'],
};
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
export function Flow({
  steps,
  label,
  registration = false,
  tones,
}: {
  steps: string[];
  label: string;
  registration?: boolean;
  tones?: (string | undefined)[];
}) {
  const tone = (step: string) => {
    if (!registration) return undefined;
    if (step === 'Dashboard' || step === 'Dashboard (Pending Review)')
      return 'dashboard';
    if (step === 'Sign Up') return 'signup';
    if (step === 'Select Role') return 'role';
    if (
      step === 'Select IEE Program' ||
      step === 'Explore IEEs & Programs - Apply'
    )
      return 'program';
    if (
      [
        'Startup Basic Info',
        'Business Model Canvas and needs',
        'Founder Info',
        'Team Info',
        'Startup Info',
        'BMC and needs',
      ].includes(step)
    )
      return 'info';
    return undefined;
  };
  return (
    <ol className="flow-steps" aria-label={label}>
      {steps.map((step, i) => (
        <li key={i} data-flow-tone={tones?.[i] ?? tone(step)}>
          <span className="step-index">{String(i + 1).padStart(2, '0')}</span>
          <span>
            {registration && step === 'Dashboard (Pending Review)' ? (
              <>
                Dashboard
                <br />
                <span className="pending-review">(Pending Review)</span>
              </>
            ) : (
              step
            )}
          </span>
          {i < steps.length - 1 && (
            <ArrowRight aria-hidden="true" className="step-arrow" size={17} />
          )}
        </li>
      ))}
    </ol>
  );
}
function Gallery({
  names,
  layout,
}: {
  names: string[];
  layout?: 'three' | 'telegram';
}) {
  const mvpScreens = names.join(',') === 'image17.png,image18.png,image19.png';
  return (
    <div
      className={`evidence-gallery ${layout === 'three' ? 'gallery-three' : layout === 'telegram' ? 'gallery-telegram' : mvpScreens ? 'gallery-mvp' : names.length > 1 ? 'gallery-pair' : ''}`}
    >
      {names.map((name) => name === 'image33.png' ? <DashboardAnimation key={name} /> : (
        <CaseImage
          key={name}
          name={name}
          alt={visualLabels[name] || 'Trigate product interface'}
          expandable={name !== 'image69.png'}
          showCaption={name !== 'image69.png'}
        />
      ))}
    </div>
  );
}
function CellContent({
  paragraphs,
  mvpMetrics = false,
}: {
  paragraphs: Paragraph[];
  mvpMetrics?: boolean;
}) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <Fragment key={i}>
          {p.images.map((name) =>
            mvpMetrics && mvpMetricIcons[name] ? (
              <img
                key={name}
                src={assetPath(`/assets/mvp/${mvpMetricIcons[name]}`)}
                alt=""
                className="cell-illustration"
                width={32}
                height={32}
                loading="lazy"
              />
            ) : (
              <AssetImage
                key={name}
                name={name}
                alt={['image70.png', 'image71.png'].includes(name) ? visualLabels[name] : ''}
                className="cell-illustration"
                sizes="260px"
              />
            ),
          )}
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
  if (block.id === 74) {
    return (
      <div className="source-cards implications implications-next" data-source-id={block.id}>
        <article>
          <ul>{block.rows.flatMap((row) => row.flatMap((cell) => cell.paragraphs))
            .filter((p) => p.text.trim()).map((p, i) => <li key={i}><RichText runs={p.runs} /></li>)}</ul>
          <p>We will read more about this in the next chapter.</p>
          <a className="primary-link" href={pagePath('/the-main-version')}>Next Chapter</a>
        </article>
      </div>
    );
  }
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
            <CellContent
              paragraphs={cell.paragraphs}
              mvpMetrics={block.id === 70}
            />
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
      if (b.id === 79)
        output.push(
          <div key="roles-title" className="source-section">
            <h2 id="section-79">Roles and Core Needs</h2>
          </div>,
        );
      output.push(<SourceTableView key={b.id} block={b} />);
      continue;
    }
    // Keep each UI illustration immediately above its related subheading.
    if ([45, 46, 47, 48, 84, 89, 93, 103, 134, 165, 174, 176, 186].includes(b.id)) continue;
    if (b.id === 91) { output.push(<ProgramContent key={b.id} />); continue; }
    if (b.id === 101) { output.push(<CoachingContent key={b.id} />); continue; }
    if (b.id === 117) { output.push(<MainVersionResults key={b.id} />); continue; }
    if (b.id === 36) {
      output.push(<PhaseOneResearch key={b.id} />);
      continue;
    }
    if (b.id === 167) {
      output.push(
        <div key={b.id} data-source-id={b.id}>
          <Gallery
            names={[
              'coaching-summary.png',
              'coaching-tasks-original.png',
              'coaching-health.png',
            ]}
            layout="three"
          />
        </div>,
      );
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
            tones={coachingFlowTones[b.id]}
            label={
              b.id === 187
                ? 'Redesigned in-product flow'
                : b.id === 193
                  ? 'Decoupled task workflow'
                  : 'Telegram workflow'
            }
          />
          <Gallery
            names={coachingFlowImages[b.id]}
            layout={b.id === 208 ? 'telegram' : undefined}
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
          {b.id === 166 && <h3>Original Coaching Report Flow</h3>}
          <Flow
            steps={steps}
            label={heading || 'User flow'}
            registration={b.id === 133 || b.id === 143}
            tones={coachingFlowTones[b.id]}
          />
          {b.images.length > 0 && b.id !== 143 && <Gallery names={b.images} />}{' '}
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
      const featureIcon = uiFeatureIcons[b.id];
      output.push(
        <div
          key={b.id}
          className={`source-section ${featureIcon ? 'ui-feature-header' : ''} ${[117, 153, 214].includes(b.id) ? 'outcome-section' : ''}`}
          data-source-id={b.id}
        >
          {featureIcon && (
            <div
              className={`ui-feature-icon ${[97, 100].includes(b.id) ? 'compact-icon' : ''}`}
              data-source-id={featureIcon.sourceId}
            >
              <AssetImage name={featureIcon.name} alt="" sizes="160px" />
            </div>
          )}
          <Heading id={`section-${b.id}`}>{heading}</Heading>
          {mixedHeadings.has(b.id) && split >= 0 && (
            <p>
              <SliceText block={b} from={split + 1} />
            </p>
          )}
          {b.images.length > 0 && !featureIcon && <Gallery names={b.images} />}
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
          {b.id === 109 && <li><strong>Program-Based Modularity:</strong> Innovation institutes run diverse acceleration programs and events across distinct investment stages. Consequently, they required the flexibility to customize their program roadmaps, educational curricula, committee members per program, and scheduling.</li>}
          {list.map((p) => (
            <li
              key={p.id}
              data-source-id={p.id}
              className={mvpFeatureIcons[p.id] ? 'mvp-feature' : undefined}
            >
              {mvpFeatureIcons[p.id] && (
                <img
                  src={assetPath(`/assets/mvp/${mvpFeatureIcons[p.id]}`)}
                  alt=""
                  width={32}
                  height={32}
                  loading="lazy"
                />
              )}
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
        // The flow is a standalone diagram; the following three product screens form their own grid.
        if (b.id === 62) break;
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
        {b.id === 121 && <DeepDiveLinks />}
      </div>,
    );
  }
  return <>{output}</>;
}
