# Fonts Directory

## SF Pro Text

This project uses SF Pro Text font. You have two options:

### Option 1: Use System Fonts (Recommended for macOS)
The current configuration already includes system font fallbacks that will use SF Pro if available on macOS:
- `-apple-system`
- `BlinkMacSystemFont`
- `system-ui`

This works out of the box on macOS without downloading any files.

### Option 2: Add Font Files (For cross-platform consistency)

To ensure consistent typography across all platforms, download SF Pro Text from Apple:

1. Visit: https://developer.apple.com/fonts/
2. Download "SF Pro" font family
3. Extract and place these files in this directory:
   - `SFProText-Regular.woff2`
   - `SFProText-Semibold.woff2`

The font configuration in `app/layout.tsx` is already set up to use these files if present, with automatic fallback to system fonts if not.

## Current Status

✅ Font configuration complete in `app/layout.tsx`
✅ System font fallbacks configured
⏳ Optional: Add `.woff2` files for cross-platform consistency

The site will work perfectly on macOS with system fonts. Add the font files later if you need consistent rendering on Windows/Linux.
