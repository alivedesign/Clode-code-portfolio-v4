import Image from 'next/image'

export type ToolName = 'figma' | 'after-effects' | 'claude' | 'chatgpt' | 'midjourney'

interface ToolLogoProps {
  tool: ToolName
}

export function ToolLogo({ tool }: ToolLogoProps) {
  const logoPath = `/logos/${tool}.svg`
  const LOGO_SIZE = 101 // Match avatar width (AVATAR_WIDTH constant)

  return (
    <div
      className="relative"
      style={{
        width: `${LOGO_SIZE}px`,
        height: `${LOGO_SIZE}px`
      }}
    >
      <Image
        src={logoPath}
        alt={`${tool} logo`}
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        style={{
          objectFit: 'contain'
        }}
      />
    </div>
  )
}
