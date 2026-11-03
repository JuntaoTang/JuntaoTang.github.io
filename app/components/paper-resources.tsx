import type { Paper } from '../papers';

export default function PaperResources({ paper }: { paper: Paper }) {
  const resources = [
    { label: 'Paper', href: paper.link },
    { label: 'Code', href: paper.code },
    { label: 'Hugging Face', href: paper.huggingFace },
    { label: 'Media', href: paper.media },
    { label: 'Slides', href: paper.slides },
  ].filter((resource) => resource.href);

  if (resources.length === 0) return null;

  return (
    <div className="paper-resources" aria-label={`Resources for ${paper.title}`}>
      {resources.map(({ label, href }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={`${label}: ${paper.title}`}>
          <span aria-hidden="true">[</span>{label}<span aria-hidden="true">]</span>
        </a>
      ))}
    </div>
  );
}
