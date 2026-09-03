import { Post } from './types';
import {
  absoluteUrl,
  AUTHOR_NAME,
  AUTHOR_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from './site';

// Generate JSON-LD structured data for blog posts
export const generateArticleSchema = (post: Post, url: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    inLanguage: 'th-TH',
    headline: post.title,
    image: absoluteUrl(post.cover || '/opengraph-image'),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon-512.png'),
      },
    },
    description: post.excerpt || post.content.substring(0, 160) || `บทความจาก ${SITE_NAME}`,
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
    inLanguage: 'th-TH',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
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
