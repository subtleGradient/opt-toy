import * as React from "react";
import useUndo from "use-undo";
import { OPT512Maybe, BLANK_TYPE } from "./Coin";
import { OPTypeBinaryForm } from "./OPTypeBinaryForm";
import { OPTypeBinaryText } from "./index";
import { OPCodeInput } from "./OPCodeInput";
export function TypeThing({ storageID = null }) {
  const [opType, opTypeActions] = useUndo(BLANK_TYPE.slice(0) as OPT512Maybe);
  React.useEffect(() => {
    if (storageID) {
      try {
        opTypeActions.set(JSON.parse(localStorage.getItem(storageID)));
      } catch (e) {}
    }
  }, [storageID]);
  React.useEffect(() => {
    if (storageID)
      localStorage.setItem(storageID, JSON.stringify(opType.present));
  }, [storageID, opType.present]);
  return (
    <div>
      <div>
        <button
          key="undo"
          onClick={opTypeActions.undo}
          disabled={!opTypeActions.canUndo}
        >
          undo
        </button>{" "}
        <button
          key="redo"
          onClick={opTypeActions.redo}
          disabled={!opTypeActions.canRedo}
        >
          redo
        </button>{" "}
        <button
          key="reset"
          onClick={() =>
            opTypeActions.reset(BLANK_TYPE.slice(0) as OPT512Maybe)
          }
        >
          reset
        </button>
      </div>
      <OPCodeInput
        type={opType.present}
        onParsed={newType => {
          opTypeActions.set(newType);
        }}
      />
      <OPTypeBinaryText type={opType.present} />
      <OPTypeBinaryForm
        type={opType.present}
        onChange={newType => {
          opTypeActions.set(newType);
        }}
      />
    </div>
  );
}
