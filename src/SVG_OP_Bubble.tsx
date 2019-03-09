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
  text?: string;
  gray?: boolean;
}> = ({ prefix, color, width, height = width, text, gray }) => (
  <g
    className={`SVG_OP_Bubble ${prefix || "?"}${text}`}
    style={{
      transform: fromCenter(
        intrinsicWidth,
        intrinsicHeight,
        `scale(${width / intrinsicWidth}, ${height / intrinsicHeight})`,
      ),
    }}
  >
    <Bubble color={color} />
    <Bubble color="gray" style={{ opacity: gray ? 1 : 0 }} />
    <BubbleText prefix={prefix}>{text}</BubbleText>
  </g>
);
