import { BentoGrid } from './BentoGrid';
import { PostSummary } from '@/lib/types';

interface EnhancedBentoGridProps {
  posts: PostSummary[];
}

/**
 * EnhancedBentoGrid - Wrapper for BentoGrid.
 * Entrance animations are now handled by individual Card components
 * for better performance and to prevent flickering.
 */
export const EnhancedBentoGrid = ({ posts }: EnhancedBentoGridProps) => {
  return (
    <div className="relative w-full">
      <BentoGrid posts={posts} />
    </div>
  );
};
