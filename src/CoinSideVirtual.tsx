import * as React from "react";
import { BoolMaybe, isBool } from "./Coin";
export function CoinSideVirtual({
  coin: { heads, tails, description },
  side,
  onFlip,
}: {
  coin: {
    heads: string;
    tails: string;
    description: string;
  };
  side: BoolMaybe;
  onFlip: (side: BoolMaybe) => void;
}) {
  return (
    <tr>
      <td style={{ textAlign: "right" }}>
        <label>
          <span
            style={{ fontWeight: isBool(side) && !side ? "bold" : undefined }}
          >
            {tails}
          </span>
          <input
            type="radio"
            checked={isBool(side) && !side}
            onChange={e => onFlip(!e.currentTarget.checked)}
          />
        </label>
      </td>
      <td>
        <input
          type="radio"
          checked={!isBool(side)}
          style={{ opacity: isBool(side) ? 1 : 0.1 }}
          onChange={e => e.currentTarget.checked && onFlip(null)}
        />
      </td>
      <td>
        <label>
          <input
            type="radio"
            checked={isBool(side) && !!side}
            onChange={e => onFlip(e.currentTarget.checked)}
          />
          <span
            style={{ fontWeight: isBool(side) && side ? "bold" : undefined }}
          >
            {heads}
          </span>
        </label>
      </td>
      <th style={{ textAlign: "right" }}>{description}</th>
    </tr>
  );
}
