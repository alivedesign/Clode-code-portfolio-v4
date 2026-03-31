# Cases Page — Clickable Cards Design

## Case 1 (Video Preview)
- Move `cursor-pointer` and `onClick` from the `<section>` to a wrapper around just the video + title content
- Hover effect: `scale-[1.02]` + slight brightness increase (`opacity-90` → `opacity-100`) on the whole card area
- Empty space around the section is NOT clickable

## Case 2 (Cinematic Scroll)
- Remove `cursor-pointer` and `onClick` from the full-screen sticky div
- Create a new inner wrapper around the content cluster (canvas + side images + title)
- Track scroll progress via a ref — once progress reaches 1.0 (100%), enable the clickable state
- When enabled: show `cursor-pointer`, apply subtle hover effect (opacity from `0.85` → `1`)
- When NOT enabled: no cursor change, no click handler — scrolling through animation is uninterrupted

## Shared
- `CaseTitle` keeps `disableLink` behavior — "View Case Study" stays as plain text when parent card is clickable
- Cursor only changes over actual card content, never on empty viewport space
