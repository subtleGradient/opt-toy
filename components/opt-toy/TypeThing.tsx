import React, { FC, useEffect, useState, createContext } from "react"
import useUndo from "use-undo"
import { AOPActivationSpectrums } from "./AOPActivationSpectrums"
import AOPActivationTable from "./AOPActivationTable"
import { betweenX } from "./between"
import { BLANK_TYPE, cleanCoinText, OPT512Maybe, parseCoinText } from "./Coin"
import OPActivationTable from "./OPActivationTable"
import { OPCodeInput } from "./OPCodeInput"
import { OPTGraph } from "./opt128-svgr"
import { OPT512 } from "./OPT512"
import { OPTypeBinaryForm } from "./OPTypeBinaryForm"

const isSSR = typeof window === "undefined"

function OPTypeBinaryText({ type }: { type: OPT512Maybe }) {
  const opt = new OPT512(type)
  return <span>{opt.OP512}</span>
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
      key="reset"
      onClick={() =>
        props.opTypeActions.reset({
          name: "",
          type: BLANK_TYPE.slice(0) as OPT512Maybe,
        })
      }
    >
      reset
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

export const TypeThing: FC<TypeThingProps> = ({
  selected = false,
  defaultType,
  onClose = null,
  onChangeText = null,
  showOPTable = true,
  ...props
}) => {
  useEffect(() => {
    opTypeActions.reset({
      name: String(defaultType.split(SEPARATOR)[1] || ""),
      type: parseCoinText(cleanCoinText(defaultType.split(SEPARATOR)[0])),
    })
  }, [])

  const [isOpen, setIsOpen] = useState(selected)
  const [opType, opTypeActions] = useUndo({
    name: "loading...",
    type: BLANK_TYPE,
  })
  const opTypeInstance = new OPT512(opType.present.type)
  const typeText = opTypeInstance.OP512

  useEffect(() => {
    if (opType.past.length === 0) return
    if (onChangeText) {
      onChangeText(
        `${typeText}${
          opType.present.name ? SEPARATOR + opType.present.name : ""
        }`,
      )
    }
  }, [opType.present.name, typeText])

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
                onChange={(e) =>
                  opTypeActions.set({
                    type: opType.present.type,
                    name: e.currentTarget.value,
                  })
                }
                value={opType.present.name}
                placeholder={placeholderName}
              />
            ) : (
              <div style={{ padding: 3 }}>
                {opType.present.name || placeholderName}
              </div>
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
                coins={opTypeInstance.type}
                onParsed={(type) => {
                  opTypeActions.set({ name: opType.present.name, type })
                }}
              />
            ) : (
              <div style={{ padding: 3 }}>
                <OPTypeBinaryText type={opTypeInstance.type} />
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
        {opTypeInstance.isFull && <AOPActivationSpectrums op512={opTypeInstance} />}
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
            <Spacer />
            <History opTypeActions={opTypeActions}></History>
            <Spacer />
            {onClose && (
              <button onClick={onClose} title="Delete">
                🗑️
              </button>
            )}
          </div>
          <OPTypeBinaryForm
            type={opType.present.type}
            onChange={(type) => {
              opTypeActions.set({ name: opType.present.name, type })
            }}
          />
        </div>
      )}{" "}
    </div>
  )
}
