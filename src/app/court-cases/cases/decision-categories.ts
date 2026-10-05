/**
 * Decision categories
 *
 * The six topic groups the advocate assigns to every court decision, in
 * display order (list filter, «Категорії» row). A taxonomy separate from the
 * blog's article categories.
 */
export const DECISION_CATEGORIES = [
  { slug: 'assignment', label: 'Призначення пенсії', icon: 'how_to_reg' },
  { slug: 'recalculation', label: 'Перерахунок пенсії', icon: 'calculate' },
  { slug: 'service-credit', label: 'Зарахування стажу', icon: 'work_history' },
  { slug: 'indexation', label: 'Індексація пенсії', icon: 'trending_up' },
  { slug: 'preferential', label: 'Пільгові пенсії', icon: 'engineering' },
  { slug: 'other', label: 'Інші пенсійні спори', icon: 'balance' },
] as const;

export type DecisionCategory = (typeof DECISION_CATEGORIES)[number];

export type DecisionCategorySlug = DecisionCategory['slug'];

/**
 * «Інші пенсійні спори» always accompanies a main category, so a court
 * decision lists a main category first.
 */
export type MainDecisionCategorySlug = Exclude<DecisionCategorySlug, 'other'>;

export function isDecisionCategorySlug(
  value: string
): value is DecisionCategorySlug {
  return DECISION_CATEGORIES.some((category) => category.slug === value);
}
