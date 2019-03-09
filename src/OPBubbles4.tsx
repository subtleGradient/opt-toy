import * as React from "react";
import { SFC } from "react";

type Colors = "gray" | "green" | "yellow" | "red" | "blue";

export const AllTheThings: SFC<{
  color?: Colors;
}> = ({ color = "green" }) => (
  <svg>
    <Bubble color={color} />
    <Defs color={color} />
  </svg>
);

export function Defs({ color }: { color: Colors }) {
  return (
    <React.Fragment>
      {color === "gray" && (
        <defs>
          <radialGradient
            id="gray1"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(84.5895 -.58973 -.60427 -87.2114 63.933 45.585)"
          >
            <stop offset={0} stopColor="#e3e3e3" stopOpacity={0} />
            <stop offset={1} stopColor="#dadada" />
          </radialGradient>
          <radialGradient
            id="gray2"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(70.7996 -.0897 -.1027 -81.5697 63.933 45.585)"
          >
            <stop offset={0} stopColor="#e3e3e3" stopOpacity={0} />
            <stop offset={0.73} stopColor="#bfbfbf" />
            <stop offset={0.88} stopColor="#a6a6a6" />
            <stop offset={1} stopColor="#424242" />
          </radialGradient>
          <radialGradient
            id="gray3"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-74.9668 1.32545 1.43934 60.8214 63.763 66.28)"
          >
            <stop offset={0} stopColor="#e3e3e3" stopOpacity={0} />
            <stop offset={0.6} stopColor="#e5e5e5" stopOpacity={0.18} />
            <stop offset={0.81} stopColor="#eaeaea" stopOpacity={0.588} />
            <stop offset={1} stopColor="#efefef" />
          </radialGradient>
        </defs>
      )}
      {color === "green" && (
        <defs>
          <radialGradient
            id="green1"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(84.6241 -.58973 -.60451 -87.2114 64 33.692)"
          >
            <stop offset={0} stopColor="#00ff18" stopOpacity={0} />
            <stop offset={0.55} stopColor="#00cb60" stopOpacity={0.706} />
            <stop offset={1} stopColor="#00b67e" />
          </radialGradient>
          <radialGradient
            id="green2"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(70.8286 -.0897 -.10274 -81.5697 63.959 45.585)"
          >
            <stop offset={0} stopColor="#00e49c" stopOpacity={0} />
            <stop offset={0.6} stopColor="#00c888" stopOpacity={0.173} />
            <stop offset={0.81} stopColor="#008859" stopOpacity={0.576} />
            <stop offset={1} stopColor="#004528" />
          </radialGradient>
          <radialGradient
            id="green3"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-74.9975 1.32545 1.43993 60.8214 63.783 66.28)"
          >
            <stop offset={0} stopColor="#00ff98" stopOpacity={0} />
            <stop offset={0.6} stopColor="#25ffa5" stopOpacity={0.18} />
            <stop offset={0.81} stopColor="#78ffc2" stopOpacity={0.588} />
            <stop offset={1} stopColor="#ccffdf" />
          </radialGradient>
        </defs>
      )}
      {color === "yellow" && (
        <defs>
          <radialGradient
            id="yellow1"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(84.5895 -.58973 -.60427 -87.2114 63.933 45.585)"
          >
            <stop offset={0} stopColor="#ffff18" stopOpacity={0} />
            <stop offset={1} stopColor="#e8ff00" />
          </radialGradient>
          <radialGradient
            id="yellow2"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(70.7996 -.0897 -.1027 -81.5697 63.933 45.585)"
          >
            <stop offset={0} stopColor="#ffff18" stopOpacity={0} />
            <stop offset={0.73} stopColor="#ffc503" />
            <stop offset={0.88} stopColor="#dfaa02" />
            <stop offset={1} stopColor="#624000" />
          </radialGradient>
          <radialGradient
            id="yellow3"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-74.9668 1.32545 1.43934 60.8214 63.763 66.28)"
          >
            <stop offset={0} stopColor="#ffff18" stopOpacity={0} />
            <stop offset={0.6} stopColor="#fffe30" stopOpacity={0.18} />
            <stop offset={0.81} stopColor="#fffc65" stopOpacity={0.588} />
            <stop offset={1} stopColor="#fff99b" />
          </radialGradient>
        </defs>
      )}
      {color === "red" && (
        <defs>
          <radialGradient
            id="red1"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(84.8049 -.58973 -.6058 -87.2114 63.965 37.89)"
          >
            <stop offset={0} stopColor="#ee009f" stopOpacity={0} />
            <stop offset={0.56} stopColor="#fa0661" stopOpacity={0.702} />
            <stop offset={1} stopColor="#ff0847" />
          </radialGradient>
          <radialGradient
            id="red2"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(70.98 -.0897 -.10296 -81.5697 64.096 45.585)"
          >
            <stop offset={0} stopColor="#e60000" stopOpacity={0} />
            <stop offset={0.62} stopColor="#ce000b" stopOpacity={0.165} />
            <stop offset={0.82} stopColor="#940025" stopOpacity={0.565} />
            <stop offset={1} stopColor="#550041" />
          </radialGradient>
          <radialGradient
            id="red3"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-75.1578 1.32545 1.443 60.8214 63.92 66.28)"
          >
            <stop offset={0} stopColor="#ffb6b6" stopOpacity={0} />
            <stop offset={0.6} stopColor="#ffc3c3" stopOpacity={0.18} />
            <stop offset={0.81} stopColor="#ffe1e1" stopOpacity={0.588} />
            <stop offset={1} stopColor="#fff" />
          </radialGradient>
        </defs>
      )}
      {color === "blue" && (
        <defs>
          <radialGradient
            id="blue1"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(84.6547 -.58973 -.60473 -87.2114 64 37.827)"
          >
            <stop offset={0} stopColor="#0ff" stopOpacity={0} />
            <stop offset={0.44} stopColor="#0ac4ff" stopOpacity={0.8} />
            <stop offset={1} stopColor="#0db5ff" />
          </radialGradient>
          <radialGradient
            id="blue2"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(70.8542 -.0897 -.10278 -81.5697 63.982 45.585)"
          >
            <stop offset={0} stopColor="#0ff" stopOpacity={0} />
            <stop offset={0.6} stopColor="#00dce4" stopOpacity={0.173} />
            <stop offset={0.81} stopColor="#008ba5" stopOpacity={0.576} />
            <stop offset={1} stopColor="#003764" />
          </radialGradient>
          <radialGradient
            id="blue3"
            cx={0}
            cy={0}
            r={1}
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(-75.0247 1.32545 1.44045 60.8214 63.806 66.28)"
          >
            <stop offset={0} stopColor="#0ff" stopOpacity={0} />
            <stop offset={0.6} stopColor="#25fffd" stopOpacity={0.18} />
            <stop offset={0.81} stopColor="#78fffa" stopOpacity={0.588} />
            <stop offset={1} stopColor="#ccfff6" />
          </radialGradient>
        </defs>
      )}
    </React.Fragment>
  );
}

export function Bubble({
  color = "gray",
  ...props
}: {
  color: string;
  style?: any;
}) {
  return (
    <g {...props}>
      <circle cx={64} cy={64} r={64} fill="#fff" />
      <circle cx={64} cy={64} r={64} fill={`url(#${color}1)`} />
      <circle cx={64} cy={64} r={64} fill={`url(#${color}2)`} />
      <path
        d="M7.32 52.214c0 26.98 113.156 26.98 113.156 0S95.125 3.33 63.898 3.33C32.672 3.33 7.32 25.234 7.32 52.214z"
        fill={`url(#${color}3)`}
      />
    </g>
  );
}
