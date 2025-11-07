import { NavigationItem } from '@/lib/types/navigation';
import { AnimatedNavItem } from './AnimatedNavItem';

interface NavigationMenuProps {
  items: NavigationItem[];
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  return (
    <nav className="flex flex-col gap-spacing-7 px-spacing-6 lg:gap-spacing-8">
      {items.map((item, index) => (
        <AnimatedNavItem key={item.route} item={item} index={index} />
      ))}
    </nav>
  );
}
