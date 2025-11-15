# B2B Messenger Case Study Page - Design Document

**Date:** 2025-11-15
**Status:** Approved

## Overview

Create a clickable case study routing system for the B2B Messenger project, allowing users to navigate from the works page card to a dedicated case study page.

## Requirements

1. Case study page accessible at `/works/b2b-messenger`
2. Simple placeholder content: "case b2b-messenger"
3. First project card clickable on all devices (mobile, tablet, desktop)
4. Remove "coming soon" badge and custom cursor from first card
5. Implement on a new Git branch

## Technical Design

### 1. New Route
- **Path:** `/app/works/b2b-messenger/page.tsx`
- **Content:** Placeholder text "case b2b-messenger"
- **Structure:** Basic Next.js page component

### 2. Data Model Update
- **File:** `/lib/data/works.ts`
- **Change:** Add `slug` or `href` property to `WorkProject` interface
- **Value:** First project gets `slug: 'b2b-messenger'` or `href: '/works/b2b-messenger'`

### 3. Works Page Updates
- **File:** `/app/works/page.tsx`
- **Changes:**
  - Wrap clickable project cards in Next.js `Link` component
  - Remove "Coming soon" overlay for mobile/tablet (lines 79-88) for linked projects
  - Remove custom cursor logic (lines 47-50, 119-133) for linked projects
  - Maintain existing hover states and styling
  - Keep NDA overlay logic for NDA projects unchanged

### 4. Git Workflow
- **Branch name:** `feature/b2b-messenger-case-study`
- **Base:** `main`

## Success Criteria

- [ ] Clicking the first card navigates to `/works/b2b-messenger`
- [ ] Case study page displays placeholder text
- [ ] No "coming soon" badge appears on the first card
- [ ] Custom cursor no longer shows on the first card
- [ ] Other project cards remain unchanged
- [ ] All changes committed to feature branch
