import { OPT512 } from "./OPT512"

export type BoolMaybe = 0 | 1 | true | false | undefined | null

type OPT512Type = [
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
  boolean,
]

export type OPT512Maybe = [
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
]

export const BLANK_TYPE: OPT512Maybe = [
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

type RegExpish = {
  test: (type: string) => boolean
}

const ParsableCoinDefault = {
  testHeads: /./ as RegExpish,
  testTails: /./ as RegExpish,
  parse(type: string) {
    const isHeads = this.testHeads.test(type)
    const isTails = this.testTails.test(type)
    if (isHeads && isTails) return null
    return isHeads ? true : isTails ? false : null
  },
}

type ParsableCoinType = typeof ParsableCoinDefault

export interface Coin extends ParsableCoinType {
  index: number
  short: string
  title: string
  description: string
  heads: string
  tails: string
  headsDetail: string
  tailsDetail: string
  clean?: (type: string) => string
}

export const extractAnimalsFromOP512 = (type: string) =>
  String(type)
    .trim()
    .toUpperCase()
    .replace(/[^a-z?(/]/gi, "")
    .replace(/.*?([PBCS?(/]+)$/g, "$1")
    .replace(/^([PBCS])[/]([PBCS]+)$/g, "$1?$2")
    .replace(/^([PBCS])[(]([PBCS])$/g, "$1??$2")
    .replace(/^([PBCS])([PBCS?])[(]([PBCS])$/g, "$1$2?$3")
    .replace(/[(/]/g, "")

export const NamedCOINS = {
  coinSfm: {
    index: -1,
    short: "coinSfm",
    title: "Masculine",
    description: "Info",
    heads: "mS",
    tails: "mN",
    headsDetail: "masculine Sensory and feminine iNtuition",
    tailsDetail: "masculine iNtuition and feminine Sensory",
    ...ParsableCoinDefault,
    // prettier-ignore
    testHeads: { test: (type: string) => 
      /^M[FM?](?![ie])/i.test(type) ||
      /(^|[^fm])fN/i.test(type) ||
      /(^|[^fm])mS([ie]|\b)/i.test(type) ||
      false
    },
    // prettier-ignore
    testTails: { test: (type: string) => 
      /^F[FM?](?![ie])/i.test(type) ||
      /(^|[^fm])mN/i.test(type) ||
      /(^|[^fm])fS([ie]|\b)/i.test(type) ||
      false
    },
  },
  coinDefm: {
    index: -1,
    short: "coinDefm",
    title: "Masculine",
    description: "Energy",
    heads: "mDe",
    tails: "mDi",
    headsDetail:
      "masculine Extroverted Decider function (either mFe or mTe) and feminine Di (either fFi or fTi)",
    tailsDetail:
      "masculine Introverted Decider function (either mFi or mTi) and feminine De (either fFe or fTe)",
    ...ParsableCoinDefault,
    // prettier-ignore
    testHeads: { test: (type: string) => 
      /^[FM?]M/i.test(type) ||
      /(^|[^fm])f[DTF]i/i.test(type) ||
      /(^|[^fm])m[DTF]e/i.test(type) ||
      false
    },
    // prettier-ignore
    testTails: { test: (type: string) => 
      /^[FM?]F(?![ie])/i.test(type) ||
      /(^|[^fm])m[DTF]i/i.test(type) ||
      /(^|[^fm])f[DTF]e/i.test(type) ||
      false
    },
  },
  coinOD: {
    index: -1,
    short: "coinOD",
    title: "",
    description: "Polarity",
    heads: "Energy",
    tails: "Info",
    headsDetail: `Polar Energy — aka "Single Decider" and "Double Observer"`,
    tailsDetail: `Polar Info — aka "Single Observer" and "Double Decider"`,
    clean: (type) =>
      type
        .replace(/[?()/-]/g, "")
        .replace(/[fm]?([DTFOSN][xei])[fm]?([DTFOSN][ei])/g, "$1/$2")
        .replace(
          /^.*([ODFTNS])([xie])([ODFTNS])([xie]).*$/gi,
          (_, f1od, f1xie, f2od, f2xie) =>
            `${f1od.toUpperCase()}${f1xie.toLowerCase()}/${f2od.toUpperCase()}${f2xie.toLowerCase()}`,
        )
        .replace(/^(?![DTF][xie]\/[OSN][xie]|[OSN][xie]\/[DTF][xie]).*$/, ""),
    ...ParsableCoinDefault,
    testHeads: /^([mf?][mf?]-?)?[mf]?[DTF][xei]/i,
    testTails: /^([mf?][mf?]-?)?[mf]?[OSN][xei]/i,
  },
  coinDiDe: {
    index: -1,
    short: "coinDiDe",
    title: "Direction",
    description: "Energy",
    heads: "De",
    headsDetail: "Energy directed Extrovertedly to Connections",
    tails: "Di",
    tailsDetail: "Energy directed Introvertedly to Significance",
    ...ParsableCoinDefault,
    testHeads: /[mf]?[DTF]e/i,
    testTails: /[mf]?[DTF]i/i,
  },
  coinOiOe: {
    index: -1,
    short: "coinOiOe",
    title: "Direction",
    description: "Info",
    heads: "Oe",
    headsDetail: "Info directed Extrovertedly to Gather new",
    tails: "Oi",
    tailsDetail: "Info directed Introvertedly to Organize old",
    ...ParsableCoinDefault,
    testHeads: /[mf]?[OSN]e/i,
    testTails: /[mf]?[OSN]i/i,
  },
  /** @deprecated Use coin coinEnAct instead */
  coinA2ie: {
    index: -1,
    short: "coinA2ie",
    title: "",
    description: "S2 Animal Focus",
    heads: "A2 E",
    tails: "I A2",
    ...ParsableCoinDefault,
    testHeads: /(-|[xie])([SP]B|[CB]P)/i,
    testTails: /(-|[xie])([SP]C|[CB]S)/i,
  },
  /** @deprecated Use coin coinInAct instead */
  coinA3ie: {
    index: -1,
    short: "coinA3ie",
    title: "",
    description: "Activated Demon Animal Focus",
    heads: "A3 E",
    tails: "I A3",
    ...ParsableCoinDefault,
    testHeads: /[PB]{2}\/C|[CS]{2}\/P|[CP]{2}\/B|[SB]{2}\/P/,
    testTails: /[PB]{2}\/S|[CS]{2}\/B|[CP]{2}\/S|[SB]{2}\/C/,
  },
  coinEnAct: {
    index: -1,
    short: "coinEnAct",
    title: "Activation",
    description: "Energy",
    heads: "EE",
    tails: "II",
    headsDetail: `Activated Double Extroverted Energy (Play)`,
    tailsDetail: `Activated Double Introverted Energy (Sleep)`,
    ...ParsableCoinDefault,
    testHeads: {
      test: (type: string) => {
        const animals = extractAnimalsFromOP512(type)
        return (
          /^(PBC|PCB|P[CB?][CB?]S)/.test(animals) || // Play first & Sleep last
          /^(SBP|SCP|S[?]P|SC[?]B|SB[?]C)/.test(animals) || // Sleep with activated Play
          /^(BP)/.test(animals) || // Blast Play
          /^(CP)/.test(animals) || // Consume Play
          false
        )
      },
    } as RegExpish,
    testTails: {
      test: (type: string) => {
        const animals = extractAnimalsFromOP512(type)
        return (
          /^(SBC|SCB|S[CB?][CB?]P)/.test(animals) || // Sleep first & Play last
          /^(PBS|PCS|P[?]S|PC[?]B|PB[?]C)/.test(animals) || // Play with activated Sleep
          /^(BS)/.test(animals) || // Blast Sleep
          /^(CS)/.test(animals) || // Consume Sleep
          false
        )
      },
    } as RegExpish,
  },
  coinInAct: {
    index: -1,
    short: "coinInAct",
    title: "Activation",
    description: "Info",
    heads: "Oi De",
    tails: "Oe Di",
    headsDetail: `Activated Extroverted Info (Blast)`,
    tailsDetail: `Activated Introverted Info (Consume)`,
    ...ParsableCoinDefault,
    testHeads: {
      test: (type: string) => {
        const animals = extractAnimalsFromOP512(type)
        return (
          /^(BPS|BSP|B[SP?][SP?]C)/.test(animals) || // Blast first & Consume last
          /^(CPB|CSB|C[?]B|CP[?]S|CS[?]P)/.test(animals) || // Consume with activated Blast
          /^(PB)/.test(animals) || // Plast Blast
          /^(SB)/.test(animals) || // Sonsume Blast
          false
        )
      },
    } as RegExpish,
    testTails: {
      test: (type: string) => {
        const animals = extractAnimalsFromOP512(type)
        return (
          /^(CPS|CSP|C[SP?][SP?]B)/.test(animals) || // Consume first & Blast last
          /^(BSC|BPC|B[?]C|BS[?]P|BP[?]S)/.test(animals) || // Blast with activated Consume
          /^(PC)/.test(animals) || // Plast Consume
          /^(SC)/.test(animals) || // Sonsume Consume
          false
        )
      },
    } as RegExpish,
  },
  /** @deprecated use coinTie and coinDiDe instead */
  coinFT: {
    index: -1,
    short: "coinFT",
    title: "Style",
    description: "Energy",
    heads: "T > F",
    tails: "F > T",
    headsDetail: ``,
    tailsDetail: ``,
    ...ParsableCoinDefault,
    testHeads: /[mf]?T[xei]/i,
    testTails: /[mf]?F[xei]/i,
  },
  /** @deprecated use coinSie and coinOiOe instead */
  coinNS: {
    index: -1,
    short: "coinNS",
    title: "Style",
    description: "Info",
    heads: "S > N",
    tails: "N > S",
    headsDetail: ``,
    tailsDetail: ``,
    ...ParsableCoinDefault,
    testHeads: /[mf]?S[xei]/i,
    testTails: /[mf]?N[xei]/i,
  },
  coinTie: {
    index: -1,
    short: "coinTie",
    title: "Focus",
    description: "Energy",
    heads: "Fi/Te",
    tails: "Ti/Fe",
    headsDetail: ``,
    tailsDetail: ``,
    ...ParsableCoinDefault,
    testHeads: /[mf]?(Fi|Te)/i,
    testTails: /[mf]?(Fe|Ti)/i,
  },
  coinSie: {
    index: -1,
    short: "coinSie",
    title: "Focus",
    description: "Info",
    heads: "Ni/Se",
    tails: "Si/Ne",
    headsDetail: ``,
    tailsDetail: ``,
    ...ParsableCoinDefault,
    testHeads: /[mf]?(Ni|Se)/i,
    testTails: /[mf]?(Ne|Si)/i,
  },
}
let COIN_INDEX = -1
type Coins9 = [Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin, Coin]

/** @deprecated use COINS_NEXT instead */
export const COINS: Coins9 = [, , , , , , , , ,]
COINS[(NamedCOINS.coinOD.index = ++COIN_INDEX)] = NamedCOINS.coinOD
COINS[(NamedCOINS.coinOiOe.index = ++COIN_INDEX)] = NamedCOINS.coinOiOe
COINS[(NamedCOINS.coinDiDe.index = ++COIN_INDEX)] = NamedCOINS.coinDiDe
COINS[(NamedCOINS.coinNS.index = ++COIN_INDEX)] = NamedCOINS.coinNS
COINS[(NamedCOINS.coinFT.index = ++COIN_INDEX)] = NamedCOINS.coinFT
COINS[(NamedCOINS.coinInAct.index = ++COIN_INDEX)] = NamedCOINS.coinInAct
COINS[(NamedCOINS.coinEnAct.index = ++COIN_INDEX)] = NamedCOINS.coinEnAct
COINS[(NamedCOINS.coinSfm.index = ++COIN_INDEX)] = NamedCOINS.coinSfm
COINS[(NamedCOINS.coinDefm.index = ++COIN_INDEX)] = NamedCOINS.coinDefm

NamedCOINS.coinSie.index = NamedCOINS.coinNS.index
NamedCOINS.coinTie.index = NamedCOINS.coinFT.index

export const COINS_NEXT: Coins9 = [
  NamedCOINS.coinOD,
  NamedCOINS.coinOiOe,
  NamedCOINS.coinDiDe,
  NamedCOINS.coinSie,
  NamedCOINS.coinTie,
  NamedCOINS.coinInAct,
  NamedCOINS.coinEnAct,
  NamedCOINS.coinSfm,
  NamedCOINS.coinDefm,
]

/*
Introvert / Femmine:    Observers, Sleep, Consume, Feeling, Intuition
Extrovert / Masculine:  Deciders, Play, Blast, Thinking, Sensing

447 = MM-Se/Ti-CP/B
 */

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

export const isBool = (value: BoolMaybe) => value === true || value === false

export const cleanCoinText = (text: string = ""): string =>
  OPT512.fromCoinText(text).OPSCode

const parserCoins = COINS.filter((COIN) => typeof COIN.parse === "function")
export const parseCoinText = (type: string): OPT512Maybe =>
  parserCoins.reduce((opTypeArray, COIN) => {
    opTypeArray[COIN.index] = COIN.parse(type)
    return opTypeArray
  }, BLANK_TYPE.slice(0) as OPT512Maybe)
