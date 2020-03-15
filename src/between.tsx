// inspired by https://css-tricks.com/between-the-lines/
import * as React from "react"

export const BetweenRootStyles = ({ className }: { className: string }) => (
  <style>{`
    .${className} {
      --is-between-vw: 1;
      --is-max-vw: 0;
      --is-min-vw: 0;

      --is-between-vh: 1;
      --is-max-vh: 0;
      --is-min-vh: 0;
    }
    @media (min-width: ${WIDTH_MAX}px) {
      .${className} {
        --is-between-vw: 0;
        --is-max-vw: 1;
        --is-min-vw: 0;
      }
    }
    @media (max-width: ${WIDTH_MIN}px) {
      .${className} {
        --is-between-vw: 0;
        --is-max-vw: 0;
        --is-min-vw: 1;
      }
    }
    @media (min-height: ${HEIGHT_MAX}px) {
      .${className} {
        --is-between-vh: 0;
        --is-max-vh: 1;
        --is-min-vh: 0;
      }
    }
    @media (max-height: ${HEIGHT_MIN}px) {
      .${className} {
        --is-between-vh: 0;
        --is-max-vh: 0;
        --is-min-vh: 1;
      }
    }
  `}</style>
)

function between(
  from: number,
  to: number,
  dimension: "x" | "y" = "x",
  unit: "px" | "%" | "rem" = "px",
  fromWidth: number = dimension === "y" ? HEIGHT_MIN : WIDTH_MIN,
  toWidth: number = dimension === "y" ? HEIGHT_MAX : WIDTH_MAX,
) {
  const slope = (to - from) / (toWidth - fromWidth)
  const base = from - slope * fromWidth
  const u2 = dimension === "y" ? "vh" : "vw"
  return `
    calc(
      (
        ${base}${unit}
        + (
          100${u2} * ${slope}
        )
      )                * var(--is-between-${u2})
      + ${from}${unit} * var(--is-min-${u2})
      + ${to}${unit}   * var(--is-max-${u2})
    )
  `
}

export const WIDTH_MIN = 320
export const WIDTH_MAX = 1024
export const HEIGHT_MIN = 568
export const HEIGHT_MAX = 1024

export const betweenY = (
  from: number,
  to: number,
  unit: "px" | "%" | "rem" = "px",
  fromWidth?: number,
  toWidth?: number,
) => between(from, to, "y", unit, fromWidth, toWidth)

export const betweenX = (
  from: number,
  to: number,
  unit: "px" | "%" | "rem" = "px",
  fromWidth?: number,
  toWidth?: number,
) => between(from, to, "x", unit, fromWidth, toWidth)
