import { OPPart, OPT512 } from "./OPT512"

export function AOPActivationSpectrums({ op512 }: { op512: OPT512 }) {
  return null
  return (
    <table>
      <style jsx>{`
        table {
          border: 1px solid #ccc;
        }
        progress {
          width: 100%;
        }
        th,
        td {
          text-align: right;
        }
      `}</style>
      <tbody>
        <Row a="Di" A={op512.Di} b="De" B={op512.De} />
        <Row a="Oi" A={op512.Oi} b="Oe" B={op512.Oe} />
        <Row A={op512.F} B={op512.T} />
        <Row A={op512.N} B={op512.S} />
        {/* <Row A={op512.NF} B={op512.ST} />
        <Row A={op512.NT} B={op512.SF} />
        <Row A={op512.sleep} B={op512.play} />
        <Row A={op512.consume} B={op512.blast} /> */}
      </tbody>
    </table>
  )
}

function Row({ A, B, a=A.code,b=B.code }: { A: OPPart; B: OPPart, a?:string,b?:string }) {
  return (
    <tr>
      <style jsx>{`
        table {
          border: 1px solid #ccc;
        }
        progress {
          width: 100%;
        }
        th,
        td {
          text-align: right;
        }
        th.A {
          color: blue;
        }
        progress[value] {
          appearance: none;
        }
        progress[value]::-webkit-progress-bar {
          background-color: yellow;
        }
        progress[value]::-webkit-progress-value {
          background-color: blue;
          transition: width .5s ease-in-out;
        }
      `}</style>
      <th className="A">{a}</th>
      <td style={{ width: "100%" }}>
        <progress
          max={A.activationDistance + B.activationDistance}
          value={A.activationDistance}
        />
      </td>
      <th>{b}</th>
    </tr>
  )
}
