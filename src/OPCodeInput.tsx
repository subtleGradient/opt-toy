import * as React from "react";
import { OPT512 } from "./OPT512";
import { parseCoinText, cleanCoinText } from "./Coin";

export function OPCodeInput({ type, onParsed }) {
  const opType = new OPT512(type);
  let inputTypeText = opType.OP512;
  if (opType.isEmpty) inputTypeText = "";
  let [value, setValue] = React.useState(inputTypeText);
  let [isEditing, setIsEditing] = React.useState(false);
  // if (!isEditing) value = inputTypeText
  // if (type == null) type = value
  // else value = inputTypeText
  function handleChange(event) {
    const newValue = cleanCoinText(event.currentTarget.value);
    setValue(newValue);
    onParsed(parseCoinText(newValue));
  }
  return (
    <React.Fragment>
      <input
        style={{ border: isEditing ? `1px solid lime` : `1px solid red` }}
        placeholder={inputTypeText}
        onChange={isEditing ? handleChange : null}
        value={isEditing ? value : inputTypeText}
        onFocus={e => {
          setValue(cleanCoinText(inputTypeText));
          setIsEditing(true);
        }}
        onBlur={e => {
          setIsEditing(false);
        }}
      />
    </React.Fragment>
  );
}
