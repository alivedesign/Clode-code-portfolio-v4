'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type AnimationType = 'claude' | 'design'

interface AnimationContextType {
  triggerFallingAvatars: () => void
  fallingAvatarsTrigger: number
  triggerDesignAnimation: () => void
  designAnimationTrigger: number
  currentAnimationType: AnimationType | null
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [fallingAvatarsTrigger, setFallingAvatarsTrigger] = useState(0)
  const [designAnimationTrigger, setDesignAnimationTrigger] = useState(0)
  const [currentAnimationType, setCurrentAnimationType] = useState<AnimationType | null>(null)

  const triggerFallingAvatars = () => {
    console.log('[AnimationContext] Triggering falling avatars (claude)')
    setCurrentAnimationType('claude')
    setFallingAvatarsTrigger(prev => prev + 1)
  }

  const triggerDesignAnimation = () => {
    console.log('[AnimationContext] Triggering design animation')
    setCurrentAnimationType('design')
    setDesignAnimationTrigger(prev => prev + 1)
  }

  return (
    <AnimationContext.Provider value={{
      triggerFallingAvatars,
      fallingAvatarsTrigger,
      triggerDesignAnimation,
      designAnimationTrigger,
      currentAnimationType
    }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error('useAnimation must be used within AnimationProvider')
  }
  return context
}
