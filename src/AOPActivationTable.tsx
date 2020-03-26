import * as React from "react"
import { OPT512 } from "./OPT512"
import "./AOPActivationTable.css"
import { betweenX } from "./between"

export default function AOPActivationTable({ op512 }: { op512: OPT512 }) {
  const showSex = op512.fmDe !== "?" || op512.fmS !== "?"
  return (
    <div className="AOPActivationTable">
      {op512.animals.map(
        ({ code, flipSideIsLast, observer: Ox, decider: Dx }, index) => {
          const [previous, next] = [
            op512.animals[index - 1],
            op512.animals[index + 1],
          ]

          return (
            <span
              key={code}
              className={`animal ${Ox.sex + Dx.sex} ${code} ${flipSideIsLast &&
                "flipSideIsLast"}`}
            >
              {showSex && (
                <span className="part sex">{(Ox.sex + Dx.sex).toUpperCase()}</span>
              )}
              <span>
                {Ox.code}
                {Dx.code}
              </span>
              <span className={`aa`}>{code}</span>
              <span
                className={`part o ${next?.observer === Ox &&
                  "pair next"} ${previous?.observer === Ox && "pair previous"}`}
              >
                <i>{Ox.sex}</i>
                {Ox.code}
                {Ox.focus}
              </span>
              <span
                className={`part o ${next?.decider === Dx &&
                  "pair next"} ${previous?.decider === Dx && "pair previous"}`}
              >
                <i>{Dx.sex}</i>
                {Dx.code}
                {Dx.focus}
              </span>
            </span>
          )
        },
      )}
    </div>
  )
}
