'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'
import { AvatarStatic } from './AvatarStatic'
import { AvatarRainbow } from './AvatarRainbow'
import { ToolLogo, ToolName } from './ToolLogo'

type FallingObjectType = 'avatar' | 'rainbow-avatar' | 'tool-logo'

interface FallingObject {
  id: string
  type: FallingObjectType
  x: number // horizontal position in vw
  duration: number // fall duration in seconds
  toolName?: ToolName // only for tool-logo type
}

export function FallingAvatars() {
  const { fallingAvatarsTrigger, designAnimationTrigger, currentAnimationType } = useAnimation()
  const [objects, setObjects] = useState<FallingObject[]>([])

  // Handle /claude animation
  useEffect(() => {
    if (fallingAvatarsTrigger === 0) return

    console.log('[FallingAvatars] Generating claude avatars...')
    const count = Math.floor(Math.random() * 11) + 20 // 20-30
    const newObjects: FallingObject[] = []

    for (let i = 0; i < count; i++) {
      newObjects.push({
        id: `claude-${fallingAvatarsTrigger}-${Date.now()}-${i}`,
        type: 'avatar',
        x: Math.random() * 100, // 0-100vw
        duration: Math.random() * 1.4 + 1.6 // 1.6-3.0s
      })
    }

    setObjects(newObjects)

    const timeoutId = setTimeout(() => {
      setObjects([])
    }, 3100)

    return () => clearTimeout(timeoutId)
  }, [fallingAvatarsTrigger])

  // Handle /design animation
  useEffect(() => {
    if (designAnimationTrigger === 0) return

    console.log('[FallingAvatars] Generating design animation objects...')
    const count = Math.floor(Math.random() * 11) + 20 // 20-30
    const newObjects: FallingObject[] = []
    const tools: ToolName[] = ['figma', 'after-effects', 'claude', 'chatgpt', 'midjourney']

    for (let i = 0; i < count; i++) {
      // 50% chance for rainbow avatar, 50% for tool logo
      const isRainbowAvatar = Math.random() < 0.5

      if (isRainbowAvatar) {
        newObjects.push({
          id: `design-rainbow-${designAnimationTrigger}-${Date.now()}-${i}`,
          type: 'rainbow-avatar',
          x: Math.random() * 100,
          duration: Math.random() * 1.5 + 2.5 // 2.5-4.0s (slower)
        })
      } else {
        // Pick random tool
        const randomTool = tools[Math.floor(Math.random() * tools.length)]
        newObjects.push({
          id: `design-logo-${designAnimationTrigger}-${Date.now()}-${i}`,
          type: 'tool-logo',
          x: Math.random() * 100,
          duration: Math.random() * 1.5 + 2.5, // 2.5-4.0s (slower)
          toolName: randomTool
        })
      }
    }

    setObjects(newObjects)

    const timeoutId = setTimeout(() => {
      setObjects([])
    }, 4100) // 4.0s max duration + 100ms buffer

    return () => clearTimeout(timeoutId)
  }, [designAnimationTrigger])

  // Render appropriate component based on type
  const renderObject = (obj: FallingObject) => {
    switch (obj.type) {
      case 'avatar':
        return <AvatarStatic />
      case 'rainbow-avatar':
        return <AvatarRainbow />
      case 'tool-logo':
        return obj.toolName ? <ToolLogo tool={obj.toolName} /> : null
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {objects.map((obj) => (
          <motion.div
            key={obj.id}
            initial={{ y: -100 }}
            animate={{ y: 'calc(100vh + 100px)' }}
            exit={{ opacity: 0 }}
            transition={{
              duration: obj.duration,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              left: `${obj.x}vw`,
              transform: 'translateX(-50px)' // Center object on x position
            }}
          >
            {renderObject(obj)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
