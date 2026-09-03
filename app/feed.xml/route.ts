import { getPublishedPosts } from '@/lib/mdx';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = await getPublishedPosts().catch(() => []);

  const rssItems = await Promise.all(
    posts.slice(0, 20).map(async (post) => {
      const description = (post.excerpt || post.content)
        .slice(0, 300)
        .replace(/[#*`\n]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid>${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
      ${post.tags.map((tag: string) => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
      ${post.cover ? `<enclosure url="${escapeXml(post.cover)}" type="image/jpeg" />` : ''}
    </item>`;
    })
  );

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} — Blog</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>th</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems.join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
