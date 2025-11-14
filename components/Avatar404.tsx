'use client'

// Width/horizontal dimensions as percentages of container WIDTH (600px)
const BODY_WIDTH_PCT = (515.789 / 600) * 100 // 85.965%
const BODY_LEFT_PCT = (42.11 / 600) * 100 // 7.018%
const TEXT_LEFT_PCT = (196 / 600) * 100 // 32.667%
const ARM_WIDTH_PCT = (42.105 / 600) * 100 // 7.018%
const RIGHT_ARM_LEFT_PCT = (557.89 / 600) * 100 // 92.982%
const BOTTOM_BLOCK_WIDTH_PCT = (42.105 / 600) * 100 // 7.018%
const BOTTOM_BLOCKS_LEFT_PCT = [
  (115.79 / 600) * 100, // 19.298%
  (189.47 / 600) * 100, // 31.578%
  (368.42 / 600) * 100, // 61.403%
  (442.1 / 600) * 100,  // 73.683%
]

// Height/vertical dimensions as percentages of container HEIGHT (378.947px)
const BODY_HEIGHT_PCT = (294.737 / 378.947) * 100 // 77.76%
const TEXT_TOP_PCT = (32.62 / 378.947) * 100 // 8.61%
const ARM_HEIGHT_PCT = (63.158 / 378.947) * 100 // 16.66%
const ARM_TOP_PCT = (84.21 / 378.947) * 100 // 22.22%
const BOTTOM_BLOCK_HEIGHT_PCT = (63.158 / 378.947) * 100 // 16.66%
const BOTTOM_BLOCKS_TOP_PCT = (315.79 / 378.947) * 100 // 83.33%

export function Avatar404() {
  return (
    <div
      className="relative bouncing-avatar w-[346px] h-[218.526px] mobile:w-[346px] mobile:h-[218.526px] tablet:w-[432px] tablet:h-[272.842px] desktop:w-[600px] desktop:h-[378.947px]"
    >
      {/* Main body */}
      <div
        className="absolute bg-accent top-0"
        style={{
          width: `${BODY_WIDTH_PCT}%`,
          height: `${BODY_HEIGHT_PCT}%`,
          left: `${BODY_LEFT_PCT}%`,
        }}
      />

      {/* 404 Text */}
      <p
        className="absolute font-bold text-text whitespace-pre leading-[1.2] not-italic text-[104px] mobile:text-[104px] tablet:text-[130px] desktop:text-[190px]"
        style={{
          left: `calc(50% - ${TEXT_LEFT_PCT}%)`,
          top: `${TEXT_TOP_PCT}%`,
        }}
      >
        404
      </p>

      {/* Left arm */}
      <div
        className="absolute bg-accent"
        style={{
          width: `${ARM_WIDTH_PCT}%`,
          height: `${ARM_HEIGHT_PCT}%`,
          left: '0%',
          top: `${ARM_TOP_PCT}%`,
        }}
      />

      {/* Right arm */}
      <div
        className="absolute bg-accent"
        style={{
          width: `${ARM_WIDTH_PCT}%`,
          height: `${ARM_HEIGHT_PCT}%`,
          left: `${RIGHT_ARM_LEFT_PCT}%`,
          top: `${ARM_TOP_PCT}%`,
        }}
      />

      {/* Bottom blocks (legs) */}
      {BOTTOM_BLOCKS_LEFT_PCT.map((leftPct, index) => (
        <div
          key={`leg-${index}`}
          className="absolute bg-accent"
          style={{
            width: `${BOTTOM_BLOCK_WIDTH_PCT}%`,
            height: `${BOTTOM_BLOCK_HEIGHT_PCT}%`,
            left: `${leftPct}%`,
            top: `${BOTTOM_BLOCKS_TOP_PCT}%`,
          }}
        />
      ))}
    </div>
  )
}
