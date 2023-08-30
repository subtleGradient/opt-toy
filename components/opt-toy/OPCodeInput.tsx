import * as React from "react"
import { OPT512 } from "./OPT512"
import { useEffect } from "react"

export function OPCodeInput({
  opType,
  onChange,
  style = null,
  ...props
}: Omit<JSX.IntrinsicElements["input"], "onChange"> & {
  opType: OPT512
  onChange: (type: OPT512) => void
  style?: React.CSSProperties
}) {
  const defaultValue = opType.OPSCode
  const [isEditing, setIsEditing] = React.useState(false)
  let [inputValue, setInputValue] = React.useState("")

  useEffect(() => {
    const nextType = OPT512.fromCoinText(inputValue)
    if (nextType.nullCount >= 7) return
    console.log(nextType + "")
    onChange(nextType)
  }, [inputValue])

  if (!isEditing) {
    inputValue = defaultValue
  }
  return (
    <input
      {...props}
      spellCheck={false}
      style={{ opacity: isEditing ? 1 : 0.8, ...style }}
      placeholder={defaultValue}
      value={isEditing ? inputValue : defaultValue}
      onChange={(event) => setInputValue(event.currentTarget.value)}
      onFocus={(e) => setIsEditing(true)}
      onBlur={(e) => setIsEditing(false)}
    />
  )
}
