// Rainbow gradient version of Avatar for /design animation
export function AvatarRainbow() {
  // Avatar dimensions (same as AvatarStatic)
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
    { left: 74.42 },
    { left: 19.49 },
    { left: 31.89 },
    { left: 62.02 },
  ]

  // Rainbow gradient style - matches gradient reference
  const rainbowGradient = 'linear-gradient(90deg, #E60000, #FFA500, #FFFF00, #008000, #0066FF, #9B00FF)'

  return (
    <div
      className="relative"
      style={{
        width: `${AVATAR_WIDTH}px`,
        height: `${AVATAR_HEIGHT}px`
      }}
    >
      {/* Main body with rainbow gradient */}
      <div
        className="absolute top-0"
        style={{
          height: `${BODY_HEIGHT}px`,
          left: `${BODY_LEFT}px`,
          width: `${BODY_WIDTH}px`,
          background: rainbowGradient
        }}
      />

      {/* Eyes - static, no tracking */}
      <div
        className="absolute bg-dark-text"
        style={{
          height: `${EYE_HEIGHT}px`,
          width: `${EYE_WIDTH}px`,
          left: `${RIGHT_EYE_LEFT}px`,
          top: `${EYE_TOP}px`
        }}
      />
      <div
        className="absolute bg-dark-text"
        style={{
          height: `${EYE_HEIGHT}px`,
          width: `${EYE_WIDTH}px`,
          left: `${LEFT_EYE_LEFT}px`,
          top: `${EYE_TOP}px`
        }}
      />

      {/* Right arm with rainbow gradient */}
      <div
        className="absolute"
        style={{
          height: `${PIXEL_HEIGHT}px`,
          width: `${PIXEL_WIDTH}px`,
          left: `${RIGHT_ARM_LEFT}px`,
          top: `${ARM_TOP}px`,
          background: rainbowGradient
        }}
      />

      {/* Left arm with rainbow gradient */}
      <div
        className="absolute"
        style={{
          height: `${PIXEL_HEIGHT}px`,
          width: `${PIXEL_WIDTH}px`,
          left: `${LEFT_ARM_LEFT}px`,
          top: `${ARM_TOP}px`,
          background: rainbowGradient
        }}
      />

      {/* Bottom pixels with rainbow gradient */}
      {BOTTOM_PIXELS.map((pixel, index) => (
        <div
          key={`bottom-pixel-${index}`}
          className="absolute"
          style={{
            height: `${PIXEL_HEIGHT}px`,
            width: `${PIXEL_WIDTH}px`,
            left: `${pixel.left}px`,
            top: `${BOTTOM_PIXELS_TOP}px`,
            background: rainbowGradient
          }}
        />
      ))}
    </div>
  )
}
