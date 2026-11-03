export default function BlogKeywords({ keywords }: { keywords?: string[] }) {
  if (!keywords?.length) return null;
  return <span className="blog-keywords" aria-label="Keywords">{keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</span>;
}
