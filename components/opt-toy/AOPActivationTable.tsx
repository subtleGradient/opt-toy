import * as React from "react"
import { OPT512 } from "./OPT512"
import { betweenX } from "./between"

export default function AOPActivationTable({ op512 }: { op512: OPT512 }) {
  const showSex = op512.fmDe !== "?" || op512.fmS !== "?"
  return (
    <div className="AOPActivationTable">
      <style jsx>{`
        .AOPActivationTable {
          box-sizing: border-box;
          font-size: 1em;
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        .AOPActivationTable .animal {
          border-radius: 1.5ex;
          display: flex;
          flex-direction: column;
          padding: 1ex 0;
          align-items: center;
          /* justify-items: stretch; */
        }
        .AOPActivationTable .part {
          width: 2.5em;
          text-align: center;
          padding: 0.1em 0.3em;
          box-sizing: border-box;
          height: 2em;
          line-height: 1.5em;
          margin: 2px 0;
          font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
        }
        .AOPActivationTable .part i {
          font-style: normal;
          font-size: 1.5ex;
          opacity: 0.5;
        }

        .AOPActivationTable .animal.mm {
          font-weight: bold;
        }
        .AOPActivationTable .animal.flipSideIsLast {
          background-color: yellow;
        }
        .AOPActivationTable .animal.flipSideIsLast.mm {
          color: yellow;
          background-color: black;
        }
        .AOPActivationTable .sex {
          font-size: 75%;
        }
        .AOPActivationTable .aa {
          font-size: 2em;
        }

        /* .AOPActivationTable .ff .sex,
.AOPActivationTable .mm .sex {

} */

        .AOPActivationTable .pair {
          border: 2px solid blue;
        }
        .AOPActivationTable .pair.next {
          border-radius: 1em 0 0 1em;
          border-right: 0;
          margin-right: 0;
          margin-left: 4px;
        }
        .AOPActivationTable .pair.previous {
          border-radius: 0 1em 1em 0;
          border-left: 0;
          margin-left: 0;
          margin-right: 4px;
        }

        .AOPActivationTable .animal.index0 .pair,
        .AOPActivationTable .animal.index1 .pair.previous {
          border-color: #fff;
          background: blue;
          color: white;
        }
        .AOPActivationTable .animal.index0.flipSideIsLast .pair,
        .AOPActivationTable .animal.index1.flipSideIsLast .pair.previous {
          color: yellow;
        }
      `}</style>
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
                "flipSideIsLast"} index${index}`}
            >
              <span className="part sex">
                {showSex && (Ox.sex + Dx.sex).toUpperCase()}
              </span>
              <span>
                {Ox.code}
                {Dx.code}
              </span>
              <span className={`aa`}>{code}</span>
              <span
                className={`part o ${next?.observer === Ox &&
                  "pair next"} ${previous?.observer === Ox && "pair previous"}`}
              >
                {showSex && <i>{Ox.sex}</i>}
                {Ox.code}
                {Ox.focus}
              </span>
              <span
                className={`part o ${next?.decider === Dx &&
                  "pair next"} ${previous?.decider === Dx && "pair previous"}`}
              >
                {showSex && <i>{Dx.sex}</i>}
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
