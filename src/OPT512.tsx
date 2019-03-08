import {
  OPT512Maybe,
  NamedCOINS,
  BoolMaybe,
  isBool,
  cleanCoinText,
} from "./Coin";

export class OPT512 {
  type: OPT512Maybe;
  f = new OPFeeling(this, "F");
  t = new OPThinking(this, "T");
  n = new OPIntuition(this, "N");
  s = new OPSensing(this, "S");

  constructor(type: OPT512Maybe) {
    this.type = type.slice(0) as OPT512Maybe;
  }
  get typeNumber() {
    return parseInt(this.type.map(Number).join(""), 2);
  }
  get eCount() {
    return this.type.filter(it => it === true).length;
  }
  get iCount() {
    return this.type.filter(it => it === false).length;
  }
  get nullCount() {
    return this.type.filter(it => it == null).length;
  }
  get isEmpty() {
    return this.nullCount === this.type.length;
  }
  get isFull() {
    return this.nullCount === 0;
  }
  get fmS() {
    return ["F", "M", "?"][
      maybeBoolToIndex(this.type[NamedCOINS.coinSfm.index])
    ];
  }
  get fmDe() {
    return ["F", "M", "?"][
      maybeBoolToIndex(this.type[NamedCOINS.coinDefm.index])
    ];
  }
  get dLetter() {
    return ["F", "T", "D"][
      maybeBoolToIndex(this.type[NamedCOINS.coinFT.index])
    ];
  }
  get oLetter() {
    return ["N", "S", "O"][
      maybeBoolToIndex(this.type[NamedCOINS.coinNS.index])
    ];
  }
  get dFocus() {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinDiDe.index])
    ];
  }
  get oFocus() {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinOiOe.index])
    ];
  }
  get a2Focus() {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinA2ie.index])
    ];
  }
  get a2FocusBool() {
    return this.type[NamedCOINS.coinA2ie.index];
  }
  get a3FocusBool() {
    return this.type[NamedCOINS.coinA3ie.index];
  }
  set a2FocusBool(side: BoolMaybe) {
    this.type[NamedCOINS.coinA2ie.index] = side;
  }
  set a3FocusBool(side: BoolMaybe) {
    this.type[NamedCOINS.coinA3ie.index] = side;
  }
  get a3Focus() {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinA3ie.index])
    ];
  }
  get DTFxei() {
    return `${this.dLetter}${this.dFocus}`;
  }
  get OSNxei() {
    return `${this.oLetter}${this.oFocus}`;
  }
  get S1() {
    return [this.OSNxei, this.DTFxei, this.DTFxei][
      maybeBoolToIndex(this.type[NamedCOINS.coinOD.index])
    ];
  }
  get S2() {
    return [this.DTFxei, this.OSNxei, this.OSNxei][
      maybeBoolToIndex(this.type[NamedCOINS.coinOD.index])
    ];
  }
  get A1Code() {
    return `O${this.oFocus}D${this.dFocus}`;
  }
  get A1() {
    return AnimalCodeToAnimalLetter[this.A1Code] || "?";
  }
  get A2() {
    return (
      AnimalLetterFocusCodeToAnimalLetters[`${this.A1}${this.a2Focus}`] || "?"
    );
  }
  get A3() {
    return (
      AnimalLetterFocusCodeToAnimalLetters[
        `${this.A1}${this.A2}${this.a3Focus}`
      ] || "?"
    );
  }
  get A4() {
    return (
      {
        BCP: "S",
        BPS: "C",
        CPS: "B",
        BCS: "P",
      }[[this.A1, this.A2, this.A3].sort().join("")] || "?"
    );
  }
  get OP512() {
    const opt = this;
    const fmS = opt.fmS;
    const fmDe = opt.fmDe;
    const S1 = opt.S1;
    const S2 = opt.S2;
    const A1 = opt.A1;
    const A2 = opt.A2;
    const A3 = opt.A3;
    const A4 = opt.A4;
    return cleanCoinText(`${fmS}${fmDe}-${S1}/${S2}-${A1}${A2}/${A3}(${A4})`);
  }
  get sideOfEnergyInfo(): BoolMaybe {
    return {
      S: true,
      C: false,
      B: false,
      P: true,
    }[this.A4];
  }
}

class OPFn {
  opType: OPT512;
  constructor(opType, letter: "F" | "T" | "N" | "S") {
    this.opType = opType;
  }
}
class OPDecider extends OPFn {}
class OPObserver extends OPFn {}
class OPFeeling extends OPDecider {}
class OPThinking extends OPDecider {}
class OPIntuition extends OPObserver {}
class OPSensing extends OPObserver {}

const maybeBoolToIndex = (value: BoolMaybe) =>
  !isBool(value) ? 2 : value ? 1 : 0;

const AnimalCodeToAnimalLetter = {
  OiDi: "S",
  OiDe: "B",
  OeDi: "C",
  OeDe: "P",
};

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
};
