import * as React from "react"
import { SFC } from "react"
import { fromCenter } from "./fromCenter"
import { Bubble } from "./OPBubbles4"
import { intrinsicHeight, intrinsicWidth } from "./OP_Type"
import { BubbleText } from "./SVG_OP_BubbleText"



export const SVG_OP_Bubble: SFC<{
  color: string
  width: number
  height?: number
  prefix?: string
  text?: string
  gray?: boolean
}> = ({ prefix, color, width, height = width, text, gray }) => {
  if (typeof color !== "string") color = "white"
  if (color === "white") gray = true
  return (
    <g
      className={`SVG_OP_Bubble ${prefix || "?"}${text}`}
      style={{
        transform: fromCenter(
          intrinsicWidth,
          intrinsicHeight,
          `scale(${width / intrinsicWidth}, ${height / intrinsicHeight})`,
        ),
      }}
    >
      <Bubble color={color} />
      <g style={{ opacity: color === "white" ? 0.25 : 1 }}>
        <Bubble color="gray" style={{ opacity: gray ? 1 : 0 }} />
        <BubbleText prefix={prefix} style={{ opacity: gray ? 0.5 : 1 }}>
          {text}
        </BubbleText>
      </g>
    </g>
  )
}

export const SVG_OP_Bubble_border: SFC<{
  width: number
  height?: number
}> = ({ width, height = width }) => (
  <g
    className={`SVG_OP_Bubble border`}
    style={{
      transform: fromCenter(
        intrinsicWidth,
        intrinsicHeight,
        `scale(${width / intrinsicWidth}, ${height / intrinsicHeight})`,
      ),
    }}
  >
    <g
      style={{
        transform: fromCenter(
          intrinsicWidth,
          intrinsicHeight,
          `scale(1.1,1.1)`,
        ),
      }}
    >
      <Bubble color="white" />
    </g>
  </g>
)
