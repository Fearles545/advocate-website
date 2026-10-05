import type { PrevNextItem } from './prev-next-navigator.component';

interface Neighbours<T> {
  previous: T | null;
  next: T | null;
}

/**
 * Picks the items around the current one in list order. When a category is
 * selected and the current item belongs to it, the neighbours come from that
 * category; otherwise (no category, or an item outside it) from the full list.
 */
function pickNeighbours<
  T extends { slug: string; categories?: readonly string[] },
>(
  items: readonly T[],
  currentSlug: string,
  selectedCategory: string | null
): Neighbours<T> {
  const current = items.find((item) => item.slug === currentSlug);
  if (!current) {
    return { previous: null, next: null };
  }

  const inSelectedCategory = (item: T) =>
    selectedCategory !== null &&
    (item.categories?.includes(selectedCategory) ?? false);
  const scope = inSelectedCategory(current)
    ? items.filter(inSelectedCategory)
    : items;
  const index = scope.indexOf(current);

  return {
    previous: scope[index - 1] ?? null,
    next: scope[index + 1] ?? null,
  };
}

/**
 * The navigator's previous and next items for the current item: its
 * neighbours by the rule of pickNeighbours, each titled with its title and
 * linked with the router commands `linkTo` builds for it.
 */
export function pickPrevNextItems<
  T extends { slug: string; title: string; categories?: readonly string[] },
>(
  items: readonly T[],
  currentSlug: string,
  selectedCategory: string | null,
  linkTo: (item: T) => PrevNextItem['link']
): Neighbours<PrevNextItem> {
  const { previous, next } = pickNeighbours(
    items,
    currentSlug,
    selectedCategory
  );
  const toItem = (item: T | null): PrevNextItem | null =>
    item && { link: linkTo(item), title: item.title };

  return { previous: toItem(previous), next: toItem(next) };
}
