'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CommandInputSimple } from '@/components/CommandInputSimple';
import { Footer } from '@/components/Footer';
import { worksPageData } from '@/lib/data/works';
import { worksPageNavigationItems } from '@/lib/data/navigation';

export default function Works() {
  const { backLink, hero, projects } = worksPageData;
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-spacing-7 mobile:px-spacing-9 tablet:px-[32px] desktop:px-[40px] py-spacing-8 relative">
      {/* Main Container - responsive width */}
      <div className="w-full tablet:max-w-[1200px] flex flex-col flex-1">
        {/* Content wrapper with gap */}
        <div className="flex flex-col gap-spacing-9 flex-1">
          {/* Back Link */}
          <Link
            href={backLink.href}
            className="text-text-18 text-text-secondary hover:text-link transition-colors"
          >
            {backLink.text}
          </Link>

          {/* Content Section */}
          <div className="flex flex-col gap-spacing-8">
            {/* Hero Box with Border */}
            <div className="border border-accent px-spacing-8 py-spacing-7 flex flex-col justify-between min-h-[77px]">
              <h1 className="text-[24px] leading-[1.2] text-accent font-semibold">
                {hero.title}
              </h1>
            </div>

            {/* Projects List */}
            {projects.map((project) => (
              <div
                key={project.id}
                className={`flex flex-col gap-[12px] w-full desktop:max-w-[795px] ${!project.isNDA ? 'desktop:cursor-none' : ''}`}
                onMouseEnter={() => !project.isNDA && setShowCursor(true)}
                onMouseLeave={() => !project.isNDA && setShowCursor(false)}
                onMouseMove={!project.isNDA ? handleMouseMove : undefined}
              >
                {/* Project Image */}
                <div className="relative w-full aspect-[795/454] rounded-[6px] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className={`object-cover ${project.isNDA ? 'opacity-50' : 'opacity-50 desktop:opacity-100'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 795px, 795px"
                    quality={95}
                    priority={project.id === 1}
                  />
                  {/* NDA overlay */}
                  {project.isNDA && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-background rounded-[4px] px-spacing-4 py-spacing-3 flex items-center gap-spacing-3">
                        <div className="w-[24px] h-[24px] flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.25 8.25H3.75C3.33579 8.25 3 8.58579 3 9V15C3 15.4142 3.33579 15.75 3.75 15.75H14.25C14.6642 15.75 15 15.4142 15 15V9C15 8.58579 14.6642 8.25 14.25 8.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.25 8.25V5.25C5.25 4.45435 5.56607 3.69129 6.12868 3.12868C6.69129 2.56607 7.45435 2.25 8.25 2.25H9.75C10.5456 2.25 11.3087 2.56607 11.8713 3.12868C12.4339 3.69129 12.75 4.45435 12.75 5.25V8.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-text-16 text-text leading-[1.4] whitespace-nowrap">
                          NDA. Available by Request
                        </p>
                      </div>
                    </div>
                  )}
                  {/* Coming soon overlay for mobile/tablet (non-NDA projects) */}
                  {!project.isNDA && (
                    <div className="absolute inset-0 flex items-center justify-center desktop:hidden">
                      <div className="bg-background rounded-[4px] px-spacing-4 py-spacing-2">
                        <p className="text-text-16 text-text leading-[1.4] whitespace-nowrap">
                          Coming soon..
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Description */}
                <p className="text-text-18 leading-[1.4]">
                  {project.description.map((segment, index) => {
                    if (typeof segment === 'string') {
                      return <span key={index} className="text-text-secondary">{segment}</span>;
                    }
                    if (typeof segment === 'object' && 'text' in segment) {
                      // Bold text should be white (text), non-bold should be text-secondary
                      const colorClass = segment.bold ? 'text-text' : 'text-text-secondary';
                      return <span key={index} className={colorClass}>{segment.text}</span>;
                    }
                    return null;
                  })}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Section with Command Input */}
          <CommandInputSimple navigationItems={worksPageNavigationItems} dropdownBehavior="relative" />
        </div>

        {/* Footer - pushed to bottom with spacing */}
        <div className="mt-spacing-8">
          <Footer />
        </div>
      </div>

      {/* Custom Cursor - Desktop only */}
      {showCursor && (
        <div
          className="fixed pointer-events-none z-50 bg-background rounded-[4px] px-spacing-4 py-spacing-2 hidden desktop:block"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <p className="text-text-16 text-text leading-[1.4] whitespace-nowrap">
            Coming soon..
          </p>
        </div>
      )}
    </div>
  );
}
