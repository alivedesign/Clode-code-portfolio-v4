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
    if (fallingAvatarsTrigger === 0) return

    // Generate 20-30 avatars with random positions and speeds
    const count = Math.floor(Math.random() * 11) + 20 // 20-30
    const newAvatars: FallingAvatar[] = []

    for (let i = 0; i < count; i++) {
      newAvatars.push({
        id: `avatar-${fallingAvatarsTrigger}-${Date.now()}-${i}`,
        x: Math.random() * 100, // 0-100vw
        duration: Math.random() * 0.7 + 0.8 // 0.8-1.5s
      })
    }

    setAvatars(newAvatars)

    // Auto-cleanup after longest animation completes
    const timeoutId = setTimeout(() => {
      setAvatars([])
    }, 1600) // 1.5s max duration + 100ms buffer

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
