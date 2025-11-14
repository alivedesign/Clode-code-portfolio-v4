# Google Analytics 4 Integration Design

**Date:** 2025-11-14
**Status:** Approved
**GA4 Measurement ID:** G-NKTCMKB3MT

## Overview

Integrate Google Analytics 4 (GA4) into the Next.js 15 portfolio site to track user behavior and site performance with enhanced measurement capabilities.

## Requirements

- Track pageviews across all routes
- Enhanced tracking: link clicks, scroll depth, file downloads
- Core Web Vitals reporting
- No tracking in development environment
- Minimal performance impact
- Easy to maintain and update

## Approach

Use the official `@next/third-parties` package from Next.js team:
- **Pros:** Official solution, automatic optimization, lazy loading, minimal code
- **Cons:** Less customization than manual implementation
- **Alternatives considered:** Direct gtag.js implementation (more manual work), custom wrapper (overkill)

## Architecture

### Components
1. **@next/third-parties package** - Official Next.js integration for third-party scripts
2. **GoogleAnalytics component** - Drop-in component for GA4
3. **Environment variables** - Secure storage of measurement ID

### Data Flow
1. User visits page → Next.js renders layout
2. In production, GoogleAnalytics component loads
3. GA4 script lazy loads (non-blocking)
4. Automatic events tracked: pageviews, scrolls, clicks, downloads, Core Web Vitals
5. Data sent to Google Analytics servers

### Security & Privacy
- Measurement ID stored in environment variables
- Only loads in production (development excluded)
- GA4 automatically anonymizes IPs
- No PII collected by default

## Implementation Plan

### 1. Dependencies
Install `@next/third-parties`:
```bash
npm install @next/third-parties
```

### 2. Environment Configuration

**Local development (.env.local):**
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-NKTCMKB3MT
```

**Production (Vercel):**
- Already configured in Vercel dashboard
- Variable: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-NKTCMKB3MT`
- Environment: All Environments

### 3. Code Changes

**File: app/layout.tsx**
- Import `GoogleAnalytics` from `@next/third-parties/google`
- Add component to body with environment check
- Pass measurement ID from environment variable

### 4. What Gets Tracked (Automatic)

**Enhanced Measurement Events:**
- Pageviews on route changes
- Scroll depth (90% scroll)
- Outbound link clicks
- File downloads (PDF, etc.)
- Video engagement
- Site search (if implemented)

**Performance Metrics:**
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

### 5. Testing & Verification

**Post-deployment:**
1. Visit Google Analytics → Realtime reports
2. Navigate to production site
3. Verify realtime visitor appears within 30 seconds
4. Check that pageview events are logged
5. Test enhanced events (scroll, click links)

**Success Criteria:**
- [ ] Realtime visitor tracking works
- [ ] Pageviews logged correctly
- [ ] Enhanced events appear in GA4
- [ ] No tracking in development
- [ ] No console errors
- [ ] Page performance unaffected

## Rollback Plan

If issues arise:
1. Remove `GoogleAnalytics` component from layout.tsx
2. Redeploy
3. Analytics stops tracking (no data loss, just gap in tracking)

## Future Enhancements

Consider later:
- Custom event tracking for portfolio interactions
- User ID tracking (if authentication added)
- E-commerce tracking (if shop added)
- Custom dimensions for tracking specific user segments
