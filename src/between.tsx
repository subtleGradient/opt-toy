// inspired by https://css-tricks.com/between-the-lines/
import * as React from "react"

export const WIDTH_MIN = 320
export const WIDTH_MAX = 1024
export const HEIGHT_MIN = 568
export const HEIGHT_MAX = 1024

export const BetweenRootStyles = ({
  selector,
  xMin = WIDTH_MIN,
  xMax = WIDTH_MAX,
  yMin = HEIGHT_MIN,
  yMax = HEIGHT_MAX,
}: {
  selector: string
  xMin?: number
  xMax?: number
  yMin?: number
  yMax?: number
}) => (
  <style>{`
    ${selector} {
      --is-x-between-${xMin}-${xMax}: 1;
      --is-x-${xMax}: 0;
      --is-x-${xMin}: 0;

      --is-y-between-${yMin}-${yMax}: 1;
      --is-y-${yMax}: 0;
      --is-y-${yMin}: 0;
    }
    @media (min-width: ${xMax}px) {
      ${selector} {
        --is-x-between-${xMin}-${xMax}: 0;
        --is-x-${xMax}: 1;
        --is-x-${xMin}: 0;
      }
    }
    @media (max-width: ${xMin}px) {
      ${selector} {
        --is-x-between-${xMin}-${xMax}: 0;
        --is-x-${xMax}: 0;
        --is-x-${xMin}: 1;
      }
    }
    @media (min-height: ${yMax}px) {
      ${selector} {
        --is-y-between-${yMin}-${yMax}: 0;
        --is-y-${yMax}: 1;
        --is-y-${yMin}: 0;
      }
    }
    @media (max-height: ${yMax}px) {
      ${selector} {
        --is-y-between-${yMin}-${yMax}: 0;
        --is-y-${yMax}: 0;
        --is-y-${yMin}: 1;
      }
    }
  `}</style>
)

function between(
  from: number,
  to: number,
  xy: "x" | "y" = "x",
  min: number = xy === "x" ? WIDTH_MIN : HEIGHT_MIN,
  max: number = xy === "x" ? WIDTH_MAX : HEIGHT_MAX,
) {
  const slope = (to - from) / (max - min)
  const base = from - slope * min
  const unit = xy === "x" ? "vw" : "vh"
  return `
    calc((
        ${base}px + (100${unit} * ${slope})
      )            * var(--is-${xy}-between-${min}-${max})
      + (${from}px * var(--is-${xy}-${min}))
      + (${to}px   * var(--is-${xy}-${max}))
    )
  `
}

export const betweenY = (
  from: number,
  to: number,
  min?: number,
  max?: number,
) => between(from, to, "y", min, max)

export const betweenX = (
  from: number,
  to: number,
  min?: number,
  max?: number,
) => between(from, to, "x", min, max)
