'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CommandInputSimple } from '@/components/CommandInputSimple';
import { Footer } from '@/components/Footer';
import { RichText } from '@/components/RichText';
import { myProductsPageData } from '@/lib/data/my-products';
import { myProductsPageNavigationItems } from '@/lib/data/navigation';

export default function MyProducts() {
  const { backLink, hero, projects } = myProductsPageData;

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-spacing-7 mobile:px-spacing-9 tablet:px-[32px] desktop:px-[40px] py-spacing-8 relative">
      {/* Main Container - responsive width */}
      <div className="w-full tablet:max-w-[1200px] flex flex-col flex-1">
        {/* Content wrapper with gap */}
        <div className="flex flex-col gap-spacing-8">
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
            <div className="border border-accent px-spacing-8 py-spacing-7 flex flex-col gap-spacing-6">
              <h1 className="text-[24px] leading-[1.2] text-accent font-semibold">
                {hero.title}
              </h1>
              <p className="text-text-18 leading-[1.4] w-full desktop:w-[763px]">
                <RichText
                  content={hero.subtitle}
                  className="text-text-secondary [&_.font-semibold]:text-text"
                />
              </p>
            </div>

            {/* Projects List */}
            {projects.map((project) => {
              // Featured project (Lullami)
              if (project.isFeatured) {
                return (
                  <div key={project.id} className="flex flex-col gap-spacing-4 w-full desktop:max-w-[795px]">
                    {/* Project Image */}
                    <div className="relative w-full aspect-[793/329] rounded-spacing-4 overflow-hidden">
                      <Image
                        src={project.image!}
                        alt={project.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 795px, 795px"
                        quality={95}
                        priority
                      />
                    </div>

                    {/* Project Title and Button */}
                    <div className="flex flex-col tablet:flex-row gap-spacing-4 tablet:gap-0 tablet:items-center tablet:justify-between w-full">
                      <p className="text-text-18 leading-[1.2] text-text">
                        {project.name}
                      </p>
                      <a
                        href={project.appStoreLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#9f5c46] hover:bg-[#8a503d] transition-colors rounded-[4px] px-spacing-7 py-spacing-4 text-center"
                      >
                        <span className="text-text-16 text-text font-medium whitespace-nowrap">
                          Download in AppStore
                        </span>
                      </a>
                    </div>
                  </div>
                );
              }

              // Regular projects
              return (
                <p key={project.id} className="text-text-18 leading-[1.2] w-full">
                  {project.year && (
                    <>
                      <span className="text-text-secondary">{project.year}. </span>
                    </>
                  )}
                  <span className="text-text">{project.name}</span>
                  {project.status && (
                    <>
                      <span className="text-text-secondary"> | {project.status}</span>
                    </>
                  )}
                  {project.emoji && (
                    <>
                      <span className="text-text-secondary"> {project.emoji}</span>
                    </>
                  )}
                </p>
              );
            })}
          </div>

          {/* Navigation Section with Command Input */}
          <CommandInputSimple navigationItems={myProductsPageNavigationItems} dropdownBehavior="relative" />
        </div>

        {/* Footer - pushed to bottom */}
        <Footer />
      </div>
    </div>
  );
}
