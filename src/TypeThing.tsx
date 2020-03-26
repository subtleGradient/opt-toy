import * as React from "react"
import useUndo from "use-undo"
import { OPT512Maybe, BLANK_TYPE, parseCoinText, cleanCoinText } from "./Coin"
import { OPTypeBinaryForm } from "./OPTypeBinaryForm"
import { OPCodeInput } from "./OPCodeInput"
import { OP_Type } from "./OP_Type"
import { OPT512 } from "./OPT512"
import OPActivationTable from "./OPActivationTable"
import AOPActivationTable from "./AOPActivationTable"
import { betweenX } from "./between"

function OPTypeBinaryText({ type }: { type: OPT512Maybe }) {
  const opt = new OPT512(type)
  return <span>{opt.OP512}</span>
}

const SEPARATOR = `!`

const Spacer = () => <span style={{ flex: "1 1 0%" }} />

const History = props => (
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

const Permalink = props => (
  <a href={`#?type[]=${props.typeText}`} title={props.typeText} target="_blank">
    permalink
  </a>
)

export function TypeThing({
  selected = false,
  defaultType,
  onClose = null,
  onChangeText = null,
}) {
  const [isOpen, setIsOpen] = React.useState(selected)
  const [opType, opTypeActions] = useUndo({
    name: String(defaultType.split(SEPARATOR)[1] || ""),
    type: parseCoinText(cleanCoinText(defaultType.split(SEPARATOR)[0])),
  })
  const opTypeInstance = new OPT512(opType.present.type)
  const typeText = opTypeInstance.OP512
  const displayName = opType.present.name || typeText

  React.useEffect(() => {
    if (onChangeText) {
      onChangeText(
        `${typeText}${
          opType.present.name ? SEPARATOR + opType.present.name : ""
        }`,
      )
    }
  }, [opType.present.name, typeText])

  return (
    <div
      className="TypeThing"
      data-is-open={isOpen}
      style={{
        border: `1px solid`,
        borderColor: isOpen ? `#000` : `#eee`,
        // minWidth: 256,
      }}
    >
      <div
        style={{
          // fontSize: betweenX(16, 20),
          textAlign: "center",
          marginTop: betweenX(8, 16),
        }}
        onClick={e => {
          setIsOpen(!isOpen)
        }}
      >
        <div>
          <h3>
            {isOpen ? (
              <input
                style={{ font: "inherit", textAlign: "center", color: '#333' }}
                onClick={e => e.stopPropagation()}
                onChange={e =>
                  opTypeActions.set({
                    type: opType.present.type,
                    name: e.currentTarget.value,
                  })
                }
                value={opType.present.name}
                placeholder="Human Name"
              />
            ) : (
              <div style={{padding:3}}>{opType.present.name}</div>
            )}
          </h3>
        </div>
        <OP_Type opType={opTypeInstance} />
        <div>
          <code>
            {isOpen ? (
              <OPCodeInput
                style={{ font: "inherit", textAlign: "center",  }}
                onClick={e => e.stopPropagation()}
                coins={opTypeInstance.type}
                onParsed={type => {
                  opTypeActions.set({ name: opType.present.name, type })
                }}
              />
            ) : (
              <div style={{padding:3}}><OPTypeBinaryText type={opTypeInstance.type} /></div>
            )}
          </code>
        </div>
        <OPActivationTable op512={opTypeInstance} />
        <AOPActivationTable op512={opTypeInstance} />
        <div style={{ height: betweenX(8, 16) }}></div>
      </div>
      {isOpen && (
        <div
          style={
            {
              // minWidth: 500
            }
          }
        >
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
              <button onClick={onClose}>
                <b>X</b> Delete
              </button>
            )}
          </div>
          <OPTypeBinaryForm
            type={opType.present.type}
            onChange={type => {
              opTypeActions.set({ name: opType.present.name, type })
            }}
          />
        </div>
      )}{" "}
    </div>
  )
}
