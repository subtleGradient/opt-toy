import * as React from "react";
import { Defs } from "./OPBubbles4";
import { SVG_OP_Bubble } from "./SVG_OP_Bubble";

export const SvgComponent = props => {
  return (
    <svg viewBox="0 0 893 610" fillRule="evenodd" clipRule="evenodd" {...props}>
      <g id="lines">
        <path
          d="M-18.881 44.5h123.762"
          stroke="#333"
          strokeWidth={5}
          transform="matrix(-1.19402 1.23567 -1.23566 -1.19401 492.035 359.857)"
        />
        <path
          d="M-13.855 37.75h116.71"
          stroke="#333"
          strokeWidth={3.99}
          transform="matrix(1.31032 1.11893 -1.11157 1.319 371.937 272.307)"
        />
      </g>
      <g id="consume">
        <path
          d="M170.116 9.576s-6.137 17.235-34.988 29.616C106.277 51.572 54.713 59.098 0 33.049c24.049 2.581 63.283-2.111 63.283-41.611"
          fill="none"
          stroke="#001aff"
          strokeWidth={2}
          strokeLinejoin="round"
          transform="matrix(-1.71693 .02997 .02994 1.7153 615.803 448.003)"
        />
        <text
          x={364.302}
          y={295.991}
          fontFamily="'ArialMT','Arial',sans-serif"
          fontSize={19.518}
          transform="translate(-199.029 -160.442) scale(2.289)"
        >
          {"Consume"}
        </text>
      </g>
      <g id="play">
        <path
          d="M132.591-2.45S69.148 67.665 0 28.882C15.681 24.056 39.268 12.41 39.268-27.09"
          fill="none"
          stroke="#001aff"
          strokeWidth={6}
          strokeLinejoin="round"
          transform="matrix(-1.49282 .86188 .86345 1.49554 679.45 325.746)"
        />
        <text
          x={402.586}
          y={239.69}
          fontFamily="'ArialMT','Arial',sans-serif"
          fontSize={30.778}
          transform="translate(-199.029 -160.442) scale(2.289)"
        >
          {"Play"}
        </text>
      </g>
      <g id="blast">
        <path
          d="M139 30.496s-62 27.5-139 18c14 1.5 38.5-16.5 38.5-56"
          fill="none"
          stroke="#001aff"
          strokeWidth={4}
          strokeLinejoin="round"
          transform="matrix(1.7183 0 0 -1.71876 210.442 177.733)"
        />
        <text
          x={172.987}
          y={118.081}
          fontFamily="'ArialMT','Arial',sans-serif"
          fontSize={24.772}
          textAnchor="end"
          transform="translate(-199.029 -160.442) scale(2.289)"
        >
          {"Blast"}
        </text>
      </g>
      <g id="sleep">
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M104.703 26.043S67.539 53.766 0 28.882c15.681-4.826 49.823-15.017 55.856-53.825"
          fill="none"
          stroke="red"
          strokeWidth={2.32}
          strokeLinejoin="round"
          strokeMiterlimit={6}
          strokeDasharray="6.96 6.96 0 0"
          strokeDashoffset={11.59}
          transform="matrix(1.72358 -.02525 .0253 1.72671 126.697 384.861)"
        />
        <text
          x={138.609}
          y={265.213}
          fontFamily="'ArialMT','Arial',sans-serif"
          fontSize={13.512}
          textAnchor="end"
          transform="translate(-199.029 -160.442) scale(2.289)"
        >
          {"Sleep"}
        </text>
      </g>

      <g id="bubble-borders">
        <g transform="translate(-825.987 -15.64) scale(1.04627)">
          <circle
            cx={1291.86}
            cy={225.59}
            r={122.333}
            fill="#fff"
            stroke="#fff"
            strokeWidth={14.34}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={1.5}
          />
        </g>
        <g transform="translate(-744.14 99.286) scale(.78883)">
          <circle
            cx={1291.86}
            cy={225.59}
            r={122.333}
            fill="#fff"
            stroke="#fff"
            strokeWidth={19.02}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={1.5}
          />
        </g>
        <g transform="matrix(.37684 0 0 .37684 -176.406 355.175)">
          <circle
            cx={1291.86}
            cy={225.59}
            r={122.333}
            fill="#fff"
            stroke="#fff"
            strokeWidth={39.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={1.5}
          />
        </g>
        <g transform="translate(-182.408 322.039) scale(.50068)">
          <circle
            cx={1291.86}
            cy={225.59}
            r={122.333}
            fill="#fff"
            stroke="#fff"
            strokeWidth={29.96}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={1.5}
          />
        </g>
      </g>

      <filter id="grayscale">
        <feColorMatrix type="saturate" values={`${1}`} />
      </filter>

      <g id="bubbles">
        <g
          transform={`translate(${401}, ${371})`}
          style={{ filter: "url(#grayscale)" }}
        >
          <SVG_OP_Bubble color="red" width={122} children="Fe" />
        </g>
        <g
          transform={`translate(${246}, ${376})`}
          style={{ filter: "url(#grayscale)" }}
        >
          <SVG_OP_Bubble color="green" width={92} children="Se" />
        </g>
        <g
          transform={`translate(${463}, ${157})`}
          style={{ filter: "url(#grayscale)" }}
        >
          <SVG_OP_Bubble color="yellow" width={256} children="Ni" />
        </g>
        <g
          transform={`translate(${211}, ${213})`}
          style={{ filter: "url(#grayscale)" }}
        >
          <SVG_OP_Bubble color="blue" width={193} children="Ti" />
        </g>
      </g>

      <Defs color="green" />
      <Defs color="blue" />
      <Defs color="yellow" />
      <Defs color="red" />
    </svg>
  );
};
