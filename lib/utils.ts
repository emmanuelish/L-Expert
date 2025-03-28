import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Article } from "@/lib/data/articles"

// Add the import for featuredArticle
import { featuredArticle } from "@/lib/data/articles"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}

/**
 * Finds an article by its slug
 */
export function getArticleBySlug(articles: Article[], slug: string): Article | undefined {
  // First check if the slug matches the featured article
  if (slugify(featuredArticle.title) === slug) {
    return featuredArticle
  }
  // Then check the regular articles
  return articles.find((article) => slugify(article.title) === slug)
}

