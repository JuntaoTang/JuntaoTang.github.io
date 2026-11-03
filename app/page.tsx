import type { ReactNode } from 'react';

import { papers, type Author, type Paper } from './papers';
import SiteNav from './components/site-nav';
import PaperResources from './components/paper-resources';
import { posts } from './blogs/posts';

function AuthorLine({ authors, dark = false, showEqual = false }: { authors: Author[]; dark?: boolean; showEqual?: boolean }) {
  return (
    <p className={dark ? 'authors authors-dark' : 'authors'}>
      {authors.map((author, index) => (
        <span key={author.name}>
          {index > 0 && ', '}
          <span className={author.me ? 'author-me' : undefined}>{author.name}{showEqual && author.equal && <sup>*</sup>}</span>
        </span>
      ))}
      {showEqual && <span className="contribution-note"> (* equal contribution)</span>}
    </p>
  );
}

function VenueLine({ paper, dark = false }: { paper: Paper; dark?: boolean }) {
  return (
    <p className={dark ? 'venue-line venue-line-dark' : 'venue-line'}>
      <em>{paper.venueFull} </em>
      <strong><em>{paper.venueShort}</em></strong>
      {paper.label === 'EMNLP' && <span> · Main Conference</span>}
    </p>
  );
}

function PaperCard({ paper }: { paper: Paper }) {
  return (
    <article className="paper-card">
      <div className="paper-media">
        <span className="paper-badge">{paper.label}</span>
        <img src={paper.image} alt={`Overview of ${paper.title}`} loading="lazy" />
      </div>
      <div className="paper-body">
        <h3>{paper.link ? <a href={paper.link} target="_blank" rel="noreferrer">{paper.title}</a> : paper.title}</h3>
        <AuthorLine authors={paper.authors} showEqual={paper.showEqual} />
        <VenueLine paper={paper} />
        <PaperResources paper={paper} />
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
              <img src="/assets/avatar-v3.png" alt="Portrait of Jun-Tao Tang" />
            </div>
          </div>

          <div className="hero-copy">
            <h1>Jun-Tao <em>Tang</em></h1>
            <p className="hero-lede">
              I am currently an undergraduate student in the School of Computer Science at <a href="https://www.nju.edu.cn/" target="_blank" rel="noreferrer">Nanjing University</a> and an incoming Ph.D. student at the School of Artificial Intelligence (SAI), <a href="https://en.sjtu.edu.cn/" target="_blank" rel="noreferrer">Shanghai Jiao Tong University</a>, advised by <a href="https://mingdachen.github.io/" target="_blank" rel="noreferrer">Prof. Mingda Chen</a>. Previously, I was a research intern in the <a href="https://www.lamda.nju.edu.cn/CH.MainPage.ashx" target="_blank" rel="noreferrer">LAMDA</a> Group under the supervision of <a href="https://www.lamda.nju.edu.cn/zhoudw/?AspxAutoDetectCookieSupport=1" target="_blank" rel="noreferrer">Prof. Da-Wei Zhou</a>.
            </p>

            <div className="profile-blocks">
              <div className="profile-block"><span>Current interests</span><div className="interest-list"><span>Post-training</span><span>Agentic RL</span><span>World Models (WAM)</span><span>MLLMs</span></div></div>
            </div>

            <div className="hero-actions">
              <ArrowLink href="/publications/">View publications</ArrowLink>
              <span className="profile-email">juntao.tang@smail.nju.edu.cn</span>
              <ArrowLink href="https://github.com/JuntaoTang">GitHub</ArrowLink>
              <ArrowLink href="https://scholar.google.com/citations?user=k7FteWkAAAAJ&hl=zh-TW">Google Scholar</ArrowLink>
            </div>
          </div>
        </section>

        <div className="updates-grid">
        <div className="updates-sidebar">
        <section className="blogs-section" aria-labelledby="latest-blogs-title">
          <div className="section-heading"><h2 id="latest-blogs-title">Selected Blogs</h2><a className="arrow-link" href="/blogs/">All posts <span aria-hidden="true">↗</span></a></div>
          <div className="latest-blogs-list" role="region" aria-label="Latest blog posts, scroll for more" tabIndex={0}>
            {posts.length === 0 ? <p className="blog-empty">No posts yet.</p> : posts.map((post) => (
              <article className="blog-item" key={post.href}>
                <time dateTime={post.date}>{post.date}</time>
                <div><h3><a href={post.href}>{post.title}</a></h3>{post.description && <p>{post.description}</p>}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="news-section" id="news" aria-labelledby="news-title">
          <div className="section-heading"><div><h2 id="news-title">News</h2></div></div>
          <div className="news-list" role="region" aria-label="News updates, scroll for earlier news" tabIndex={0}>
            <article className="news-item">
              <time dateTime="2026-10">[Oct. 2026]</time>
              <p>We open-source <a href="https://github.com/JuntaoTang/MLLM-VisionEncoder-Eval" target="_blank" rel="noreferrer">MLLM-VisionEncoder-Eval</a>, a unified framework for evaluating and selecting vision encoders for MLLMs, and release <a href="https://huggingface.co/336labs/VisionEncoder-to-MLLM-ModelZoo" target="_blank" rel="noreferrer">ckpts</a> from <strong>more than 200 MLLMs</strong> we trained (<a href="https://arxiv.org/abs/2610.05413" target="_blank" rel="noreferrer">Technical Report</a>).</p>
            </article>
            <article className="news-item">
              <time dateTime="2026-09">[Sep. 2026]</time>
              <p>I am serving as a reviewer for ICLR 2027.</p>
            </article>
            <article className="news-item">
              <time dateTime="2026-08">[Aug. 2026]</time>
              <p>One paper on continual instruction tuning was accepted to EMNLP 2026.</p>
            </article>
            <article className="news-item">
              <time dateTime="2026-07">[Jul. 2026]</time>
              <p>One paper on multi-view multi-label classification was accepted to ACM MM 2026.</p>
            </article>
            <article className="news-item">
              <time dateTime="2026-05">[May. 2026]</time>
              <p>We released <a href="https://github.com/LAMDA-CL/Prism" target="_blank" rel="noreferrer">a toolbox for MCIT</a> (<a href="https://arxiv.org/abs/2605.26110" target="_blank" rel="noreferrer">Technical Report</a>).</p>
            </article>
            <article className="news-item">
              <time dateTime="2026-05">[May. 2026]</time>
              <p>One paper on continual learning was accepted to ICML 2026.</p>
            </article>
          </div>
        </section>
        </div>

        <section className="feature-section" aria-labelledby="feature-title">
          <div className="section-heading"><div><h2 id="feature-title">Featured paper</h2></div></div>
          <div className="feature-card">
            <div className="feature-copy">
              <h3>{cram.title}</h3>
              <p className="feature-venue">EMNLP 2026 · Main Conference <span className="first-author">First author</span></p>
              <p className="feature-summary">We study how a multimodal model can learn new tasks without forgetting old ones or continually adding more parameters. CRAM reuses experts with relevant skills and adds a small amount of capacity only when a new task needs it.</p>
            </div>
            <div className="feature-video"><video controls playsInline preload="none" poster="/assets/media/cram-cover-emnlp.png" aria-label="CRAM paper walkthrough"><source src="/assets/media/cram-explainer-v2.mp4" type="video/mp4" />Your browser does not support the video tag.</video></div>
          </div>
        </section>
        </div>

        <section className="publication-section" id="publications" aria-labelledby="publications-title">
          <div className="section-heading publication-heading"><div><h2 id="publications-title">Selected Publications &amp; preprints</h2></div><a className="arrow-link" href="/publications/">All publications <span aria-hidden="true">↗</span></a></div>
          <div className="paper-list">{papers.map((paper) => <PaperCard key={paper.title} paper={paper} />)}</div>
        </section>

      </div>
    </main>
  );
}
