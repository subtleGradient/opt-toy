import * as React from "react";
import useUndo from "use-undo";
import { OPT512Maybe, BLANK_TYPE, parseCoinText, cleanCoinText } from "./Coin";
import { OPTypeBinaryForm } from "./OPTypeBinaryForm";
import { OPCodeInput } from "./OPCodeInput";
import { OP_Type } from "./OP_Type";
import { OPT512 } from "./OPT512";

function OPTypeBinaryText({ type }: { type: OPT512Maybe }) {
  const opt = new OPT512(type);
  return <span>{opt.OP512}</span>;
}

const SEPARATOR = `!`;

export function TypeThing({
  selected = false,
  defaultType,
  onClose = null,
  onChangeText = null,
}) {
  const [isOpen, setIsOpen] = React.useState(selected);
  const [opType, opTypeActions] = useUndo({
    name: String(defaultType.split(SEPARATOR)[1] || ""),
    type: parseCoinText(cleanCoinText(defaultType.split(SEPARATOR)[0])),
  });
  const opTypeInstance = new OPT512(opType.present.type);
  const typeText = opTypeInstance.OP512;
  const displayName = opType.present.name || typeText;

  React.useEffect(() => {
    if (onChangeText) {
      onChangeText(
        `${typeText}${
          opType.present.name ? SEPARATOR + opType.present.name : ""
        }`,
      );
    }
  }, [opType.present.name, typeText]);
  // React.useEffect(() => {
  //   if (defaultType) {
  //     const type = parseCoinText(cleanCoinText(defaultType));
  //     console.log("defaultType", defaultType, type);
  //     opTypeActions.set(type);
  //   }
  // }, [defaultType]);

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
          textAlign: "center",
          fontSize: 24,
          marginTop: "1ex",
        }}
        onClick={e => {
          setIsOpen(!isOpen);
        }}
      >
        <div>
          <h3>{opType.present.name}</h3>
          <code>
            <OPTypeBinaryText type={opTypeInstance.type} />
          </code>
        </div>
        <OP_Type opType={opTypeInstance} />
      </div>
      {isOpen && (
        <div style={{ minWidth: 500 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              padding: `1ex`,
              background: "#eee",
            }}
          >
            <button
              key="undo"
              onClick={opTypeActions.undo}
              disabled={!opTypeActions.canUndo}
            >
              undo
            </button>
            <button
              key="redo"
              onClick={opTypeActions.redo}
              disabled={!opTypeActions.canRedo}
            >
              redo
            </button>
            <button
              key="reset"
              onClick={() =>
                opTypeActions.reset({
                  name: "",
                  type: BLANK_TYPE.slice(0) as OPT512Maybe,
                })
              }
            >
              reset
            </button>
            <input
              onChange={e =>
                opTypeActions.set({
                  type: opType.present.type,
                  name: e.currentTarget.value,
                })
              }
              value={opType.present.name}
              placeholder="Human Name"
            />
            <code>
              <OPCodeInput
                type={opTypeInstance.type}
                onParsed={type => {
                  opTypeActions.set({ name: opType.present.name, type });
                }}
              />
            </code>
            <a href={`#?type[]=${typeText}`} title={typeText} target="_blank">
              permalink
            </a>{" "}
            <span style={{ flex: "1 1 0%" }} />
            {onClose && (
              <button onClick={onClose}>
                <b>X</b> Delete
              </button>
            )}
          </div>
          <OPTypeBinaryForm
            type={opType.present.type}
            onChange={type => {
              opTypeActions.set({ name: opType.present.name, type });
            }}
          />
        </div>
      )}{" "}
    </div>
  );
}
