import * as React from "react"
// import { PropertyControls, ControlType } from "framer";
import { Defs } from "./OPBubbles4"
import { SVG_OP_Bubble } from "./SVG_OP_Bubble"

// Define type of property
interface Props {
  width: number
  height: number
  text: string
}

export const intrinsicWidth = 128
export const intrinsicHeight = 128

const Gold = 0.61803398875

export class OP_Type extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: "Hello World!",
  }

  // Items shown in property panel
  // static propertyControls: PropertyControls = {
  //   text: { type: ControlType.String, title: "Text" }
  // };

  render() {
    const { width = 256, height = 256 } = this.props
    return (
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width, height }}>
        <filter id="grayscale">
          <feColorMatrix type="saturate" values={1} />
        </filter>
        <g
          transform={`scale(${width / intrinsicWidth} ${height /
            intrinsicHeight})`}
          style={{ filter: "url(#grayscale)" }}
        >
          {
            <g transform={`translate(${0}, ${0})`}>
              <SVG_OP_Bubble color="red" width={128} children="Fe" />
            </g>
          }
          {
            <g transform={`translate(${0}, ${0})`}>
              <SVG_OP_Bubble color="green" width={128 * Gold} children="Se" />
            </g>
          }
          {
            <g transform={`translate(${0}, ${0})`}>
              <SVG_OP_Bubble
                color="yellow"
                width={128 * Gold * Gold}
                children="Ni"
              />
            </g>
          }
          {
            <g transform={`translate(${0}, ${0})`}>
              <SVG_OP_Bubble
                color="blue"
                width={128 * Gold * Gold * Gold}
                children="Ti"
              />
            </g>
          }
        </g>
        <Defs color="green" />
        <Defs color="blue" />
        <Defs color="yellow" />
        <Defs color="red" />
      </svg>
    )
  }
}
