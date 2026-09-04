import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  CircleCheck,
  FileText,
  Layers3,
  MoveUpRight,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import HeroAnimation from './hero-animation';

const metrics = [
  ['6,000+', 'startup users'],
  ['20+', 'innovation organizations'],
  ['31', 'provinces across Iran'],
  ['4 years', 'from MVP to SaaS'],
];

const contributions = [
  'Product strategy & research',
  'Information architecture',
  'End-to-end UX/UI design',
  'Design system & visual identity',
  'Usability & behavioral analysis',
  'Design-to-development delivery',
];

const oldFlow = ['Sign up', 'Select role', 'Select IEE program', 'Startup basics', 'Business model & needs', 'Founder info', 'Team info', 'Dashboard'];
const newFlow = ['Sign up', 'Dashboard', 'Explore IEEs & programs', 'Apply when ready', 'Startup info', 'Founder info', 'Pending review'];

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{number}</span>{children}</div>;
}

function ProductImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`product-image ${className}`}>
      <img src={src} alt={alt} width={2500} height={1800} loading="lazy" />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Trigate case study home">
          <span className="brand-mark"><img src="/assets/trigate-logo.svg" alt="" width={34} height={34} /></span>
          <span>TRIGATE</span>
        </a>
        <nav aria-label="Case study navigation">
          <a href="#overview">Overview</a>
          <a href="#journey">Journey</a>
          <a href="#deep-dives">Deep dives</a>
          <a href="#outcomes">Outcomes</a>
        </nav>
        <a className="chapter-link" href="#overview">Explore the work <ArrowDown size={16} /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>UX CASE STUDY</span><span>2021—2025</span></p>
          <h1>From a scrappy MVP to a white-label innovation platform.</h1>
          <p className="hero-summary">
            Designing Trigate from the ground up—and evolving it into a flexible SaaS used by accelerators, coaches, and startup teams across Iran.
          </p>
          <div className="hero-meta">
            <div><span>Role</span><strong>Founding Product Designer</strong></div>
            <div><span>Scope</span><strong>Zero-to-one · End-to-end</strong></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-tag"><span className="status-dot" />Live product, continuously evolved</div>
          <div className="product-frame animation-frame">
            <HeroAnimation />
          </div>
          <div className="floating-note"><span>01</span><strong>One platform.<br />Four distinct roles.</strong><MoveUpRight size={18} /></div>
        </div>
      </section>

      <section className="overview" id="overview">
        <SectionLabel number="00">THE OUTCOME, AT A GLANCE</SectionLabel>
        <div className="metrics-grid">
          {metrics.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}
        </div>

        <div className="overview-copy">
          <h2>An operating system for innovation programs.</h2>
          <div>
            <p>Trigate brings applications, education, coaching, portfolio monitoring, and documentation into one scalable system for innovation ecosystem entities.</p>
            <p>What began as a two-person WordPress experiment became a white-label product serving accelerators, incubators, venture firms, and science and technology parks.</p>
          </div>
        </div>

        <div className="role-grid">
          <article className="role-card featured-role">
            <span className="card-icon"><Sparkles size={22} /></span>
            <p className="micro-label">MY ROLE</p>
            <h3>Founding Product Designer</h3>
            <p>I partnered with the Product Manager on research, product strategy, MVP definition, and roadmap priorities—then owned the complete product design practice through delivery.</p>
          </article>
          <article className="role-card">
            <p className="micro-label">TEAM EVOLUTION</p>
            <div className="team-step"><strong>2021—2022</strong><span>Designer + Product Manager</span></div>
            <div className="team-divider" />
            <div className="team-step"><strong>2023—2025</strong><span>Designer + PM + Frontend + Backend</span></div>
          </article>
          <article className="role-card contribution-card">
            <p className="micro-label">CONTRIBUTION</p>
            <ul>{contributions.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="journey" id="journey">
        <div className="section-intro">
          <SectionLabel number="01">WHERE IT STARTED</SectionLabel>
          <h2>Fragmented work. Scattered data. No shared view of progress.</h2>
          <p>In 2021, TrigUp ran acceleration programs through spreadsheets, files, messaging apps, and disconnected online tools. Each program had its own process—and reporting was slow, manual, and fragile.</p>
        </div>

        <div className="research-strip">
          <div className="research-count"><strong>9</strong><span>foundational interviews</span></div>
          <div className="research-audiences">
            {['2 managers', '2 staff members', '3 startup teams', '2 coaches'].map((item, i) => <span key={item}><i>{String(i + 1).padStart(2, '0')}</i>{item}</span>)}
          </div>
        </div>

        <div className="finding-grid">
          <article><span><Layers3 size={22} /></span><h3>Fragmented operations</h3><p>Staff switched between tools while information lost structure and consistency.</p></article>
          <article><span><BarChart3 size={22} /></span><h3>Invisible progress</h3><p>Managers lacked reliable, real-time visibility into teams and coaching outcomes.</p></article>
          <article><span><FileText size={22} /></span><h3>Training out of reach</h3><p>Teams needed practical, trustworthy learning content that could scale.</p></article>
        </div>

        <div className="decision-callout">
          <p className="micro-label">THE FIRST STRATEGIC DECISION</p>
          <h3>Build an internal tool—or validate a product for the entire innovation sector?</h3>
          <p>Before investing in custom software, we needed proof that organizations beyond TrigUp would use it. We chose speed: a functional WordPress MVP that the Product Manager and I could build ourselves.</p>
        </div>

        <div className="mvp-layout">
          <div className="mvp-copy">
            <SectionLabel number="02">THE MVP</SectionLabel>
            <h2>Prove the workflow before scaling the platform.</h2>
            <p>The first release brought five recurring activities together: education, exercises, coaching sessions, supplements, and startup management.</p>
            <div className="pilot-stats">
              <div><strong>300+</strong><span>registered users</span></div>
              <div><strong>80+</strong><span>startup applications</span></div>
              <div><strong>9</strong><span>IEEs in the pilot</span></div>
            </div>
            <p className="result-note"><CircleCheck size={18} />Six months of sustained use validated the opportunity—and justified building the main version with a dedicated team.</p>
          </div>
          <div className="mvp-gallery">
            <figure><img src="/assets/mvp-home.png" alt="Original Trigate WordPress MVP landing page" width={1298} height={590} loading="lazy" /><figcaption>Original WordPress landing page</figcaption></figure>
            <figure><img src="/assets/mvp-course.png" alt="Original Trigate MVP course interface" width={1023} height={592} loading="lazy" /><figcaption>Learning journey in the MVP</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="platform-heading">
          <SectionLabel number="03">THE MAIN VERSION</SectionLabel>
          <h2>From fixed flows to a flexible, role-based platform.</h2>
          <p>MVP insights became the blueprint for a custom product. I redesigned the information architecture and core flows around the distinct needs of startup teams, coaches, staff, and administrators.</p>
        </div>
        <div className="roles-map" aria-label="Role-based information architecture">
          <article><span>IEE</span><strong>Admin & staff</strong><p>Programs · Applications · Portfolio · Reporting</p></article>
          <ArrowRight aria-hidden="true" />
          <article><span>COACH</span><strong>Coaches & mentors</strong><p>Sessions · Tasks · Health · Progress</p></article>
          <ArrowRight aria-hidden="true" />
          <article><span>STARTUP</span><strong>Founders & teams</strong><p>Dashboard · Training · Coaching · Resources</p></article>
        </div>
        <ProductImage src="/assets/design-system-overview.png" alt="Overview of the Trigate UI kit and design system" className="design-system-shot" />
        <div className="screen-pair">
          <figure><ProductImage src="/assets/admin-dashboard.png" alt="Administration analytics dashboard in the custom Trigate platform" /><figcaption><span>01</span>Program monitoring & reporting</figcaption></figure>
          <figure><ProductImage src="/assets/coach-sessions.png" alt="Coaching sessions screen in the custom Trigate platform" /><figcaption><span>02</span>Coaching operations</figcaption></figure>
        </div>
      </section>

      <section className="pivot-section">
        <div className="pivot-copy">
          <SectionLabel number="04">THE STRATEGIC PIVOT</SectionLabel>
          <h2>Interest was high. Conversion was not.</h2>
          <p>Customer discovery surfaced two consistent barriers: institutions needed complete control over sensitive startup data, and they needed founders to experience the platform as part of their own trusted brand.</p>
        </div>
        <div className="pivot-cards">
          <article><span>01</span><h3>Data control</h3><p>Ownership and governance were non-negotiable for organizations handling proprietary ideas, evaluations, and applicant records.</p></article>
          <article><span>02</span><h3>Brand continuity</h3><p>Institutions needed a seamless experience under their own name, logo, domain, and visual identity.</p></article>
        </div>
        <div className="white-label-result">
          <div><p className="micro-label">THE RESPONSE</p><h3>A fully white-label premium plan</h3><p>Custom branding, custom domains, data ownership, and advanced reporting—built on the same core product.</p></div>
          <div className="growth-figure"><strong>9</strong><ArrowRight /><strong>22</strong><span>active organizations<br />in six months</span></div>
        </div>
      </section>

      <section className="deep-dives" id="deep-dives">
        <div className="section-intro deep-intro">
          <SectionLabel number="05">HOW I DECIDED & IMPROVED</SectionLabel>
          <h2>Three decisions. Three different modes of product thinking.</h2>
          <p>Behavioral evidence to improve acquisition, workflow redesign to reduce recurring effort, and strategic restraint when the ecosystem was not ready.</p>
        </div>

        <article className="deep-dive onboarding">
          <div className="deep-dive-head">
            <div><p className="dive-number">DEEP DIVE 01</p><h2>Remove the drop-off by delivering value first.</h2></div>
            <div className="impact-pill"><strong>21.16%</strong><span>registration drop-off<br />before redesign</span></div>
          </div>
          <div className="two-col-copy">
            <div><p className="micro-label">THE PROBLEM</p><h3>The dashboard was locked behind the highest-effort barrier.</h3><p>Role selection pushed founders directly into a long application before they could see the product. A two-week Microsoft Clarity analysis of 104 users showed that 21.16% dropped off before reaching the dashboard.</p></div>
            <div><p className="micro-label">THE MOVE</p><h3>Flip the funnel.</h3><p>Every new user now entered as a viewer, landed on the dashboard immediately, explored content and programs, and decided whether to register a startup or join a team later.</p></div>
          </div>
          <div className="flow-comparison">
            <div><p>ORIGINAL FLOW</p><ol>{oldFlow.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol></div>
            <div className="flow-arrow"><ArrowRight /></div>
            <div className="new-flow"><p>VALUE-FIRST FLOW</p><ol>{newFlow.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol></div>
          </div>
          <div className="image-story-grid">
            <ProductImage src="/assets/startup-dashboard.png" alt="Redesigned value-first startup dashboard showing programs and learning content" />
            <div className="stacked-images">
              <ProductImage src="/assets/program-detail.png" alt="Program detail page available for exploration before applying" />
              <ProductImage src="/assets/invite-code.png" alt="Invitation code flow for adding team members after application" />
            </div>
          </div>
          <div className="impact-banner"><span>BUSINESS + UX IMPACT</span><strong>Registration drop-off fell from 21.16% to zero.</strong><p>Users reached value sooner, explored programs with context, and applied when ready.</p></div>
        </article>

        <article className="deep-dive coaching-dive">
          <div className="deep-dive-head">
            <div><p className="dive-number">DEEP DIVE 02</p><h2>Make coaching reports easier—and harder to forget.</h2></div>
            <div className="impact-pill success-pill"><strong>100%</strong><span>coach adoption<br />after launch</span></div>
          </div>
          <div className="two-col-copy">
            <div><p className="micro-label">THE REAL PROBLEM</p><h3>Too much input, plus a workflow that relied on memory.</h3><p>Two coach interviews revealed both immediate cognitive overload and delayed completion. Reducing fields would help, but coaches would still have to remember to return to Trigate after a session.</p></div>
            <div><p className="micro-label">THE TWO-LAYER SOLUTION</p><h3>Simplify the report. Move the reminder into an existing habit.</h3><p>I separated task management from reporting, kept only a summary, topic, and five-level health metric, then introduced a secure Telegram bot for reminders and voice-to-text reporting.</p></div>
          </div>
          <div className="report-evolution">
            <figure><ProductImage src="/assets/report-before.png" alt="Original comprehensive coaching report form" /><figcaption><span>BEFORE</span>One exhaustive form combined reporting, tasks, and evaluation.</figcaption></figure>
            <figure><ProductImage src="/assets/task-flow.png" alt="Dedicated task management step separated from the coaching report" /><figcaption><span>SEPARATE</span>Tasks moved to their own single source of truth.</figcaption></figure>
            <figure><ProductImage src="/assets/report-after.png" alt="Simplified coaching report focused on summary and startup status" /><figcaption><span>AFTER</span>Three essentials, with Telegram as an asynchronous entry point.</figcaption></figure>
          </div>
          <div className="telegram-flow">
            {['Bot reminder', 'Voice note', 'Review transcript', 'Choose topic & status', 'Sync to Trigate'].map((step, index) => <div key={step}><span>{index + 1}</span><strong>{step}</strong>{index < 4 && <ArrowRight />}</div>)}
          </div>
        </article>

        <article className="deep-dive restraint-dive">
          <div className="deep-dive-head">
            <div><p className="dive-number">DEEP DIVE 03</p><h2>Design the strategy—then choose not to build yet.</h2></div>
            <div className="impact-pill neutral-pill"><strong>NOT YET</strong><span>the right product<br />decision</span></div>
          </div>
          <div className="two-col-copy">
            <div><p className="micro-label">THE OPPORTUNITY</p><h3>A high-trust co-founder matching ecosystem.</h3><p>A basic directory could improve discoverability, but meaningful matches required verified profiles, strong filters, and enough active participants to create real choice.</p></div>
            <div><p className="micro-label">THE DECISION</p><h3>Sequence pull before match.</h3><p>Research showed that a gated platform would have quality but too few participants, while an open launch would grow quickly at the cost of trust. The responsible answer was a phased roadmap.</p></div>
          </div>
          <div className="platform-pillars">
            <article><span>01</span><UsersRound /><h3>Participants</h3><p>Qualified founders and potential co-founders.</p></article>
            <article><span>02</span><Sparkles /><h3>Value unit</h3><p>Rich, credible profiles and startup opportunities.</p></article>
            <article><span>03</span><Layers3 /><h3>Filter</h3><p>Reliable criteria that surface relevant matches.</p></article>
          </div>
          <div className="sequence-card">
            <p className="micro-label">FINAL ROADMAP SEQUENCE</p>
            <div>{['Deliver core value', 'Attract vetted users', 'Build network density', 'Apply advanced filters', 'Generate high-relevance matches'].map((step, index) => <span key={step}><i>{index + 1}</i>{step}{index < 4 && <ArrowRight />}</span>)}</div>
          </div>
        </article>
      </section>

      <section className="outcomes" id="outcomes">
        <div className="outcome-copy">
          <SectionLabel number="06">WHAT THE JOURNEY PROVED</SectionLabel>
          <h2>Good product design changed the shape of the business.</h2>
          <p>Trigate did more than digitize existing operations. It turned fragmented services into a repeatable platform, created a path to white-label revenue, and made critical workflows easier to complete.</p>
        </div>
        <div className="outcome-grid">
          <article><strong>0%</strong><span>registration drop-off after the value-first redesign</span></article>
          <article><strong>100%</strong><span>coach adoption of the redesigned reporting workflow</span></article>
          <article><strong>2×+</strong><span>organization growth within six months of white-label launch</span></article>
          <article><strong>31</strong><span>provinces reached by the platform</span></article>
        </div>
        <div className="lessons">
          <p className="micro-label">THE PRINCIPLES I CARRIED FORWARD</p>
          <div>
            <article><span>01</span><h3>Earn scale with evidence.</h3><p>Validate the operating model before committing to the expensive version.</p></article>
            <article><span>02</span><h3>Deliver value before asking for effort.</h3><p>Move the payoff forward and let commitment grow with context.</p></article>
            <article><span>03</span><h3>Design around real habits.</h3><p>Sometimes the best interface is the channel users already return to.</p></article>
            <article><span>04</span><h3>Timing is part of the product.</h3><p>Choosing not to build can protect trust, relevance, and roadmap focus.</p></article>
          </div>
        </div>
      </section>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark"><img src="/assets/trigate-logo.svg" alt="" width={34} height={34} /></span><span>TRIGATE</span></div>
        <p>Innovation management platform · UX case study · 2021—2025</p>
        <a href="#top">Back to top <ArrowDown size={15} /></a>
      </footer>
    </main>
  );
}
