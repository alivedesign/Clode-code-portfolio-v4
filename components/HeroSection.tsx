import { Avatar } from './Avatar';
import { HeroData } from '@/lib/types/content';

interface HeroSectionProps {
  data: HeroData;
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <div className="flex flex-col gap-spacing-7 px-spacing-8 py-spacing-7 lg:px-spacing-8 lg:py-[52px]">
      <h1 className="text-body text-text">{data.greeting}</h1>

      <div className="flex justify-center">
        <Avatar emoji={data.avatarEmoji} />
      </div>

      <p className="text-body text-text-secondary whitespace-pre-line">
        {data.tagline}
      </p>
    </div>
  );
}
