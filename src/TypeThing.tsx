import * as React from "react";
import useUndo from "use-undo";
import { OPT512Maybe, BLANK_TYPE, parseCoinText, cleanCoinText } from "./Coin";
import { OPTypeBinaryForm } from "./OPTypeBinaryForm";
import { OPTypeBinaryText } from "./index";
import { OPCodeInput } from "./OPCodeInput";
import { OP_Type } from "./OP_Type";
import { OPT512 } from "./OPT512";
export function TypeThing({
  selected = false,
  defaultType,
  onClose = null,
  onChangeText = null,
}) {
  const [isOpen, setIsOpen] = React.useState(selected);
  const [opType, opTypeActions] = useUndo(
    parseCoinText(cleanCoinText(defaultType)),
  );
  const opTypeInstance = new OPT512(opType.present);
  const typeText = opTypeInstance.OP512;

  React.useEffect(() => {
    if (onChangeText) onChangeText(typeText);
  }, [opType.present]);
  // React.useEffect(() => {
  //   if (defaultType) {
  //     const type = parseCoinText(cleanCoinText(defaultType));
  //     console.log("defaultType", defaultType, type);
  //     opTypeActions.set(type);
  //   }
  // }, [defaultType]);

  return (
    <div
      style={{
        border: `1px solid`,
        borderColor: isOpen ? `#000` : `#eee`,
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: 24,
          marginTop: "1ex",
          minWidth: 256,
        }}
        onClick={e => {
          setIsOpen(!isOpen);
        }}
      >
        <div>
          <OPTypeBinaryText type={opTypeInstance.type} />
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
                opTypeActions.reset(BLANK_TYPE.slice(0) as OPT512Maybe)
              }
            >
              reset
            </button>
            <OPCodeInput
              type={opTypeInstance.type}
              onParsed={newType => {
                opTypeActions.set(newType);
              }}
            />
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
            type={opType.present}
            onChange={newType => {
              opTypeActions.set(newType);
            }}
          />
        </div>
      )}{" "}
    </div>
  );
}
