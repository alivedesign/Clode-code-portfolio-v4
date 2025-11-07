interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ orientation = 'horizontal', className = '' }: DividerProps) {
  const baseClasses = 'bg-text-secondary';
  const orientationClasses =
    orientation === 'horizontal' ? 'w-full h-[1px]' : 'w-[1px] h-full';

  return <div className={`${baseClasses} ${orientationClasses} ${className}`} />;
}
