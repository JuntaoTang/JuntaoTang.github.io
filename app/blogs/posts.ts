export type BlogPost = { title: string; date: string; href: string; description?: string; selected?: boolean };

// Add published articles here, newest first. Dates use YYYY-MM-DD.
export const posts: BlogPost[] = [];

// Set selected: false to keep a post in /blogs/ without featuring it on Home.
export const selectedPosts = posts.filter((post) => post.selected !== false);
