/**
 * Analytics utilities for tracking user interactions with Google Analytics 4
 */

// Type definitions for tracking parameters
export type LinkName = 'linkedin' | 'calendly' | 'email';
export type LinkLocation = 'footer' | 'header' | 'work_page' | 'info_contact';

/**
 * Safely send an event to Google Analytics
 * Only works in production where gtag is available
 */
function sendEvent(eventName: string, params: Record<string, any>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore - gtag is injected by Google Analytics script
    window.gtag('event', eventName, params);
  }
}

/**
 * Custom hook for tracking analytics events
 * Provides type-safe tracking functions for various user interactions
 */
export function useAnalytics() {
  /**
   * Track link clicks with context about what and where
   *
   * @param linkName - Identifier for the link (e.g., 'linkedin', 'calendly')
   * @param location - Where on the site the link was clicked (e.g., 'footer', 'header')
   * @param url - Optional destination URL for additional context
   *
   * @example
   * trackLinkClick('linkedin', 'footer', 'https://linkedin.com/...')
   */
  const trackLinkClick = (
    linkName: LinkName,
    location: LinkLocation,
    url?: string
  ) => {
    sendEvent('link_click', {
      link_name: linkName,
      link_location: location,
      link_url: url,
    });
  };

  return {
    trackLinkClick,
  };
}
