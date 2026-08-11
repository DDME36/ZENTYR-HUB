import { getPublishedPostSummaries } from '@/lib/mdx';
import { EnhancedBentoGrid } from '@/components/EnhancedBentoGrid';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Footer } from '@/components/Footer';
import { TechStackMarquee } from '@/components/TechStackMarquee';

export const revalidate = 3600; // ISR: Revalidate every 1 hour (production)

export default async function Home() {
  const posts = await getPublishedPostSummaries().catch((err) => {
    console.error('Failed to fetch Markdown posts:', err);
    return [];
  });

  // Filter out sub-articles (episodes) so they don't show up on the homepage
  const mainPosts = posts.filter((post) => !post.parentSlug);

  return (
    <div className="min-h-screen bg-transparent pt-20 sm:pt-24">
      <Hero />
      <Marquee />
      <section id="projects" className="scroll-mt-24 sm:scroll-mt-28">
        <EnhancedBentoGrid posts={mainPosts} />
      </section>
      <TechStackMarquee />
      <Footer />
    </div>
  );
}
