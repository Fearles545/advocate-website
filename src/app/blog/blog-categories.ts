/**
 * Blog Category System
 *
 * 8 categories covering Ukrainian pension law topics.
 * Categories 1, 7, 8 are reserved for future content.
 */

export const BLOG_CATEGORIES = {
  general: {
    slug: 'general',
    label: 'Загальні пенсійні питання',
    icon: 'help_outline',
  },
  'pension-by-age': {
    slug: 'pension-by-age',
    label: 'Пенсія за віком',
    icon: 'cake',
  },
  preferential: {
    slug: 'preferential',
    label: 'Пільгова пенсія (Списки №1 і №2)',
    shortLabel: 'Пільгова пенсія',
    icon: 'engineering',
  },
  'early-retirement': {
    slug: 'early-retirement',
    label: 'Дострокова пенсія',
    icon: 'schedule',
  },
  'service-years': {
    slug: 'service-years',
    label: 'Пенсія за вислугу років',
    icon: 'workspace_premium',
  },
  'service-record': {
    slug: 'service-record',
    label: 'Стаж, індексація та перерахунок',
    shortLabel: 'Стаж та перерахунок',
    icon: 'calculate',
  },
  disability: {
    slug: 'disability',
    label: 'Пенсія по інвалідності',
    icon: 'accessible',
  },
  survivor: {
    slug: 'survivor',
    label: "Пенсія у зв'язку з втратою годувальника",
    shortLabel: 'Втрата годувальника',
    icon: 'family_restroom',
  },
} as const;

export type BlogCategorySlug = keyof typeof BLOG_CATEGORIES;

export interface BlogCategory {
  slug: BlogCategorySlug;
  label: string;
  shortLabel?: string;
  icon: string;
}

/**
 * Get category by slug with type safety
 */
export function getCategoryBySlug(
  slug: BlogCategorySlug
): BlogCategory | undefined {
  return BLOG_CATEGORIES[slug];
}

/**
 * Get all active categories (those with posts)
 */
export const ACTIVE_CATEGORIES: BlogCategorySlug[] = [
  'general',
  'pension-by-age',
  'preferential',
  'early-retirement',
  'service-years',
  'service-record',
];

/**
 * Get display label for a category (uses shortLabel if available)
 */
export function getCategoryDisplayLabel(slug: BlogCategorySlug): string {
  const category = BLOG_CATEGORIES[slug];
  return 'shortLabel' in category ? category.shortLabel : category.label;
}
