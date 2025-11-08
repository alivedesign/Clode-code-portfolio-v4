'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CommandInputSimple } from '@/components/CommandInputSimple';
import { Footer } from '@/components/Footer';
import { RichText } from '@/components/RichText';
import { worksPageData } from '@/lib/data/works';
import { worksPageNavigationItems } from '@/lib/data/navigation';

export default function Works() {
  const { backLink, hero, projects } = worksPageData;

  return (
    <div className="bg-background min-h-screen flex flex-col items-center justify-center px-0 py-spacing-8">
      {/* Main Container - fixed 1200px width */}
      <div className="w-full max-w-[1200px] mobile:px-spacing-6 tablet:px-0 flex flex-col gap-spacing-8">
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
            <div key={project.id} className="flex flex-col gap-[12px] w-full max-w-[795px]">
              {/* Project Image */}
              <div className="relative w-full aspect-[795/454] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 795px"
                  priority={project.id === 1}
                />
              </div>

              {/* Project Description */}
              <p className="text-text-18 leading-[1.4]">
                <RichText
                  content={project.description}
                  className="text-text-secondary"
                />
              </p>
            </div>
          ))}
        </div>

        {/* Command Input Section */}
        <div className="flex flex-col gap-spacing-6">
          <CommandInputSimple navigationItems={worksPageNavigationItems} />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
