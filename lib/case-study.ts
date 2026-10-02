import source from '@/content/document.json';
import textOverrides from '@/content/text-overrides.json';
export type Run = { text: string; bold: boolean; italic: boolean };
export type Paragraph = {
  type: 'paragraph';
  id: number;
  text: string;
  runs: Run[];
  style: string;
  list: string | null;
  level: number;
  images: string[];
};
export type Cell = { paragraphs: Paragraph[]; span: string[] };
export type SourceTable = { type: 'table'; id: number; rows: Cell[][] };
export type Block = Paragraph | SourceTable;
const revisedText = textOverrides as Record<number, string>;
export const blocks = (source.blocks as Block[]).map((block): Block => {
  if (block.type === 'paragraph' && [43, 50].includes(block.id)) {
    return { ...block, text: block.text.replaceAll('IEEs', 'innovation institutes'),
      runs: block.runs.map((run) => ({ ...run, text: run.text.replaceAll('IEEs', 'innovation institutes') })) };
  }
  if (block.type === 'table' && [35, 70].includes(block.id)) {
    const replacements: Record<string, string> = block.id === 35
      ? { '3 startup teams': '4 startup teams' }
      : { '300+': '500+', '80+': '140+', '9': '5', 'IEEs using the Trigate-branded MVP': 'Innovation institutes using the MVP' };
    return { ...block, rows: block.rows.map((row) => row.map((cell) => ({ ...cell,
      paragraphs: cell.paragraphs.map((p) => {
        const text = replacements[p.text.trim()];
        return text ? { ...p, text, runs: [{ text, bold: p.runs.some((r) => r.bold), italic: false }] } : p;
      }),
    }))) };
  }
  if (block.type === 'paragraph' && block.id === 153) {
    const removeImpactColon = (text: string) =>
      text.replace('Business and UX Impact:', 'Business and UX Impact');
    return {
      ...block,
      text: removeImpactColon(block.text),
      runs: block.runs.map((run) => ({
        ...run,
        text: removeImpactColon(run.text),
      })),
    };
  }
  if (block.type === 'paragraph' && revisedText[block.id]) {
    const text = revisedText[block.id];
    return { ...block, text, runs: [{ text, bold: false, italic: false }] };
  }
  if (block.type === 'table' && block.id === 79) {
    return {
      ...block,
      rows: block.rows.map((row) =>
        row.map((cell) => ({
          ...cell,
          paragraphs: cell.paragraphs.map((p) =>
            p.text.includes('Core Needs:')
              ? {
                  ...p,
                  text: p.text.replace(/\s*Core Needs:/, ''),
                  runs: p.runs.filter(
                    (r) => r.text !== 'Core Needs:' && r.text !== '\n',
                  ),
                }
              : p,
          ),
        })),
      ),
    };
  }
  if (block.type === 'table' && block.id === 127) {
    const removeRoleColon = (text: string) =>
      text.replace(/^(Viewer|Founder|Team member):/, '$1');
    return {
      ...block,
      rows: block.rows.map((row) =>
        row.map((cell) => ({
          ...cell,
          paragraphs: cell.paragraphs.map((p) => ({
            ...p,
            text: removeRoleColon(p.text),
            runs: p.runs.map((r) => ({ ...r, text: removeRoleColon(r.text) })),
          })),
        })),
      ),
    };
  }
  if (block.type === 'table' && block.id === 248) {
    return {
      ...block,
      rows: block.rows.map((row) =>
        row.map((cell) => ({
          ...cell,
          paragraphs: cell.paragraphs.map((p) =>
            /^(up|down)$/.test(p.text.trim())
              ? { ...p, text: '', runs: [] }
              : p,
          ),
        })),
      ),
    };
  }
  return block;
});
export const paragraph = (id: number) =>
  blocks.find((b) => b.id === id) as Paragraph;
export const sourceText = (id: number) =>
  id === 79 ? 'Roles and Core Needs' : paragraph(id).text.trim();
export const chapters = [
  {
    slug: 'where-it-started',
    number: '01',
    title: 'Where it started',
    eyebrow: 'Phase 1 · Research & validation',
    range: [29, 74],
    titleId: 29,
    description:
      'From an operational problem to a working MVP. Research, strategic choices, and six months of market validation.',
    image: 'image17.png',
    takeaway: '500+ registered users in the MVP',
    sections: [34, 38, 49, 51, 68, 71],
  },
  {
    slug: 'the-main-version',
    number: '02',
    title: 'The Main Version',
    eyebrow: 'Phase 2 · Product architecture & strategy',
    range: [77, 121],
    titleId: 77,
    description:
      'Scaling the core platform, designing for four roles, and removing sales barriers with a white-label model.',
    image: 'image29.png',
    takeaway: '9 → 22 innovation organizations',
    sections: [79, 82, 86, 88, 90, 94, 97, 100, 104, 107, 117, 120],
  },
  {
    slug: 'removing-the-drop-off',
    number: '03',
    title: 'Removing the Drop-off',
    eyebrow: 'Deep Dive 1 · Acquisition & time-to-value',
    range: [124, 153],
    titleId: 124,
    description:
      'Using behavioral evidence to move product value ahead of the highest-effort application steps.',
    image: 'image57.png',
    takeaway: '21.16% → 0% registration drop-off',
    sections: [129, 140, 153],
  },
  {
    slug: 'coaching-report-workflow',
    number: '04',
    title: 'Streamlining the Coaching Report Workflow',
    eyebrow: 'Deep Dive 2 · Workflow design',
    range: [155, 218],
    titleId: 155,
    description:
      'Reducing recurring effort and making reporting part of coaches’ existing communication habits.',
    image: 'image67.png',
    takeaway: '100% adoption by active TrigUp coaches',
    sections: [156, 172, 179, 180, 199, 214],
  },
  {
    slug: 'co-founder-matching',
    number: '05',
    title: 'Designing a High-Trust Co-Founder Matching Framework',
    eyebrow: 'Deep Dive 3 · Strategic exploration',
    range: [223, 251],
    titleId: 223,
    description:
      'Evaluating platform dynamics and making the case to build network density before launching matchmaking.',
    image: 'image69.png',
    takeaway: 'A feature deliberately postponed',
    sections: [225, 227, 237, 242, 246, 250],
  },
] as const;
export type Chapter = (typeof chapters)[number];
export const visualLabels: Record<string, string> = {
  'coaching-summary.png': 'Meeting summary',
  'coaching-tasks-original.png': 'Tasks',
  'coaching-health.png': 'Startup health evaluation',
  'coaching-redesign.svg': 'Redesigned coaching report',
  'coaching-tasks.svg': 'Dedicated task management area',
  'coaching-task-detail.svg': 'Adding and reviewing tasks',
  'coaching-telegram.svg': 'Coaching report submission through Telegram',
  'image1.png': 'TrigUp managers',
  'image3.png': 'IEE staff',
  'image5.png': 'Startup teams',
  'image7.png': 'Coaches',
  'image9.png': 'Fragmented tools and scattered program information',
  'image11.png': 'Manual documentation and reporting',
  'image13.png': 'Barriers to accessible training',
  'image15.emf':
    'MVP information architecture: separate experiences for administrators, staff, coaches, and startups',
  'image16.emf':
    'MVP system flows: sign-up and sign-in, education, session documentation, and supplements',
  'image17.png': 'The original Trigate WordPress MVP landing page',
  'image18.png': 'Curriculum page in the WordPress MVP',
  'image19.png': 'The MVP learning experience with video content',
  'image22.png':
    'Main-version site map organized around IEE, coach, and startup roles',
  'image24.png':
    'Trigate UI kit and style guide: typography, colors, components, and interface patterns',
  'image26.png': 'Trigate product illustration',
  'image28.png': 'Acceleration application management with program filters',
  'image29.png':
    'IEE dashboard combining programs, applications, events, and analytics',
  'image30.png': 'Program stages, requirements, and application details',
  'image31.png': 'Monitoring and reporting illustration',
  'image33.png':
    'Monitoring dashboard with application trends and activity metrics',
  'image34.png': 'Startup portfolio with filters and individual team cards',
  'image35.png':
    'A startup dashboard with performance metrics and coaching reports',
  'image36.png': 'Education illustration',
  'image38.png': 'Educational resources and course library',
  'image39.png': 'Education programs, camps, and learning opportunities',
  'image40.png': 'Course details, learning outcomes, and chapter structure',
  'image41.png': 'Coaching illustration',
  'image43.png': 'Coaching meeting report interface',
  'image44.png': 'Coaching and mentoring sessions overview',
  'image45.png': 'Supplements illustration',
  'image47.png': 'Adding a supplementary resource to Trigate',
  'image48.png': 'The supplements directory with startup tools',
  'image49.png': 'Viewer exploring educational content',
  'image51.png': 'Founder preparing a startup application',
  'image53.png': 'Team members joining a startup',
  'image55.emf':
    'Original startup registration flow: dashboard access follows role selection and all application forms',
  'image56.emf':
    'Redesigned startup registration flow: immediate dashboard access before exploring and applying',
  'image57.png':
    'Discovery-driven viewer dashboard with education, programs, and institutions',
  'image59.png':
    'Program details available to explore before starting an application',
  'image61.png': 'Team management from an active startup dashboard',
  'image63.png':
    'Invitation-code interface for adding a team member after application',
  'image65.emf':
    'Original coaching report flow combining meeting documentation, tasks, and startup health evaluation',
  'image66.png': 'Dedicated task creation and review interface',
  'image67.png':
    'Streamlined coaching report with a summary, meeting topic, and five-level startup status',
  'image68.emf':
    'Redesigned reporting, decoupled task creation, and Telegram reporting workflows',
  'image69.png':
    'Illustrated founder profiles representing a potential co-founder network',
  'image70.png': 'Decreases',
  'image71.png': 'Increases',
};
export const standaloneHeadings = new Set([
  34, 38, 45, 49, 51, 68, 71, 82, 86, 88, 90, 94, 97, 100, 104, 120, 129, 132,
  142, 156, 165, 179, 185, 192, 207, 237,
]);
export const mixedHeadings = new Set([
  107, 117, 140, 153, 172, 180, 199, 214, 225, 227, 242, 246, 250,
]);
export const uiFeatureHeadings = new Set([90, 94, 97, 100, 104]);
export const subHeadings = new Set([
  ...uiFeatureHeadings,
  132,
  142,
  165,
  185,
  192,
  207,
]);
export const callouts = new Set([43, 44, 128, 136, 137, 168, 231, 245, 251]);
