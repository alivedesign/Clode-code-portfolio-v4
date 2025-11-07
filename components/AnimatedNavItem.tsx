'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { NavigationItem } from '@/lib/types/navigation';

interface AnimatedNavItemProps {
  item: NavigationItem;
  index: number;
}

export function AnimatedNavItem({ item, index }: AnimatedNavItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
    >
      <Link
        href={item.route}
        className="grid grid-cols-[136px_1fr] lg:grid-cols-[300px_1fr] gap-spacing-8 lg:gap-spacing-12 hover:opacity-80 transition-opacity"
      >
        <motion.span
          className="text-body text-text"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          {item.command}
        </motion.span>
        <span className="text-body text-text-secondary">{item.description}</span>
      </Link>
    </motion.div>
  );
}
