import * as React from "react";
import { SFC } from "react";

import { Bubble } from "./OPBubbles4";
import { BubbleText } from "./SVG_OP_BubbleText";

import { fromCenter } from "./fromCenter";
import { intrinsicWidth, intrinsicHeight } from "./OP_Type";

export const SVG_OP_Bubble: SFC<{
  color: string;
  width: number;
  height?: number;
  prefix?: string;
}> = ({ prefix, color, width, height = width, children }) => (
  <g
    transform={fromCenter(
      intrinsicWidth,
      intrinsicHeight,
      `scale(${width / intrinsicWidth} ${height / intrinsicHeight})`
    )}
  >
    <Bubble color={color} />
    <BubbleText prefix={prefix}>{children}</BubbleText>
  </g>
);
