import Image from 'next/image'

export type ToolName = 'figma' | 'after-effects' | 'claude' | 'chatgpt' | 'midjourney'

interface ToolLogoProps {
  tool: ToolName
}

export function ToolLogo({ tool }: ToolLogoProps) {
  const logoPath = `/logos/${tool}.svg`
  const size = 100 // Match avatar width

  return (
    <div
      className="relative"
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      <Image
        src={logoPath}
        alt={`${tool} logo`}
        width={size}
        height={size}
        style={{
          objectFit: 'contain'
        }}
      />
    </div>
  )
}
