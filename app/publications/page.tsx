import type { Metadata } from 'next';
import { papers } from '../papers';
import SiteNav from '../components/site-nav';
import PaperResources from '../components/paper-resources';

export const metadata: Metadata = { title: 'Publications | Jun-Tao Tang' };
export const dynamic = 'force-static';

export default function Publications() {
  return (
    <main className="site-shell">
      <SiteNav active="publications" />
      <div className="page-wrap publications-page">
        <header className="publications-header">
          <h1>Publications</h1>
          <p className="equal-legend"><sup>*</sup> Equal contribution</p>
        </header>
        {[{ title: 'Conference Papers', preprint: false }, { title: 'Preprints', preprint: true }].map((group) => (
          <section className="publication-group" key={group.title}>
            <h2 className="publication-group-title">{group.title}</h2>
            <div className="publication-text-list">
          {papers.filter((paper) => Boolean(paper.preprint) === group.preprint).map((paper) => (
            <article className="publication-text-item" key={paper.title}>
              <h3>{paper.link ? <a href={paper.link} target="_blank" rel="noreferrer">{paper.title}</a> : paper.title}</h3>
              <p className="publication-text-authors">
                {paper.authors.map((author, index) => (
                  <span key={author.name}>{index > 0 && ', '}<span className={author.me ? 'author-me' : undefined}>{author.name}{author.equal && <sup>*</sup>}</span></span>
                ))}
              </p>
              <p className="publication-text-venue">
                {paper.preprint ? <>Preprint · <strong>{paper.venueShort}</strong></> : <>{paper.venueFull} <strong>{paper.venueShort}{paper.label === 'EMNLP' && ' · Main Conference'}</strong></>}
              </p>
              <PaperResources paper={paper} />
            </article>
          ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
