import * as React from "react";
import { SFC } from "react";
import { bubbleTextStyle } from "./OP_Function_Bubble";
export const BubbleText: SFC<{}> = ({ children }) => (
  <text
    x={128 / 2}
    y={128 / 2}
    textAnchor="middle"
    alignmentBaseline="middle"
    style={bubbleTextStyle}
  >
    {children}
  </text>
);
