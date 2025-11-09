'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AnimationContextType {
  triggerFallingAvatars: () => void
  fallingAvatarsTrigger: number
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [fallingAvatarsTrigger, setFallingAvatarsTrigger] = useState(0)

  const triggerFallingAvatars = () => {
    console.log('[AnimationContext] Triggering falling avatars, current:', fallingAvatarsTrigger);
    setFallingAvatarsTrigger(prev => {
      console.log('[AnimationContext] New trigger value:', prev + 1);
      return prev + 1;
    })
  }

  return (
    <AnimationContext.Provider value={{ triggerFallingAvatars, fallingAvatarsTrigger }}>
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
