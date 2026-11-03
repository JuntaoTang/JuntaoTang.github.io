import type { Metadata } from 'next';
import { papers } from '../papers';

export const metadata: Metadata = { title: 'Publications | Jun-Tao Tang' };
export const dynamic = 'force-static';

export default function Publications() {
  return (
    <main className="site-shell">
      <div className="grain" aria-hidden="true" />
      <nav className="top-nav" aria-label="Primary navigation">
        <a className="wordmark" href="/" aria-label="Jun-Tao Tang home"><span className="wordmark-mark">JT</span><span>Jun-Tao Tang</span></a>
        <div className="nav-links"><a href="/">Home</a><a href="/#news">News</a><a href="/publications/" aria-current="page">Publications</a></div>
      </nav>
      <div className="page-wrap publications-page">
        <header className="publications-header">
          <h1>Publications</h1>
          <p className="equal-legend"><sup>*</sup> Equal contribution</p>
        </header>
        <div className="publication-text-list">
          {papers.map((paper) => (
            <article className="publication-text-item" key={paper.title}>
              <h2>{paper.title}</h2>
              <p className="publication-text-authors">
                {paper.authors.map((author, index) => (
                  <span key={author.name}>{index > 0 && ', '}<span className={author.me ? 'author-me' : undefined}>{author.name}{author.equal && <sup>*</sup>}</span></span>
                ))}
              </p>
              <p className="publication-text-venue">
                {paper.preprint ? <>Preprint · <strong>{paper.venueShort}</strong></> : <>{paper.venueFull} <strong>{paper.venueShort}{paper.label === 'EMNLP' && ' · Main Conference'}</strong></>}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
