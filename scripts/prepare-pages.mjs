import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

// Vinext's trailing-slash redirects interrupt prerendering of nested routes.
// Export without redirects, then provide directory indexes for GitHub Pages.
const source = new URL('../dist/client/publications.html', import.meta.url);
const directory = new URL('../dist/client/publications/', import.meta.url);
if (!existsSync(source)) throw new Error('The Publications page was not statically exported.');
mkdirSync(directory, { recursive: true });
copyFileSync(source, new URL('index.html', directory));
