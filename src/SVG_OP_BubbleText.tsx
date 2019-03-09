import * as React from "react";
import { SFC } from "react";

export const bubbleTextStyle = {
  fontFamily: `Roboto, "HelveticaNeue", "Helvetica Neue", Helvetica, sans-serif`,
  textShadow: "1px 2px 2px rgba(0,0,0,0.25)",
  fontSize: 64
  // transform: "translateY(3px)",
  // letterSpacing: -2.5,
};

export const BubbleText: SFC<{ prefix?: string }> = ({ prefix, children }) => {
  if (prefix === "?") prefix = "";
  return (
    <text
      x={128 / 2}
      y={128 * 0.66}
      textAnchor="middle"
      style={bubbleTextStyle}
    >
      {prefix && <tspan style={{ fontSize: "50%" }}>{prefix}</tspan>}
      {children}
    </text>
  );
};
