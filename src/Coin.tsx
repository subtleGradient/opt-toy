export type BoolMaybe = 0 | 1 | true | false | undefined | null;

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
];

export type OPT512Maybe = [
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe,
  BoolMaybe
];

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
];

class Coin {
  testHeads: RegExp;
  testTails: RegExp;
  defaultCoinParseMethod(type: string) {
    const isHeads = this.testHeads.test(type);
    const isTails = this.testTails.test(type);
    return isHeads === true ? true : isTails === true ? false : null;
  }
}

export const NamedCOINS = {
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
            `${FM.toUpperCase()}${S1S2 == null ? "" : `-${S1S2}`}`
        ),
    testHeads: /^M[FM]|mS|fN/,
    testTails: /^F[FM]|fS|mN/,
    parse: Coin.prototype.defaultCoinParseMethod,
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
        (_, fm, De) => `${fm.toLowerCase()}${De}`
      ),
    testHeads: /^[FM]M|m[DTF]e|f[DTF]i/,
    testTails: /^[FM]F|f[DTF]e|m[DTF]i/,
    parse: Coin.prototype.defaultCoinParseMethod,
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
            `${fm0.toLowerCase()}${F1.toUpperCase()}${f2.toLowerCase()}`
        )
        .replace(/([DTFOSN][xei])([DTFOSN][ei])/g, "$1/$2"),
    testHeads: /(^|-)[mf]?[DTF][xei]|[mf]?[DTF][xei]\//i,
    testTails: /(^|-)[mf]?[OSN][xei]|[mf]?[OSN][xei]\//i,
    parse: Coin.prototype.defaultCoinParseMethod,
  },
  coinDiDe: {
    index: -1,
    short: "coinDiDe",
    description: "Savior Decider Focus",
    heads: "De Tribe",
    tails: "Identity Di",
    testHeads: /[mf]?[DTF]e/i,
    testTails: /[mf]?[DTF]i/i,
    parse: Coin.prototype.defaultCoinParseMethod,
  },
  coinOiOe: {
    index: -1,
    short: "coinOiOe",
    description: "Savior Observer Focus",
    heads: "Oe Gather",
    tails: "Organize Oi",
    testHeads: /[mf]?[OSN]e/i,
    testTails: /[mf]?[OSN]i/i,
    parse: Coin.prototype.defaultCoinParseMethod,
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
            }`
        ),
    testHeads: /-([SP]B|[CB]P)/i,
    testTails: /-([SP]C|[CB]S)/i,
    parse: Coin.prototype.defaultCoinParseMethod,
  },
  coinA3ie: {
    index: -1,
    short: "coinA3ie",
    description: "Activated Demon Animal Focus",
    heads: "A3 Extroverted",
    tails: "Introverted A3",
    testHeads: /[PB]{2}\/C|[CS]{2}\/P|[CP]{2}\/B|[SB]{2}\/P/,
    testTails: /[PB]{2}\/S|[CS]{2}\/B|[CP]{2}\/S|[SB]{2}\/C/,
    parse: Coin.prototype.defaultCoinParseMethod,
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
    parse: Coin.prototype.defaultCoinParseMethod,
  },
  coinNS: {
    index: -1,
    short: "coinNS",
    description: "Savior Observer Letter",
    heads: "Sensing",
    tails: "iNtuition",
    testHeads: /S[xei]/,
    testTails: /N[xei]/,
    parse: Coin.prototype.defaultCoinParseMethod,
  },
};
let COIN_INDEX = -1;
export const COINS = [];
COINS[(NamedCOINS.coinOD.index = ++COIN_INDEX)] = NamedCOINS.coinOD;
COINS[(NamedCOINS.coinDiDe.index = ++COIN_INDEX)] = NamedCOINS.coinDiDe;
COINS[(NamedCOINS.coinOiOe.index = ++COIN_INDEX)] = NamedCOINS.coinOiOe;
COINS[(NamedCOINS.coinFT.index = ++COIN_INDEX)] = NamedCOINS.coinFT;
COINS[(NamedCOINS.coinNS.index = ++COIN_INDEX)] = NamedCOINS.coinNS;
COINS[(NamedCOINS.coinA2ie.index = ++COIN_INDEX)] = NamedCOINS.coinA2ie;
COINS[(NamedCOINS.coinA3ie.index = ++COIN_INDEX)] = NamedCOINS.coinA3ie;
COINS[(NamedCOINS.coinSfm.index = ++COIN_INDEX)] = NamedCOINS.coinSfm;
COINS[(NamedCOINS.coinDefm.index = ++COIN_INDEX)] = NamedCOINS.coinDefm;
/*
Introvert / Femmine:    Observers, Sleep, Consume, Feeling, Intuition
Extrovert / Masculine:  Deciders, Play, Blast, Thinking, Sensing

447 = MM-Se/Ti-CP/B
 */

const numberToType = (number: number): OPT512Type => {
  if (number < 0 || number > 511)
    throw new RangeError("expected a number between 0 and 511");
  const [c0, c1, c2, c3, c4, c5, c6, c7, c8] = (
    Math.min(Math.max(number, 0), 511) + 0b1000000000
  )
    .toString(2)
    .split("")
    .slice(1)
    .map(Number)
    .map(Boolean);
  return [c0, c1, c2, c3, c4, c5, c6, c7, c8];
};

const ALL_POSSIBLE_TYPES: OPT512Type[] = Array(512)
  .join(";")
  .split(";")
  .map((_, index) => numberToType(index));

export const isBool = (value: BoolMaybe) => value === true || value === false;

const cleanerCoins = COINS.filter(COIN => typeof COIN.clean === "function");
export const cleanCoinText = value =>
  cleanerCoins.reduce((vvv, { clean }) => clean(vvv), value);

const parserCoins = COINS.filter(COIN => typeof COIN.parse === "function");
export const parseCoinText = (type: string): OPT512Maybe =>
  parserCoins.reduce(
    (opTypeArray, COIN) => {
      opTypeArray[COIN.index] = COIN.parse(type);
      return opTypeArray;
    },
    BLANK_TYPE.slice(0) as OPT512Maybe
  );
