import { describe, expect, test } from 'bun:test';
import { getPublishedPosts, getPublishedPostSummaries } from './mdx';

describe('Markdown content repository', () => {
  test('all published posts have valid, unique metadata', async () => {
    const posts = await getPublishedPosts();
    const slugs = posts.map((post) => post.slug);

    expect(posts.length).toBeGreaterThan(0);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const post of posts) {
      expect(post.title.trim().length).toBeGreaterThan(0);
      expect(Number.isNaN(Date.parse(post.date))).toBe(false);
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.content.length).toBeGreaterThan(0);
    }
  });

  test('listing summaries do not contain article bodies', async () => {
    const summaries = await getPublishedPostSummaries();

    expect(summaries.length).toBeGreaterThan(0);
    expect(summaries.every((post) => !('content' in post))).toBe(true);
  });
});
