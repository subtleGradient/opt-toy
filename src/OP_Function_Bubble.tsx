import * as React from "react";
import { PropertyControls, ControlType } from "framer";
import { Bubble, Defs } from "./OPBubbles4";
import { BubbleText } from "./SVG_OP_BubbleText";

const intrinsicWidth = 128;
const intrinsicHeight = 128;

const colors = { green: "Green", yellow: "Yellow", red: "Red", blue: "Blue" };

const opFunctionNames = ["", "Fe", "Te", "Fi", "Ti", "Se", "Si", "Ne", "Ni"];

interface Props {
  width: number;
  height: number;
  color: keyof typeof colors;
  saturate?: number;
  text: string;
}

export class OP_Function_Bubble extends React.Component<Props> {
  static defaultProps = {
    color: Object.keys(colors)[0],
  };
  static propertyControls: PropertyControls = {
    color: {
      title: "Color",
      type: ControlType.SegmentedEnum,
      options: Object.keys(colors),
      optionTitles: Object.keys(colors).map(key => colors[key]),
    },
    saturate: {
      type: ControlType.Number,
      min: 0,
      max: 1,
      step: 0.1,
    },
  };
  render() {
    const { width, height, saturate = 1, text } = this.props;
    return (
      <svg viewBox={`0 0 ${width} ${height}`}>
        <filter id="grayscale">
          <feColorMatrix type="saturate" values={"" + saturate} />
        </filter>
        <g
          transform={`scale(${width / intrinsicWidth} ${height /
            intrinsicHeight})`}
          style={{ filter: saturate < 1 && "url(#grayscale)" }}
        >
          <Bubble color={this.props.color} />
          <BubbleText>{text}</BubbleText>
        </g>
        <Defs color={this.props.color} />
      </svg>
    );
  }
}
