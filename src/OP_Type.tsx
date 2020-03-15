import * as React from "react";
import { OPTGraph } from "./opt128-svgr";
import { OPT512 } from "./OPT512";

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
