import {
  OPT512Maybe,
  NamedCOINS,
  BoolMaybe,
  isBool,
  cleanCoinText,
  BLANK_TYPE,
  parseCoinText,
} from "./Coin";

export class OPT512 {
  static fromCoinText(typeCode: string): OPT512 {
    return new OPT512(parseCoinText(typeCode));
  }
  type: OPT512Maybe;
  feeling = new OPFeeling(this);
  thinking = new OPThinking(this);
  intuition = new OPIntuition(this);
  sensing = new OPSensing(this);

  play = new Play(this);
  sleep = new Sleep(this);
  blast = new Blast(this);
  consume = new Consume(this);

  constructor(type: OPT512Maybe) {
    this.type = (type || BLANK_TYPE).slice(0) as OPT512Maybe;
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
    return ["f", "m", "?"][
      maybeBoolToIndex(this.type[NamedCOINS.coinSfm.index])
    ];
  }
  get fmDe() {
    return ["f", "m", "?"][
      maybeBoolToIndex(this.type[NamedCOINS.coinDefm.index])
    ];
  }
  get dLetter() {
    return ["F", "T", "D"][
      maybeBoolToIndex(this.type[NamedCOINS.coinFT.index])
    ] as any;
  }
  set dLetter(letter: "F" | "T" | "D") {
    switch (letter) {
      case "F":
        this.type[NamedCOINS.coinFT.index] = false;
        break;

      case "T":
        this.type[NamedCOINS.coinFT.index] = true;
        break;

      case "D":
      default:
        this.type[NamedCOINS.coinFT.index] = null;
    }
  }
  get oLetter(): "N" | "S" | "O" {
    return ["N", "S", "O"][
      maybeBoolToIndex(this.type[NamedCOINS.coinNS.index])
    ] as any;
  }
  set oLetter(letter: "N" | "S" | "O") {
    switch (letter) {
      case "N":
        this.type[NamedCOINS.coinNS.index] = false;
        break;

      case "S":
        this.type[NamedCOINS.coinNS.index] = true;
        break;

      case "O":
      default:
        this.type[NamedCOINS.coinNS.index] = null;
    }
  }
  get dFocus() {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinDiDe.index])
    ] as any;
  }
  get oFocus() {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinOiOe.index])
    ] as any;
  }
  set dFocus(letter: "i" | "e" | "x") {
    switch (letter) {
      case "i":
        this.type[NamedCOINS.coinDiDe.index] = false;
        break;

      case "e":
        this.type[NamedCOINS.coinDiDe.index] = true;
        break;

      case "x":
      default:
        this.type[NamedCOINS.coinDiDe.index] = null;
    }
  }
  set oFocus(letter: "i" | "e" | "x") {
    switch (letter) {
      case "i":
        this.type[NamedCOINS.coinOiOe.index] = false;
        break;

      case "e":
        this.type[NamedCOINS.coinOiOe.index] = true;
        break;

      case "x":
      default:
        this.type[NamedCOINS.coinOiOe.index] = null;
    }
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
  get D1() {
    return Flipped[this.S2] || this.S2;
  }
  get D2() {
    return Flipped[this.S1] || this.S1;
  }
  get De() {
    return { e: this.DTFxei, i: Flipped[this.DTFxei] }[this.dFocus];
  }
  get Di() {
    return Flipped[this.De];
  }
  get jumper() {
    return this.dFocus === "x" ? null : this.dFocus === this.oFocus;
  }
  get opFunctions() {
    const sex = {
      Si: this.fmS,
      Se: this.fmS,
      Ni: Flipped[this.fmS],
      Ne: Flipped[this.fmS],
      [this.De]: this.fmDe,
      [this.Di]: Flipped[this.fmDe],
    };

    const fns = [
      {
        index: 0,
        key: this.S1[0],
        letter: this.S1[0],
        focus: this.S1[1],
        sex: sex[this.S1],
        savior: true,
      },
      {
        index: 1,
        key: this.S2[0],
        letter: this.S2[0],
        focus: this.S2[1],
        sex: sex[this.S2],
        savior: true,
      },
      {
        index: 2,
        key: this.D1[0],
        letter: this.D1[0],
        focus: this.D1[1],
        sex: sex[this.D1],
        savior: false,
      },
      {
        index: 3,
        key: this.D2[0],
        letter: this.D2[0],
        focus: this.D2[1],
        sex: sex[this.D2],
        savior: false,
      },
    ].map(it => {
      if (it.key === "O" || it.key === "D") it.key = it.index;
      return it;
    });
    if (this.jumper === true) {
      const [s1, s2, d1, d2] = fns;
      fns[1] = d1;
      d1.index = 1;
      fns[2] = s2;
      s2.index = 2;
    }
    return fns;
  }

  get animals() {
    return [this.A1, this.A2, this.A3, this.A4];
  }
  get PlayIndex() {
    return this.animals.indexOf("P");
  }
  get BlastIndex() {
    return this.animals.indexOf("B");
  }
  get ConsumeIndex() {
    return this.animals.indexOf("C");
  }
  get SleepIndex() {
    return this.animals.indexOf("S");
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
  get sideOfSiNe(): BoolMaybe {
    if (this.oLetter === "S" && this.oFocus === "i") return false;
    if (this.oLetter === "N" && this.oFocus === "e") return true;
    return null;
  }
  get sideOfNiSe(): BoolMaybe {
    if (this.oLetter === "N" && this.oFocus === "i") return false;
    if (this.oLetter === "S" && this.oFocus === "e") return true;
    return null;
  }
  get sideOfFiTe(): BoolMaybe {
    if (this.dLetter === "F" && this.dFocus === "i") return false;
    if (this.dLetter === "T" && this.dFocus === "e") return true;
    return null;
  }
  get sideOfTiFe(): BoolMaybe {
    if (this.dLetter === "T" && this.dFocus === "i") return false;
    if (this.dLetter === "F" && this.dFocus === "e") return true;
    return null;
  }
  get sideOfSFNT(): BoolMaybe {
    if (this.oLetter === "S" && this.dLetter === "F") return false;
    if (this.oLetter === "N" && this.dLetter === "T") return true;
    return null;
  }
  get sideOfNFST(): BoolMaybe {
    if (this.oLetter === "N" && this.dLetter === "F") return false;
    if (this.oLetter === "S" && this.dLetter === "T") return true;
    return null;
  }
}

const Flipped = {
  f: "m",
  m: "f",

  S: "N",
  F: "T",
  N: "S",
  T: "F",

  Sx: "Nx",
  Fx: "Tx",
  Nx: "Sx",
  Tx: "Fx",

  Se: "Ni",
  Fe: "Ti",
  Ne: "Si",
  Te: "Fi",

  Si: "Ne",
  Fi: "Te",
  Ni: "Se",
  Ti: "Fe",

  i: "e",
  e: "i",
  x: "x",
  I: "E",
  E: "I",
  X: "X",

  O: "D",
  D: "O",
  Ox: "Ox",
  Dx: "Dx",
  Oi: "Oe",
  Di: "De",
  Oe: "Oi",
  De: "Di",
};

class OPPart {
  private opType: OPT512;
  constructor(opType: OPT512) {
    this.opType = opType;
  }
}

class OPAnimal extends OPPart {
  // constructor(opType: OPT512) {
  //   super(opType);
  // }
}
class Info extends OPAnimal {}
class Energy extends OPAnimal {}
class Blast extends Info {}
class Consume extends Info {}
class Play extends Energy {}
class Sleep extends Energy {}

class OPFn extends OPPart {}
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
