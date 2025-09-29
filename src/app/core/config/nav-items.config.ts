/**
 * Navigation items configuration
 * Defines the structure for main navigation menu items
 */
export interface NavItem {
  /** Display text for the navigation link */
  label: string;
  /** Router path for navigation */
  route: string;
  /** Whether this route requires exact matching for active state */
  exact?: boolean;
}

/**
 * Main navigation configuration
 * Used to generate the primary navigation menu
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Головна',
    route: '/',
    exact: true,
  },
  {
    label: 'Про мене',
    route: 'about-me',
  },
  {
    label: 'Послуги',
    route: 'services',
  },
  {
    label: 'Документи',
    route: 'documents',
  },
  {
    label: 'Блог',
    route: 'blog',
  },
  {
    label: 'Контакти',
    route: 'contacts',
  },
];
