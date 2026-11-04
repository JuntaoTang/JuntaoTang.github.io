import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

// Vinext's trailing-slash redirects interrupt prerendering of nested routes.
// Export without redirects, then provide directory indexes for GitHub Pages.
for (const route of ['publications', 'blogs', 'honors', 'blogs/discrete-visual-tokenizers', 'blogs/self-supervised-post-training', 'blogs/visual-pretraining-and-language-learning']) {
  const source = new URL(`../dist/client/${route}.html`, import.meta.url);
  const directory = new URL(`../dist/client/${route}/`, import.meta.url);
  if (!existsSync(source)) throw new Error(`The ${route} page was not statically exported.`);
  mkdirSync(directory, { recursive: true });
  copyFileSync(source, new URL('index.html', directory));
}
