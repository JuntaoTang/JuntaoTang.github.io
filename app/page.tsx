import type { ReactNode } from 'react';

import { papers, type Author, type Paper } from './papers';
import SiteNav from './components/site-nav';

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
      <SiteNav active="home" />

      <div id="top" className="page-wrap">
        <section className="hero" id="research">
          <div className="hero-portrait-wrap">
            <div className="portrait-frame">
              <img src="/assets/avatar-v2.png" alt="Portrait of Jun-Tao Tang" />
            </div>
          </div>

          <div className="hero-copy">
            <h1>Jun-Tao <em>Tang</em></h1>
            <p className="hero-lede">
              I am currently an undergraduate student in the School of Computer Science at Nanjing University and an incoming Ph.D. student at the <a className="inline-link" href="https://en.sjtu.edu.cn/" target="_blank" rel="noreferrer">School of Artificial Intelligence (SAI), Shanghai Jiao Tong University</a>, advised by <a className="inline-link" href="https://mingdachen.github.io/" target="_blank" rel="noreferrer">Prof. Mingda Chen</a>. Previously, I was a research intern in the LAMDA Group under the supervision of <a className="inline-link" href="https://www.lamda.nju.edu.cn/zhoudw/?AspxAutoDetectCookieSupport=1" target="_blank" rel="noreferrer">Prof. Da-Wei Zhou</a>.
            </p>

            <div className="profile-blocks">
              <div className="profile-block"><span>Current interests</span><div className="interest-list"><span>Post-training</span><span>World Models</span><span>Multimodal Large Language Models</span></div></div>
            </div>

            <div className="hero-actions">
              <ArrowLink href="/publications/">View publications</ArrowLink>
              <ArrowLink href="mailto:juntao.tang@smail.nju.edu.cn">Email me</ArrowLink>
              <ArrowLink href="https://github.com/JuntaoTang">GitHub</ArrowLink>
              <ArrowLink href="https://scholar.google.com/citations?user=k7FteWkAAAAJ&hl=zh-TW">Google Scholar</ArrowLink>
            </div>
          </div>
        </section>

        <section className="news-section" id="news" aria-labelledby="news-title">
          <div className="section-heading"><div><h2 id="news-title">News</h2></div></div>
          <div className="news-list" role="region" aria-label="News updates, scroll for earlier news" tabIndex={0}>
            <article className="news-item">
              <time dateTime="2026-11">Nov. 2026</time>
              <p>We open-source <a href="https://github.com/JuntaoTang/MLLM-VisionEncoder-Eval" target="_blank" rel="noreferrer">MLLM-VisionEncoder-Eval</a>, a unified framework for evaluating and selecting vision encoders for MLLMs, and a <a href="https://huggingface.co/336labs/VisionEncoder-to-MLLM-ModelZoo" target="_blank" rel="noreferrer">model zoo</a> accompanying our evaluation of 210 trained MLLMs.</p>
            </article>
            <article className="news-item">
              <time dateTime="2026-09">Sep. 2026</time>
              <p>I am serving as a reviewer for ICLR 2027.</p>
            </article>
            <article className="news-item">
              <time dateTime="2026-08">Aug. 2026</time>
              <p>One paper on continual instruction tuning was accepted to EMNLP 2026.</p>
            </article>
            <article className="news-item">
              <time dateTime="2026-07">Jul. 2026</time>
              <p>One paper on multi-view multi-label classification was accepted to ACM MM 2026.</p>
            </article>
            <article className="news-item">
              <time dateTime="2026-05">May. 2026</time>
              <p>We released <a href="https://github.com/LAMDA-CL/Prism" target="_blank" rel="noreferrer">a toolbox for MCIT</a> (<a href="https://arxiv.org/abs/2605.26110" target="_blank" rel="noreferrer">Technical Report</a>).</p>
            </article>
            <article className="news-item">
              <time dateTime="2026-05">May. 2026</time>
              <p>One paper on continual learning was accepted to ICML 2026.</p>
            </article>
          </div>
        </section>

        <section className="feature-section" aria-labelledby="feature-title">
          <div className="section-heading"><div><h2 id="feature-title">Featured paper</h2></div></div>
          <div className="feature-card">
            <div className="feature-copy">
              <h3>{cram.title}</h3>
              <p className="feature-venue">EMNLP 2026 · Main Conference</p>
            </div>
            <div className="feature-video"><video controls preload="metadata" poster="/assets/papers/cram.png" aria-label="CRAM paper walkthrough"><source src="/assets/media/cram-explainer-v2.mp4" type="video/mp4" />Your browser does not support the video tag.</video></div>
          </div>
        </section>

        <section className="publication-section" id="publications" aria-labelledby="publications-title">
          <div className="section-heading publication-heading"><div><h2 id="publications-title">Selected Publications &amp; preprints</h2></div><a className="arrow-link" href="/publications/">All publications <span aria-hidden="true">↗</span></a></div>
          <div className="paper-list">{papers.map((paper) => <PaperCard key={paper.title} paper={paper} />)}</div>
        </section>

        <section className="awards-section" aria-labelledby="awards-title">
          <div className="section-heading"><div><h2 id="awards-title">Honors</h2></div></div>
          <div className="awards-list">
            <article className="award-item"><time className="award-year" dateTime="2026">2026</time><h3>Insta360 Scholarship</h3></article>
            <article className="award-item"><time className="award-year" dateTime="2025">2025</time><h3>BYD Scholarship</h3></article>
            <article className="award-item"><time className="award-year" dateTime="2024">2024</time><h3>First-Class Scholarship</h3></article>
          </div>
        </section>

      </div>
    </main>
  );
}
