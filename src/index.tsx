import * as React from "react"
import { render } from "react-dom"
import { OP_Type } from "./OP_Type"
import { SVG_OP_Bubble } from "./SVG_OP_Bubble"
import useUndo from "use-undo"

import "./styles.css"

function defaultCoinParseMethod(type: string) {
  const isHeads = this.testHeads.test(type)
  const isTails = this.testTails.test(type)
  return isHeads === true ? true : isTails === true ? false : null
}

const NamedCOINS = {
  coinSfm: {
    index: -1,
    short: "coinSfm",
    description: "Sensory Modality",
    heads: "S masculine",
    tails: "femanine S",
    clean: type =>
      type
        .replace(/\?\?-/, "")
        .replace(
          /([fm][fm])[-]*([DTFOSN])?/i,
          (_, FM, S1S2) =>
            `${FM.toUpperCase()}${S1S2 == null ? "" : `-${S1S2}`}`,
        ),
    testHeads: /^M[FM]|mS|fN/,
    testTails: /^F[FM]|fS|mN/,
    parse: defaultCoinParseMethod,
  },
  coinDefm: {
    index: -1,
    short: "coinDefm",
    description: "Extroverted Decider Modality",
    heads: "De masculine",
    tails: "femanine De",
    clean: type =>
      type.replace(
        /([fm])([DTFOSN][xei])/i,
        (_, fm, De) => `${fm.toLowerCase()}${De}`,
      ),
    testHeads: /^[FM]M|m[DTF]e|f[DTF]i/,
    testTails: /^[FM]F|f[DTF]e|m[DTF]i/,
    parse: defaultCoinParseMethod,
  },
  coinOD: {
    index: -1,
    short: "coinOD",
    description: "OD",
    heads: "D+OO Decider",
    tails: "Observer O+DD",
    clean: type =>
      type
        .replace(
          /([fm]?)([DTF]|[OSN])([xei])/gi,
          (_, fm0 = "", F1 = "", f2 = "") =>
            `${fm0.toLowerCase()}${F1.toUpperCase()}${f2.toLowerCase()}`,
        )
        .replace(/([DTFOSN][xei])([DTFOSN][ei])/g, "$1/$2"),
    testHeads: /(^|-)[mf]?[DTF][xei]|[mf]?[DTF][xei]\//i,
    testTails: /(^|-)[mf]?[OSN][xei]|[mf]?[OSN][xei]\//i,
    parse: defaultCoinParseMethod,
  },
  coinDiDe: {
    index: -1,
    short: "coinDiDe",
    description: "Savior Decider Focus",
    heads: "De Tribe",
    tails: "Identity Di",
    testHeads: /[mf]?[DTF]e/i,
    testTails: /[mf]?[DTF]i/i,
    parse: defaultCoinParseMethod,
  },
  coinOiOe: {
    index: -1,
    short: "coinOiOe",
    description: "Savior Observer Focus",
    heads: "Oe Gather",
    tails: "Organize Oi",
    testHeads: /[mf]?[OSN]e/i,
    testTails: /[mf]?[OSN]i/i,
    parse: defaultCoinParseMethod,
  },
  coinA2ie: {
    index: -1,
    short: "coinA2ie",
    description: "S2 Animal Focus",
    heads: "A2 Extroverted",
    tails: "Introverted A2",
    clean: type =>
      type
        .replace("-??/?(?)", "")
        .replace("?/?(?)", "")
        .replace("/?(?)", "")
        .replace(/[(][PBCS]$/, "")
        .replace(
          /([DTFOSN][xie]\/[DTFOSN][xie])-?([PBCS]{1,2})[/]?([PBCS]?)[(]?([PBCS]?)[)]?/i,
          (_, S1S2, A1A2, A3, A4) =>
            `${S1S2}-${A1A2.toUpperCase()}${!A3 ? "" : `/${A3.toUpperCase()}`}${
              !A4 ? "" : `(${A4.toUpperCase()})`
            }`,
        ),
    testHeads: /-([SP]B|[CB]P)/i,
    testTails: /-([SP]C|[CB]S)/i,
    parse: defaultCoinParseMethod,
  },
  coinA3ie: {
    index: -1,
    short: "coinA3ie",
    description: "Activated Demon Animal Focus",
    heads: "A3 Extroverted",
    tails: "Introverted A3",
    testHeads: /[PB]{2}\/C|[CS]{2}\/P|[CP]{2}\/B|[SB]{2}\/P/,
    testTails: /[PB]{2}\/S|[CS]{2}\/B|[CP]{2}\/S|[SB]{2}\/C/,
    parse: defaultCoinParseMethod,
  },
  // { // Info / Energy isn't a core coin. It's more of an insight
  //   short: "coinA3ie",
  //   index: 4,
  //   description: "Animal Focus",
  //   heads: "Info",
  //   tails: "Energy",
  //   testHeads: /SC\/B|SB\/C|CS\/B|CP\/B|BS\/C|BP\/C|PC\/B|PB\/C/,
  //   testTails: /SC\/P|SB\/P|CS\/P|CP\/S|BS\/P|BP\/S|PC\/S|PB\/S/,
  //   parse: defaultCoinParseMethod
  // },
  coinFT: {
    index: -1,
    short: "coinFT",
    description: "Savior Decider Letter",
    heads: "Thinking",
    tails: "Feeling",
    testHeads: /T[xei]/,
    testTails: /F[xei]/,
    parse: defaultCoinParseMethod,
  },
  coinNS: {
    index: -1,
    short: "coinNS",
    description: "Savior Observer Letter",
    heads: "Sensing",
    tails: "iNtuition",
    testHeads: /S[xei]/,
    testTails: /N[xei]/,
    parse: defaultCoinParseMethod,
  },
}

let COIN_INDEX = -1
const COINS = []
COINS[(NamedCOINS.coinOD.index = ++COIN_INDEX)] = NamedCOINS.coinOD

COINS[(NamedCOINS.coinDiDe.index = ++COIN_INDEX)] = NamedCOINS.coinDiDe
COINS[(NamedCOINS.coinOiOe.index = ++COIN_INDEX)] = NamedCOINS.coinOiOe

COINS[(NamedCOINS.coinFT.index = ++COIN_INDEX)] = NamedCOINS.coinFT
COINS[(NamedCOINS.coinNS.index = ++COIN_INDEX)] = NamedCOINS.coinNS

COINS[(NamedCOINS.coinA2ie.index = ++COIN_INDEX)] = NamedCOINS.coinA2ie
COINS[(NamedCOINS.coinA3ie.index = ++COIN_INDEX)] = NamedCOINS.coinA3ie

COINS[(NamedCOINS.coinSfm.index = ++COIN_INDEX)] = NamedCOINS.coinSfm
COINS[(NamedCOINS.coinDefm.index = ++COIN_INDEX)] = NamedCOINS.coinDefm

/*
Introvert / Femmine:    Observers, Sleep, Consume, Feeling, Intuition
Extrovert / Masculine:  Deciders, Play, Blast, Thinking, Sensing

447 = MM-Se/Ti-CP/B
 */

type BoolMaybe = 0 | 1 | true | false | undefined | null
type OPT512Type = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean
]
type OPT512Maybe = [
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe
]

const numberToType = (number: number): OPT512Type => {
  if (number < 0 || number > 511)
    throw new RangeError("expected a number between 0 and 511")
  const [c0, c1, c2, c3, c4, c5, c6, c7, c8] = (
    Math.min(Math.max(number, 0), 511) + 0b1000000000
  )
    .toString(2)
    .split("")
    .slice(1)
    .map(Number)
    .map(Boolean)
  return [c0, c1, c2, c3, c4, c5, c6, c7, c8]
}

const ALL_POSSIBLE_TYPES: OPT512Type[] = Array(512)
  .join(";")
  .split(";")
  .map((_, index) => numberToType(index))

const isBool = (value: BoolMaybe) => value === true || value === false

function OPTypeBinaryForm({
  type,
  onChange,
}: {
  type: OPT512Maybe
  onChange: (type: OPT512Maybe) => void
}) {
  const opType = new OPT512(type)

  return (
    <div>
      <table>
        <tbody>
          {type.map((coinSide, coinIndex) => (
            <CoinSideVirtual
              key={coinIndex}
              side={coinSide}
              coin={COINS[coinIndex]}
              onFlip={side => {
                const newType = type.slice(0) as OPT512Maybe
                newType[coinIndex] = side
                onChange(newType)
              }}
            />
          ))}
        </tbody>

        <tbody style={{ background: "#ddd" }}>
          <tr>
            <td style={{ textAlign: "right" }}>{opType.iCount}</td>
            <td style={{ textAlign: "center" }}>{opType.nullCount}</td>
            <td>{opType.eCount}</td>
            <th>value counts</th>
          </tr>

          <tr>
            <td style={{ textAlign: "right" }} colSpan={3}>
              {Math.pow(2, opType.nullCount)}
            </td>
            <th>matching type count</th>
          </tr>

          <tr>
            <td style={{ textAlign: "right" }} />
            <td style={{ textAlign: "center" }} />
            <td />
            <th />
          </tr>
        </tbody>

        <tbody style={{ background: "#eee" }}>
          <CoinSideVirtual
            side={opType.sideOfEnergyInfo}
            coin={{
              heads: "Info",
              tails: "Energy",
              description: `${opType.A4} ${opType.sideOfEnergyInfo} ${
                opType.a2Focus
              } ${opType.a3Focus}`,
            }}
            onFlip={side => {
              opType.a3FocusBool = side == null ? null : !opType.a3FocusBool
              onChange(opType.type)
            }}
          />
          <tr>
            <th colSpan={4}>TODO: MM activation vs FF activation</th>
          </tr>
        </tbody>
      </table>
      <OP_Type />
    </div>
    // <SVG_OP_Bubble color="red" width={128} children="Fe" />
  )
}

function CoinSideVirtual({
  coin: { heads, tails, description },
  side,
  onFlip,
}: {
  coin: { heads: string; tails: string; description: string }
  side: BoolMaybe
  onFlip: (side: BoolMaybe) => void
}) {
  return (
    <tr>
      <td style={{ textAlign: "right" }}>
        <label>
          <span
            style={{ fontWeight: isBool(side) && !side ? "bold" : undefined }}
          >
            {tails}
          </span>
          <input
            type="radio"
            checked={isBool(side) && !side}
            onChange={e => onFlip(!e.currentTarget.checked)}
          />
        </label>
      </td>
      <td>
        <input
          type="radio"
          checked={!isBool(side)}
          style={{ opacity: isBool(side) ? 1 : 0.1 }}
          onChange={e => e.currentTarget.checked && onFlip(null)}
        />
      </td>
      <td>
        <label>
          <input
            type="radio"
            checked={isBool(side) && !!side}
            onChange={e => onFlip(e.currentTarget.checked)}
          />
          <span
            style={{ fontWeight: isBool(side) && side ? "bold" : undefined }}
          >
            {heads}
          </span>
        </label>
      </td>
      <th style={{ textAlign: "right" }}>{description}</th>
    </tr>
  )
}

const BLANK_TYPE: OPT512Maybe = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]

const maybeBoolToIndex = (value: BoolMaybe) =>
  !isBool(value) ? 2 : value ? 1 : 0

class OPT512 {
  type: OPT512Maybe
  constructor(type: OPT512Maybe) {
    this.type = type.slice(0) as OPT512Maybe
  }
  get typeNumber() {
    return parseInt(this.type.map(Number).join(""), 2)
  }
  get eCount() {
    return this.type.filter(it => it === true).length
  }
  get iCount() {
    return this.type.filter(it => it === false).length
  }
  get nullCount() {
    return this.type.filter(it => it == null).length
  }
  get isEmpty() {
    return this.nullCount === this.type.length
  }
  get isFull() {
    return this.nullCount === 0
  }

  get fmS() {
    return ["F", "M", "?"][
      maybeBoolToIndex(this.type[NamedCOINS.coinSfm.index])
    ]
  }
  get fmDe() {
    return ["F", "M", "?"][
      maybeBoolToIndex(this.type[NamedCOINS.coinDefm.index])
    ]
  }
  get dLetter() {
    return ["F", "T", "D"][maybeBoolToIndex(this.type[NamedCOINS.coinFT.index])]
  }
  get oLetter() {
    return ["N", "S", "O"][maybeBoolToIndex(this.type[NamedCOINS.coinNS.index])]
  }
  get dFocus() {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinDiDe.index])
    ]
  }
  get oFocus() {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinOiOe.index])
    ]
  }
  get a2Focus() {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinA2ie.index])
    ]
  }

  get a2FocusBool() {
    return this.type[NamedCOINS.coinA2ie.index]
  }
  get a3FocusBool() {
    return this.type[NamedCOINS.coinA3ie.index]
  }
  set a2FocusBool(side: BoolMaybe) {
    this.type[NamedCOINS.coinA2ie.index] = side
  }
  set a3FocusBool(side: BoolMaybe) {
    this.type[NamedCOINS.coinA3ie.index] = side
  }
  get a3Focus() {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinA3ie.index])
    ]
  }
  get DTFxei() {
    return `${this.dLetter}${this.dFocus}`
  }
  get OSNxei() {
    return `${this.oLetter}${this.oFocus}`
  }
  get S1() {
    return [this.OSNxei, this.DTFxei, this.DTFxei][
      maybeBoolToIndex(this.type[NamedCOINS.coinOD.index])
    ]
  }
  get S2() {
    return [this.DTFxei, this.OSNxei, this.OSNxei][
      maybeBoolToIndex(this.type[NamedCOINS.coinOD.index])
    ]
  }
  get A1Code() {
    return `O${this.oFocus}D${this.dFocus}`
  }
  get A1() {
    return AnimalCodeToAnimalLetter[this.A1Code] || "?"
  }
  get A2() {
    return (
      AnimalLetterFocusCodeToAnimalLetters[`${this.A1}${this.a2Focus}`] || "?"
    )
  }
  get A3() {
    return (
      AnimalLetterFocusCodeToAnimalLetters[
        `${this.A1}${this.A2}${this.a3Focus}`
      ] || "?"
    )
  }
  get A4() {
    return (
      {
        BCP: "S",
        BPS: "C",
        CPS: "B",
        BCS: "P",
      }[[this.A1, this.A2, this.A3].sort().join("")] || "?"
    )
  }

  get OP512() {
    const opt = this
    const fmS = opt.fmS
    const fmDe = opt.fmDe
    const S1 = opt.S1
    const S2 = opt.S2
    const A1 = opt.A1
    const A2 = opt.A2
    const A3 = opt.A3
    const A4 = opt.A4

    return cleanCoinText(`${fmS}${fmDe}-${S1}/${S2}-${A1}${A2}/${A3}(${A4})`)
  }

  get sideOfEnergyInfo(): BoolMaybe {
    return {
      S: true,
      C: false,
      B: false,
      P: true,
    }[this.A4]
  }
}

const AnimalCodeToAnimalLetter = {
  OiDi: "S",
  OiDe: "B",
  OeDi: "C",
  OeDe: "P",
}
const AnimalLetterFocusCodeToAnimalLetters = {
  Si: "C",
  Ci: "S",
  Bi: "S",
  Pi: "C",
  Se: "B",
  Ce: "P",
  Be: "P",
  Pe: "B",

  SCi: "B",
  CSi: "B",
  SBi: "C",
  BSi: "C",
  PCi: "S",
  CPi: "S",
  BPi: "S",
  PBi: "S",

  SCe: "P",
  CSe: "P",
  SBe: "P",
  BSe: "P",
  PCe: "B",
  CPe: "B",
  BPe: "C",
  PBe: "C",
}

function OPTypeBinaryText({ type }: { type: OPT512Maybe }) {
  const opt = new OPT512(type)
  return <span>{opt.OP512}</span>
}

function App() {
  let [type, setType] = React.useState(() => BLANK_TYPE.slice(0) as OPT512Maybe)
  let [type0, setType0] = React.useState(type)

  return (
    <div className="App">
      <h1>Objective Personality OPT 9 Coin System exploration toy</h1>
      <div>
        <TypeThing storageID="optype1" />
        <TypeThing storageID="optype2" />
      </div>
      <small>{`
        WARNING (especially to ExxJs): I don't want your help with this. No hard
        feelings. This is a fun side project for my masculine Ti. Thanks.
        Validation welcome. Criticism not welcome.
      `}</small>
      <ul>
        <li>
          TODO: read/write values to URL so you can deep link to specific types
        </li>
        <li>TODO: Better mobile layout</li>
        <li>
          TODO: generate the OPT type number + ABCD variant from the editor data
        </li>
        <li>
          TODO: Render the type bubble graph from the editor data (in progress)
        </li>
        <li>TODO: Clicking Energy when A3 is null should not switch to Info</li>
        <li>
          TODO: One click Savior/Demon swap virtual coins. e.g. Tom Bilyeu and
          Will Smith
        </li>
        <li>TODO: celebrity list</li>
        <li>
          TODO: sort the coins so that the binary value of each type corresponds
          to the OPT128+A-D sorting. Ask that one guy from the OP FB group for
          the details about how he broke down their code again. What's his name?
          Check{" "}
          <a href="https://docs.google.com/spreadsheets/d/1B6d9splICaDGgdDmeCCpdh8RRZSA9rMo45LRQQEcZV8/edit#gid=0">
            the spreadsheet
          </a>{" "}
          for the test fixtures
        </li>
        <li>TODO: save / restore using localStorage?</li>
        <li>
          TODO: add something above the gray insights rows to make it obvious
          that they are NOT core coins
        </li>
        <li>TODO: </li>
      </ul>
    </div>
  )
}

function TypeThing({ storageID = null }) {
  const [
    opType,
    opTypeActions,
    // {
    //   set: setOPType,
    //   reset: resetOPType,
    //   undo: undoOPType,
    //   redo: redoOPType,
    //   canUndo,
    //   canRedo
    // }
  ] = useUndo(BLANK_TYPE.slice(0) as OPT512Maybe)
  React.useEffect(
    () => {
      if (storageID) {
        try {
          opTypeActions.set(JSON.parse(localStorage.getItem(storageID)))
        } catch (e) {}
      }
    },
    [storageID],
  )
  React.useEffect(
    () => {
      if (storageID)
        localStorage.setItem(storageID, JSON.stringify(opType.present))
    },
    [storageID, opType.present],
  )

  return (
    <div>
      <div>
        <button
          key="undo"
          onClick={opTypeActions.undo}
          disabled={!opTypeActions.canUndo}
        >
          undo
        </button>{" "}
        <button
          key="redo"
          onClick={opTypeActions.redo}
          disabled={!opTypeActions.canRedo}
        >
          redo
        </button>{" "}
        <button
          key="reset"
          onClick={() =>
            opTypeActions.reset(BLANK_TYPE.slice(0) as OPT512Maybe)
          }
        >
          reset
        </button>
      </div>
      <OPCodeInput
        type={opType.present}
        onParsed={newType => {
          opTypeActions.set(newType)
        }}
      />
      <OPTypeBinaryText type={opType.present} />
      <OPTypeBinaryForm
        type={opType.present}
        onChange={newType => {
          opTypeActions.set(newType)
        }}
      />
    </div>
  )
}

const cleanerCoins = COINS.filter(COIN => typeof COIN.clean === "function")
const cleanCoinText = value =>
  cleanerCoins.reduce((vvv, { clean }) => clean(vvv), value)

const parserCoins = COINS.filter(COIN => typeof COIN.parse === "function")
const parseCoinText = (type: string): OPT512Maybe =>
  parserCoins.reduce(
    (opTypeArray, COIN) => {
      opTypeArray[COIN.index] = COIN.parse(type)
      return opTypeArray
    },
    BLANK_TYPE.slice(0) as OPT512Maybe,
  )

function OPCodeInput({ type, onParsed }) {
  const opType = new OPT512(type)
  let inputTypeText = opType.OP512
  if (opType.isEmpty) inputTypeText = ""
  let [value, setValue] = React.useState(inputTypeText)
  let [isEditing, setIsEditing] = React.useState(false)
  // if (!isEditing) value = inputTypeText

  // if (type == null) type = value
  // else value = inputTypeText

  function handleChange(event) {
    const newValue = cleanCoinText(event.currentTarget.value)
    setValue(newValue)
    onParsed(parseCoinText(newValue))
  }

  return (
    <React.Fragment>
      <input
        style={{ border: isEditing ? `1px solid lime` : `1px solid red` }}
        placeholder={inputTypeText}
        onChange={isEditing ? handleChange : null}
        value={isEditing ? value : inputTypeText}
        onFocus={e => {
          setValue(cleanCoinText(inputTypeText))
          setIsEditing(true)
        }}
        onBlur={e => {
          setIsEditing(false)
        }}
      />
    </React.Fragment>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)

const fetchSheetData = async () =>
  fetch("https://api.sheety.co/18a68d25-be81-4ce2-be81-5e410644e216")
