export type BoolMaybe = 0 | 1 | true | false | undefined | null

type OPT512Type = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean]

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

export const BLANK_TYPE: OPT512Maybe = [null, null, null, null, null, null, null, null, null]

type RegExpish = {
  test: (type: string) => boolean
}

class Coin {
  index: number
  short: string
  description: string
  heads: string
  tails: string
  clean?: (type: string) => string
  testHeads: RegExpish
  testTails: RegExpish
  parse(type: string) {
    const isHeads = this.testHeads.test(type)
    const isTails = this.testTails.test(type)
    if (isHeads && isTails) return null
    return isHeads ? true : isTails ? false : null
  }
}

export const NamedCOINS = {
  coinSfm: {
    index: -1,
    short: "coinSfm",
    description: "Info Modality",
    heads: "masculine S",
    tails: "N masculine",
    clean: (type: string) =>
      type
        .replace(/[?/()-]/g, "")
        .replace(/^([FM])[FM?](?![iex]).*$/i, (_, FM) => `${(FM || "?").toUpperCase()}`)
        .replace(/^.*([FM])S[ie].*$/i, (_, FM) => `${(FM || "?").toUpperCase()}`)
        .replace(/^.*([FM])N[ie].*$/i, (_, FM) => ({ F: "M", M: "F" }[FM.toUpperCase()] || "?"))
        .replace(/[^FM]/g, ""),
    testHeads: /^M[FM]|mS|fN/,
    testTails: /^F[FM]|fS|mN/,
    parse: Coin.prototype.parse,
  },
  coinDefm: {
    index: -1,
    short: "coinDefm",
    description: "Masculine Energy Modality",
    heads: "masculine De",
    tails: "Di masculine",
    clean: (type) =>
      type
        .replace(/[?/()-]/g, "")
        .replace(/^[FM?]([FM])(?![iex]).*$/i, (_, FM) => `${(FM || "?").toUpperCase()}`)
        .replace(/^.*([FM])[FT]e.*$/i, (_, FM) => `${(FM || "?").toUpperCase()}`)
        .replace(/^.*([FM])[FT]i.*$/i, (_, FM) => ({ F: "M", M: "F" }[FM.toUpperCase()] || "?"))
        .replace(/[^FM]/g, ""),
    testHeads: /^[FM]M|m[DTF]e|f[DTF]i/,
    testTails: /^[FM]F|f[DTF]e|m[DTF]i/,
    parse: Coin.prototype.parse,
  },
  coinOD: {
    index: -1,
    short: "coinOD",
    description: "OD",
    heads: "Energy polar",
    tails: "polar Info",
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
    testHeads: /(^|-)[mf]?[DTF][xei]|[mf]?[DTF][xei]\//i,
    testTails: /(^|-)[mf]?[OSN][xei]|[mf]?[OSN][xei]\//i,
    parse: Coin.prototype.parse,
  },
  coinDiDe: {
    index: -1,
    short: "coinDiDe",
    description: "Savior Decider Focus",
    heads: "De Tribe",
    tails: "Identity Di",
    testHeads: /[mf]?[DTF]e/i,
    testTails: /[mf]?[DTF]i/i,
    parse: Coin.prototype.parse,
  },
  coinOiOe: {
    index: -1,
    short: "coinOiOe",
    description: "Savior Observer Focus",
    heads: "Oe Gather",
    tails: "Organize Oi",
    testHeads: /[mf]?[OSN]e/i,
    testTails: /[mf]?[OSN]i/i,
    parse: Coin.prototype.parse,
  },
  /** @deprecated Use coin coinEnAct instead */
  coinA2ie: {
    index: -1,
    short: "coinA2ie",
    description: "S2 Animal Focus",
    heads: "A2 Extroverted",
    tails: "Introverted A2",
    testHeads: /-([SP]B|[CB]P)/i,
    testTails: /-([SP]C|[CB]S)/i,
    parse: Coin.prototype.parse,
  },
  /** @deprecated Use coin coinInAct instead */
  coinA3ie: {
    index: -1,
    short: "coinA3ie",
    description: "Activated Demon Animal Focus",
    heads: "A3 Extroverted",
    tails: "Introverted A3",
    testHeads: /[PB]{2}\/C|[CS]{2}\/P|[CP]{2}\/B|[SB]{2}\/P/,
    testTails: /[PB]{2}\/S|[CS]{2}\/B|[CP]{2}\/S|[SB]{2}\/C/,
    parse: Coin.prototype.parse,
  },
  coinEnAct: {
    index: -1,
    short: "coinEnAct",
    description: "Energy Activation",
    heads: "Extroverted Energy",
    tails: "Energy Introverted",
    testHeads: {
      test: (type: string) => {
        const cleanType = type.toUpperCase().replace(/[^a-z]/gi, "")
        return (
          /PBC|PCB/.test(cleanType) || // Play first & Sleep last
          /SBP|SCP/.test(cleanType) || // Sleep with activated Play
          /BP/.test(cleanType) || // Blast Play
          /CP/.test(cleanType) || // Consume Play
          false
        )
      },
    } as RegExpish,
    testTails: {
      test: (type: string) => {
        const cleanType = type.toUpperCase().replace(/[^a-z]/gi, "")
        return (
          /SBC|SCB/.test(cleanType) || // Sleep first & Play last
          /PBS|PCS/.test(cleanType) || // Play with activated Sleep
          /BS/.test(cleanType) || // Blast Sleep
          /CS/.test(cleanType) || // Consume Sleep
          false
        )
      },
    } as RegExpish,
    parse: Coin.prototype.parse,
    clean: (type) =>
      type
        .replace(/[/()]/g, "")
        .replace(
          /^.*?-?([PBCS]?)([PBCS]?)([PBCS]?)([PBCS]?)$/i,
          (_, A1 = "?", A2 = "?", A3 = "?", A4 = "?") =>
            `${A1.toUpperCase()}${A2.toUpperCase()}${!A3 ? "" : `/${A3.toUpperCase()}`}${
              !A4 ? "" : `(${A4.toUpperCase()})`
            }`,
        ),
  },
  coinInAct: {
    index: -1,
    short: "coinInAct",
    description: "Info Activation",
    heads: "Extroverted Info",
    tails: "Info Introverted",
    testHeads: /-(B(P.S|S.P)|C[PS].B|[PS]C)/i,
    testTails: /-(C(P.S|S.P)|B[PS].C|[PS]B)/i,
    parse: Coin.prototype.parse,
  },
  coinFT: {
    index: -1,
    short: "coinFT",
    description: "Savior Decider Letter",
    heads: "Thinking",
    tails: "Feeling",
    testHeads: /T[xei]/,
    testTails: /F[xei]/,
    parse: Coin.prototype.parse,
  },
  coinNS: {
    index: -1,
    short: "coinNS",
    description: "Savior Observer Letter",
    heads: "Sensing",
    tails: "iNtuition",
    testHeads: /S[xei]/,
    testTails: /N[xei]/,
    parse: Coin.prototype.parse,
  },
}
let COIN_INDEX = -1
export const COINS: Coin[] = []
COINS[(NamedCOINS.coinOD.index = ++COIN_INDEX)] = NamedCOINS.coinOD
COINS[(NamedCOINS.coinDiDe.index = ++COIN_INDEX)] = NamedCOINS.coinDiDe
COINS[(NamedCOINS.coinOiOe.index = ++COIN_INDEX)] = NamedCOINS.coinOiOe
COINS[(NamedCOINS.coinFT.index = ++COIN_INDEX)] = NamedCOINS.coinFT
COINS[(NamedCOINS.coinNS.index = ++COIN_INDEX)] = NamedCOINS.coinNS
COINS[(NamedCOINS.coinEnAct.index = ++COIN_INDEX)] = NamedCOINS.coinEnAct
COINS[(NamedCOINS.coinInAct.index = ++COIN_INDEX)] = NamedCOINS.coinInAct
COINS[(NamedCOINS.coinSfm.index = ++COIN_INDEX)] = NamedCOINS.coinSfm
COINS[(NamedCOINS.coinDefm.index = ++COIN_INDEX)] = NamedCOINS.coinDefm
/*
Introvert / Femmine:    Observers, Sleep, Consume, Feeling, Intuition
Extrovert / Masculine:  Deciders, Play, Blast, Thinking, Sensing

447 = MM-Se/Ti-CP/B
 */

const numberToType = (number: number): OPT512Type => {
  if (number < 0 || number > 511) throw new RangeError("expected a number between 0 and 511")
  const [c0, c1, c2, c3, c4, c5, c6, c7, c8] = (Math.min(Math.max(number, 0), 511) + 0b1000000000)
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

export const cleanCoinText = (value: string = ""): string => {
  return value
  // const [fmS, fmDe, od, animals] = [
  //   NamedCOINS.coinSfm.clean(value),
  //   NamedCOINS.coinDefm.clean(value),
  //   NamedCOINS.coinOD.clean(value),
  //   NamedCOINS.coinEnAct.clean(value),
  // ]
  // return `${fmS}${fmDe}${fmS && fmDe ? "-" : ""}${od}${
  //   animals ? "-" : ""
  // }${animals}`
}

const parserCoins = COINS.filter((COIN) => typeof COIN.parse === "function")
export const parseCoinText = (type: string): OPT512Maybe =>
  parserCoins.reduce((opTypeArray, COIN) => {
    opTypeArray[COIN.index] = COIN.parse(type)
    return opTypeArray
  }, BLANK_TYPE.slice(0) as OPT512Maybe)

if (process.env.NODE_ENV !== "production") {
  console.assert(parseCoinText("fffesepbcs")[NamedCOINS.coinEnAct.index] /*? */ === true)
  console.assert(parseCoinText("fffesepbc")[NamedCOINS.coinEnAct.index] /*? */ === true)
  console.assert(parseCoinText("fffesepbs")[NamedCOINS.coinEnAct.index] /*? */ === false)

  parseCoinText("fffesepbcs") //?
  parseCoinText("FF-Fe/Se-PB/C(S)") //?

  console.assert(NamedCOINS.coinDefm.clean("fse/mfe") === "M")
  console.assert(NamedCOINS.coinDefm.clean("ffi/msi") === "M")
  console.assert(NamedCOINS.coinDefm.clean("mfe/fse") === "M")
  console.assert(NamedCOINS.coinDefm.clean("msi/ffi") === "M")
  console.assert(NamedCOINS.coinDefm.clean("fse/ffe") === "F")
  console.assert(NamedCOINS.coinDefm.clean("mfi/msi") === "F")
  console.assert(NamedCOINS.coinDefm.clean("ffe/fse") === "F")
  console.assert(NamedCOINS.coinDefm.clean("msi/mfi") === "F")
  console.assert(NamedCOINS.coinDefm.clean("mmfisisbpc") === "M")

  console.assert(NamedCOINS.coinSfm.clean("mfe/fse") === "F")
  console.assert(NamedCOINS.coinSfm.clean("mfe/mse") === "M")
  console.assert(NamedCOINS.coinSfm.clean("ffe/mse") === "M")
  console.assert(NamedCOINS.coinSfm.clean("ffi/msi") === "M")
  console.assert(NamedCOINS.coinSfm.clean("ffi/fsi") === "F")
  console.assert(NamedCOINS.coinSfm.clean("mfi/fsi") === "F")

  console.assert(NamedCOINS.coinSfm.clean("mfe/mne") === "F")
  console.assert(NamedCOINS.coinSfm.clean("mfe/fne") === "M")
  console.assert(NamedCOINS.coinSfm.clean("ffe/fne") === "M")
  console.assert(NamedCOINS.coinSfm.clean("ffi/fni") === "M")
  console.assert(NamedCOINS.coinSfm.clean("ffi/mni") === "F")
  console.assert(NamedCOINS.coinSfm.clean("mfi/mni") === "F")
  console.assert(NamedCOINS.coinSfm.clean("mmfisisbpc") === "M")
  console.assert(NamedCOINS.coinSfm.clean("fmsifisbpc") === "F")

  console.assert(NamedCOINS.coinEnAct.clean("fffesepbcs") === "PB/C(S)")
  console.assert(NamedCOINS.coinOD.clean("fffesepbcs") === "Fe/Se")

  console.assert(cleanCoinText("fffesepbcs") === "FF-Fe/Se-PB/C(S)")
  console.assert(cleanCoinText("mmfisisbpc") === "MM-Fi/Si-SB/P(C)")
  console.assert(cleanCoinText(cleanCoinText("fffesepbcs")) /*? */ === "FF-Fe/Se-PB/C(S)")
  console.assert(cleanCoinText(cleanCoinText("mmfisisbpc")) /*? */ === "MM-Fi/Si-SB/P(C)")
}
