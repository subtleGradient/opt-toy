import * as React from "react";
// import { PropertyControls, ControlType } from "framer";
import { Defs } from "./OPBubbles4";
import { SVG_OP_Bubble } from "./SVG_OP_Bubble";
import { OPT512 } from "./OPT512";
import { OPTGraph } from "./opt128-svgr";

// Define type of property
interface Props {
  width?: number;
  height?: number;
  opType: OPT512;
}

export const intrinsicWidth = 128;
export const intrinsicHeight = 128;

const Gold = 0.61803398875;

export class OP_Type extends React.Component<Props> {
  // Set default properties
  static defaultProps = {
    text: "Hello World!"
  };

  // Items shown in property panel
  // static propertyControls: PropertyControls = {
  //   text: { type: ControlType.String, title: "Text" }
  // };

  render() {
    const { height = 256, width = height * 4, opType } = this.props;
    return <OPTGraph style={{ maxWidth: 500 }} opType={opType} />;
  }
}
