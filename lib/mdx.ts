import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unstable_cache } from 'next/cache';
import { Post, PostSummary } from './types';

const postsDirectory = path.join(process.cwd(), 'content/posts');

const getPostData = (relativeFilePath: string): Post | null => {
  const slug = path.basename(relativeFilePath, '.md');
  const fullPath = path.join(postsDirectory, relativeFilePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const {
    title,
    date,
    tags,
    cover,
    excerpt,
    draft,
    published,
    isParent,
    parentSlug,
    episodeNumber,
    coverPosition,
  } = matterResult.data;

  // A draft must never be published just because the file exists in the repository.
  if (draft === true || published === false) return null;
  if (typeof title !== 'string' || title.trim() === '') {
    throw new Error(`Missing required frontmatter "title" in ${relativeFilePath}`);
  }
  if (typeof date !== 'string' || Number.isNaN(Date.parse(date))) {
    throw new Error(`Missing or invalid frontmatter "date" in ${relativeFilePath}`);
  }
  if (tags !== undefined && !Array.isArray(tags)) {
    throw new Error(`Frontmatter "tags" must be an array in ${relativeFilePath}`);
  }

  return {
    id: slug,
    slug,
    title: title.trim(),
    date,
    tags: (tags || []).map(String),
    cover: typeof cover === 'string' ? cover : null,
    excerpt: typeof excerpt === 'string' ? excerpt.trim() : undefined,
    content: matterResult.content.trim(),
    isParent: Boolean(isParent),
    parentSlug: typeof parentSlug === 'string' ? parentSlug : undefined,
    episodeNumber: typeof episodeNumber === 'number' ? episodeNumber : undefined,
    coverPosition: typeof coverPosition === 'string' ? coverPosition : 'center',
  };
};

// Recursive helper to get all markdown files
const getAllMarkdownFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;

  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
};

const readPublishedPosts = (): Post[] => {
  const allFilePaths = getAllMarkdownFiles(postsDirectory);
  const posts = allFilePaths
    .map((fullPath) => path.relative(postsDirectory, fullPath))
    .map(getPostData)
    .filter((post): post is Post => post !== null);

  const duplicateSlugs = posts
    .map((post) => post.slug)
    .filter((slug, index, slugs) => slugs.indexOf(slug) !== index);

  if (duplicateSlugs.length > 0) {
    throw new Error(`Duplicate post slugs: ${Array.from(new Set(duplicateSlugs)).join(', ')}`);
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date));
};

const getCachedPosts = unstable_cache(async () => readPublishedPosts(), ['md-posts-v2'], {
  revalidate: 3600,
});

export const getPublishedPosts = async (): Promise<Post[]> =>
  process.env.NODE_ENV === 'production' ? getCachedPosts() : readPublishedPosts();

export const getPublishedPostSummaries = async (): Promise<PostSummary[]> => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags,
    cover: post.cover,
    excerpt: post.excerpt,
    isParent: post.isParent,
    parentSlug: post.parentSlug,
    episodeNumber: post.episodeNumber,
    coverPosition: post.coverPosition,
  }));
};

// Get a post by its slug (Searches all posts since slugs are flat)
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const allPosts = await getPublishedPosts();
  return allPosts.find((post) => post.slug === slug) || null;
};

// Episodes
export const getEpisodesByParentSlug = async (parentSlug: string): Promise<PostSummary[]> => {
  try {
    const allPosts = await getPublishedPostSummaries();

    const episodes = allPosts
      .filter((post) => post.parentSlug === parentSlug)
      .sort((a, b) => {
        const epA = a.episodeNumber || 0;
        const epB = b.episodeNumber || 0;
        return epA - epB;
      });

    return episodes;
  } catch (error) {
    console.error('Error fetching episodes from local md:', error);
    return [];
  }
};
