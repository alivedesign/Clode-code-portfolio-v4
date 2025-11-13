'use client';

import Link from 'next/link';
import { CommandInputSimple } from '@/components/CommandInputSimple';
import { Footer } from '@/components/Footer';
import { mainPageData } from '@/lib/data/main';
import { navigationItems } from '@/lib/data/navigation';
import { TextSegment } from '@/lib/types/content';

export default function Main() {
  const { backLink, hero, workExperience } = mainPageData;

  // Helper to check if segment is a TextSegment
  const isTextSegment = (segment: string | TextSegment): segment is TextSegment => {
    return typeof segment === 'object' && segment !== null && 'text' in segment;
  };

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-spacing-7 mobile:px-spacing-8 tablet:px-spacing-7 desktop:px-[40px] py-spacing-8">
      {/* Main Container - responsive width */}
      <div className="w-full tablet:max-w-[1200px] flex flex-col flex-1">
        {/* Content wrapper with gap */}
        <div className="flex flex-col gap-spacing-7 flex-1">
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

            {/* Work Experience */}
            {workExperience.map((job, index) => (
              <p key={index} className="text-text-18 text-text-secondary leading-[1.4]">
                {job.period} | {job.role}{' '}
                <span className="text-text">{job.company}</span>
              </p>
            ))}

            {/* Video Coming Soon Placeholder */}
            <div className="w-full max-w-[795px] h-[300px] mobile:h-[400px] desktop:h-[447px] flex flex-col items-center justify-center gap-spacing-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              <p className="text-text-16 text-accent leading-[1.4]">
                Video coming soon..
              </p>
              <p className="text-title-18 text-text leading-[1.5] text-center w-full max-w-[509px] px-spacing-4">
                Product Design for Founders. 4 Fantasy locations Where Products Die (And How to Win)
              </p>
            </div>
          </div>

          {/* Command Input Section */}
          <div className="flex flex-col gap-spacing-6 mt-spacing-6">
            <CommandInputSimple navigationItems={navigationItems} dropdownBehavior="relative" />
          </div>
        </div>

        {/* Footer - pushed to bottom with spacing */}
        <div className="mt-spacing-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
