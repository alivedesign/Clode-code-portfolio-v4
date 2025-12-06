'use client';

import { useAnalytics } from '@/lib/analytics';

export function Footer() {
  const { trackLinkClick } = useAnalytics();

  return (
    <div className="w-full mt-auto">
      <p className="text-text-16 text-text-secondary">
        Reach me on{' '}
        <a
          href="https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:underline transition-all"
          onClick={() =>
            trackLinkClick(
              'linkedin',
              'footer',
              'https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/'
            )
          }
        >
          LinkedIn
        </a>
        , at shkuratovdesigner@gmail.com, or{' '}
        <a
          href="https://cal.com/shkuratov-design/45min"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:underline transition-all"
          onClick={() =>
            trackLinkClick(
              'calendly',
              'footer',
              'https://cal.com/shkuratov-design/45min'
            )
          }
        >
          book a discovery call
        </a>
      </p>
    </div>
  );
}
