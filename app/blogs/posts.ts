export type BlogPost = { title: string; date: string; href: string; description?: string; keywords?: string[]; selected?: boolean };

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T00:00:00Z`));
}

export const discreteVisualTokenizersPost: BlogPost = {
  title: 'From Discrete Visual Tokens to Unified Multimodal Models',
  date: '2026-07-05',
  href: '/blogs/discrete-visual-tokenizers/',
  description: 'Notes on VQ tokenizers, semantic feature reuse, and training one autoregressive model for image understanding and generation.',
  keywords: ['visual-tokenization', 'unified-mllms', 'autoregressive-generation'],
  selected: true,
};

export const selfSupervisedPostTrainingPost: BlogPost = {
  title: 'Self-Supervised Post-Training for Stronger MLLMs',
  date: '2026-11-04',
  href: '/blogs/self-supervised-post-training/',
  description: 'A review of visual puzzles and self-supervised rewards for multimodal post-training, covering transfer, model scale, and reasoning behavior.',
  keywords: ['self-supervised-learning', 'multimodal-rl', 'visual-reasoning'],
  selected: true,
};

// Add published articles here, newest first. Dates use YYYY-MM-DD.
export const posts: BlogPost[] = [
  selfSupervisedPostTrainingPost,
  discreteVisualTokenizersPost,
];

// Set selected: false to keep a post in /blogs/ without featuring it on Home.
export const selectedPosts = posts.filter((post) => post.selected !== false);
