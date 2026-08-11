// Shared types for the application

export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  date: string;
  cover: string | null;
  excerpt?: string;
  isParent?: boolean;
  parentSlug?: string;
  episodeNumber?: number;
  coverPosition?: string;
}

export interface Post extends PostSummary {
  content: string;
}
