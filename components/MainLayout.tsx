import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Divider } from './Divider';
import { homepageData } from '@/lib/data/homepage';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      {/* Max-width container: full-width on mobile/tablet, 1200px max on desktop */}
      <div className="w-full max-w-[1200px] mx-auto flex flex-col min-h-screen px-spacing-7 mobile:px-spacing-9 tablet:px-[32px] desktop:px-[40px] py-spacing-8">
        <Header data={homepageData.header} />

        <main className="flex-1 flex flex-col">{children}</main>

        <Footer />
      </div>
    </div>
  );
}
