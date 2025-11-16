'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CommandInputSimple } from '@/components/CommandInputSimple';
import { Footer } from '@/components/Footer';
import { worksPageNavigationItems } from '@/lib/data/navigation';

export default function BloggingMachineCaseStudy() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-spacing-7 desktop:px-[40px] py-spacing-8 relative">
      {/* Main Container */}
      <div className="w-full desktop:max-w-[1000px] flex flex-col flex-1">
        {/* Content wrapper with gap */}
        <div className="flex flex-col gap-spacing-9 desktop:gap-spacing-11 flex-1">
          {/* Back Link */}
          <Link
            href="/works"
            className="text-[18px] leading-[1.2] text-text-secondary hover:text-link transition-colors"
          >
            &lt; Back to works
          </Link>

          {/* Content Section */}
          <div className="flex flex-col gap-spacing-8 desktop:gap-spacing-11">
            {/* Hero Title Box */}
            <div className="border border-accent px-spacing-8 py-spacing-7 flex flex-col gap-spacing-6">
              <h1 className="text-[24px] leading-[1.2] text-accent font-semibold desktop:w-[723px]">
                0% to 5% Conversion Rate. How I Turned 2,300 Dead Clicks Into 119 Qualified Leads
              </h1>
            </div>

            {/* Andrew Introduction Card */}
            <div className="bg-[#181818] p-spacing-8 rounded-[6px] flex flex-col desktop:flex-row gap-spacing-7 items-center desktop:max-w-[795px]">
              <div className="relative w-[232px] h-[243px] rounded-[6px] flex-shrink-0 overflow-hidden">
                <Image
                  src="/images/bloggingmachine-case/andrew-linkedin.png"
                  alt="Andrew's LinkedIn profile"
                  fill
                  className="object-cover"
                  priority
                  sizes="232px"
                  quality={90}
                />
              </div>
              <p className="text-[18px] leading-[1.5] font-semibold text-text desktop:w-[334px]">
                Andrew found me through LinkedIn. We connected and had similar interests in AI and product building
              </p>
            </div>

            {/* His Message Section */}
            <div className="flex flex-col gap-spacing-6 desktop:max-w-[795px]">
              <h2 className="text-[32px] leading-[1.2] font-semibold text-text w-[409px]">
                His message:
              </h2>
              <div className="relative bg-[rgba(215,119,87,0.15)] backdrop-blur-[10px] px-spacing-7 py-spacing-6 rounded-[16px] desktop:w-fit border border-[rgba(215,119,87,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <p className="text-[18px] leading-[1.4] text-text desktop:w-[366px]">
                  Spending $2 000 on ads, getting clicks, zero conversions. Can you help?
                </p>
              </div>
            </div>

            {/* Discovery Call Section */}
            <div className="flex flex-col gap-spacing-6 desktop:max-w-[795px]">
              <h2 className="text-[32px] leading-[1.2] font-semibold text-text">
                In our discovery call, Andrew shared:
              </h2>
              <div className="flex flex-col gap-spacing-5">
                <p className="text-[16px] leading-[1.4] text-text">
                  → Product works <span className="text-text-secondary">(clients love it)</span>
                </p>
                <p className="text-[16px] leading-[1.4] text-text">
                  → Traffic works <span className="text-text-secondary">(ads perform well)</span>
                </p>
                <p className="text-[16px] leading-[1.4] text-text">
                  → Website doesn't work <span className="text-text-secondary">(obvious disconnect)</span>
                </p>
              </div>
            </div>

            {/* Old Website Screenshot */}
            <div className="relative w-full aspect-[795/984] rounded-[6px] overflow-hidden desktop:max-w-[795px]">
              <Image
                src="/images/bloggingmachine-case/old-site-screenshot.png"
                alt="Old Blogging Machine website"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 1200px) 100vw, 795px"
                quality={85}
              />
            </div>

            {/* Data Rich Section */}
            <div className="flex flex-col gap-spacing-6 desktop:max-w-[795px]">
              <p className="text-[18px] leading-[1.5] font-semibold text-text">
                He was frustrated but data-rich. He'd interviewed customers, tracked everything, knew his numbers. This made my job easier
              </p>
              <div className="flex flex-col gap-[6px]">
                <div className="relative w-full aspect-[795/381] rounded-[6px] overflow-hidden">
                  <Image
                    src="/images/bloggingmachine-case/analytics-graph.png"
                    alt="Analytics graph showing user behavior"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1200px) 100vw, 795px"
                    quality={85}
                  />
                </div>
                <div className="relative w-full aspect-[795/187] rounded-[6px] overflow-hidden">
                  <Image
                    src="/images/bloggingmachine-case/analytics-data.png"
                    alt="Analytics data details"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1200px) 100vw, 795px"
                    quality={85}
                  />
                </div>
              </div>
            </div>

            {/* Research Mode Section */}
            <div className="flex flex-col gap-spacing-7 desktop:gap-spacing-8 desktop:max-w-[795px]">
              <h2 className="text-[32px] leading-[1.2] font-semibold text-text">
                I spent a several days in research mode:
              </h2>

              {/* Mobile: stacked layout */}
              <div className="flex flex-col gap-spacing-5 desktop:hidden">
                {/* Session recordings annotation */}
                <div className="relative bg-[rgba(215,119,87,0.15)] backdrop-blur-[10px] px-spacing-6 py-spacing-5 rounded-[12px] border border-[rgba(215,119,87,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                  <p className="text-[16px] leading-[1.4] text-text">
                    Session recordings and user behavior patterns
                  </p>
                </div>

                {/* Research Video */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Research process demonstration video"
                  className="w-full h-[244px] rounded-[4.747px] object-cover"
                >
                  <source src="/videos/bloggingmachine-case/research.mp4" type="video/mp4" />
                </video>

                {/* Competitors annotation */}
                <div className="relative bg-[rgba(215,119,87,0.15)] backdrop-blur-[10px] px-spacing-6 py-spacing-5 rounded-[12px] border border-[rgba(215,119,87,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                  <p className="text-[16px] leading-[1.4] text-text whitespace-nowrap">
                    Competitors
                  </p>
                </div>

                {/* Andrew's interviews annotation */}
                <div className="relative bg-[rgba(215,119,87,0.15)] backdrop-blur-[10px] px-spacing-6 py-spacing-5 rounded-[12px] border border-[rgba(215,119,87,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                  <p className="text-[16px] leading-[1.4] text-text">
                    Andrew's interviews and reports about user behaviors and pain points
                  </p>
                </div>
              </div>

              {/* Desktop: overlapping layout */}
              <div className="hidden desktop:block relative h-[400px] w-[795px]">
                {/* Research Video - center */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="Research process demonstration video"
                  className="absolute left-[67px] top-[29.48px] w-[629px] h-[353.664px] rounded-[4.747px] object-cover"
                >
                  <source src="/videos/bloggingmachine-case/research.mp4" type="video/mp4" />
                </video>

                {/* Session recordings annotation - top left */}
                <div className="absolute left-0 top-0 bg-[rgba(215,119,87,0.15)] backdrop-blur-[10px] px-spacing-6 py-spacing-5 rounded-[12px] border border-[rgba(215,119,87,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                  <p className="text-[16px] leading-[1.4] text-text w-[189px]">
                    Session recordings and user behavior patterns
                  </p>
                </div>

                {/* Competitors annotation - bottom left */}
                <div className="absolute left-[36.8px] top-[354px] bg-[rgba(215,119,87,0.15)] backdrop-blur-[10px] px-spacing-6 py-spacing-5 rounded-[12px] border border-[rgba(215,119,87,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                  <p className="text-[16px] leading-[1.4] text-text whitespace-nowrap">
                    Competitors
                  </p>
                </div>

                {/* Andrew's interviews annotation - right side */}
                <div className="absolute left-[568px] top-[252px] bg-[rgba(215,119,87,0.15)] backdrop-blur-[10px] px-spacing-6 py-spacing-5 rounded-[12px] border border-[rgba(215,119,87,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                  <p className="text-[16px] leading-[1.4] text-text w-[195px]">
                    Andrew's interviews and reports about user behaviors and pain points
                  </p>
                </div>
              </div>
            </div>

            {/* Research Insights Box */}
            <div className="bg-[#181818] p-spacing-6 desktop:p-spacing-8 rounded-[6px] flex flex-col gap-spacing-6 desktop:gap-spacing-7 desktop:max-w-[795px]">
              <p className="text-[18px] leading-[1.5] font-semibold text-text">
                I've got the ideal customer personas, value proposition, and biggest competitor strategies:
              </p>
              <div className="flex flex-col desktop:flex-row gap-spacing-5">
                {/* Column 1 */}
                <div className="flex flex-col gap-[12px] desktop:flex-1">
                  <div className="bg-background p-spacing-6 rounded-[6px]">
                    <p className="text-[16px] leading-[1.4] text-text-secondary">
                      Startup founders who understand the value of SEO but don't have resources to do research and writing of blog articles
                    </p>
                  </div>
                  <div className="bg-background p-spacing-6 rounded-[6px]">
                    <p className="text-[16px] leading-[1.4] text-text-secondary">
                      AI SEO blog writer cranks out human-like, SEO-optimized articles at scale
                    </p>
                  </div>
                  <div className="bg-background p-spacing-6 rounded-[6px]">
                    <p className="text-[16px] leading-[1.4] text-text-secondary">
                      Sit back, relax, and watch your organic traffic grow 10x. Start now
                    </p>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-[12px] desktop:flex-1">
                  <div className="bg-background p-spacing-6 rounded-[6px]">
                    <p className="text-[16px] leading-[1.4] text-text-secondary">
                      Most early-stage founders know they need SEO but don't have the time to do it right. Blogging Machine handles everything from keyword research to writing and publishing, so you get high-intent traffic with zero effort.
                    </p>
                  </div>
                  <div className="bg-background p-spacing-6 rounded-[6px]">
                    <p className="text-[16px] leading-[1.4] text-text-secondary">
                      More Traffic. Zero Effort. Powered by Your AI Agent
                    </p>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col gap-[12px] desktop:flex-1">
                  <div className="bg-background p-spacing-6 rounded-[6px]">
                    <p className="text-[16px] leading-[1.4] text-text-secondary">
                      Seed-to-Series B founders and scrappy solo marketers who know SEO's worth but don't want to waste headcount, weekends, or runway on it
                    </p>
                  </div>
                  <div className="bg-background p-spacing-6 rounded-[6px]">
                    <p className="text-[16px] leading-[1.4] text-text-secondary">
                      Your AI Agent is like a 5-people content team. Minus the coffee breaks.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Proposal Section */}
            <div className="flex flex-col gap-spacing-6 desktop:max-w-[1000px]">
              <div className="flex flex-col desktop:flex-row desktop:items-end desktop:justify-between gap-spacing-6">
                <h2 className="text-[32px] leading-[1.2] font-semibold text-text">
                  Here's what I proposed and why...
                </h2>
                <a
                  href="https://bloggingmachine.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[18px] leading-[1.4] text-link hover:underline whitespace-nowrap"
                >
                  bloggingmachine.io
                </a>
              </div>
              {/* New Website Video */}
              <div className="relative w-full rounded-[6px] overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-label="New Blogging Machine website showcase video"
                  className="w-full h-auto"
                >
                  <source src="/videos/bloggingmachine-case/bloggingmachine-video.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Implementation Details List */}
              <div className="flex flex-col gap-spacing-5">
                <p className="text-[16px] leading-[1.4] text-text">
                  → Better and clearer typography <span className="text-text-secondary">using ICP language</span>
                </p>
                <p className="text-[16px] leading-[1.4] text-text">
                  → Big clear call to action button
                </p>
                <p className="text-[16px] leading-[1.4] text-text">
                  → Prominent social proof<span className="text-text-secondary"> with familiar Google Analytics interface. Client faces and LinkedIn profiles to build maximum trust</span>
                </p>
                <p className="text-[16px] leading-[1.4] text-text">
                  → Pain-point recognition of our target audience
                </p>
                <p className="text-[16px] leading-[1.4] text-text">
                  → Increased product value by showing the process and behind-the-scenes logic with animated infographics
                </p>
                <p className="text-[16px] leading-[1.4] text-text">
                  → Added more trust and human touch <span className="text-text-secondary">with founder photo and social links in the FAQ section</span>
                </p>
              </div>
            </div>

            {/* Results Message Box */}
            <div className="bg-[#181818] p-spacing-6 desktop:p-spacing-8 rounded-[6px] flex flex-col gap-spacing-6 desktop:max-w-[795px]">
              <h2 className="text-[32px] leading-[1.2] font-semibold text-text">
                Two weeks later, Andrew sent a message:
              </h2>
              <div className="relative bg-[rgba(215,119,87,0.15)] backdrop-blur-[10px] px-spacing-7 py-spacing-6 rounded-[16px] w-fit border border-[rgba(215,119,87,0.3)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <p className="text-[18px] leading-[1.4] text-text desktop:w-[462px]">
                  Dude. We got 119 conversions. Two trial activations. This is insane! 🤯📈
                </p>
              </div>
            </div>

            {/* Outcome Summary */}
            <div className="flex flex-col gap-spacing-6">
              <p className="text-[24px] leading-[1.3] font-semibold text-text-secondary desktop:w-[795px]">
                He spent the <span className="text-text">same amount of money and got the same amount of traffic, but this time with a new website</span> fully designed and built by me, he got <span className="text-text">119 conversions compared to 0</span> the previous time
              </p>
              <p className="text-[24px] leading-[1.3] font-semibold text-text-secondary desktop:w-[795px]">
                But now we have the next problem...
              </p>
              <p className="text-[24px] leading-[1.3] font-semibold text-text-secondary desktop:w-[795px]">
                <span className="text-text">Only 2 trial activations</span> (1.6% conversion) from these 119 conversions
              </p>
              <p className="text-[24px] leading-[1.3] font-semibold text-text-secondary desktop:w-[795px]">
                And you'll see how I <span className="text-text">solve this problem in the next case study coming soon</span>
              </p>
            </div>

            {/* Previous Case Preview */}
            <div className="flex flex-col gap-spacing-6 desktop:max-w-[795px]">
              <h2 className="text-[32px] leading-[1.3] font-semibold text-accent whitespace-nowrap">
                View the previous case
              </h2>
              <Link href="/works/b2b-messenger" className="group flex flex-col gap-[12px]">
                <div className="relative w-full aspect-[795/454] rounded-[6px] overflow-hidden">
                  <Image
                    src="/images/bloggingmachine-case/previous-case-preview.png"
                    alt="B2B Messenger case study preview"
                    fill
                    className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                    sizes="(max-width: 1200px) 100vw, 795px"
                    quality={85}
                  />
                </div>
                <p className="text-[20px] leading-[1.4] text-text">
                  Making corporate communication <span className="font-normal text-text-secondary">fast, secure, and delightful for</span> 100K+ people daily
                </p>
              </Link>
            </div>
          </div>

          {/* Navigation Section with Command Input */}
          <CommandInputSimple navigationItems={worksPageNavigationItems} dropdownBehavior="relative" />
        </div>

        {/* Footer */}
        <div className="mt-spacing-8">
          <Footer />
        </div>
      </div>

      {/* Old version of the Site annotation - desktop only */}
      <div className="hidden desktop:block absolute left-[1015px] top-[948px] w-[221px] h-[81.701px]">
        <div className="relative size-full">
          {/* Label */}
          <p className="absolute left-[26px] top-[-1px] text-[18px] leading-[1.5] font-semibold text-accent whitespace-nowrap">
            Old version of the Site
          </p>
          {/* Arrow */}
          <div className="absolute left-0 top-[34px] flex items-center justify-center">
            <div className="rotate-[110.957deg] scale-y-[-100%]">
              <Image
                src="/images/bloggingmachine-case/arrow.svg"
                alt=""
                width={48.464}
                height={31.991}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
