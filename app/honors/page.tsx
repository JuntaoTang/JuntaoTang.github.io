import type { Metadata } from 'next';
import SiteNav from '../components/site-nav';

export const metadata: Metadata = { title: 'Honors | Jun-Tao Tang' };
export const dynamic = 'force-static';

export default function Honors() {
  return (
    <main className="site-shell">
      <SiteNav active="honors" />
      <div className="page-wrap inner-page">
        <header className="publications-header"><h1>Honors</h1></header>
        <div className="awards-list honors-list">
          <article className="award-item"><time className="award-year" dateTime="2026">2026</time><h3>Insta360 Scholarship</h3></article>
          <article className="award-item"><time className="award-year" dateTime="2025">2025</time><h3>BYD Scholarship</h3></article>
          <article className="award-item"><time className="award-year" dateTime="2024">2024</time><h3>First-Class Scholarship</h3></article>
        </div>
      </div>
    </main>
  );
}
