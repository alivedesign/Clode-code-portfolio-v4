import { NavigationItem } from '@/lib/types/navigation';

// Navigation items for homepage
export const homepageNavigationItems: NavigationItem[] = [
  {
    command: '/ Main',
    route: '/main',
    description: '/ Hero Section: "The Story of How We\'ll Work Together"',
  },
  {
    command: '/ Works',
    route: '/works',
    description: '/ Case Studies: "Real Projects, Real Results"',
  },
  {
    command: '/ My_Products',
    route: '/my-products',
    description: '/ My-Products: "What I Build When No One\'s Watching"',
  },
  {
    command: '/ Info_Contact',
    route: '/info-contact',
    description: '/ Info-Contact: "The Person Behind the Products"',
  },
];

// Navigation items for /main page (and other pages)
export const navigationItems: NavigationItem[] = [
  {
    command: '/ Works',
    route: '/works',
    description: '/ Case Studies: "Real Projects, Real Results"',
  },
  {
    command: '/ My_Products',
    route: '/my-products',
    description: '/ My-Products: "What I Build When No One\'s Watching"',
  },
  {
    command: '/ Info_Contact',
    route: '/info-contact',
    description: '/ Info-Contact: "The Person Behind the Products"',
  },
  {
    command: '/ Clear',
    route: '/',
    description: '/ Start terminal page',
  },
];
