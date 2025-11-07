import { HeaderData } from '@/lib/types/content';

interface HeaderProps {
  data: HeaderData;
}

export function Header({ data }: HeaderProps) {
  return (
    <header className="flex items-center gap-spacing-2 px-spacing-8 py-spacing-4 mb-spacing-6">
      <div className="flex items-center gap-spacing-2">
        <span className="text-body text-text">{data.name}</span>
        <span className="text-body text-text-secondary">{data.version}</span>
      </div>
    </header>
  );
}
