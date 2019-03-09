import * as React from "react";
import { OP_Type } from "./OP_Type";
import { OPT512 } from "./OPT512";
import { OPT512Maybe, COINS, BLANK_TYPE } from "./Coin";
import { CoinSideVirtual } from "./CoinSideVirtual";
export function OPTypeBinaryForm({
  type = BLANK_TYPE,
  onChange
}: {
  type: OPT512Maybe;
  onChange: (type: OPT512Maybe) => void;
}) {
  if (!type) type = BLANK_TYPE;
  const opType = new OPT512(type);
  return (
    <div>
      <table>
        <tbody>
          {type.map((coinSide, coinIndex) => (
            <CoinSideVirtual
              key={coinIndex}
              side={coinSide}
              coin={COINS[coinIndex]}
              onFlip={side => {
                const newType = type.slice(0) as OPT512Maybe;
                newType[coinIndex] = side;
                onChange(newType);
              }}
            />
          ))}
        </tbody>

        <tbody style={{ background: "#ddd" }}>
          <tr>
            <td style={{ textAlign: "right" }}>{opType.iCount}</td>
            <td style={{ textAlign: "center" }}>{opType.nullCount}</td>
            <td>{opType.eCount}</td>
            <th>value counts</th>
          </tr>

          <tr>
            <td style={{ textAlign: "right" }} colSpan={3}>
              {Math.pow(2, opType.nullCount)}
            </td>
            <th>matching type count</th>
          </tr>

          <tr>
            <td style={{ textAlign: "right" }} />
            <td style={{ textAlign: "center" }} />
            <td />
            <th />
          </tr>
        </tbody>

        <tbody style={{ background: "#eee" }}>
          <CoinSideVirtual
            side={opType.sideOfEnergyInfo}
            coin={{
              heads: "Info",
              tails: "Energy",
              description: `${opType.A4} ${opType.sideOfEnergyInfo} ${
                opType.a2Focus
              } ${opType.a3Focus}`
            }}
            onFlip={side => {
              opType.a3FocusBool = side == null ? null : !opType.a3FocusBool;
              onChange(opType.type);
            }}
          />
          <tr>
            <th colSpan={4}>TODO: MM activation vs FF activation</th>
          </tr>
        </tbody>
      </table>
      <OP_Type opType={opType} />
    </div>
    // <SVG_OP_Bubble color="red" width={128} children="Fe" />
  );
}
