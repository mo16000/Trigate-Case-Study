import { ArrowRight, ArrowUpRight } from 'lucide-react';
import HeroAnimation from './hero-animation';
import { chapters, sourceText } from '@/lib/case-study';
import { AssetImage, CaseImage } from '@/components/case-image';

export default function Overview() {
  return (
    <main id="main-content">
      <section className="overview-hero page-width" id="top">
        <div className="hero-editorial">
          <p className="eyebrow">Founding Product Designer · 2021–2025</p>
          <h1>
            TRIGATE,
            <br />
            <span>An Innovation Management Platform</span>
          </h1>
          <p className="hero-description">{sourceText(2)}</p>
          <div className="hero-actions">
            <a className="primary-link" href="#chapters">
              Explore the five chapters <ArrowRight size={18} />
            </a>
            <span>Trigate / UX case study</span>
          </div>
        </div>
        <div className="hero-animation-plate">
          <HeroAnimation />
        </div>
        <div className="hero-facts">
          <div>
            <span>Role</span>
            <strong>Founding Product Designer</strong>
          </div>
          <div>
            <span>Timeline</span>
            <strong>December 2021–November 2025</strong>
          </div>
          <div>
            <span>Product</span>
            <strong>B2B SaaS · Innovation management</strong>
          </div>
        </div>
      </section>
      <section className="overview-intro page-width" id="product">
        <div className="section-kicker">
          <span>01 / The product</span>
          <span>One connected ecosystem</span>
        </div>
        <div className="intro-grid">
          <h2>An operating system for innovation programs.</h2>
          <p>{sourceText(7)}</p>
        </div>
        <div className="metrics-row">
          {[
            ['6,000+', 'startup users'],
            ['20+', 'IEEs'],
            ['31', 'provinces across Iran'],
            ['4 years', 'from zero to SaaS'],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="overview-preview page-width">
        <CaseImage
          name="image29.png"
          alt="Trigate IEE dashboard: programs, startup applications, events, and analytics"
        />
      </section>
      <section className="ownership-section page-width" id="ownership">
        <div className="section-kicker">
          <span>02 / Ownership</span>
          <span>Across strategy, design & delivery</span>
        </div>
        <div className="ownership-intro">
          <h2>
            One design owner.
            <br />
            An evolving product team.
          </h2>
          <p>{sourceText(15).split('\n')[1]}</p>
        </div>
        <div className="team-timeline">
          <article>
            <span className="timeline-dot" />
            <p className="eyebrow">2021–2022</p>
            <h3>Two-person founding team</h3>
            <p className="team-roles">{sourceText(10)}</p>
            <p>{sourceText(11)}</p>
          </article>
          <article>
            <span className="timeline-dot" />
            <p className="eyebrow">2023–2025</p>
            <h3>Four-person product team</h3>
            <p className="team-roles">{sourceText(13)}</p>
            <p>{sourceText(14)}</p>
          </article>
        </div>
      </section>
      <section className="outcomes-section" id="outcomes">
        <div className="page-width">
          <div className="section-kicker">
            <span>03 / Outcomes</span>
            <span>Product decisions. Tangible change.</span>
          </div>
          <h2>
            Design that moved
            <br />
            the product forward.
          </h2>
          <div className="outcomes-grid">
            <a href="/the-main-version#section-117">
              <strong>9 → 22</strong>
              <h3>Innovation organizations</h3>
              <p>
                Active users grew in the six months after introducing the
                white-label plan.
              </p>
              <span>
                Read the strategic pivot <ArrowUpRight size={17} />
              </span>
            </a>
            <a href="/removing-the-drop-off#section-153">
              <strong>21.16% → 0%</strong>
              <h3>Registration drop-off</h3>
              <p>
                Immediate dashboard access removed application completion as a
                barrier to entry.
              </p>
              <span>
                Explore the redesign <ArrowUpRight size={17} />
              </span>
            </a>
            <a href="/coaching-report-workflow#section-214">
              <strong>100%</strong>
              <h3>Active TrigUp coach adoption</h3>
              <p>
                Streamlined web reports and Telegram brought reporting into
                coaches’ existing workflow.
              </p>
              <span>
                Follow the workflow <ArrowUpRight size={17} />
              </span>
            </a>
          </div>
        </div>
      </section>
      <section className="story-map page-width" id="chapters">
        <div className="section-kicker">
          <span>04 / The complete story</span>
          <span>Five connected chapters</span>
        </div>
        <div className="story-intro">
          <h2>
            The decisions
            <br />
            behind the product.
          </h2>
          <p>
            From validating the first idea to knowing which feature to postpone.
            Follow the journey, or go directly to a decision.
          </p>
        </div>
        <div className="chapter-cards">
          {chapters.map((c) => (
            <a href={'/' + c.slug} className="chapter-card" key={c.slug}>
              <span className="card-number">{c.number}</span>
              <div className="chapter-card-copy">
                <span className="eyebrow">{c.eyebrow}</span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <span className="card-takeaway">{c.takeaway}</span>
              </div>
              <div className="chapter-card-image">
                <AssetImage name={c.image} alt="" sizes="320px" />
              </div>
              <span className="card-arrow">
                <ArrowUpRight size={24} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
