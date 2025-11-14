import { homepageData } from "@/lib/data/homepage";
import { homepageNavigationItems } from "@/lib/data/navigation";
import { CommandInputSimple } from "@/components/CommandInputSimple";
import { RichText } from "@/components/RichText";
import { Avatar } from "@/components/Avatar";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shkuratov Designer",
  description: "Helping Solo Founders & Startups Ship User-Centric Products Faster",
  openGraph: {
    title: "Shkuratov Designer",
    description: "Helping Solo Founders & Startups Ship User-Centric Products Faster",
    images: ['https://shkuratov.design/images/opengraph.png'],
  },
};

export default function Home() {
  // Pre-process tagline split for cleaner JSX
  const [taglinePart1, taglinePart2] = homepageData.hero.tagline.split(" /");

  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-spacing-7 mobile:px-spacing-9 tablet:px-[32px] desktop:px-[40px] py-spacing-8">
      {/* Main Container - responsive width */}
      <div className="w-full desktop:max-w-[1000px] flex flex-col flex-1">
        {/* Content wrapper with gap */}
        <div className="flex flex-col gap-spacing-9 flex-1">
        {/* Bordered Box with all main content */}
        <div className="relative border border-accent rounded-[var(--spacing-2,4px)] px-spacing-7 pt-spacing-8 pb-spacing-7 mobile:p-spacing-8 flex flex-col tablet:flex-row gap-spacing-7">
          {/* Header - positioned absolutely at top-left inside border */}
          <div className="absolute left-[32px] mobile:left-spacing-8 top-[-16px] bg-background px-spacing-4 py-spacing-2 flex gap-spacing-4 items-center text-text-18">
            <span className="text-accent font-semibold">{homepageData.header.name}</span>
            <span className="text-text-secondary">{homepageData.header.version}</span>
          </div>

          {/* Hero Section - Center aligned on mobile, left column on tablet/desktop */}
          <div className="w-full tablet:w-[300px] desktop:w-[340px] tablet:shrink-0 flex flex-col gap-spacing-9 items-center justify-center">
            <h1 className="text-title-18 text-text text-center w-full">
              {homepageData.hero.greeting}
            </h1>

            {/* Avatar with animation */}
            <Avatar />

            <div className="text-text-16 text-text-secondary w-full text-center leading-relaxed">
              <p className="m-0">{taglinePart1}</p>
              <p className="m-0">/{taglinePart2}</p>
            </div>
          </div>

          {/* Divider - Horizontal on mobile, Vertical on tablet/desktop */}
          <div className="w-full tablet:w-[1px] h-[1px] tablet:h-auto tablet:self-stretch bg-accent tablet:shrink-0" style={{ opacity: 0.6 }} />

          {/* Activity Section - Bottom on mobile, Right column on tablet/desktop */}
          <div className="w-full tablet:flex-1 tablet:min-w-0 flex flex-col gap-spacing-7 tablet:gap-spacing-6">
            {/* Recent Activity */}
            <div className="flex flex-col gap-[2px]">
              <h2 className="text-title-18 text-accent">
                {homepageData.activity.recentTitle}
              </h2>
              <p className="text-text-18 text-text-secondary">
                {homepageData.activity.recentActivity}
              </p>
            </div>

            {/* Horizontal Divider */}
            <div className="w-full h-[1px] bg-accent" style={{ opacity: 0.6 }} />

            {/* What's New */}
            <div className="flex flex-col gap-3">
              <h2 className="text-title-18 text-accent">
                {homepageData.activity.whatsNewTitle}
              </h2>
              {homepageData.activity.updates.map((update, index) => (
                <p key={index} className="text-text-18 text-text">
                  <RichText content={update} />
                </p>
              ))}
              <p className="text-text-18 text-text-secondary whitespace-pre-wrap">
                {homepageData.activity.moreLink}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section with Command Input */}
        <CommandInputSimple navigationItems={homepageNavigationItems} dropdownBehavior="relative" />
        </div>

        {/* Footer - pushed to bottom with spacing */}
        <div className="mt-spacing-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
