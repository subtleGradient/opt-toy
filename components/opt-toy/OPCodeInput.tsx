import * as React from "react"
import { OPT512 } from "./OPT512"
import { parseCoinText, cleanCoinText, OPT512Maybe } from "./Coin"
import { useEffect } from "react"

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
  const cleanedValue = cleanCoinText(value)
  useEffect(() => {
    console.log(value, cleanedValue)
  }, [cleanedValue, value])

  const parsedCoins = parseCoinText(cleanedValue)
  useEffect(() => {
    if (opType.isEmpty) return
    onParsed(parsedCoins)
    console.log(inputTypeText, ...coins)
    console.log(cleanedValue, ...parsedCoins)
  }, [...parsedCoins, value, inputTypeText, ...coins])

  return (
    <input
      {...props}
      spellCheck={false}
      style={{ opacity: isEditing ? 1 : 0.8, ...style }}
      placeholder={inputTypeText}
      value={isEditing ? value : inputTypeText}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={(e) => {
        // setValue(cleanCoinText(inputTypeText))
        setIsEditing(true)
      }}
      onBlur={(e) => {
        setIsEditing(false)
      }}
    />
  )
}
