'use client'

import { useState, useEffect, useRef } from 'react'

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
      const x = deltaX < -100 ? -2 : deltaX > 100 ? 2 : 0
      const y = deltaY < -100 ? -2 : deltaY > 100 ? 2 : 0

      setEyeOffset({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={avatarRef} className="w-[101px] h-[63.789px] relative bouncing-avatar">
      {/* Main body */}
      <div className="absolute bg-accent h-[49.614px] left-[7.09px] top-0 w-[86.825px]" />

      {/* Eyes - both track cursor, left eye blinks */}
      <div
        className="absolute bg-dark-text h-[10.632px] w-[7.088px] pixel-eye-right"
        style={{
          left: `${69.11 + eyeOffset.x}px`,
          top: `${14.18 + eyeOffset.y}px`
        }}
      />
      <div
        className="absolute bg-dark-text h-[10.632px] w-[7.088px] pixel-eye-left"
        style={{
          left: `${24.81 + eyeOffset.x}px`,
          top: `${14.18 + eyeOffset.y}px`
        }}
      />

      {/* Side and bottom pixels */}
      <div className="absolute bg-accent h-[10.632px] left-[74.42px] top-[53.16px] w-[7.088px]" />
      {/* Right arm - waving */}
      <div className="absolute bg-accent h-[10.632px] left-[93.91px] top-[14.18px] w-[7.088px] waving-arm" />
      {/* Left arm */}
      <div className="absolute bg-accent h-[10.632px] left-0 top-[14.18px] w-[7.088px]" />
      <div className="absolute bg-accent h-[10.632px] left-[19.49px] top-[53.16px] w-[7.088px]" />
      <div className="absolute bg-accent h-[10.632px] left-[31.89px] top-[53.16px] w-[7.088px]" />
      <div className="absolute bg-accent h-[10.632px] left-[62.02px] top-[53.16px] w-[7.088px]" />
    </div>
  );
}
