export type BlogPost = { title: string; date: string; href: string; description?: string; selected?: boolean };

// Add published articles here, newest first. Dates use YYYY-MM-DD.
export const posts: BlogPost[] = [
  {
    title: 'From Discrete Visual Tokens to Unified Multimodal Models',
    date: '2026-11-04',
    href: '/blogs/discrete-visual-tokenizers/',
    description: 'Notes on VQ tokenizers, semantic feature reuse, and training one autoregressive model for image understanding and generation.',
    selected: true,
  },
];

// Set selected: false to keep a post in /blogs/ without featuring it on Home.
export const selectedPosts = posts.filter((post) => post.selected !== false);
