import type { Metadata } from 'next';
import { ZentyrPreview } from '@/components/ZentyrPreview';
import { getPublishedPostSummaries } from '@/lib/mdx';

export const metadata: Metadata = {
  title: { absolute: 'ZENTYR — Personal Space Preview' },
  description: 'A lighter rebrand preview that keeps the original PUNN HUB personality.',
  robots: { index: false, follow: false },
};

export default async function ZentyrPreviewPage() {
  const posts = await getPublishedPostSummaries().catch((error) => {
    console.error('Failed to fetch Markdown posts for ZENTYR preview:', error);
    return [];
  });

  return <ZentyrPreview posts={posts.filter((post) => !post.parentSlug)} />;
}
