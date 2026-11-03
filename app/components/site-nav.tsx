export default function SiteNav({ active }: { active: 'home' | 'publications' | 'blogs' }) {
  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <a className="wordmark" href="/">Jun-Tao Tang</a>
      <div className="nav-links">
        <a href="/" aria-current={active === 'home' ? 'page' : undefined}>Home</a>
        <a href="/publications/" aria-current={active === 'publications' ? 'page' : undefined}>Publications</a>
        <a href="/blogs/" aria-current={active === 'blogs' ? 'page' : undefined}>Blogs</a>
      </div>
    </nav>
  );
}
