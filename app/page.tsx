import type { ReactNode } from 'react';

type Author = {
  name: string;
  me?: boolean;
  equal?: boolean;
};

type Paper = {
  title: string;
  authors: Author[];
  venue: string;
  kind: string;
  image: string;
  blurb: string;
  showEqual?: boolean;
};

const papers: Paper[] = [
  {
    title: 'SAME: Stabilized Mixture-of-Experts for Multimodal Continual Instruction Tuning',
    authors: [
      { name: 'Zhen-Hao Xie', equal: true },
      { name: 'Jun-Tao Tang', me: true, equal: true },
      { name: 'Yu-Cheng Shi' },
      { name: 'Han-Jia Ye' },
      { name: 'De-Chuan Zhan' },
      { name: 'Da-Wei Zhou' },
    ],
    venue: 'ICML 2026',
    kind: 'Conference paper',
    image: '/assets/papers/same.png',
    blurb: 'Stabilizing expert routing as multimodal instruction distributions evolve, so new capabilities can be added without erasing old ones.',
    showEqual: true,
  },
  {
    title: 'CRAM: Centroid-Routing and Adaptive MoE for Multimodal Continual Instruction Tuning',
    authors: [
      { name: 'Jun-Tao Tang', me: true, equal: true },
      { name: 'Zhen-Hao Xie', equal: true },
      { name: 'Yu-Cheng Shi' },
      { name: 'Da-Wei Zhou' },
    ],
    venue: 'EMNLP 2026',
    kind: 'Main conference paper',
    image: '/assets/papers/cram.png',
    blurb: 'Centroid-guided routing and adaptive expert construction for continual multimodal instruction tuning.',
    showEqual: true,
  },
  {
    title: 'Active Quality Assessment and Hierarchical Aggregation for Incomplete Multi-View Multi-Label Classification',
    authors: [
      { name: 'Kewei Wen' },
      { name: 'Jun-Tao Tang', me: true },
      { name: 'Bob Zhang' },
      { name: 'Yanghao Zhou' },
      { name: 'Chao Huang' },
      { name: 'Jie Wen' },
      { name: 'Chengliang Liu' },
    ],
    venue: 'ACM MM 2026',
    kind: 'Conference paper',
    image: '/assets/papers/area.png',
    blurb: 'Quality-aware multi-view aggregation that adapts to incomplete visual evidence and multi-label ambiguity.',
  },
  {
    title: 'ProtoAda: Prototype-Guided Adaptive Adapter Expansion and Geometric Consolidation for Multimodal Continual Instruction Tuning',
    authors: [
      { name: 'Yu-Cheng Shi' },
      { name: 'Zhen-Hao Xie' },
      { name: 'Jun-Tao Tang', me: true },
      { name: 'Da-Wei Zhou' },
    ],
    venue: 'Preprint · 2026',
    kind: 'Preprint',
    image: '/assets/papers/protoada.png',
    blurb: 'Prototype-guided adapter expansion with geometric consolidation for retaining and reusing multimodal skills.',
  },
  {
    title: 'Prism: A Plug-in Reproducible Infrastructure for Scalable Multimodal Continual Instruction Tuning',
    authors: [
      { name: 'Jun-Tao Tang', me: true, equal: true },
      { name: 'Yu-Cheng Shi', equal: true },
      { name: 'Zhen-Hao Xie' },
      { name: 'Da-Wei Zhou' },
    ],
    venue: 'Preprint · 2026',
    kind: 'Preprint',
    image: '/assets/papers/prism.png',
    blurb: 'A plug-in research infrastructure that makes multimodal continual instruction tuning easier to extend and reproduce.',
    showEqual: true,
  },
];

function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="paper-card">
      <div className="paper-media">
        <img src={paper.image} alt={`${paper.title} overview`} loading="lazy" />
      </div>
      <div className="paper-body">
        <div className="paper-meta">
          <span className="venue-pill">{paper.venue}</span>
          <span className="paper-kind">{paper.kind}</span>
        </div>
        <h3>{paper.title}</h3>
        <p className="authors">
          {paper.authors.map((author, index) => (
            <span key={author.name}>
              {index > 0 && ' · '}
              <span className={author.me ? 'author-me' : undefined}>{author.name}</span>
              {paper.showEqual && author.equal ? '*' : ''}
            </span>
          ))}
        </p>
        <p className="paper-blurb">{paper.blurb}</p>
        {paper.showEqual && <p className="equal-note">* Equal contribution</p>}
      </div>
    </article>
  );
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="arrow-link" href={href}>
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Jun-Tao Tang home">
          <span className="wordmark-mark">JT</span>
          <span>Jun-Tao Tang</span>
        </a>
        <div className="nav-links">
          <a href="#research">Research</a>
          <a href="#publications">Publications</a>
          <a href="#about">About</a>
        </div>
        <a className="nav-status" href="mailto:juntao.tang@smail.nju.edu.cn">
          <span className="status-dot" /> Get in touch
        </a>
      </nav>

      <div id="top" className="page-wrap">
        <section className="hero" id="about">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Undergraduate researcher · Nanjing University</p>
            <h1>Building better<br /><em>memory</em> for MLLMs.</h1>
            <p className="hero-lede">I am Jun-Tao Tang, an undergraduate researcher in multimodal learning and continual instruction tuning.</p>
            <div className="hero-actions">
              <ArrowLink href="#publications">Explore the work</ArrowLink>
              <ArrowLink href="mailto:juntao.tang@smail.nju.edu.cn">Email me</ArrowLink>
            </div>
            <div className="hero-tags" aria-label="Research areas">
              <span>Multimodal learning</span>
              <span>Continual learning</span>
              <span>Efficient adaptation</span>
            </div>
          </div>
          <div className="hero-portrait-wrap">
            <div className="portrait-backdrop" aria-hidden="true" />
            <div className="portrait-frame">
              <img src="/assets/avatar.png" alt="Portrait of Jun-Tao Tang" />
              <div className="portrait-caption"><span>01</span><span>Research profile</span></div>
            </div>
            <div className="hero-fact fact-top"><span className="fact-number">05</span><span>papers<br />in progress</span></div>
            <div className="hero-fact fact-bottom"><span className="fact-number">01</span><span>BYD<br />Scholarship · 2025</span></div>
          </div>
        </section>

        <section className="intro-strip" id="research">
          <div className="section-kicker">Research direction</div>
          <div className="intro-main">
            <h2>Learning across tasks, modalities, and time.</h2>
            <p>My current work explores how multimodal large language models can keep learning as new tasks arrive—without overwriting the capabilities they already have. I work with Dr. Da-Wei Zhou in the LAMDA Group at Nanjing University.</p>
          </div>
          <div className="affiliation-note">
            <span>Based in</span>
            <strong>Nanjing, China</strong>
            <a href="https://www.lamda.nju.edu.cn/" target="_blank" rel="noreferrer">LAMDA Group ↗</a>
          </div>
        </section>

        <section className="focus-grid" aria-label="Research focus">
          <div className="focus-card focus-blue"><span className="focus-index">01</span><h3>Multimodal<br />learning</h3><p>Aligning visual and textual evidence inside large language models.</p></div>
          <div className="focus-card focus-lime"><span className="focus-index">02</span><h3>Continual<br />instruction tuning</h3><p>Growing capabilities while protecting the knowledge already learned.</p></div>
          <div className="focus-card focus-ink"><span className="focus-index">03</span><h3>Efficient<br />adaptation</h3><p>Routing, adapters, and reusable infrastructure for scalable updates.</p></div>
        </section>

        <section className="feature-section" aria-labelledby="feature-title">
          <div className="section-heading"><div><p className="section-kicker">Featured work</p><h2 id="feature-title">CRAM, in motion.</h2></div><span className="section-count">01 / 05</span></div>
          <div className="feature-card">
            <div className="feature-video"><video controls preload="metadata" poster="/assets/papers/cram.png"><source src="/assets/media/cram-explainer.mp4" type="video/mp4" />Your browser does not support the video tag.</video><span className="video-label">Paper walkthrough</span></div>
            <div className="feature-copy">
              <div className="paper-meta"><span className="venue-pill">EMNLP 2026</span><span className="paper-kind">Main conference paper</span></div>
              <h3>Centroid-Routing and Adaptive MoE for Multimodal Continual Instruction Tuning</h3>
              <p className="authors"><span className="author-me">Jun-Tao Tang</span>* · Zhen-Hao Xie* · Yu-Cheng Shi · Da-Wei Zhou</p>
              <p>CRAM treats a growing stream of multimodal tasks as a structured geometry problem: route by semantic group, expand expert capacity only when needed, and keep new updates orthogonal to what came before.</p>
              <div className="feature-points"><span><i>↳</i> Centroid-guided routing</span><span><i>↳</i> Adaptive-rank experts</span><span><i>↳</i> Orthogonal consolidation</span></div>
              <p className="equal-note">* Equal contribution</p>
            </div>
          </div>
        </section>

        <section className="publication-section" id="publications" aria-labelledby="publications-title">
          <div className="section-heading publication-heading"><div><p className="section-kicker">Selected work</p><h2 id="publications-title">Publications &amp; preprints</h2></div><p className="publication-intro">A growing body of work on reliable, reusable multimodal intelligence.</p></div>
          <div className="paper-list">{papers.map((paper) => <PaperCard key={paper.title} paper={paper} />)}</div>
        </section>

        <section className="timeline-section" aria-labelledby="now-title">
          <div className="section-heading"><div><p className="section-kicker">A little more context</p><h2 id="now-title">Now &amp; before</h2></div></div>
          <div className="timeline-grid">
            <div className="timeline-item"><span>2025 — now</span><h3>Research intern</h3><p>LAMDA Group, Nanjing University<br />Supervised by Dr. Da-Wei Zhou</p></div>
            <div className="timeline-item"><span>Now</span><h3>Undergraduate student</h3><p>School of Computer Science<br />Nanjing University</p></div>
            <div className="timeline-item"><span>2025</span><h3>BYD Scholarship</h3><p>Recognized for academic and research excellence.</p></div>
          </div>
        </section>

        <footer className="site-footer"><div><span className="footer-mark">JT</span><span>Jun-Tao Tang</span></div><p>Multimodal learning · Continual intelligence · Nanjing University</p><a href="mailto:juntao.tang@smail.nju.edu.cn">juntao.tang@smail.nju.edu.cn ↗</a></footer>
      </div>
    </main>
  );
}
