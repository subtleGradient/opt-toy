import * as React from "react"
import { OPT512 } from "./OPT512"
import { parseCoinText, cleanCoinText, OPT512Maybe } from "./Coin"

export function OPCodeInput({
  coins,
  onParsed,
  style = null,
  ...props
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  coins: OPT512Maybe
  onParsed: (type: OPT512Maybe) => void
  style?: React.CSSProperties
}) {
  const opType = new OPT512(coins)
  let inputTypeText = opType.OP512
  if (opType.isEmpty) inputTypeText = ""
  let [value, setValue] = React.useState(inputTypeText)
  let [isEditing, setIsEditing] = React.useState(false)
  // if (!isEditing) value = inputTypeText
  // if (type == null) type = value
  // else value = inputTypeText
  function handleChange(event: { currentTarget: { value: string } }) {
    const newValue = cleanCoinText(event.currentTarget.value)
    setValue(newValue)
    onParsed(parseCoinText(newValue))
  }
  return (
    <input
      {...props}
      style={{ opacity: isEditing ? 1 : 0.8, ...style }}
      placeholder={inputTypeText}
      onChange={handleChange}
      value={isEditing ? value : inputTypeText}
      onFocus={e => {
        setValue(cleanCoinText(inputTypeText))
        setIsEditing(true)
      }}
      onBlur={e => {
        setIsEditing(false)
      }}
    />
  )
}
