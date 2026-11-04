import { Children, type ReactNode } from 'react';

export default function NewsList({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  return (
    <div className="news-list" role="region" aria-label="News updates, scroll for earlier news" tabIndex={0}>
      <div className="news-preview">{items.slice(0, 2)}</div>
      <div className="news-archive">{items.slice(2)}</div>
    </div>
  );
}
