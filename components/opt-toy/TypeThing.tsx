import React, { FC, useEffect, useState, createContext, useMemo } from "react"
import useUndo from "use-undo"
import { AOPActivationSpectrums } from "./AOPActivationSpectrums"
import AOPActivationTable from "./AOPActivationTable"
import { betweenX } from "./between"
import { BLANK_TYPE, OPT512Maybe, parseCoinText } from "./Coin"
import OPActivationTable from "./OPActivationTable"
import { OPCodeInput } from "./OPCodeInput"
import { OPTGraph } from "./opt128-svgr"
import { cleanCoinText, OPT512 } from "./OPT512"
import { OPTypeBinaryForm } from "./OPTypeBinaryForm"

const isSSR = typeof window === "undefined"

function OPTypeBinaryText({ type }: { type: OPT512Maybe }) {
  const opt = new OPT512(type)
  return <span>{opt.OPSCode}</span>
}

const SEPARATOR = `!`

const Spacer = () => <span style={{ flex: "1 1 0%" }} />

const History = (props) => (
  <div>
    <button
      key="undo"
      onClick={props.opTypeActions.undo}
      disabled={!props.opTypeActions.canUndo}
    >
      undo
    </button>
    <button
      key="redo"
      onClick={props.opTypeActions.redo}
      disabled={!props.opTypeActions.canRedo}
    >
      redo
    </button>
    <button
      key="clear"
      onClick={() =>
        props.opTypeActions.reset({
          name: "",
          type: BLANK_TYPE.slice(0) as OPT512Maybe,
        })
      }
    >
      clear
    </button>
  </div>
)

const Permalink = (props) => (
  <a href={`#?type[]=${props.typeText}`} title={props.typeText} target="_blank">
    permalink
  </a>
)

export type TypeThingProps = {
  selected?: boolean
  defaultType: string
  onClose?: () => void
  onChangeText?: (opType: string) => void
  showOPTable?: boolean
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type NameAndTypeText = {
  name: string
  typeText: string
}

export const TypeThing: FC<TypeThingProps> = ({
  selected = false,
  defaultType: defaultTypeAndName,
  onClose = null,
  onChangeText = null,
  showOPTable = true,
  ...props
}) => {
  const defaultState = useMemo<NameAndTypeText>(
    () => ({
      name: String(defaultTypeAndName.split(SEPARATOR)[1] || ""),
      typeText: defaultTypeAndName
        ? cleanCoinText(defaultTypeAndName.split(SEPARATOR)[0])
        : "",
    }),
    [defaultTypeAndName],
  )
  const [name, setName] = useState(defaultState.name)
  const [type, setType] = useState<OPT512Maybe>(
    () => OPT512.from(defaultState.typeText).type,
  )
  const opTypeInstance = new OPT512(type)
  const typeText = opTypeInstance.OPSCode

  useEffect(() => {
    console.log(opTypeInstance)
  }, [typeText, ...type])

  useEffect(() => {
    onChangeText?.(`${typeText}${name ? SEPARATOR + name : ""}`)
  }, [name, typeText])

  const [isOpen, setIsOpen] = useState(selected)

  const placeholderName = `${opTypeInstance.S1}/${opTypeInstance.S2}`
  return (
    <div className="TypeThing" data-is-open={isOpen} {...props}>
      <style jsx>{`
        .TypeThing :global(svg),
        .TypeThing :global(svg) :global(*) {
          transition: all 0.5s ease-in-out;
        }

        .TypeThing {
          transition: all 0.25s ease-in-out;
          box-sizing: border-box;
          padding: 2em 1ex;
        }

        .TypeThing button {
          font-size: 0.9em;
        }

        .TypeThing input[type="text"],
        .TypeThing input:not([type]) {
          box-sizing: border-box;
          width: 100%;
        }
        .TypeThing:active :global(input),
        .TypeThing:hover :global(input) {
          background-color: #ffffdd;
        }
        .TypeThing:not(:hover) :global(input) {
          border-color: transparent;
        }

        .TypeThing .spacer {
          margin: 1ex 0;
        }
        h3,
        h4 {
          margin: 0;
        }
      `}</style>
      <div
        style={{
          textAlign: "center",
          marginTop: betweenX(8, 16),
        }}
        onClick={(e) => {
          if (e.button !== 0) {
            e.stopPropagation()
            return
          }
          setIsOpen(!isOpen)
        }}
        onMouseDown={(e) => {
          if (e.button === 1) onClose()
        }}
      >
        <div>
          <h3>
            {isOpen ? (
              <input
                style={{ font: "inherit", textAlign: "center", color: "#333" }}
                onClick={(e) => e.stopPropagation()}
                onChange={({ currentTarget: { value: name } }) => setName(name)}
                value={name}
                placeholder={placeholderName}
              />
            ) : (
              <div style={{ padding: 3 }}>{name || placeholderName}</div>
            )}
          </h3>
        </div>
        <div>
          <OPTGraph style={{ maxWidth: 500 }} opType={opTypeInstance} />
        </div>
        <div>
          <h4>
            {isOpen ? (
              <OPCodeInput
                style={{ font: "inherit", textAlign: "center" }}
                onClick={(e) => e.stopPropagation()}
                opType={opTypeInstance}
                onChange={(opType) => setType(opType.type)}
              />
            ) : (
              <div style={{ padding: 3 }}>
                <OPTypeBinaryText type={type} />
              </div>
            )}
          </h4>
        </div>
        {showOPTable && (
          <div className="spacer">
            <OPActivationTable op512={opTypeInstance} />
          </div>
        )}
        <AOPActivationTable op512={opTypeInstance} />
        {opTypeInstance.isFull && (
          <AOPActivationSpectrums op512={opTypeInstance} />
        )}
        <div style={{ height: betweenX(8, 16) }}></div>
      </div>
      {isOpen && (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              padding: `1ex`,
              background: "#eee",
            }}
          >
            <Permalink typeText={typeText}></Permalink>
            {/* <Spacer /> */}
            {/* <History opTypeActions={opTypeUndoActions}></History> */}
            <Spacer />
            {onClose && (
              <button onClick={onClose} title="Delete">
                🗑️
              </button>
            )}
          </div>
          <OPTypeBinaryForm type={type} onChange={setType} />
        </div>
      )}{" "}
    </div>
  )
}
