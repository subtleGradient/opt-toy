import * as React from "react"
import { betweenX } from "./between"
import { BLANK_TYPE, COINS, isBool, OPT512Maybe } from "./Coin"
import { CoinSideVirtual } from "./CoinSideVirtual"
import { OPT512 } from "./OPT512"

export function OPTypeBinaryForm({
  type = BLANK_TYPE,
  onChange,
}: {
  type: OPT512Maybe
  onChange: (type: OPT512Maybe) => void
}) {
  if (!type) type = BLANK_TYPE
  const opType = new OPT512(type)
  return (
    // <SVG_OP_Bubble color="red" width={128} children="Fe" />
    <div
      className="OPTypeBinaryForm"
      style={{
        fontSize: betweenX(10, 12),
      }}
    >
      <style jsx>{`
        .OPTypeBinaryForm td {
          white-space: nowrap;
        }
      `}</style>
      <table style={{ margin: "auto" }}>
        <tbody style={{ background: "#ddd" }}>
          <tr>
            <td style={{ textAlign: "right" }}>{opType.iCount}</td>
            <td style={{ textAlign: "center" }}>{opType.nullCount}</td>
            <td>{opType.eCount}</td>
          </tr>
        </tbody>
        <tbody>
          {type.map((coinSide, coinIndex) => {
            const lastCoin = COINS[coinIndex - 1]
            return (
              <React.Fragment key={coinIndex}>
                {lastCoin?.title !== COINS[coinIndex].title && (
                  <tr>
                    <td
                      colSpan={3}
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        borderTop: "1px solid black",
                      }}
                    >
                      {COINS[coinIndex].title}
                    </td>
                  </tr>
                )}
                <CoinSideVirtual
                  side={coinSide}
                  coin={COINS[coinIndex]}
                  onFlip={(side) => {
                    const newType = type.slice(0) as OPT512Maybe
                    newType[coinIndex] = side
                    onChange(newType)
                  }}
                />
              </React.Fragment>
            )
          })}
        </tbody>

        <tbody style={{ background: "#ddd" }}>
          <tr>
            <td style={{ textAlign: "center" }} colSpan={3}>
              {Math.pow(2, opType.nullCount)} / 512
            </td>
          </tr>

          <tr>
            <td style={{ textAlign: "right" }} />
            <td style={{ textAlign: "center" }} />
            <td />
          </tr>

          <tr>
            <td style={{ textAlign: "right" }} />
            <td style={{ textAlign: "center" }} />
            <td />
          </tr>
        </tbody>

        <tbody style={{ background: "#eee" }}>
          <CoinSideVirtual
            side={opType.sideOfEnergyInfo}
            coin={{
              description: "Dominant",
              heads: "Info",
              tails: "Energy",
            }}
            onFlip={(side) => {
              console.warn("modifying sideOfEnergyInfo Not implemented")
            }}
          />
          <CoinSideVirtual2
            side={opType.sideOfNFST}
            tails="NF"
            heads="ST"
            edge={"OD"}
            onFlipWithXx={(OOO, DDD) => {
              opType.oLetter = OOO
              opType.dLetter = DDD
              onChange(opType.type)
            }}
          />
          <CoinSideVirtual2
            side={opType.sideOfSFNT}
            tails="NT"
            heads="SF"
            edge={"OD"}
            onFlipWithXx={(OOO, DDD) => {
              opType.oLetter = OOO
              opType.dLetter = DDD
              onChange(opType.type)
            }}
          />
          <CoinSideVirtual2
            side={opType.sideOfNiSe}
            tails="Ni"
            heads="Se"
            edge={"Ox"}
            onFlipWithXx={(letter, focus) => {
              opType.oLetter = letter
              opType.oFocus = focus
              onChange(opType.type)
            }}
          />
          <CoinSideVirtual2
            side={opType.sideOfSiNe}
            tails="Si"
            heads="Ne"
            edge={"Ox"}
            onFlipWithXx={(letter, focus) => {
              opType.oLetter = letter
              opType.oFocus = focus
              onChange(opType.type)
            }}
          />
          <CoinSideVirtual2
            side={opType.sideOfFiTe}
            tails="Fi"
            heads="Te"
            edge={"Dx"}
            onFlipWithXx={(letter, focus) => {
              opType.dLetter = letter
              opType.dFocus = focus
              onChange(opType.type)
            }}
          />
          <CoinSideVirtual2
            side={opType.sideOfTiFe}
            tails="Ti"
            heads="Fe"
            edge={"Dx"}
            onFlipWithXx={(letter, focus) => {
              opType.dLetter = letter
              opType.dFocus = focus
              onChange(opType.type)
            }}
          />
          <tr />
        </tbody>
      </table>
    </div>
  )
}

function CoinSideVirtual2({
  description = "",
  side,
  heads,
  tails,
  edge,
  onFlipWithXx,
}) {
  return (
    <CoinSideVirtual
      side={side}
      coin={{
        description,
        heads,
        tails,
      }}
      onFlip={(side) => {
        onFlipWithXx(
          !isBool(side) ? edge[0] : side ? heads[0] : tails[0],
          !isBool(side) ? edge[1] : side ? heads[1] : tails[1],
        )
      }}
    />
  )
}
