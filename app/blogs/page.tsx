import type { Metadata } from 'next';
import SiteNav from '../components/site-nav';
import { formatBlogDate, posts } from './posts';
import BlogKeywords from '../components/blog-keywords';

export const metadata: Metadata = { title: 'Blogs | Jun-Tao Tang' };
export const dynamic = 'force-static';

export default function Blogs() {
  return (
    <main className="site-shell">
      <SiteNav active="blogs" />
      <div className="page-wrap inner-page">
        <header className="publications-header"><h1>Blogs</h1></header>
        {posts.length === 0 ? <p className="blog-empty">No posts yet.</p> : (
          <div className="blog-list">
            {posts.map((post) => (
              <article className="blog-item" key={post.href}>
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                <div><BlogKeywords keywords={post.keywords} /><h2><a href={post.href}>{post.title}</a></h2>{post.description && <p>{post.description}</p>}</div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
