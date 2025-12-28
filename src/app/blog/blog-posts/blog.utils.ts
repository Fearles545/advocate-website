import { Blog, blogs } from './index';

/**
 * Find a blog post by its slug.
 */
export function findBlog(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

/**
 * Get multiple blog posts by their slugs.
 * Filters out any slugs that don't match existing blogs.
 */
export function getBlogsBySlug(slugs: string[]): Blog[] {
  return slugs
    .map((slug) => findBlog(slug))
    .filter((blog): blog is Blog => blog !== undefined);
}
