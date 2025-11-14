# Custom Link Tracking Design

**Date:** 2025-11-14
**Status:** Approved
**Related:** Google Analytics 4 Integration

## Overview

Implement custom event tracking for links across the portfolio site, with specific focus on footer links (LinkedIn and Calendly). Track not just what was clicked, but where it was clicked from to understand which placements drive the most engagement.

## Requirements

- Track individual links separately (LinkedIn vs Calendly)
- Track location context (footer vs header vs page content)
- Type-safe implementation to prevent tracking errors
- Reusable across the entire site
- Works only in production (no dev environment tracking)
- Clean component code (tracking logic abstracted)

## Event Structure

**Event name:** `link_click`

**Event parameters:**
- `link_name`: String identifying what was clicked ("linkedin", "calendly", "email")
- `link_location`: String identifying where it was clicked ("footer", "header", "work_page", etc.)
- `link_url`: The destination URL (optional, for additional context)

**Example events:**
```javascript
// User clicks LinkedIn in footer
gtag('event', 'link_click', {
  link_name: 'linkedin',
  link_location: 'footer',
  link_url: 'https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/'
});

// User clicks Calendly in footer
gtag('event', 'link_click', {
  link_name: 'calendly',
  link_location: 'footer',
  link_url: 'https://calendly.com/shkuratovdesigner-xtkx/30min'
});
```

## Approach

**Selected: Custom Analytics Hook (Option B)**

Create a reusable `useAnalytics()` hook that:
- Provides clean tracking functions to components
- Centralizes tracking logic in one place
- Type-safe parameters using TypeScript
- Easy to extend for new links and locations

**Alternatives considered:**
- Direct gtag calls: Too scattered, harder to maintain
- Event delegation: Over-engineered for current needs

## Architecture

### Files Structure

```
/lib/analytics.ts          # Analytics utilities and hook
/components/Footer.tsx     # Updated to use tracking (first implementation)
```

### Type System

```typescript
type LinkName = 'linkedin' | 'calendly' | 'email'
type LinkLocation = 'footer' | 'header' | 'work_page' | 'info_contact'
```

**Benefits:**
- TypeScript autocomplete for valid values
- Compile-time errors for typos
- Self-documenting code
- Easy to extend with new values

### Core Implementation

**1. Helper function (`sendEvent`):**
- Checks if `window.gtag` exists (production only)
- Safely sends events without breaking in development
- Type-safe event parameters

**2. Hook (`useAnalytics`):**
- Returns tracking functions
- `trackLinkClick(linkName, location, url?)`
- Can add more tracking functions later (e.g., `trackButtonClick`, `trackFormSubmit`)

**3. Component usage:**
```tsx
const { trackLinkClick } = useAnalytics();

<a
  href="url"
  onClick={() => trackLinkClick('linkedin', 'footer')}
>
  LinkedIn
</a>
```

## Implementation Plan

### 1. Create Analytics Utility

**File: /lib/analytics.ts**

- Define TypeScript types for link names and locations
- Implement `sendEvent` helper function
- Implement `useAnalytics` hook with `trackLinkClick` function
- Export hook for use in components

### 2. Update Footer Component

**File: /components/Footer.tsx**

- Import `useAnalytics` hook
- Call hook to get `trackLinkClick` function
- Add `onClick` handlers to:
  - LinkedIn link → `trackLinkClick('linkedin', 'footer', url)`
  - Calendly link → `trackLinkClick('calendly', 'footer', url)`
- Maintain existing functionality (no visual changes)

### 3. Testing

**Local testing:**
- Build and run locally
- Click links in development (should work without errors)
- Check console for no gtag errors

**Production testing:**
- Deploy to production
- Open browser DevTools → Network tab
- Click footer links
- Verify GA4 requests are sent with correct parameters
- Check Google Analytics → Realtime → Events
- Verify `link_click` events appear with correct parameters

## GA4 Dashboard Usage

**After implementation, in Google Analytics:**

1. **View all link clicks:**
   - Reports → Engagement → Events
   - Find `link_click` event

2. **Compare link performance:**
   - Add secondary dimension: `link_name`
   - See LinkedIn vs Calendly click counts

3. **Compare location performance:**
   - Add secondary dimension: `link_location`
   - See footer vs header vs page content performance

4. **Create custom reports:**
   - Explore → Create exploration
   - Segment by link_name and link_location
   - See conversion paths that include link clicks

## Future Enhancements

**Easy to add later:**
- Track other links (GitHub, Twitter, portfolio pieces, etc.)
- Track button clicks (CTA buttons, navigation, etc.)
- Track form submissions
- Track file downloads
- Track video plays
- Add more locations as site grows

**Extension pattern:**
```typescript
// Add new link types
type LinkName = 'linkedin' | 'calendly' | 'email' | 'github' | 'twitter'

// Add new locations
type LinkLocation = 'footer' | 'header' | 'work_page' | 'hero' | 'about'

// Add new tracking functions to hook
const { trackLinkClick, trackButtonClick, trackFormSubmit } = useAnalytics()
```

## Privacy & Compliance

- No PII collected in events
- Link names and locations are behavioral data only
- Complies with GA4's automatic anonymization
- No additional cookie consent required for this level of tracking
- URLs tracked are public, non-sensitive links

## Success Criteria

- [ ] Analytics hook created and type-safe
- [ ] Footer links track clicks correctly
- [ ] Events appear in GA4 Realtime view
- [ ] Event parameters include link_name and link_location
- [ ] No errors in browser console
- [ ] No tracking in development environment
- [ ] Code is clean and reusable
