import { getPublishedPostSummaries } from '@/lib/mdx';
import { ZentyrHome } from '@/components/ZentyrHome';

export const revalidate = 3600; // ISR: Revalidate every 1 hour (production)

export default async function Home() {
  const posts = await getPublishedPostSummaries().catch((err) => {
    console.error('Failed to fetch Markdown posts:', err);
    return [];
  });

  // Filter out sub-articles (episodes) so they don't show up on the homepage
  const mainPosts = posts.filter((post) => !post.parentSlug);

  return <ZentyrHome posts={mainPosts} />;
}
