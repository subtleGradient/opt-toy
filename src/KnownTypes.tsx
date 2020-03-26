import * as React from "react"
import knownTypes from "./known-types.sheet.json"
import { OPT512 } from "./OPT512"
import "./KnownTypes.css"

export interface KnownType {
  opType: OPT512
  index: number
  "oPT#": number
  "oPT#+": string
  "m/F": string
  saviors: string
  animals: string
  typeCode: string
  doublyActivatedFunctions: string
  people1: string | null
  people2: string | null
  people3: string | null
  people4: string | null
  people5: string | null
  people6: string | null
  people7: string | null
  people8: string | null
  people9: string | null
  people10: string | null
  people11: string | null
  people12: string | null
  people13: string | null
  people14: string | null
}

export const KNOWN_TYPES: KnownType[] = knownTypes.map(knownType => ({
  ...knownType,
  opType: OPT512.fromCoinText(knownType.typeCode),
}))

export function KnownTypes({ addType, Cell = TypeTableCell }) {
  return (
    // prettier-ignore
    <div className="KnownTypes">
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(0, 32)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(32, 64)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(64, 96)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(96, 128)} />
    </div>
  )
}

export function KnownTypesTable({ addType, filters, Cell = TypeTableCell }) {
  let o = 0
  return (
    // prettier-ignore
    <div>
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 0, o + 32)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 32, o + 64)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 64, o + 96)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 96, o + 128)} />
      {void (o += 128)}
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 0, o + 32)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 32, o + 64)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 64, o + 96)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 96, o + 128)} />
      {void (o += 128)}
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 0, o + 32)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 32, o + 64)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 64, o + 96)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 96, o + 128)} />
      {void (o += 128)}
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 0, o + 32)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 32, o + 64)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 64, o + 96)} />
      <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(o + 96, o + 128)} />
    </div>
  )
}

function Cells({ kTypes, addType, Cell = TypeTableCell }) {
  return (
    <div className="TypeTableCells">
      <div className="TypeTableCell">{kTypes[0].animals}</div>
      <div className="TypeTableCell">{kTypes[1].animals}</div>
      <div className="TypeTableCell">{kTypes[2].animals}</div>
      <div className="TypeTableCell">{kTypes[3].animals}</div>
      {kTypes.map((kType: KnownType) => (
        <Cell
          key={kType.typeCode}
          className="TypeTableCell"
          kType={kType}
          addType={addType}
        />
      ))}
    </div>
  )
}
function TypeTableCell({ kType, addType, className }) {
  return (
    <a
      className={className}
      key={kType.typeCode}
      data-optype={kType.typeCode}
      onClick={e => {
        e.preventDefault()
        addType(
          kType.typeCode
            .split("-")
            .slice(1)
            .join("-"),
          kType.typeCode,
        )
      }}
    >
      {kType.typeCode.split("-")[1]}
    </a>
  )
}
