'use client';

import Link from 'next/link';
import { MainLayout } from '@/components/MainLayout';
import { CommandInputSimple } from '@/components/CommandInputSimple';
import { RichText } from '@/components/RichText';
import { mainPageData } from '@/lib/data/main';
import { navigationItems } from '@/lib/data/navigation';
import { TextSegment } from '@/lib/types/content';

export default function Main() {
  const { backLink, hero, footer } = mainPageData;

  // Helper to check if segment is a TextSegment
  const isTextSegment = (segment: string | TextSegment): segment is TextSegment => {
    return typeof segment === 'object' && segment !== null && 'text' in segment;
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-spacing-7 w-full max-w-[1200px] mx-auto px-spacing-8 py-spacing-8">
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
          <div className="border border-accent rounded-spacing-2 px-spacing-8 py-spacing-7 flex flex-col gap-spacing-6">
            {/* Headline and Description */}
            <div className="flex flex-col gap-spacing-2">
              <h1 className="text-title-18 desktop:text-[24px] desktop:leading-[1.2] text-accent font-semibold">
                {hero.headline}
              </h1>
              <p className="text-text-18 text-text-secondary">
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
            <div className="flex flex-col gap-spacing-3">
              {hero.stats.map((stat, index) => (
                <div key={index} className="flex gap-spacing-2 items-center text-text-18">
                  <span className="text-accent font-semibold">{stat.value}</span>
                  <span className="text-text-secondary">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="w-full max-w-[795px] h-[300px] mobile:h-[400px] desktop:h-[447px] rounded-[6px] bg-text-secondary/20 flex items-center justify-center">
            <span className="text-text-secondary text-text-18">Image placeholder</span>
          </div>
        </div>

        {/* Command Input Section */}
        <div className="flex flex-col gap-spacing-6 mt-spacing-6">
          <CommandInputSimple navigationItems={navigationItems} />
        </div>

        {/* Footer */}
        <p className="text-[16px] leading-[1.2] text-text-secondary mt-spacing-4">
          <RichText content={footer} />
        </p>
      </div>
    </MainLayout>
  );
}
