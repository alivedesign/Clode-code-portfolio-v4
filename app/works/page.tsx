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
        <div className="flex flex-col gap-spacing-9">
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
                className="flex flex-col gap-[12px] w-full desktop:max-w-[795px] desktop:cursor-none"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
                onMouseMove={handleMouseMove}
              >
                {/* Project Image */}
                <div className="relative w-full aspect-[795/454]">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover opacity-50 desktop:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 795px, 795px"
                    quality={95}
                    priority={project.id === 1}
                  />
                  {/* Coming soon overlay for mobile/tablet */}
                  <div className="absolute inset-0 flex items-center justify-center desktop:hidden">
                    <div className="bg-background rounded-[4px] px-spacing-4 py-spacing-2">
                      <p className="text-text-16 text-text leading-[1.4] whitespace-nowrap">
                        Coming soon..
                      </p>
                    </div>
                  </div>
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
