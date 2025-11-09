'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'
import { AvatarStatic } from './AvatarStatic'

interface FallingAvatar {
  id: string
  x: number // horizontal position in vw
  duration: number // fall duration in seconds
}

export function FallingAvatars() {
  const { fallingAvatarsTrigger } = useAnimation()
  const [avatars, setAvatars] = useState<FallingAvatar[]>([])

  useEffect(() => {
    console.log('[FallingAvatars] Trigger changed:', fallingAvatarsTrigger);
    if (fallingAvatarsTrigger === 0) return

    console.log('[FallingAvatars] Generating avatars...');
    // Generate 20-30 avatars with random positions and speeds
    const count = Math.floor(Math.random() * 11) + 20 // 20-30
    const newAvatars: FallingAvatar[] = []

    for (let i = 0; i < count; i++) {
      newAvatars.push({
        id: `avatar-${fallingAvatarsTrigger}-${Date.now()}-${i}`,
        x: Math.random() * 100, // 0-100vw
        duration: Math.random() * 1.4 + 1.6 // 1.6-3.0s (2x slower)
      })
    }

    setAvatars(newAvatars)

    // Auto-cleanup after longest animation completes
    const timeoutId = setTimeout(() => {
      setAvatars([])
    }, 3100) // 3.0s max duration + 100ms buffer

    return () => clearTimeout(timeoutId)
  }, [fallingAvatarsTrigger])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {avatars.map((avatar) => (
          <motion.div
            key={avatar.id}
            initial={{ y: -100 }}
            animate={{ y: 'calc(100vh + 100px)' }}
            exit={{ opacity: 0 }}
            transition={{
              duration: avatar.duration,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              left: `${avatar.x}vw`,
              transform: 'translateX(-50px)' // Center avatar on x position
            }}
          >
            <AvatarStatic />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
