import { getPostBySlug, getPublishedPostSummaries, getEpisodesByParentSlug } from '@/lib/mdx';
import { Card } from '@/components/Card';
import { Footer } from '@/components/Footer';
import { BlogPostContent } from '@/components/BlogPostContent';
import { ShareButtons } from '@/components/ShareButtons';
import { TableOfContents } from '@/components/TableOfContents';
import { BackToTop } from '@/components/BackToTop';
import { EpisodeList } from '@/components/EpisodeList';
import { AnimatedBreadcrumb } from '@/components/AnimatedBreadcrumb';
import { ReadingProgressBar } from '@/components/ReadingProgressBar';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/structured-data';
import Link from 'next/link';
import Image from 'next/image';
import { PostSummary } from '@/lib/types';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Tag, Clock, User } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { absoluteUrl, SITE_NAME, SITE_URL } from '@/lib/site';

export const revalidate = 3600; // ขณะ production ใช้ 1 ชั่วโมง
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPublishedPostSummaries().catch(() => []);
  return posts.map((post: PostSummary) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const content = post.content;
  const description =
    post.excerpt ||
    content
      .slice(0, 160)
      .replace(/[#*`\n]/g, ' ')
      .trim() ||
    `อ่านบทความ "${post.title}" ใน ZENTYR`;

  return {
    title: post.title,
    description: description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: description,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: SITE_NAME,
      images: post.cover
        ? [
            {
              url: absoluteUrl(post.cover),
              alt: post.title,
            },
          ]
        : [
            {
              url: absoluteUrl('/zentyr-og.png'),
              width: 1200,
              height: 630,
              alt: 'ZENTYR — Creative Tech Lab',
              type: 'image/png',
            },
          ],
      locale: 'th_TH',
      type: 'article',
      publishedTime: post.date,
      authors: ['Satayu Pongpan'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: post.cover ? [absoluteUrl(post.cover)] : [absoluteUrl('/zentyr-og.png')],
    },
    other: {
      'theme-color': '#fb7185',
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) {
    notFound();
  }

  // If this is a parent post (series), show episode list
  if (post.isParent) {
    const episodes = await getEpisodesByParentSlug(slug).catch(() => []);

    return (
      <div className="min-h-screen bg-transparent pt-20">
        <EpisodeList episodes={episodes} seriesTitle={post.title} />
        <Footer />
        <BackToTop />
      </div>
    );
  }

  // Regular post - show content
  const content = post.content;
  const allPosts = await getPublishedPostSummaries().catch(() => []);

  // If this is an episode, get parent post info
  let parentPost = null;
  if (post.parentSlug) {
    parentPost = await getPostBySlug(post.parentSlug).catch(() => null);
  }

  // หาบทความที่เกี่ยวข้องตาม tags (ไม่รวมบทความย่อย)
  const relatedPosts = allPosts
    .filter((p: PostSummary) => p.id !== post.id && !p.parentSlug)
    .map((p: PostSummary) => {
      // นับจำนวน tags ที่ตรงกัน
      const matchingTags = p.tags.filter((tag: string) => post.tags.includes(tag)).length;
      return { ...p, matchingTags };
    })
    .sort(
      (a: PostSummary & { matchingTags: number }, b: PostSummary & { matchingTags: number }) => {
        // เรียงตามจำนวน tags ที่ตรงกัน แล้วตามวันที่
        if (b.matchingTags !== a.matchingTags) {
          return b.matchingTags - a.matchingTags;
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    )
    .slice(0, 3);

  // Calculate reading time (more accurate)
  const wordsPerMinute = 200;
  const wordCount = content ? content.split(/\s+/).length : 0;
  const readingTime = Math.max(Math.ceil(wordCount / wordsPerMinute), 1); // Minimum 1 minute

  // Generate structured data
  const articleSchema = generateArticleSchema(post, `${SITE_URL}/blog/${slug}`);
  const breadcrumbItems = [
    { name: 'หน้าแรก', url: SITE_URL },
    { name: 'บทความ', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${slug}` },
  ];
  if (parentPost) {
    breadcrumbItems.splice(2, 0, {
      name: parentPost.title,
      url: `${SITE_URL}/blog/${parentPost.slug}`,
    });
  }
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="min-h-screen bg-transparent pt-20">
      <ReadingProgressBar />
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-12">
        {/* Animated Breadcrumb (Integration) */}
        <div className="mb-8 hidden sm:block">
          <AnimatedBreadcrumb
            items={[
              { label: 'บทความ', href: '/blog' },
              ...(parentPost
                ? [{ label: parentPost.title, href: `/blog/${parentPost.slug}` }]
                : []),
              { label: post.title, href: '#' },
            ]}
          />
        </div>

        {/* Table of Contents */}
        <TableOfContents content={content} />

        {/* Hero Cover Image - Panoramic Ratio */}
        {post.cover && (
          <div className="group relative mb-8 h-52 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl sm:mb-12 sm:h-72 sm:rounded-3xl sm:shadow-2xl md:h-96 lg:h-[450px]">
            <Image
              src={post.cover}
              alt={`ภาพปกบทความ: ${post.title}`}
              fill
              className="object-cover transition-transform duration-700 lg:group-hover:scale-105"
              style={{ objectPosition: post.coverPosition || 'center' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
              aria-hidden="true"
            ></div>
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div
                className="flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2"
                role="list"
                aria-label="หมวดหมู่บทความ"
              >
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    role="listitem"
                    className="flex items-center gap-1 rounded-full border border-white/30 bg-black/25 px-2.5 py-1 text-[12px] font-semibold leading-4 text-white backdrop-blur-sm sm:bg-white/20 sm:px-3 sm:py-1.5 sm:text-[13px]"
                  >
                    <Tag size={12} aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Article Header */}
        <header className="mx-auto mb-10 max-w-4xl text-center sm:mb-16">
          {/* Tags (if no cover image) */}
          {!post.cover && (
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full border border-emerald-200 bg-gradient-to-r from-emerald-100 to-blue-100 px-4 py-2 text-[13px] font-semibold leading-5 text-emerald-700"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title - Responsive Typography */}
          <h1 className="mb-6 text-balance bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text font-display text-[30px] font-bold leading-[1.25] tracking-[-0.02em] text-gray-900 dark:from-white dark:via-zinc-100 dark:to-zinc-300 dark:text-white sm:mb-8 sm:text-[40px] lg:text-[48px]">
            {post.title}
          </h1>

          {/* Enhanced Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-2xl border border-gray-100 bg-white/95 p-4 text-[14px] font-normal leading-5 text-gray-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 dark:shadow-none sm:gap-x-6 sm:p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-100 to-purple-200 dark:from-zinc-800 dark:to-zinc-700">
                <User size={14} className="text-purple-600 dark:text-cyan-400" />
              </div>
              <span className="font-bold text-gray-800 dark:text-white">ZENTYR</span>
            </div>
            <div className="hidden h-6 w-px bg-gray-200 dark:bg-zinc-800 md:block"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-zinc-800 dark:to-zinc-700">
                <Calendar size={14} className="text-blue-600 dark:text-cyan-400" />
              </div>
              <span suppressHydrationWarning className="text-center sm:text-left">
                {new Date(post.date).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="hidden h-6 w-px bg-gray-200 dark:bg-zinc-800 md:block"></div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200 dark:from-zinc-800 dark:to-zinc-700">
                <Clock size={14} className="text-purple-600 dark:text-purple-400" />
              </div>
              <span>อ่าน {readingTime} นาที</span>
            </div>
          </div>
        </header>

        {/* Enhanced Article Content */}
        <BlogPostContent content={content} />

        {/* Enhanced Share Section */}
        <ShareButtons url={`${SITE_URL}/blog/${slug}`} />

        {/* Back to Series Button (if this is an episode) */}
        {parentPost && (
          <div className="mt-12 text-center">
            <Link
              href={`/blog/${parentPost.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 px-6 py-3 font-semibold text-purple-600 shadow-md backdrop-blur-md transition-all hover:border-purple-300 hover:from-purple-100 hover:to-blue-100 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-cyan-400"
            >
              <BookOpen size={18} />
              ดูตอนอื่นๆ ใน &quot;{parentPost.title}&quot;
            </Link>
          </div>
        )}
      </article>

      {/* Enhanced Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-100/50 bg-white/80 py-10 dark:border-zinc-800/80 dark:bg-zinc-950/80 sm:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-3 font-display text-[28px] font-bold leading-[1.3] tracking-[-0.015em] text-gray-800 dark:text-white sm:text-[32px]">
                บทความที่เกี่ยวข้อง
              </h2>
              <p className="text-gray-600 dark:text-zinc-400">บทความอื่นๆ ที่คุณอาจสนใจ</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p: PostSummary & { matchingTags: number }) => (
                <Card
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex h-full transform flex-col !border-gray-100 bg-white p-0 transition-all duration-500 hover:-translate-y-2 hover:border-purple-200 hover:shadow-xl dark:!border-zinc-800 dark:!bg-zinc-900/90 dark:hover:!border-zinc-700"
                >
                  <div
                    className="relative h-48 w-full shrink-0 overflow-hidden rounded-t-2xl bg-gray-100 sm:h-52"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                    }}
                  >
                    {p.cover ? (
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y5ZjlmOSIvPjwvc3ZnPg=="
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-100 via-purple-100 to-blue-100 text-rose-400">
                        <BookOpen size={32} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex min-h-[28px] flex-wrap gap-1.5">
                      {p.tags.slice(0, 2).map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-rose-100 bg-rose-50 px-2.5 py-1 text-[12px] font-medium leading-4 text-rose-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mb-2 line-clamp-2 min-h-[3.25rem] font-display text-[18px] font-semibold leading-[1.45] tracking-[-0.01em] transition-colors group-hover:text-rose-500 sm:text-[20px]">
                      {p.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-2 pt-2 text-[12px] leading-4 text-gray-500">
                      <Calendar size={12} />
                      <span suppressHydrationWarning>
                        {new Date(p.date).toLocaleDateString('th-TH', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex transform items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 px-8 py-3.5 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgba(217,70,239,0.35)] dark:from-white dark:via-zinc-100 dark:to-zinc-200 dark:text-zinc-950 dark:shadow-[0_8px_25px_rgba(255,255,255,0.15)]"
              >
                ดูบทความทั้งหมด <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Navigation */}
      <div className="bg-transparent py-8 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Link
            href="/blog"
            className="inline-flex transform items-center gap-3 rounded-full border border-gray-200 bg-white/90 px-8 py-3.5 font-semibold text-gray-700 shadow-md backdrop-blur-md transition-all hover:scale-105 hover:border-purple-200 hover:text-purple-600 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:border-zinc-700 dark:hover:text-cyan-400"
          >
            <ArrowLeft size={18} /> กลับไปหน้าบทความรวม
          </Link>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
}
