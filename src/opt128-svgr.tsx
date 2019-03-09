import * as React from "react";
import { Defs } from "./OPBubbles4";
import { SVG_OP_Bubble } from "./SVG_OP_Bubble";
import { bubbleTextStyle } from "./SVG_OP_BubbleText";

export const OPTGraph = ({ opType, ...props }) => {
  const { opFunctions } = opType;
  const opAnimals = {
    eSavior: { strength: 0, text: "Play" },
    blast: { strength: 1, text: "Blast" },
    consume: { strength: 2, text: "Consume" },
    eDemon: { strength: 3, text: "Sleep" }
  };

  const shouldFlipH = opFunctions[0].focus === "i";

  return (
    <OPTGraphInnards {...props} {...{ opFunctions, opAnimals, shouldFlipH }} />
  );
};

const AnimalStrengthToFontSize = [30.778, 24.772, 19.518, 13.512];

export const OPTGraphInnards = ({
  opFunctions,
  opAnimals,
  shouldFlipH,
  style,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 1015 610"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
      style={{
        ...style,
        transform: `scale(${shouldFlipH ? -1 : 1},1) translate(73px)`
      }}
    >
      <g>
        <g id="lines">
          <path
            d="M-13.855 37.75h116.71"
            stroke="#888"
            strokeWidth={3}
            transform="matrix(1.31032 1.11893 -1.11157 1.319 371.937 272.307)"
          />
          <path
            d="M-18.881 44.5h123.762"
            stroke="#fff"
            strokeWidth={5}
            transform="matrix(-1.19402 1.23567 -1.23566 -1.19401 492.035 359.857)"
          />
          <path
            d="M-18.881 44.5h123.762"
            stroke="#333"
            strokeWidth={3}
            transform="matrix(-1.19402 1.23567 -1.23566 -1.19401 492.035 359.857)"
          />
        </g>
        <g id="consume">
          <path
            {...AnimalStrokes[opAnimals.consume.strength]}
            d="M170.116 9.576s-6.137 17.235-34.988 29.616C106.277 51.572 54.713 59.098 0 33.049c24.049 2.581 63.283-2.111 63.283-41.611"
            fill="none"
            transform="matrix(-1.71693 .02997 .02994 1.7153 615.803 448.003)"
          />
          <g transform="translate(-199.029 -160.442) scale(2.289) translate(364.302 295.991)">
            <text
              fontFamily={bubbleTextStyle.fontFamily}
              fontSize={AnimalStrengthToFontSize[opAnimals.consume.strength]}
              style={
                shouldFlipH
                  ? { transform: `scale(-1,1)`, textAnchor: "end" }
                  : null
              }
            >
              {opAnimals.consume.text}
            </text>
          </g>
        </g>
        <g id="play">
          <path
            {...AnimalStrokes[opAnimals.eSavior.strength]}
            d="M132.591-2.45S69.148 67.665 0 28.882C15.681 24.056 39.268 12.41 39.268-27.09"
            fill="none"
            transform="matrix(-1.49282 .86188 .86345 1.49554 679.45 325.746)"
          />
          <g transform="translate(-199.029 -160.442) scale(2.289) translate(402.586 239.69)">
            <text
              fontFamily={bubbleTextStyle.fontFamily}
              fontSize={AnimalStrengthToFontSize[opAnimals.eSavior.strength]}
              style={
                shouldFlipH
                  ? { transform: `scale(-1,1)`, textAnchor: "end" }
                  : null
              }
            >
              {opAnimals.eSavior.text}
            </text>
          </g>
        </g>
        <g id="blast">
          <path
            {...AnimalStrokes[opAnimals.blast.strength]}
            d="M139 30.496s-62 27.5-139 18c14 1.5 38.5-16.5 38.5-56"
            fill="none"
            transform="matrix(1.7183 0 0 -1.71876 210.442 177.733)"
          />
          <g transform="translate(-199.029 -160.442) scale(2.289) translate(172.987 118.081)">
            {" "}
            <text
              fontFamily={bubbleTextStyle.fontFamily}
              fontSize={AnimalStrengthToFontSize[opAnimals.blast.strength]}
              style={
                shouldFlipH
                  ? { transform: `scale(-1,1)`, textAnchor: "start" }
                  : { textAnchor: "end" }
              }
            >
              {opAnimals.blast.text}
            </text>
          </g>
        </g>
        <g id="sleep">
          <path
            {...AnimalStrokes[opAnimals.eDemon.strength]}
            xmlns="http://www.w3.org/2000/svg"
            d="M104.703 26.043S67.539 53.766 0 28.882c15.681-4.826 49.823-15.017 55.856-53.825"
            fill="none"
            transform="matrix(1.72358 -.02525 .0253 1.72671 126.697 384.861)"
          />
          <g transform="translate(-199.029 -160.442) scale(2.289) translate(138.609 265.213)">
            {" "}
            <text
              fontFamily={bubbleTextStyle.fontFamily}
              fontSize={AnimalStrengthToFontSize[opAnimals.eDemon.strength]}
              style={
                shouldFlipH
                  ? { transform: `scale(-1,1)`, textAnchor: "start" }
                  : { textAnchor: "end" }
              }
            >
              {opAnimals.eDemon.text}
            </text>
          </g>
        </g>

        <filter id="grayscale">
          <feColorMatrix type="saturate" values={`${0}`} />
        </filter>

        <g id="bubbles">
          <Bub
            shouldFlipH={shouldFlipH}
            opFunction={opFunctions[0]}
            x={463}
            y={157}
            size={256}
          />
          <Bub
            shouldFlipH={shouldFlipH}
            opFunction={opFunctions[1]}
            x={211}
            y={213}
            size={193}
          />
          <Bub
            shouldFlipH={shouldFlipH}
            opFunction={opFunctions[2]}
            x={401}
            y={371}
            size={122}
          />
          <Bub
            shouldFlipH={shouldFlipH}
            opFunction={opFunctions[3]}
            x={246}
            y={376}
            size={92}
          />
        </g>
      </g>

      <Defs color="green" />
      <Defs color="blue" />
      <Defs color="yellow" />
      <Defs color="red" />
    </svg>
  );
};

function Bub({ shouldFlipH, opFunction, x, y, size }) {
  return (
    <g>
      <BubbleBorder size={opFunction.index} black={opFunction.sex === "m"} />
      <g
        transform={`translate(${x}, ${y}) ${
          shouldFlipH ? `scale(-1,1) translate(${-128}, 0)` : ""
        }`}
        style={{
          filter: opFunction.savior ? undefined : "url(#grayscale)"
        }}
      >
        <SVG_OP_Bubble
          color={LetterToColor[opFunction.letter]}
          width={size}
          prefix={opFunction.sex}
          children={`${opFunction.letter}${opFunction.focus}`}
        />
      </g>
    </g>
  );
}

const LetterToColor = {
  S: "green",
  T: "blue",
  N: "yellow",
  F: "red"
};

const AnimalStrokes: React.SVGProps<SVGPathElement>[] = [
  { stroke: "#001aff", strokeWidth: 6, strokeLinejoin: "round" },
  { stroke: "#001aff", strokeWidth: 4, strokeLinejoin: "round" },
  { stroke: "#001aff", strokeWidth: 2, strokeLinejoin: "round" },
  {
    stroke: "red",
    strokeWidth: 2.32,
    strokeLinejoin: "round",
    strokeMiterlimit: 6,
    strokeDasharray: "6.96 6.96 0 0",
    strokeDashoffset: 11.59
  }
];

function BubbleBorder({
  black,
  size = 0
}: {
  black?: boolean;
  size: 0 | 1 | 2 | 3;
}) {
  const transform = [
    "translate(-825.987 -15.64) scale(1.04627)",
    "translate(-744.14 99.286) scale(.78883)",
    "translate(-182.408 322.039) scale(.50068)",
    "matrix(.37684 0 0 .37684 -176.406 355.175) translate(0 -2)"
  ][size];
  const stroke = [15, 21, 29.96, 39.8][size];
  return (
    <g transform={transform}>
      <circle
        cx={1291.86}
        cy={225.59}
        r={122 + stroke / 3}
        fill={black ? "#000" : "#fff"}
        stroke={black ? "#000" : "#fff"}
        strokeWidth={stroke / 3}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={1.5}
      />
    </g>
  );
}
