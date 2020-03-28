// inspired by https://css-tricks.com/between-the-lines/

export const WIDTH_MIN = 320
export const WIDTH_MAX = 1024
export const HEIGHT_MIN = 568
export const HEIGHT_MAX = 1024

export const betweenRootStylesX = ({
  selector,
  min = WIDTH_MIN,
  max = WIDTH_MAX,
}: {
  selector: string
  min?: number
  max?: number
}) =>
  `
    ${selector} {
      --is-x-between-${min}-${max}: 1;
      --is-x-${max}: 0;
      --is-x-${min}: 0;
    }
    @media (min-width: ${max}px) {
      ${selector} {
        --is-x-between-${min}-${max}: 0;
        --is-x-${max}: 1;
        --is-x-${min}: 0;
      }
    }
    @media (max-width: ${min}px) {
      ${selector} {
        --is-x-between-${min}-${max}: 0;
        --is-x-${max}: 0;
        --is-x-${min}: 1;
      }
    }
  `

export const betweenRootStylesY = ({
  selector,
  min = HEIGHT_MIN,
  max = HEIGHT_MAX,
}: {
  selector: string
  min?: number
  max?: number
}) =>
  `
      ${selector} {
        --is-y-between-${min}-${max}: 1;
        --is-y-${max}: 0;
        --is-y-${min}: 0;
      }
      @media (min-height: ${max}px) {
        ${selector} {
          --is-y-between-${min}-${max}: 0;
          --is-y-${max}: 1;
          --is-y-${min}: 0;
        }
      }
      @media (max-height: ${max}px) {
        ${selector} {
          --is-y-between-${min}-${max}: 0;
          --is-y-${max}: 0;
          --is-y-${min}: 1;
        }
      }
    `

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
