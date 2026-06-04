"use client"

/**
 * WaveDivider - A professional wave shape divider between sections.
 * topColor: the background color of the section ABOVE
 * bottomColor: the background color of the section BELOW
 * flip: if true, the wave curves upward (default: curves downward)
 */

interface WaveDividerProps {
  topColor: string
  bottomColor: string
  flip?: boolean
  className?: string
}

export function WaveDivider({ topColor, bottomColor, flip = false, className = "" }: WaveDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none ${className}`}
      style={{ backgroundColor: topColor, height: "80px", marginBottom: "-1px" }}
    >
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "80px", transform: flip ? "rotateX(180deg)" : "none" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        {/* Multi-layer waves for depth */}
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,20 1440,40 L1440,80 L0,80 Z"
          fill={bottomColor}
          opacity="0.4"
        />
        <path
          d="M0,55 C200,10 400,75 600,45 C800,15 1000,65 1200,35 C1300,22 1380,50 1440,55 L1440,80 L0,80 Z"
          fill={bottomColor}
          opacity="0.6"
        />
        <path
          d="M0,65 C120,35 260,75 420,60 C580,45 700,70 900,55 C1100,40 1280,72 1440,60 L1440,80 L0,80 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  )
}
