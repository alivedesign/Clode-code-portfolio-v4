import Link from 'next/link'
import { AvatarUnknown } from '@/components/AvatarUnknown'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unknown Command',
  description: 'Command not recognized',
}

export default function UnknownCommand() {
  return (
    <div className="bg-background min-h-screen flex flex-col items-center px-spacing-7 mobile:px-spacing-9 tablet:px-[32px] desktop:px-[40px] py-spacing-8">
      {/* Main Container - responsive width */}
      <div className="w-full desktop:max-w-[1000px] flex flex-col flex-1 justify-between">
        {/* Back link */}
        <Link
          href="/"
          className="text-text-18 text-text-secondary hover:text-text transition-colors"
        >
          &lt; Back to main terminal
        </Link>

        {/* Center content */}
        <div className="flex flex-col items-center gap-[40px] mt-[56px]">
          <AvatarUnknown />
          <p className="text-[24px] font-semibold text-accent leading-[1.2] whitespace-pre">
            I don&apos;t know this command
          </p>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
