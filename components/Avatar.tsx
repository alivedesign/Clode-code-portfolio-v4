'use client'

import { useState, useEffect, useRef } from 'react'
import { throttle } from '@/lib/utils/performance'

// Avatar dimensions
const AVATAR_WIDTH = 101
const AVATAR_HEIGHT = 63.789
const BODY_HEIGHT = 49.614
const BODY_LEFT = 7.09
const BODY_WIDTH = 86.825

// Eye dimensions and positions
const EYE_WIDTH = 7.088
const EYE_HEIGHT = 10.632
const RIGHT_EYE_LEFT = 69.11
const LEFT_EYE_LEFT = 24.81
const EYE_TOP = 14.18

// Pixel block positions
const PIXEL_HEIGHT = 10.632
const PIXEL_WIDTH = 7.088
const ARM_TOP = 14.18
const LEFT_ARM_LEFT = 0
const RIGHT_ARM_LEFT = 93.91
const BOTTOM_PIXELS_TOP = 53.16
const BOTTOM_PIXELS = [
  { left: 74.42 },  // Right side
  { left: 19.49 },  // Left side
  { left: 31.89 },  // Center-left
  { left: 62.02 },  // Center-right
]

// Eye tracking thresholds
const EYE_TRACKING_THRESHOLD = 100
const EYE_TRACKING_OFFSET = 2

export function Avatar() {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const avatarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return

      const rect = avatarRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      // Map to 9 positions based on thresholds
      const x = deltaX < -EYE_TRACKING_THRESHOLD ? -EYE_TRACKING_OFFSET :
                deltaX > EYE_TRACKING_THRESHOLD ? EYE_TRACKING_OFFSET : 0
      const y = deltaY < -EYE_TRACKING_THRESHOLD ? -EYE_TRACKING_OFFSET :
                deltaY > EYE_TRACKING_THRESHOLD ? EYE_TRACKING_OFFSET : 0

      setEyeOffset({ x, y })
    }

    // Throttle mousemove to max 60fps (16.67ms) for better performance
    const throttledHandleMouseMove = throttle(handleMouseMove, 16)

    window.addEventListener('mousemove', throttledHandleMouseMove)
    return () => window.removeEventListener('mousemove', throttledHandleMouseMove)
  }, [])

  return (
    <div ref={avatarRef} className={`w-[${AVATAR_WIDTH}px] h-[${AVATAR_HEIGHT}px] relative bouncing-avatar`}>
      {/* Main body */}
      <div
        className="absolute bg-accent top-0"
        style={{
          height: `${BODY_HEIGHT}px`,
          left: `${BODY_LEFT}px`,
          width: `${BODY_WIDTH}px`
        }}
      />

      {/* Eyes - both track cursor, left eye blinks */}
      <div
        className="absolute bg-dark-text pixel-eye-right"
        style={{
          height: `${EYE_HEIGHT}px`,
          width: `${EYE_WIDTH}px`,
          left: `${RIGHT_EYE_LEFT + eyeOffset.x}px`,
          top: `${EYE_TOP + eyeOffset.y}px`
        }}
      />
      <div
        className="absolute bg-dark-text pixel-eye-left"
        style={{
          height: `${EYE_HEIGHT}px`,
          width: `${EYE_WIDTH}px`,
          left: `${LEFT_EYE_LEFT + eyeOffset.x}px`,
          top: `${EYE_TOP + eyeOffset.y}px`
        }}
      />

      {/* Right arm - waving */}
      <div
        className="absolute bg-accent waving-arm"
        style={{
          height: `${PIXEL_HEIGHT}px`,
          width: `${PIXEL_WIDTH}px`,
          left: `${RIGHT_ARM_LEFT}px`,
          top: `${ARM_TOP}px`
        }}
      />

      {/* Left arm */}
      <div
        className="absolute bg-accent"
        style={{
          height: `${PIXEL_HEIGHT}px`,
          width: `${PIXEL_WIDTH}px`,
          left: `${LEFT_ARM_LEFT}px`,
          top: `${ARM_TOP}px`
        }}
      />

      {/* Bottom pixels */}
      {BOTTOM_PIXELS.map((pixel, index) => (
        <div
          key={`bottom-pixel-${index}`}
          className="absolute bg-accent"
          style={{
            height: `${PIXEL_HEIGHT}px`,
            width: `${PIXEL_WIDTH}px`,
            left: `${pixel.left}px`,
            top: `${BOTTOM_PIXELS_TOP}px`
          }}
        />
      ))}
    </div>
  );
}
