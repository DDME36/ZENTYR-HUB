import { getPublishedPostSummaries } from '@/lib/mdx';
import { Footer } from '@/components/Footer';
import { BlogList } from '@/components/BlogList';
import { BackToTop } from '@/components/BackToTop';
import { PostSummary } from '@/lib/types';
import { Metadata } from 'next';

export const revalidate = 3600; // ขณะ production ใช้ 1 ชั่วโมง

export const metadata: Metadata = {
  title: 'บทความ',
  description:
    'แชร์ความรู้และประสบการณ์ด้านเทคโนโลยี | Next.js, React, TypeScript, Web Development',
  alternates: {
    canonical: 'https://punn.site/blog',
  },
  openGraph: {
    title: 'บทความ - PUNN HUB',
    description: 'แชร์ความรู้และประสบการณ์ด้านเทคโนโลยี',
    type: 'website',
    url: 'https://punn.site/blog',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'PUNN HUB Logo',
      },
    ],
  },
};

export default async function BlogPage() {
  let posts: PostSummary[] = [];
  let error = null;

  try {
    posts = await getPublishedPostSummaries();
  } catch (e) {
    console.error(e);
    error = 'ไม่สามารถอ่านไฟล์บทความได้ กรุณาตรวจสอบ frontmatter และไฟล์ Markdown';
  }

  return (
    <div className="min-h-screen bg-transparent pt-20 sm:pt-24">
      <BlogList posts={posts} error={error} />
      <Footer />
      <BackToTop />
    </div>
  );
}
