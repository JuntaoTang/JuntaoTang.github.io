import type { ReactNode } from 'react';

type Author = { name: string; me?: boolean; equal?: boolean };

type Paper = {
  label: string;
  status: string;
  title: string;
  authors: Author[];
  venueFull: string;
  venueShort: string;
  image: string;
  link?: string;
  preprint?: boolean;
  showEqual?: boolean;
  contributionNote?: string;
};

const papers: Paper[] = [
  {
    label: 'ICML',
    status: 'Conference paper',
    title: 'SAME: Stabilized Mixture-of-Experts for Multimodal Continual Instruction Tuning',
    authors: [
      { name: 'Zhen-Hao Xie', equal: true }, { name: 'Jun-Tao Tang', me: true, equal: true }, { name: 'Yu-Cheng Shi' },
      { name: 'Han-Jia Ye' }, { name: 'De-Chuan Zhan' }, { name: 'Da-Wei Zhou' },
    ],
    venueFull: 'International Conference on Machine Learning.',
    venueShort: 'ICML 2026',
    image: '/assets/papers/same.png',
    showEqual: true,
    contributionNote: '* Equal contribution',
  },
  {
    label: 'EMNLP',
    status: 'Main Conference paper',
    title: 'CRAM: Centroid-Routing and Adaptive MoE for Multimodal Continual Instruction Tuning',
    authors: [
      { name: 'Jun-Tao Tang', me: true }, { name: 'Zhen-Hao Xie' }, { name: 'Yu-Cheng Shi' }, { name: 'Da-Wei Zhou' },
    ],
    venueFull: 'Conference on Empirical Methods in Natural Language Processing.',
    venueShort: 'EMNLP 2026',
    image: '/assets/papers/cram.png',
  },
  {
    label: 'ACM MM',
    status: 'Conference paper',
    title: 'Active Quality Assessment and Hierarchical Aggregation for Incomplete Multi-View Multi-Label Classification',
    authors: [
      { name: 'Kewei Wen' }, { name: 'Jun-Tao Tang', me: true }, { name: 'Bob Zhang' }, { name: 'Yanghao Zhou' },
      { name: 'Chao Huang' }, { name: 'Jie Wen' }, { name: 'Chengliang Liu' },
    ],
    venueFull: 'ACM International Conference on Multimedia.',
    venueShort: 'ACM MM 2026',
    image: '/assets/papers/area.png',
  },
  {
    label: 'Preprint',
    status: 'Preprint',
    title: 'Prism: A Plug-in Reproducible Infrastructure for Scalable Multimodal Continual Instruction Tuning',
    authors: [
      { name: 'Jun-Tao Tang', me: true }, { name: 'Yu-Cheng Shi' }, { name: 'Zhen-Hao Xie' }, { name: 'Da-Wei Zhou' },
    ],
    venueFull: 'Preprint ·',
    venueShort: 'arXiv:2605.26110',
    image: '/assets/papers/prism.png',
    link: 'https://arxiv.org/abs/2605.26110',
    preprint: true,
  },
  {
    label: 'Preprint',
    status: 'Preprint',
    title: 'ProtoAda: Prototype-Guided Adaptive Adapter Expansion and Geometric Consolidation for Multimodal Continual Instruction Tuning',
    authors: [
      { name: 'Yu-Cheng Shi' }, { name: 'Zhen-Hao Xie' }, { name: 'Jun-Tao Tang', me: true }, { name: 'Da-Wei Zhou' },
    ],
    venueFull: 'Preprint ·',
    venueShort: 'arXiv:2606.02576',
    image: '/assets/papers/protoada.png',
    link: 'https://arxiv.org/abs/2606.02576',
    preprint: true,
  },
];

function AuthorLine({ authors, dark = false, showEqual = false }: { authors: Author[]; dark?: boolean; showEqual?: boolean }) {
  return (
    <p className={dark ? 'authors authors-dark' : 'authors'}>
      {authors.map((author, index) => (
        <span key={author.name}>
          {index > 0 && ', '}
          <span className={author.me ? 'author-me' : undefined}>{author.name}{showEqual && author.equal ? '*' : ''}</span>
        </span>
      ))}
    </p>
  );
}

function VenueLine({ paper, dark = false }: { paper: Paper; dark?: boolean }) {
  return (
    <p className={dark ? 'venue-line venue-line-dark' : 'venue-line'}>
      <em>{paper.venueFull} </em>
      <strong><em>{paper.venueShort}</em></strong>
    </p>
  );
}

function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="paper-card">
      <div className="paper-media"><img src={paper.image} alt={`${paper.label} paper overview`} loading="lazy" /></div>
      <div className="paper-body">
        <div className="paper-topline"><span className={`paper-short${paper.label === 'ACM MM' ? ' paper-short-acm' : ''}`}>{paper.label}</span><span className="paper-status">{paper.status}</span>{paper.link && <a className="paper-link" href={paper.link} target="_blank" rel="noreferrer">arXiv ↗</a>}</div>
        <h3>{paper.title}</h3>
        <AuthorLine authors={paper.authors} showEqual={paper.showEqual} />
        <VenueLine paper={paper} />
        {paper.contributionNote && <p className="contribution-note">{paper.contributionNote}</p>}
      </div>
    </article>
  );
}

function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="arrow-link" href={href}>{children}<span aria-hidden="true">↗</span></a>;
}

export default function Home() {
  const cram = papers[1];

  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Jun-Tao Tang home"><span className="wordmark-mark">JT</span><span>Jun-Tao Tang</span></a>
        <div className="nav-links"><a href="#research">Research</a><a href="#publications">Publications</a></div>
      </nav>

      <div id="top" className="page-wrap">
        <section className="hero" id="research">
          <div className="hero-portrait-wrap">
            <div className="portrait-backdrop" aria-hidden="true" />
            <div className="portrait-frame">
              <img src="/assets/avatar.png" alt="Portrait of Jun-Tao Tang" />
              <div className="portrait-caption"><span>Jun-Tao Tang</span></div>
            </div>
          </div>

          <div className="hero-copy">
            <h1>Jun-Tao <em>Tang</em></h1>
            <p className="hero-lede">I am an undergraduate student in the School of Computer Science at Nanjing University. Since 2025, I have been a research intern in the LAMDA Group under the supervision of <a className="inline-link" href="https://www.lamda.nju.edu.cn/zhoudw/?AspxAutoDetectCookieSupport=1" target="_blank" rel="noreferrer">Pr. Da-Wei Zhou</a>. My work explores how intelligent systems learn, adapt, and generate across modalities.</p>

            <div className="profile-blocks">
              <div className="profile-block"><span>Current interests</span><div className="interest-list"><span>World Model</span><span>Continual Post-Training</span><span>Multimodal Models</span></div></div>
            </div>

            <div className="hero-actions">
              <ArrowLink href="#publications">View publications</ArrowLink>
              <ArrowLink href="mailto:juntao.tang@smail.nju.edu.cn">Email me</ArrowLink>
              <ArrowLink href="https://github.com/JuntaoTang">GitHub</ArrowLink>
              <ArrowLink href="https://scholar.google.com/citations?user=k7FteWkAAAAJ&hl=zh-TW">Google Scholar</ArrowLink>
            </div>
          </div>
        </section>

        <section className="feature-section" aria-labelledby="feature-title">
          <div className="section-heading"><div><p className="section-kicker">Featured paper</p><h2 id="feature-title">CRAM, in motion.</h2></div></div>
          <div className="feature-card">
            <div className="feature-video"><video controls preload="metadata" poster="/assets/papers/cram.png"><source src="/assets/media/cram-explainer.mp4" type="video/mp4" />Your browser does not support the video tag.</video><span className="video-label">Paper walkthrough</span></div>
            <div className="feature-copy">
              <div className="paper-topline"><span className="paper-short">{cram.label}</span><span className="paper-status">{cram.status}</span></div>
              <h3>{cram.title}</h3>
              <AuthorLine authors={cram.authors} dark />
            </div>
          </div>
        </section>

        <section className="publication-section" id="publications" aria-labelledby="publications-title">
          <div className="section-heading publication-heading"><div><h2 id="publications-title">Selected Publications &amp; preprints</h2></div></div>
          <div className="paper-list">{papers.map((paper) => <PaperCard key={paper.title} paper={paper} />)}</div>
        </section>

        <section className="awards-section" aria-labelledby="awards-title">
          <div className="section-heading"><div><h2 id="awards-title">Scholarships</h2></div></div>
          <div className="awards-list">
            <div className="award-item"><span className="award-year">2025</span><h3>BYD Scholarship</h3></div>
            <div className="award-item"><span className="award-year">2024</span><h3>First-Class Scholarship</h3></div>
          </div>
        </section>

        <footer className="site-footer"><div><span className="footer-mark">JT</span><span>Jun-Tao Tang</span></div><p>Multimodal learning · Nanjing University</p><a href="mailto:juntao.tang@smail.nju.edu.cn">juntao.tang@smail.nju.edu.cn ↗</a></footer>
      </div>
    </main>
  );
}
