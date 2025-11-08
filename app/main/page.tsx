'use client';

import Link from 'next/link';
import { CommandInputSimple } from '@/components/CommandInputSimple';
import { Footer } from '@/components/Footer';
import { mainPageData } from '@/lib/data/main';
import { navigationItems } from '@/lib/data/navigation';
import { TextSegment } from '@/lib/types/content';

export default function Main() {
  const { backLink, hero } = mainPageData;

  // Helper to check if segment is a TextSegment
  const isTextSegment = (segment: string | TextSegment): segment is TextSegment => {
    return typeof segment === 'object' && segment !== null && 'text' in segment;
  };

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-spacing-7 mobile:px-spacing-8 tablet:px-spacing-7 desktop:px-[40px] py-spacing-8">
      {/* Main Container - responsive width */}
      <div className="w-full tablet:max-w-[1200px] flex flex-col flex-1">
        {/* Content wrapper with gap */}
        <div className="flex flex-col gap-spacing-7">
          {/* Back Link */}
          <Link
            href={backLink.href}
            className="text-text-18 text-text-secondary hover:text-link transition-colors"
          >
            {backLink.text}
          </Link>

          {/* Hero Section */}
          <div className="flex flex-col gap-spacing-8">
            {/* Hero Box with Border */}
            <div className="border border-accent rounded-spacing-2 px-spacing-7 tablet:px-spacing-8 py-spacing-6 tablet:py-spacing-7 flex flex-col gap-spacing-6">
              {/* Headline and Description */}
              <div className="flex flex-col gap-spacing-4">
                <h1 className="text-[24px] leading-[1.2] text-accent font-semibold">
                  {hero.headline}
                </h1>
                <p className="text-text-18 leading-[1.4] text-text-secondary max-w-[968px]">
                  {hero.description.map((segment, index) => {
                    if (typeof segment === 'string') {
                      return <span key={`desc-${index}`}>{segment}</span>;
                    }
                    if (isTextSegment(segment)) {
                      // Render highlighted segments in white
                      return (
                        <span key={`desc-${index}`} className="text-text">
                          {segment.text}
                        </span>
                      );
                    }
                    return null;
                  })}
                </p>
              </div>

              {/* Divider Line */}
              <div className="h-[1px] w-full bg-accent opacity-60" />

              {/* Stats */}
              <div className="flex flex-col gap-spacing-4">
                {hero.stats.map((stat, index) => (
                  <p key={index} className="text-text-18 text-text-secondary leading-[1.4]">
                    <span className="text-accent font-semibold leading-[1.2]">{stat.value}</span>
                    {' '}{stat.label}
                  </p>
                ))}
              </div>
            </div>

            {/* YouTube Video Embed */}
            <div className="w-full max-w-[795px] h-[300px] mobile:h-[400px] desktop:h-[447px] rounded-[6.273px] overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dO9pUqYHX_I"
                title="Evgeny Shkuratov - Product Designer Portfolio Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </div>
          </div>

          {/* Command Input Section */}
          <div className="flex flex-col gap-spacing-6 mt-spacing-6">
            <CommandInputSimple navigationItems={navigationItems} />
          </div>
        </div>

        {/* Footer - pushed to bottom */}
        <Footer />
      </div>
    </div>
  );
}
