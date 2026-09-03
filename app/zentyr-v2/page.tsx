import type { Metadata } from 'next';
import { ZentyrV2 } from '@/components/ZentyrV2';
import { getPublishedPostSummaries } from '@/lib/mdx';

export const metadata: Metadata = {
  title: { absolute: 'ZENTYR // Digital Atelier (Concept v2)' },
  description: 'Next-Gen concept showcase for ZENTYR: Experimental Software & Digital Laboratory.',
  robots: { index: false, follow: false },
};

export default async function ZentyrV2Page() {
  const posts = await getPublishedPostSummaries().catch((error) => {
    console.error('Failed to fetch Markdown posts for ZENTYR v2:', error);
    return [];
  });

  return <ZentyrV2 posts={posts.filter((post) => !post.parentSlug)} />;
}
