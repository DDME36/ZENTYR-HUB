import { Post } from './types';

// Generate JSON-LD structured data for blog posts
export const generateArticleSchema = (post: Post, url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.cover || 'https://punn.site/icon-512.png',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Satayu Pongpan',
      url: 'https://satayupongpan.site',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PUNN HUB',
      logo: {
        '@type': 'ImageObject',
        url: 'https://punn.site/icon-512.png',
      },
    },
    description: post.excerpt || post.content.substring(0, 160) || 'บทความจาก PUNN HUB',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
  };
};

// Generate JSON-LD for website
export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PUNN HUB',
    url: 'https://punn.site',
    description: 'แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ สำหรับการพัฒนาเว็บไซต์และเทคโนโลยี',
    author: {
      '@type': 'Person',
      name: 'Satayu Pongpan',
      url: 'https://satayupongpan.site',
    },
  };
};

// Generate JSON-LD for breadcrumbs
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
