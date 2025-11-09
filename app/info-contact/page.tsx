'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CommandInputSimple } from '@/components/CommandInputSimple';
import { Footer } from '@/components/Footer';
import { RichText } from '@/components/RichText';
import { infoContactPageNavigationItems } from '@/lib/data/navigation';

export default function InfoContact() {
  const backLink = {
    href: '/',
    text: '< Back to main terminal',
  };

  const heroContent = {
    title: 'The Person Behind the Products',
    subtitle: [
      'I value honesty, courage, and ambition to build truly inspiring products for good. ',
      { text: 'Environmental projects, healthcare, edtech, and anything that helps make the world a better place', color: 'white' },
      ' will always have higher priority for me!',
    ],
  };

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-spacing-7 mobile:px-spacing-9 tablet:px-[32px] desktop:px-[40px] py-spacing-8">
      {/* Main Container - responsive width */}
      <div className="w-full tablet:max-w-[1200px] flex flex-col flex-1">
        {/* Content wrapper with gap */}
        <div className="flex flex-col gap-spacing-8 flex-1">
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
                {heroContent.title}
              </h1>
              <p className="text-text-18 leading-[1.4] w-full desktop:w-[1000px]">
                <RichText
                  content={heroContent.subtitle}
                  className="text-text-secondary [&_span]:text-inherit [&_span.text-white]:text-white"
                />
              </p>
            </div>

            {/* Paragraph 1 */}
            <p className="text-text-18 leading-[1.4] w-full desktop:w-[640px]">
              <RichText
                content={[
                  "I'm the ideal partners for ",
                  { text: 'startups building tech for good, AI innovations, and impactful real-world solutions', color: 'white' },
                ]}
                className="text-text-secondary [&_span]:text-inherit [&_span.text-white]:text-white"
              />
            </p>

            {/* Image Grid 1 - Two images */}
            <div className="flex flex-col tablet:flex-row gap-spacing-6 w-full max-w-[795px]">
              <div className="relative w-full tablet:flex-1 aspect-[389/358] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/info-contact/thumbnail-2.png"
                  alt="Behind the scenes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 389px"
                  quality={95}
                />
              </div>
              <div className="relative w-full tablet:flex-1 aspect-[389/358] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/info-contact/thumbnail-3.png"
                  alt="Behind the scenes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 389px"
                  quality={95}
                />
              </div>
            </div>

            {/* Paragraph 2 */}
            <p className="text-text-18 leading-[1.4] w-full desktop:w-[640px]">
              <RichText
                content={[
                  'As a ',
                  { text: "designer who's built and shipped my own products,", color: 'white' },
                  ' I understand the pressure to move fast without wasting time on the wrong thing. From discovery to high-fidelity UI product in production, ',
                  { text: 'I focus on what users need, not what sounds cool', color: 'white' },
                ]}
                className="text-text-secondary [&_span]:text-inherit [&_span.text-white]:text-white"
              />
            </p>

            {/* Paragraph 3 */}
            <p className="text-text-18 leading-[1.4] w-full desktop:w-[640px]">
              <RichText
                content={[
                  'Outside of work, ',
                  { text: 'I like to stay active. I train 5–6 times a week.', color: 'white' },
                  ' It helps me stay productive and optimistic. Recently, I also ',
                  { text: 'discovered snowboarding and completely fell in love with it.', color: 'white' },
                  ' I even bought my own board and gear and took a trip to the mountains in a neighbouring country during my first season',
                ]}
                className="text-text-secondary [&_span]:text-inherit [&_span.text-white]:text-white"
              />
            </p>

            {/* Image Grid 2 - Two images */}
            <div className="flex flex-col tablet:flex-row gap-spacing-6 w-full max-w-[795px]">
              <div className="relative w-full tablet:flex-1 aspect-[389/302] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/info-contact/thumbnail-4.png"
                  alt="Behind the scenes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 389px"
                  quality={95}
                />
              </div>
              <div className="relative w-full tablet:flex-1 aspect-[389/302] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/info-contact/thumbnail-5.png"
                  alt="Behind the scenes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 389px"
                  quality={95}
                />
              </div>
            </div>

            {/* Paragraph 4 */}
            <p className="text-text-18 leading-[1.4] w-full desktop:w-[640px]">
              <RichText
                content={[
                  "As you've probably noticed, ",
                  { text: 'I love creating content too.', color: 'white' },
                  ' I share my experience and stories on ',
                  { text: 'YouTube', link: 'https://www.youtube.com/@EvgenyShkuratovDesigner' },
                  ' and ',
                  { text: 'LinkedIn', link: 'https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/' },
                ]}
                className="text-text-secondary [&_span]:text-inherit [&_span.text-white]:text-white"
              />
            </p>

            {/* Paragraph 5 - with emoticon */}
            <div className="text-text-18 leading-[1.4] w-full desktop:w-[640px] text-text-secondary">
              <p className="mb-spacing-4">
                <RichText
                  content={[
                    'I help founders and builders like me ',
                    { text: 'grow their products and have some fun along the way.', color: 'white' },
                  ]}
                  className="text-text-secondary [&_span]:text-inherit [&_span.text-white]:text-white"
                />
              </p>
              <p>That&apos;s what drives most of what I do (＾▽＾)</p>
            </div>
          </div>

          {/* Navigation Section with Command Input */}
          <CommandInputSimple navigationItems={infoContactPageNavigationItems} dropdownBehavior="relative" />
        </div>

        {/* Footer - pushed to bottom with spacing */}
        <div className="mt-spacing-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
