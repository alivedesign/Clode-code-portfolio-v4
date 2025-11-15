'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { CommandInputSimple } from '@/components/CommandInputSimple';
import { Footer } from '@/components/Footer';
import { worksPageNavigationItems } from '@/lib/data/navigation';

export default function B2BMessengerCaseStudy() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-spacing-7 mobile:px-spacing-9 tablet:px-[32px] desktop:px-[40px] py-spacing-8">
      {/* Main Container - responsive width */}
      <div className="w-full desktop:max-w-[1000px] flex flex-col flex-1">
        {/* Content wrapper with gap */}
        <div className="flex flex-col gap-spacing-9 desktop:gap-spacing-8 flex-1">
          {/* Back Link */}
          <Link
            href="/works"
            className="text-text-18 text-text-secondary hover:text-link transition-colors"
          >
            &lt; Back to works
          </Link>

          {/* Hero Section */}
          <div className="border border-accent px-spacing-8 py-spacing-7 flex flex-col justify-between min-h-[106px]">
            <p className="text-[24px] leading-[1.2] desktop:text-[28px] desktop:leading-[1.2] text-accent font-semibold">
              I helped 100,000+ teams communicate 50% more efficiently by designing conversational experiences that feel human, not robotic.
            </p>
          </div>

          {/* NDA Section */}
          <div className="desktop:max-w-[795px] flex flex-col gap-spacing-6">
            <p className="text-text-16 leading-[1.5] text-text font-semibold">
              Working under NDA, I&apos;ve adapted this case study to showcase my process and thinking while respecting confidentiality
            </p>

            {/* NDA Image */}
            <div className="relative w-full aspect-[795/360] rounded-[6px] overflow-hidden">
              <Image
                src="/images/b2b-messenger-case/nda-overview.png"
                alt="B2B Messenger case study NDA overview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 795px"
                quality={95}
              />
            </div>
          </div>

          {/* Feature Section 1: Animated stickers, emojis, and GIFs */}
          <div className="desktop:max-w-[795px] bg-[#1A1A1A] rounded-[6px]">
            <div className="p-spacing-7 desktop:px-spacing-8 desktop:py-spacing-8 flex flex-col gap-spacing-7">
              <div className="flex flex-col gap-spacing-6">
                <p className="text-text-16 leading-[1.2] text-accent">
                  Animated stickers, emojis, and GIFs
                </p>
                <h2 className="text-[36px] leading-[1.1] desktop:text-[42px] desktop:leading-[1.1] font-semibold text-text">
                  Making Team Communication Feel Human Again
                </h2>
                <p className="text-text-16 leading-[1.4] text-text-secondary">
                  <span>Through 15 interviews with team leads, I discovered </span>
                  <span className="text-text">89% of messages were text-only.</span>
                  <span> Users described conversations as &quot;dry&quot; and &quot;impersonal.&quot; </span>
                  <span className="text-text">Teams using more expression reported 30% higher satisfaction</span>
                </p>
              </div>

              <div className="flex flex-col gap-spacing-6">
                <div className="flex flex-col gap-spacing-4">
                  <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                    Challenge 1:
                  </h3>
                  <p className="text-text-16 leading-[1.4] text-text-secondary">
                    How to add personality without looking unprofessional?
                  </p>
                </div>

                <div className="flex flex-col gap-spacing-4">
                  <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                    Challenge 2:
                  </h3>
                  <p className="text-text-16 leading-[1.4] text-text-secondary">
                    Cross-platform consistency (iOS, Android, Web)
                  </p>
                </div>
              </div>

              {/* Feature Image with Stickers */}
              <div className="relative w-full aspect-[731/667]">
                {/* Noodles cat - Left middle */}
                <div className="absolute left-[3.5%] top-[12%] w-[30%] z-10">
                  <DotLottieReact
                    src="/images/b2b-messenger-case/noodles-cat.lottie"
                    loop
                    autoplay
                    style={{ transform: 'rotate(-18deg)' }}
                  />
                </div>

                {/* Beaver sleepwear - Top right */}
                <div className="absolute right-[1.2%] top-[3.5%] w-[26%] z-10" style={{ transform: 'scale(0.767) rotate(19deg)' }}>
                  <Image
                    src="/images/b2b-messenger-case/beaver-sleepwear.svg"
                    alt="Beaver sleepwear sticker"
                    width={156}
                    height={165}
                    className="w-full h-auto"
                  />
                </div>

                {/* Main Image - Center */}
                <div className="absolute left-[34%] top-[10%] w-[37.8%]">
                  <Image
                    src="/images/b2b-messenger-case/animated-stickers-emojis-gifs.png"
                    alt="Animated stickers, emojis, and GIFs feature"
                    width={276}
                    height={566}
                    className="w-full h-auto rounded-[6px]"
                    quality={95}
                  />
                </div>

                {/* Ant Weeping - Bottom left */}
                <div className="absolute left-[4%] bottom-[6.6%] w-[33%] z-10">
                  <DotLottieReact
                    src="/images/b2b-messenger-case/ant-weeping.lottie"
                    loop
                    autoplay
                  />
                </div>

                {/* Give Like - Bottom right */}
                <div className="absolute right-[-1.1%] bottom-[9.8%] w-[37%] z-10">
                  <DotLottieReact
                    src="/images/b2b-messenger-case/give-like.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>

              <p className="text-text-16 leading-[1.4] text-text-secondary">
                <span>Created </span>
                <span className="text-text">animation principles</span>
                <span> and a motion design system with standardized timing values and platform requirements. </span>
                <span className="text-text">Designed animated stickers, emojis, and GIFs features</span>
              </p>

              <div className="flex flex-col gap-spacing-4">
                <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                  Learning:
                </h3>
                <p className="text-text-16 leading-[1.4] text-text-secondary">
                  <span>Animation isn&apos;t decoration—it&apos;s communication when used properly.</span>
                  <span className="text-text"> In the AI era, people increasingly value</span>
                  <span> animated stickers, emojis, and GIFs that add </span>
                  <span className="text-text">personality and emotion to their chat experience</span>
                </p>
              </div>
            </div>
          </div>

          {/* Feature Section 2: Global and chat search */}
          <div className="desktop:max-w-[795px] bg-[#1A1A1A] rounded-[6px]">
            <div className="p-spacing-7 desktop:px-spacing-8 desktop:py-spacing-8 flex flex-col gap-spacing-7">
              <div className="flex flex-col gap-spacing-6">
                <p className="text-text-16 leading-[1.2] text-accent">
                  Global and chat search
                </p>
                <h2 className="text-[36px] leading-[1.1] desktop:text-[42px] desktop:leading-[1.1] font-semibold text-text">
                  Designing Search That Actually Works for Enterprise Scale
                </h2>
                <p className="text-text-16 leading-[1.4] text-text-secondary">
                  <span>Users spent more than 3 minutes per search. The real </span>
                  <span className="text-text">problem was context, not algorithms.</span>
                  <span> </span>
                  <span className="text-text">People remember &quot;That thing Sarah said about the budget&quot;. Not exact words.</span>
                </p>
              </div>

              <div className="flex flex-col gap-spacing-6">
                <div className="flex flex-col gap-spacing-4">
                  <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                    Challenge 1:
                  </h3>
                  <p className="text-text-16 leading-[1.4] text-text-secondary">
                    <span>Response time and </span>
                    <span className="text-text">server optimization:</span>
                    <span> How can we align complex filters with lightweight database requests?</span>
                  </p>
                </div>

                <div className="flex flex-col gap-spacing-4">
                  <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                    Challenge 2:
                  </h3>
                  <p className="text-text-16 leading-[1.4] text-text-secondary">
                    <span>Work </span>
                    <span className="text-text">offline</span>
                    <span> with cached results</span>
                  </p>
                </div>
              </div>

              {/* Feature Image */}
              <div className="relative w-full aspect-[740/484] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/b2b-messenger-case/global-chat-search.png"
                  alt="Global and chat search feature"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 740px"
                  quality={95}
                />
              </div>

              <p className="text-text-16 leading-[1.4] text-text-secondary">
                <span className="text-text">Designed multi-dimensional search</span>
                <span> with smart filters (person, topic, time). Chose a hybrid approach for MVP to save developer resources</span>
              </p>

              <div className="flex flex-col gap-spacing-4">
                <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                  Learning:
                </h3>
                <p className="text-text-16 leading-[1.4] text-text-secondary">
                  <span>Search is never &quot;done&quot;. It&apos;s a continuous learning system. My biggest insight was: </span>
                  <span className="text-text">don&apos;t make users learn how to search.</span>
                  <span> The best search is the one that works the way people already think</span>
                </p>
              </div>
            </div>
          </div>

          {/* Feature Section 3: Scheduled messages */}
          <div className="desktop:max-w-[795px] bg-[#1A1A1A] rounded-[6px]">
            <div className="p-spacing-7 desktop:px-spacing-8 desktop:py-spacing-8 flex flex-col gap-spacing-7">
              <div className="flex flex-col gap-spacing-6">
                <p className="text-text-16 leading-[1.2] text-accent">
                  Scheduled messages
                </p>
                <h2 className="text-[36px] leading-[1.1] desktop:text-[42px] desktop:leading-[1.1] font-semibold text-text">
                  Designing for Strategic Communication, Not Just Real-Time Chat
                </h2>
                <p className="text-text-16 leading-[1.4] text-text-secondary">
                  <span>Our enterprise </span>
                  <span className="text-text">users weren&apos;t just chatting spontaneously.</span>
                  <span> They were trying to coordinate across time zones, plan announcements, and manage team communications strategically</span>
                </p>
              </div>

              <div className="flex flex-col gap-spacing-6">
                <div className="flex flex-col gap-spacing-4">
                  <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                    The Core Insight after interviews:
                  </h3>
                  <p className="text-text-16 leading-[1.4] text-text-secondary">
                    Users needed message delivery to be intentional, not just immediate. Communication timing is as important as content, especially in async, distributed teams
                  </p>
                </div>

                <div className="flex flex-col gap-spacing-4">
                  <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                    Challenge 1:
                  </h3>
                  <p className="text-text-16 leading-[1.4] text-text-secondary">
                    <span>Mental Model — &quot;Send&quot; vs. &quot;Schedule&quot;. </span>
                    <span className="text-text">How do you introduce a new behavior</span>
                    <span> without confusing the existing one? Users are trained to hit &apos;send&apos; immediately</span>
                  </p>
                </div>

                <div className="flex flex-col gap-spacing-4">
                  <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                    Challenge 2:
                  </h3>
                  <p className="text-text-16 leading-[1.4] text-text-secondary">
                    <span className="text-text">Time Zone Complexity.</span>
                    <span> When scheduling for a channel with members in 6 time zones, whose 9am do you use?</span>
                  </p>
                </div>

                <div className="flex flex-col gap-spacing-4">
                  <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                    Interesting Edge Case I Caught:
                  </h3>
                  <p className="text-text-16 leading-[1.4] text-text-secondary">
                    What happens when someone travels and changes time zones after scheduling?
                  </p>
                </div>
              </div>

              {/* Feature Image */}
              <div className="relative w-full aspect-[731/649] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/b2b-messenger-case/scheduled-messages.png"
                  alt="Scheduled messages feature"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 731px"
                  quality={95}
                />
              </div>

              <p className="text-text-16 leading-[1.4] text-text-secondary">
                <span>I designed solutions for all challenges, and after shipping to production, we achieved a </span>
                <span className="text-text">feature satisfaction score of 8.7/10</span>
              </p>

              <div className="flex flex-col gap-spacing-4">
                <h3 className="text-text-18 leading-[1.5] font-semibold text-text">
                  Learning:
                </h3>
                <p className="text-text-16 leading-[1.4] text-text-secondary">
                  <span>Simplicity is iterative. It took </span>
                  <span className="text-text">4 rounds of testing to get from complex to &quot;simple but not simplistic.&quot;</span>
                  <span> Cross-functional collaboration makes better products. Engineering&apos;s pushback led to simpler, better solutions than my original ideas</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Summary Section */}
          <div className="desktop:max-w-[795px] flex flex-col gap-spacing-8 py-spacing-8">
            <p className="text-[24px] desktop:text-[32px] leading-[1.3] text-text-secondary font-semibold">
              <span>These features represent </span>
              <span className="text-text">a small selection of my comprehensive, continuous design work</span>
              <span> </span>
              <span className="text-text">that increased user engagement</span>
              <span> and became a key competitive advantage in enterprise sales</span>
            </p>
            <p className="text-[24px] desktop:text-[32px] leading-[1.3] text-text-secondary font-semibold">
              <span>Beyond feature design, I established </span>
              <span className="text-text">usability testing practices, built design systems, and collaborated with cross-functional teams</span>
              <span> to ship faster and with higher quality</span>
            </p>
          </div>

          {/* Next Case Section */}
          <div className="desktop:max-w-[795px] flex flex-col gap-spacing-7 py-spacing-8">
            <h2 className="text-[32px] leading-[1.3] font-semibold text-accent">
              View the next case
            </h2>

            <Link href="/works/bloggingmachine" className="group flex flex-col gap-[12px]">
              {/* Next Case Image */}
              <div className="relative w-full aspect-[795/454] rounded-[6px] overflow-hidden">
                <Image
                  src="/images/works/content-engine.png"
                  alt="Bloggingmachine - AI content platform"
                  fill
                  className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, 795px"
                  quality={95}
                />
              </div>

              {/* Next Case Description */}
              <p className="text-text-16 leading-[1.4]">
                <span className="text-text font-medium">From 0% to 5% conversion. </span>
                <span className="text-text-secondary">Redesigning an</span>
                <span className="text-text font-medium"> AI content platform </span>
                <span className="text-text-secondary">that proved PMF on LinkedIn</span>
              </p>
            </Link>
          </div>

          {/* Navigation Section with Command Input */}
          <CommandInputSimple navigationItems={worksPageNavigationItems} dropdownBehavior="relative" />

        </div>

        {/* Footer - pushed to bottom with spacing */}
        <div className="mt-spacing-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
