import {
  OPT512Maybe,
  NamedCOINS,
  BoolMaybe,
  isBool,
  cleanCoinText,
  BLANK_TYPE,
  parseCoinText,
} from "./Coin"
import { sortBy } from "./sortBy"
import getRandomInt from "./getRandomInt"
import {
  euclideanDistance,
  euclideanDistanceSquared,
} from "./euclideanDistance"

export {
  // OPT512Maybe,
  NamedCOINS,
  // BoolMaybe,
  isBool,
  cleanCoinText,
  BLANK_TYPE,
  parseCoinText,
}

type OPODLetterType = "O" | "D" | "?"
type OPDLetterType = "F" | "T" | "D"
type OPOLetterType = "N" | "S" | "O"
type OPLetterType = OPDLetterType | OPOLetterType | OPODLetterType
type OPFocusType = "i" | "e" | "x" | "?"
type OPSexType = "f" | "m" | "?"
type OPAnimalType = "P" | "B" | "C" | "S" | "?"

export interface OPFunctionType {
  index: number
  grantStackIndex: number
  key: any
  letter: OPLetterType
  focus: OPFocusType
  sex: OPSexType
  savior: boolean
  odLetter: OPODLetterType
}

type OP4Fns = [OPFunctionType, OPFunctionType, OPFunctionType, OPFunctionType]

const sortByIndex = ({ index: a }, { index: b }) => sortBy(a, b)

type DTFxei = "Dx" | "Tx" | "Fx" | "De" | "Te" | "Fe" | "Di" | "Ti" | "Fi"

type OSNxei = "Oe" | "Se" | "Ne" | "Oi" | "Si" | "Ni" | "Ox" | "Sx" | "Nx"

export class OPT512 {
  edit() {
    for (const key in this) {
      if (key.charAt(0) !== "_") continue
      delete this[key]
    }
  }

  static from(typeCode: string): OPT512 {
    return new OPT512(parseCoinText(cleanCoinText(typeCode)))
  }
  static fromDirtyCoinText(typeCode: string): OPT512 {
    return OPT512.from(typeCode)
  }
  static fromCoinText(typeCode: string): OPT512 {
    return new OPT512(parseCoinText(typeCode))
  }

  get eDecider() {
    return this.deciders.find((Dx) => Dx.focus === "e") || this.deciders[0]
  }
  get iDecider() {
    return this.deciders.find((Dx) => Dx.focus === "i") || this.deciders[1]
  }
  get deciders() {
    const { feeling, thinking } = this
    return [feeling, thinking].sort(sortByIndex)
  }
  get eObserver() {
    return this.observers.find((Ox) => Ox.focus === "e") || this.observers[0]
  }
  get iObserver() {
    return this.observers.find((Ox) => Ox.focus === "i") || this.observers[1]
  }
  get observers() {
    const { intuition, sensing } = this
    return [intuition, sensing].sort(sortByIndex)
  }
  get functions() {
    const { feeling, thinking, intuition, sensing } = this
    return [feeling, thinking, intuition, sensing].sort(sortByIndex)
  }
  feeling = new Feeling(this)
  thinking = new Thinking(this)
  intuition = new iNtuition(this)
  sensing = new Sensing(this)

  get animalStack() {
    const { play, blast, consume, sleep, A1 } = this
    switch (A1) {
      case "P":
        return [play, consume, blast, sleep]
      case "B":
        return [blast, sleep, play, consume]
      case "C":
        return [consume, play, sleep, blast]
      case "S":
        return [sleep, blast, consume, play]
      default:
        return []
    }
  }
  get animals() {
    const { play, sleep, blast, consume } = this
    return [play, sleep, blast, consume].sort(sortByIndex)
  }

  public readonly play = new Play(this)
  public readonly sleep = new Sleep(this)
  public readonly blast = new Blast(this)
  public readonly consume = new Consume(this)

  constructor(public type: OPT512Maybe) {
    this.type = (type || BLANK_TYPE).slice(0) as OPT512Maybe
  }
  toJSON() {
    return this.type
  }
  static fromJSON(type: OPT512Maybe) {
    return new OPT512(type)
  }

  get typeNumber() {
    return parseInt(this.type.map(Number).reverse().join(""), 2)
  }
  get typeNumberString() {
    return this.type.map(Number).reverse().join("")
  }
  getComplimentType(): OPT512 {
    return OPT512.fromTypeNumber(this.typeNumber ^ 0b111111111)
  }
  static fromTypeNumber(typeNumber: number): OPT512 {
    return new OPT512(typeNumberToCoins(typeNumber))
  }
  static random() {
    return OPT512.fromTypeNumber(getRandomInt(0, 0b111111111))
  }
  get sortValue() {
    return (
      sideToDistance(this.type[NamedCOINS.coinNS.index]) *
        (this.type[NamedCOINS.coinOD.index] ? 10 : 100) +
      sideToDistance(this.type[NamedCOINS.coinFT.index]) *
        (this.type[NamedCOINS.coinOD.index] ? 100 : 10) +
      sideToDistance(this.type[NamedCOINS.coinOD.index]) * 1000
    )
  }
  private _position: number[]
  get position() {
    return (
      this._position ||
      (this._position = [
        this.tIndex,
        this.sIndex,
        this.fIndex,
        this.nIndex,
        this.PlayIndex,
        this.BlastIndex,
        this.ConsumeIndex,
        this.SleepIndex,
        ...[
          this.sideOfEnergyInfo,
          this.sideOfNFST,
          this.sideOfSFNT,
          this.sideOfFiTe,
          this.sideOfNiSe,
          this.sideOfSiNe,
          this.sideOfTiFe,
        ].map(sideToDistance),
        ...this.type.map(sideToDistance),
      ].map(Number))
    )
  }
  static getCoinDistanceBetween(a: OPT512, b: OPT512) {
    return euclideanDistanceSquared(a.position, b.position)
  }
  static getAll(): OPT512[] {
    return Array(511)
      .fill(0)
      .map((_, i) => OPT512.fromTypeNumber(i))
  }

  get eCount() {
    return this.type.filter((it) => it === true).length
  }
  get iCount() {
    return this.type.filter((it) => it === false).length
  }
  get nullCount() {
    return this.type.filter((it) => it == null).length
  }
  get isEmpty() {
    return this.nullCount === this.type.length
  }
  get isFull() {
    return this.nullCount === 0
  }
  get fmS(): OPSexType {
    return ["f", "m", "?"][
      maybeBoolToIndex(this.type[NamedCOINS.coinSfm.index])
    ] as OPSexType
  }
  get fmDe(): OPSexType {
    return ["f", "m", "?"][
      maybeBoolToIndex(this.type[NamedCOINS.coinDefm.index])
    ] as OPSexType
  }
  get odLetter(): OPODLetterType {
    return ["O", "D", "?"][
      maybeBoolToIndex(this.type[NamedCOINS.coinOD.index])
    ] as OPODLetterType
  }
  get dLetter(): OPDLetterType {
    return ["F", "T", "D"][
      maybeBoolToIndex(this.type[NamedCOINS.coinFT.index])
    ] as OPDLetterType
  }
  set dLetter(letter: OPDLetterType) {
    this.edit()
    switch (letter) {
      case "F":
        this.type[NamedCOINS.coinFT.index] = false
        break

      case "T":
        this.type[NamedCOINS.coinFT.index] = true
        break

      case "D":
      default:
        this.type[NamedCOINS.coinFT.index] = null
    }
  }
  get oLetter(): OPOLetterType {
    return ["N", "S", "O"][
      maybeBoolToIndex(this.type[NamedCOINS.coinNS.index])
    ] as OPOLetterType
  }
  set oLetter(letter: OPOLetterType) {
    this.edit()
    switch (letter) {
      case "N":
        this.type[NamedCOINS.coinNS.index] = false
        break

      case "S":
        this.type[NamedCOINS.coinNS.index] = true
        break

      case "O":
      default:
        this.type[NamedCOINS.coinNS.index] = null
    }
  }

  get dFocus(): OPFocusType {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinDiDe.index])
    ] as OPFocusType
  }
  set dFocus(letter: OPFocusType) {
    this.edit()
    switch (letter) {
      case "i":
        this.type[NamedCOINS.coinDiDe.index] = false
        break

      case "e":
        this.type[NamedCOINS.coinDiDe.index] = true
        break

      case "x":
      default:
        this.type[NamedCOINS.coinDiDe.index] = null
    }
  }

  get oFocus(): OPFocusType {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinOiOe.index])
    ] as OPFocusType
  }
  set oFocus(letter: OPFocusType) {
    this.edit()
    switch (letter) {
      case "i":
        this.type[NamedCOINS.coinOiOe.index] = false
        break

      case "e":
        this.type[NamedCOINS.coinOiOe.index] = true
        break

      case "x":
      default:
        this.type[NamedCOINS.coinOiOe.index] = null
    }
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
    this.edit()
    this.type[NamedCOINS.coinA2ie.index] = side
  }
  set a3FocusBool(side: BoolMaybe) {
    this.edit()
    this.type[NamedCOINS.coinA3ie.index] = side
  }
  get a3Focus(): "i" | "e" | "x" {
    return ["i", "e", "x"][
      maybeBoolToIndex(this.type[NamedCOINS.coinA3ie.index])
    ] as any
  }
  get DTFxei(): DTFxei {
    return `${this.dLetter}${this.dFocus}` as any
  }
  get OSNxei(): OSNxei {
    return `${this.oLetter}${this.oFocus}` as any
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
  get D1() {
    return Flipped[this.S2] || this.S2
  }
  get D2() {
    return Flipped[this.S1] || this.S1
  }
  get De(): "De" | "Te" | "Fe" {
    return { e: this.DTFxei, i: Flipped[this.DTFxei] }[this.dFocus]
  }
  get Di(): "Di" | "Ti" | "Fi" {
    return Flipped[this.De]
  }
  get Oe(): "Oe" | "Se" | "Ne" {
    return { e: this.OSNxei, i: Flipped[this.OSNxei] }[this.oFocus]
  }
  get Oi(): "Oi" | "Si" | "Ni" {
    return Flipped[this.Oe]
  }
  get jumper() {
    return this.dFocus === "x" ? null : this.dFocus === this.oFocus
  }
  private _opFunctions: OP4Fns
  get opFunctions(): OP4Fns {
    if (this._opFunctions) return this._opFunctions
    const sex = {
      Si: this.fmS,
      Se: this.fmS,
      Ni: Flipped[this.fmS],
      Ne: Flipped[this.fmS],
      [this.De]: this.fmDe,
      [this.Di]: Flipped[this.fmDe],
    }
    const { odLetter } = this

    const fns: OPFunctionType[] = [
      {
        index: 0,
        grantStackIndex: 0,
        key: this.S1[0],
        letter: this.S1[0] as OPLetterType,
        focus: this.S1[1] as OPFocusType,
        sex: sex[this.S1],
        savior: true,
        odLetter,
      },
      {
        index: 1,
        grantStackIndex: 1,
        key: this.S2[0],
        letter: this.S2[0] as OPLetterType,
        focus: this.S2[1] as OPFocusType,
        sex: sex[this.S2],
        savior: true,
        odLetter: Flipped[odLetter],
      },
      {
        index: 2,
        grantStackIndex: 2,
        key: this.D1[0],
        letter: this.D1[0] as OPLetterType,
        focus: this.D1[1] as OPFocusType,
        sex: sex[this.D1],
        savior: false,
        odLetter: Flipped[odLetter],
      },
      {
        index: 3,
        grantStackIndex: 3,
        key: this.D2[0],
        letter: this.D2[0] as OPLetterType,
        focus: this.D2[1] as OPFocusType,
        sex: sex[this.D2],
        savior: false,
        odLetter,
      },
    ].map((it) => {
      if (it.key === "O" || it.key === "D") it.key = it.grantStackIndex as any
      return it
    })
    if (this.jumper === true) {
      const [s1, s2, d1, d2] = fns
      fns[1] = d1
      d1.grantStackIndex = 1
      fns[2] = s2
      s2.grantStackIndex = 2
    }
    const [fn1, fn2, fn3, fn4] = fns
    return (this._opFunctions = [fn1, fn2, fn3, fn4])
  }

  get letters() {
    return this.opFunctions.sort(sortByIndex).map((opFn) => opFn.letter[0])
  }
  get tIndex() {
    return this.letters.indexOf("T")
  }
  get sIndex() {
    return this.letters.indexOf("S")
  }
  get fIndex() {
    return this.letters.indexOf("F")
  }
  get nIndex() {
    return this.letters.indexOf("N")
  }
  get animalCodes(): [OPAnimalType, OPAnimalType, OPAnimalType, OPAnimalType] {
    return [this.A1, this.A2, this.A3, this.A4]
  }
  get PlayIndex() {
    return this.animalCodes.indexOf("P")
  }
  get BlastIndex() {
    return this.animalCodes.indexOf("B")
  }
  get ConsumeIndex() {
    return this.animalCodes.indexOf("C")
  }
  get SleepIndex() {
    return this.animalCodes.indexOf("S")
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
  toString() {
    return this.OP512
  }
  get OP512(): string {
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
  get sideOfSiNe(): BoolMaybe {
    if (this.oLetter === "N" && this.oFocus === "e") return true
    if (this.oLetter === "S" && this.oFocus === "i") return false
    return null
  }
  get sideOfNiSe(): BoolMaybe {
    if (this.oLetter === "S" && this.oFocus === "e") return true
    if (this.oLetter === "N" && this.oFocus === "i") return false
    return null
  }
  get sideOfFiTe(): BoolMaybe {
    if (this.dLetter === "T" && this.dFocus === "e") return true
    if (this.dLetter === "F" && this.dFocus === "i") return false
    return null
  }
  get sideOfTiFe(): BoolMaybe {
    if (this.dLetter === "F" && this.dFocus === "e") return true
    if (this.dLetter === "T" && this.dFocus === "i") return false
    return null
  }
  get sideOfSFNT(): BoolMaybe {
    if (this.oLetter === "S" && this.dLetter === "F") return true
    if (this.oLetter === "N" && this.dLetter === "T") return false
    return null
  }
  get sideOfNFST(): BoolMaybe {
    if (this.oLetter === "S" && this.dLetter === "T") return true
    if (this.oLetter === "N" && this.dLetter === "F") return false
    return null
  }

  includesText(type: string) {
    return this.toString().includes(type)
  }
  includesAnyText(...types: string[]) {
    return types.findIndex((type) => this.includesText(type)) > -1
  }
}

const Flipped = {
  f: "m" as "m",
  m: "f" as "f",
  S: "N" as "N",
  F: "T" as "T",
  N: "S" as "S",
  T: "F" as "F",
  Sx: "Nx" as "Nx",
  Fx: "Tx" as "Tx",
  Nx: "Sx" as "Sx",
  Tx: "Fx" as "Fx",
  Se: "Ni" as "Ni",
  Fe: "Ti" as "Ti",
  Ne: "Si" as "Si",
  Te: "Fi" as "Fi",
  Si: "Ne" as "Ne",
  Fi: "Te" as "Te",
  Ni: "Se" as "Se",
  Ti: "Fe" as "Fe",
  i: "e" as "e",
  e: "i" as "i",
  x: "x" as "x",
  I: "E" as "E",
  E: "I" as "I",
  X: "X" as "X",
  O: "D" as "D",
  D: "O" as "O",
  Ox: "Ox" as "Ox",
  Dx: "Dx" as "Dx",
  Oi: "Oe" as "Oe",
  Di: "De" as "De",
  Oe: "Oi" as "Oi",
  De: "Di" as "Di",
}

abstract class OPPart {
  readonly code: string
  constructor(public opType: OPT512) {}
}

type AnimalFunctionPair = [Sensing | iNtuition, Thinking | Feeling]

abstract class OPAnimal extends OPPart {
  readonly code: OPAnimalType
  readonly focus: OPFocusType
  get index(): number {
    return this.opType.animalCodes.indexOf(this.code)
  }
  abstract get flipSide(): OPAnimal
  abstract get functions(): AnimalFunctionPair
  get sex(): "MM" | "MF" | "FM" | "FF" {
    return (this.observer.sex + this.decider.sex).toUpperCase() as any
  }
  get observer() {
    return this.functions[0]
  }
  get decider() {
    return this.functions[1]
  }

  get flipSideIsLast() {
    return this.flipSide.index === 3
  }
}
abstract class Info extends OPAnimal {
  kind = "info"
}
abstract class Energy extends OPAnimal {
  kind = "energy"
}

class Blast extends Info {
  readonly code = "B" as "B"
  readonly focus = "e" as "e"
  get flipSide() {
    return this.opType.consume
  }
  get functions(): AnimalFunctionPair {
    return [this.opType.iObserver, this.opType.eDecider]
  }
}
class Consume extends Info {
  readonly code = "C" as "C"
  readonly focus = "i" as "i"
  get flipSide() {
    return this.opType.blast
  }
  get functions(): AnimalFunctionPair {
    return [this.opType.eObserver, this.opType.iDecider]
  }
}
class Play extends Energy {
  readonly code = "P" as "P"
  readonly focus = "e" as "e"
  get flipSide() {
    return this.opType.sleep
  }
  get functions(): AnimalFunctionPair {
    return [this.opType.eObserver, this.opType.eDecider]
  }
}
class Sleep extends Energy {
  readonly code = "S" as "S"
  readonly focus = "i" as "i"
  get flipSide() {
    return this.opType.play
  }
  get functions(): AnimalFunctionPair {
    return [this.opType.iObserver, this.opType.iDecider]
  }
}

const IndexActivationMap = {
  "-1": 0,
  0: 4,
  1: 3,
  2: 2,
  3: 1,
}

const activationReducer = (activation: number, { index }) =>
  activation + IndexActivationMap[index]

const activationCodeReducer = (activation: number, { index }) =>
  activation + IndexActivationMap[index]

export abstract class OPFn extends OPPart {
  code = "X"
  get saviorCode() {
    const {
      opFn: { index },
      animals: [a1],
    } = this
    switch (a1.index) {
      case 0:
        return ["S1", "S2", "ERROR", "ERROR", "ERROR"][index]
      case 1: //return 'A1'
      case 2: //return 'A2'
      case 3:
        return index
    }
  }
  get activation1or2() {
    return { 0: 1, 1: 1, 2: 1, 3: 2, 4: 2, 5: 2 }[this.activation]
  }
  get gapBetweenAnimals(): 0 | 1 | 2 {
    return (this.animals[1].index - this.animals[0].index - 1) as any
  }
  get activationDetails() {
    const {
      opFn: { sex, index, grantStackIndex, savior },
      animals: [fA1, fA2],
      opType: {
        animals: [a1, a2, a3, a4],
      },
      gapBetweenAnimals,
    } = this
    return {
      index,
      grantStackIndex,
      sex,
      gapBetweenAnimals,
    }
  }
  get isPolar() {
    return this.gapBetweenAnimals === 2
  }
  get isPairActive() {
    return this.gapBetweenAnimals === 0
  }
  get activation() {
    const {
      opFn: { sex, index, grantStackIndex, savior },
      animals: [fA1, fA2],
      opType: {
        animals: [a1, a2, a3, a4],
      },
    } = this
    return [
      // savior,
      this.isPairActive && fA1.index === 0 && sex === "m" && index === 0, // M double pair activated 1st
      this.isPairActive && fA1.index === 0 && sex === "m" && index === 1, // M double pair activated 2nd
      this.isPairActive && fA1.index === 0 && sex === "f" && index === 0, // F double pair activated 1st
      this.isPairActive && fA1.index === 0 && sex === "f" && index === 1, // F double pair activated 2nd

      
      9 - fA1.index,
      2 - this.gapBetweenAnimals,
      sex === "m",
      9 - index,
      
      // this.isPairActive && fA1.index === 1 && index === 2 && sex === "m",
      // this.isPairActive && fA1.index === 1 && index === 2 && sex === "f",
      // this.isPairActive && fA1.index === 1 && index === 3 && sex === "m",
      // this.isPairActive && fA1.index === 1 && index === 3 && sex === "f",
      // this.isPairActive && fA1.index === 2 && index === 2 && sex === "m",
      // this.isPairActive && fA1.index === 2 && index === 2 && sex === "f",
      // this.isPairActive && fA1.index === 2 && index === 3 && sex === "m",
      // this.isPairActive && fA1.index === 2 && index === 3 && sex === "f",

      // fA1.sex === "MM" && index === 0 && sex === "m",
      // fA1.sex !== "FF" && index === 0 && sex === "m",
      // fA1.sex !== "FF" && index === 0 && sex === "f",
      // fA1.sex === "FF" && index === 0,
      // fA1.sex === "MM" && index === 1 && sex === "m",
      // fA1.sex !== "FF" && index === 1 && sex === "m",
      // fA1.sex !== "FF" && index === 1 && sex === "f",
      // fA1.sex === "FF" && index === 1,
      // fA1.sex === "MM" && index === 2 && sex === "m",
      // fA1.sex !== "FF" && index === 2 && sex === "m",
      // fA1.sex !== "FF" && index === 2 && sex === "f",
      // fA1.sex === "FF" && index === 2,
      // fA1.sex === "MM" && index === 3 && sex === "m",
      // fA1.sex !== "FF" && index === 3 && sex === "m",
      // fA1.sex !== "FF" && index === 3 && sex === "f",
      // fA1.sex === "FF" && index === 3,
      // fA1.sex === "MM" && index === 2 && sex === "m",
      // fA1.sex !== "FF" && index === 2 && sex === "m",
      // fA1.sex !== "FF" && index === 2 && sex === "f",
      // fA1.sex === "FF" && index === 2,

      // this.isPolar && index === 0 && sex === "m",
      // this.isPolar && index === 1 && sex === "m",

      // first function is always super intense
      // [9, 0, 0, 0][index],

      // masculine functions are constantly being activated unconscously
      // { m: 2, f: 1 }[sex],

      // pair activated functions
      // [9, 5, 1][this.gapBetweenAnimals],

      // middle functions are balanced and constantly toggling
      // [0, 2, 1, 0][index],
      // 9 - grantStackIndex,

      // fA1 === a1,
      // fA1 === a2,
      // fA1 === a3,

      // fA2 === a1,
      // fA2 === a2,
      // fA2 === a3,

      // savior,

      // // index === 0,
      // 9-a1Index,
      // 9-a2Index,
      // 9-index,

      // // 9,
      // 9-grantStackIndex,
      // // 9,
      // // 9-index,
    ]
      .map(Number)
      .reverse()
      .reduceRight((acc, value, index) => acc + value * 10 ** index, 0)
  }
  get animals(): [Info, Energy] | [Energy, Info] | [] {
    const { opFn, opType } = this
    const { play, blast, consume, sleep } = opType
    let animals: [Info, Energy] | [Energy, Info] | []
    switch (opFn?.odLetter + opFn?.focus) {
      case "Oi":
        animals = [sleep, blast]
        break
      case "Oe":
        animals = [consume, play]
        break
      case "Di":
        animals = [sleep, consume]
        break
      case "De":
        animals = [blast, play]
        break
      default:
        animals = []
    }
    return animals.sort(sortByIndex)
  }
  get opFn() {
    return this.opType.opFunctions.filter(
      ({ letter }) => letter === this.code,
    )[0]
  }
  get fullCode() {
    const { sex, code, focus } = this
    return (sex === "?" ? "" : sex) + code + focus
  }
  get sex() {
    return this.opFn?.sex ?? "?"
  }
  get focus() {
    return this.opFn?.focus ?? "?"
  }
  get index() {
    return this.opFn?.index ?? -1
  }
}
class DeciderFn extends OPFn {
  isObserver = false
  isDecider = true
  code = "D"
}
class Feeling extends DeciderFn {
  readonly code = "F"
  get flipSide() {
    return this.opType.thinking
  }
}
class Thinking extends DeciderFn {
  readonly code = "T"
  get flipSide() {
    return this.opType.feeling
  }
}

class ObserverFn extends OPFn {
  isObserver = true
  isDecider = false
  code = "O"
}
class iNtuition extends ObserverFn {
  readonly code = "N"
  get flipSide() {
    return this.opType.sensing
  }
}
class Sensing extends ObserverFn {
  readonly code = "S"
  get flipSide() {
    return this.opType.intuition
  }
}

const maybeBoolToIndex = (value: BoolMaybe) =>
  !isBool(value) ? 2 : value ? 1 : 0

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

function typeNumberToCoins(typeNumber: number | string): OPT512Maybe {
  return typeNumber
    .toString(2)
    .padStart(9, "0")
    .split("")
    .map(Number)
    .map(Boolean) as OPT512Maybe
}

export const sideToDistance = (side: number | boolean): number =>
  side === true
    ? 1
    : side === false
    ? -1
    : side == null
    ? 0
    : typeof side === "number"
    ? [0, -1, 1][side + 1] || 0
    : 0

if (process.env.NODE_ENV !== "production") {
  const assert = (test: () => boolean, message?: string) => {
    console.log(
      test.toString().replace(/^function \(\) {\s+|[;]|return\s+|\s*\}$/g, ""),
    )
    console.assert(test(), message)
  }
  const Tom = OPT512.from("fffesepbcs")
  const Britt = OPT512.from("mmfisisbpc")

  assert(() => Tom.functions[0].activation > 0)
  assert(() => Britt.functions[0].activation > 0)

  assert(() => Tom.feeling.activation > Tom.thinking.activation, "tF > tT")
  assert(() => Tom.feeling.activation > Britt.feeling.activation, "tF > bF")

  assert(() => Britt.feeling.activation < Britt.thinking.activation, "bF < bT")

  console.log({
    "B.f": Britt.feeling.activation,
    "B.f+": JSON.stringify(Britt.feeling.activationDetails),

    "T.f": Tom.feeling.activation,
    "T.f+": JSON.stringify(Tom.feeling.activationDetails),
  })
  console.log("yay")
}
