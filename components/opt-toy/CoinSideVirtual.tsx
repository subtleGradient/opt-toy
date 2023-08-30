import * as React from "react"
import { BoolMaybe, isBool } from "./Coin"
export function CoinSideVirtual({
  coin: { description, heads, tails, headsDetail = "", tailsDetail = "" },
  side,
  onFlip,
}: {
  coin: {
    description: string
    heads: string
    tails: string
    headsDetail?: string
    tailsDetail?: string
  }
  side: BoolMaybe
  onFlip: (side: BoolMaybe) => void
}) {
  return (
    <tr>
      <td style={{ textAlign: "right" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            ...(isBool(side) && !side && { background: "#eee", color: "#000" }),
            borderRadius: 999,
            padding: "0 2px",
          }}
          title={tailsDetail}
        >
          <span
            style={{
              flex: 1,
              ...((isBool(side) &&
                (!side ? { fontWeight: "bold" } : { opacity: 0.5 })) ||
                null),
            }}
          >
            {tails}
          </span>
          <input
            type="radio"
            checked={isBool(side) && !side}
            onChange={(e) => onFlip(false)}
            onClick={(e) => onFlip(false)}
            style={{ margin: "1px 2px" }}
          />
        </label>
      </td>
      <td
        style={{
          textAlign: "center",
          fontSize: "75%",
        }}
      >
        <div onClick={() => onFlip(null)}>{description}</div>
      </td>
      <td>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            ...(!!side && { background: "#eee", color: "#000" }),
            borderRadius: 999,
            padding: "0 2px",
          }}
          title={headsDetail}
        >
          <input
            type="radio"
            checked={isBool(side) && !!side}
            onChange={(e) => onFlip(true)}
            onClick={(e) => onFlip(true)}
            style={{ margin: "1px 2px" }}
          />
          <span
            style={{
              flex: 1,
              ...((isBool(side) &&
                (side ? { fontWeight: "bold" } : { opacity: 0.5 })) ||
                null),
            }}
          >
            {heads}
          </span>
        </label>
      </td>
    </tr>
  )
}
