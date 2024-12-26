import React from 'react'

export default function ZigZagLine({
  width = 20,
  height = 100,
  color = 'currentColor',
  strokeWidth = 1
}) {
  const zigZags = 5 // Number of zig-zags
  const segmentHeight = height / (zigZags * 2)

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-300"
    >
      <path
        d={Array.from({ length: zigZags }, (_, i) => 
          `M0 ${i * segmentHeight * 2} L${width} ${(i * 2 + 1) * segmentHeight} L0 ${(i + 1) * segmentHeight * 2}`
        ).join(' ')}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

