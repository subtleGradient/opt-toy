import React, { FC, ComponentType, createContext, useContext } from "react"
import knownTypes from "./known-types.sheet.json"
import { OPT512 } from "./OPT512"
import { sortBy } from "./sortBy"

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

export const KnownTypes: FC<{
  addType: any
  Cell?: typeof TypeTableCell
}> = ({ addType, Cell = TypeTableCell }) => {
  return (
    <div className="KnownTypes">
      <style jsx>{`
        .KnownTypes {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
      `}</style>
      {/* prettier-ignore */}
      <>
        <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(0, 32)} />
        <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(32, 64)} />
        <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(64, 96)} />
        <Cells addType={addType} Cell={Cell} kTypes={KNOWN_TYPES.slice(96, 128)} />
      </>
    </div>
  )
}

export const KnownTypesTable: FC<{
  addType?: any
  Cell?: typeof TypeTableCell
}> = ({ addType, Cell = TypeTableCell }) => {
  let o = 0
  return (
    <div className="KnownTypes">
      <style jsx>{`
        .KnownTypes {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
      `}</style>
      {/* prettier-ignore */}
      <>
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
      </>
    </div>
  )
}

const Cells: FC<{
  kTypes: KnownType[]
  addType: any
  Cell: typeof TypeTableCell
}> = ({ kTypes, addType, Cell = TypeTableCell }) => {
  const selectedTypes = useContext(SelectedTypes)
  kTypes.sort(({ opType: a }, { opType: b }) =>
    sortBy(b.sortValue, a.sortValue),
  )
  return (
    <div className="Cells">
      <style jsx>{`
        .Cells {
          box-sizing: border-box;
          width: 25%;
          border-bottom: 2px solid #aaa;
        }

        .Cells {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .Cells > * {
          box-sizing: border-box;
          width: 25%;
          text-align: center;
          font-size: 0.8em;
          /*border: 2px solid transparent;*/
          cursor: pointer;
        }

        .Cells > * > :global(*) {
          padding: 1ex 0;
        }

        @media (max-width: 424px) {
          .Cells {
            width: 50%;
          }
        }
        @media (min-width: 425px) and (max-width: 767px) {
          .Cells {
            width: 25%;
          }
        }
        @media (min-width: 768px) {
          .Cells {
            width: 25%;
          }
        }

        [data-optype] {
          display: flex;
        }
        span[data-optype] > :global(*) {
          display: block;
          flex: 1;
        }
        [data-optype]:hover {
          border-color: #000;
        }

        [data-optype*="Ni/"] > :global(*),
        [data-optype*="Si/"] > :global(*) {
          background: #c9daf8;
        }
        [data-optype*="Ne/"] > :global(*),
        [data-optype*="Se/"] > :global(*) {
          background: #d9ead3;
        }
        [data-optype*="Fi/"] > :global(*),
        [data-optype*="Ti/"] > :global(*) {
          background: #efefef;
        }
        [data-optype*="Fe/"] > :global(*),
        [data-optype*="Te/"] > :global(*) {
          background: #f4cccc;
        }
        [data-selected="true"] {
          outline: 2px solid black;
          z-index: 1;
        }
      `}</style>
      <div>{kTypes[0].animals}</div>
      <div>{kTypes[1].animals}</div>
      <div>{kTypes[2].animals}</div>
      <div>{kTypes[3].animals}</div>
      {kTypes.map((kType: KnownType) => {
        const selected = kType.opType.includesAnyText(...selectedTypes)
        return (
          <span
            key={kType.typeCode}
            data-optype={kType.typeCode}
            data-selected={selected}
          >
            <Cell kType={kType} addType={addType} selected={selected} />
          </span>
        )
      })}
    </div>
  )
}

export const SelectedTypes = createContext<string[]>([])

const TypeTableCell: FC<{
  addType: (typeCodePart: string, typeCode: string) => void
  kType: KnownType
  selected?: boolean
  className?: string
}> = ({ kType, addType, selected = false, ...props }) => {
  return (
    <a
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
      {...props}
    >
      {kType.typeCode.split("-")[1]}
    </a>
  )
}
