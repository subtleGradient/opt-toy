import * as React from "react"
import { OPT512 } from "./OPT512"
import { betweenX } from "./between"

export default function OPActivationTable({ op512 }: { op512: OPT512 }) {
  const showSex = op512.fmDe !== "?" || op512.fmS !== "?"
  return (
    <div className="OPActivationTable">
      <style jsx>{`
        .OPActivationTable {
          box-sizing: border-box;
          font-size: 1em;
        }

        .OPActivationTable table {
          width: 100%;
          border-spacing: 0;
          border-collapse: collapse;
        }

        .OPActivationTable table td,
        .OPActivationTable table th {
          width: 25%;
          border: 1px solid #cccccc;
        }

        .OPActivationTable table th {
          background-color: #eeeeee;
          font-size: 80%;
          font-weight: normal;
        }

        .OPActivationTable .animals {
          background-color: #eeeeee;
        }
        .OPActivationTable .animals th {
          width: 50%;
        }

        /* .OPActivationTable table.layout {
  
} */
        .OPActivationTable table.layout > tbody > tr > td {
          border: none;
          padding: 0;
          padding-right: 0.2em;
        }
        .OPActivationTable table.layout > tbody > tr > td + td {
          padding: 0;
          padding-left: 0.2em;
        }
      `}</style>
      <table className="layout">
        <tbody>
          <tr>
            <td style={{ width: "66.6%" }}>
              <table className="functions">
                <thead>
                  <tr>
                    <th>Active</th>
                    {showSex && <th title="modality">Sex</th>}
                    <th>Function</th>
                    <th>Savior</th>
                  </tr>
                </thead>
                <tbody>
                  {op512.functions.map(
                    ({ code, activation1or2, saviorCode, opFn }) => (
                      <tr key={code}>
                        <td>{activation1or2}</td>
                        {showSex && (
                          <td
                            title={{ f: "feminine", m: "masculine" }[opFn?.sex]}
                          >
                            {opFn?.sex}
                          </td>
                        )}
                        <td>
                          {code}
                          {opFn?.focus}
                        </td>
                        <td>{saviorCode}</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </td>
            <td style={{ width: "33.3%" }}>
              <table className="animals">
                <thead>
                  <tr>
                    <th>Savior</th>
                    <th>Animal</th>
                  </tr>
                </thead>
                <tbody>
                  {op512.animals.map(({ code, index }) => (
                    <tr key={code}>
                      <td
                        title={
                          {
                            0: "First Animal",
                            1: "Secondary Savior Animal",
                            2: `Activated Demon "Hobby" Animal`,
                            3: "Last Animal",
                          }[index]
                        }
                      >
                        {{ 0: "S1", 1: "S2", 2: "A", 3: "-" }[index]}
                      </td>
                      <td
                        title={
                          {
                            P: "Play",
                            B: "Blast",
                            C: "Consume",
                            S: "Sleep",
                          }[code]
                        }
                      >
                        {code}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
