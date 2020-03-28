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

type OPODLetterType = "O" | "D" | "?"
type OPDLetterType = "F" | "T" | "D"
type OPOLetterType = "N" | "S" | "O"
type OPLetterType = "N" | "S" | "F" | "T" | "X"
type OPFocusType = "i" | "e" | "x" | "?"
type OPSexType = "f" | "m" | "?"
type OPAnimalType = "P" | "B" | "C" | "S" | "?"

export interface OPFunctionType {
  index: number
  key: any
  letter: OPLetterType
  focus: OPFocusType
  sex: OPSexType
  savior: boolean
  odLetter: OPODLetterType
}

const sortByIndex = ({ index: a }, { index: b }) => sortBy(a, b)

export class OPT512 {
  static fromDirtyCoinText(typeCode: string): OPT512 {
    return new OPT512(parseCoinText(cleanCoinText(typeCode)))
  }
  static fromCoinText(typeCode: string): OPT512 {
    return new OPT512(parseCoinText(typeCode))
  }

  get eDecider() {
    return this.deciders.find(Dx => Dx.focus === "e") || this.deciders[0]
  }
  get iDecider() {
    return this.deciders.find(Dx => Dx.focus === "i") || this.deciders[1]
  }
  get deciders() {
    const { feeling, thinking } = this
    return [feeling, thinking].sort(sortByIndex)
  }
  get eObserver() {
    return this.observers.find(Ox => Ox.focus === "e") || this.observers[0]
  }
  get iObserver() {
    return this.observers.find(Ox => Ox.focus === "i") || this.observers[1]
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
  play = new Play(this)
  sleep = new Sleep(this)
  blast = new Blast(this)
  consume = new Consume(this)

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
  get D1() {
    return Flipped[this.S2] || this.S2
  }
  get D2() {
    return Flipped[this.S1] || this.S1
  }
  get De() {
    return { e: this.DTFxei, i: Flipped[this.DTFxei] }[this.dFocus]
  }
  get Di() {
    return Flipped[this.De]
  }
  get Oe() {
    return { e: this.OSNxei, i: Flipped[this.OSNxei] }[this.oFocus]
  }
  get Oi() {
    return Flipped[this.Oe]
  }
  get jumper() {
    return this.dFocus === "x" ? null : this.dFocus === this.oFocus
  }
  get opFunctions(): [
    OPFunctionType,
    OPFunctionType,
    OPFunctionType,
    OPFunctionType,
  ] {
    const sex = {
      Si: this.fmS,
      Se: this.fmS,
      Ni: Flipped[this.fmS],
      Ne: Flipped[this.fmS],
      [this.De]: this.fmDe,
      [this.Di]: Flipped[this.fmDe],
    }
    const { odLetter } = this

    const fns = [
      {
        index: 0,
        key: this.S1[0],
        letter: this.S1[0],
        focus: this.S1[1],
        sex: sex[this.S1],
        savior: true,
        odLetter,
      },
      {
        index: 1,
        key: this.S2[0],
        letter: this.S2[0],
        focus: this.S2[1],
        sex: sex[this.S2],
        savior: true,
        odLetter: Flipped[odLetter],
      },
      {
        index: 2,
        key: this.D1[0],
        letter: this.D1[0],
        focus: this.D1[1],
        sex: sex[this.D1],
        savior: false,
        odLetter: Flipped[odLetter],
      },
      {
        index: 3,
        key: this.D2[0],
        letter: this.D2[0],
        focus: this.D2[1],
        sex: sex[this.D2],
        savior: false,
        odLetter,
      },
    ].map(it => {
      if (it.key === "O" || it.key === "D") it.key = it.index
      return it
    })
    if (this.jumper === true) {
      const [s1, s2, d1, d2] = fns
      fns[1] = d1
      d1.index = 1
      fns[2] = s2
      s2.index = 2
    }
    const [fn1, fn2, fn3, fn4] = fns
    return [fn1, fn2, fn3, fn4]
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
  get sideOfSiNe(): BoolMaybe {
    if (this.oLetter === "S" && this.oFocus === "i") return false
    if (this.oLetter === "N" && this.oFocus === "e") return true
    return null
  }
  get sideOfNiSe(): BoolMaybe {
    if (this.oLetter === "N" && this.oFocus === "i") return false
    if (this.oLetter === "S" && this.oFocus === "e") return true
    return null
  }
  get sideOfFiTe(): BoolMaybe {
    if (this.dLetter === "F" && this.dFocus === "i") return false
    if (this.dLetter === "T" && this.dFocus === "e") return true
    return null
  }
  get sideOfTiFe(): BoolMaybe {
    if (this.dLetter === "T" && this.dFocus === "i") return false
    if (this.dLetter === "F" && this.dFocus === "e") return true
    return null
  }
  get sideOfSFNT(): BoolMaybe {
    if (this.oLetter === "S" && this.dLetter === "F") return false
    if (this.oLetter === "N" && this.dLetter === "T") return true
    return null
  }
  get sideOfNFST(): BoolMaybe {
    if (this.oLetter === "N" && this.dLetter === "F") return false
    if (this.oLetter === "S" && this.dLetter === "T") return true
    return null
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
}

class OPPart {
  readonly code: string
  constructor(protected opType: OPT512) {}
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
  get observer(){
    return this.functions[0]
  }
  get decider(){
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
  0: 3,
  1: 2,
  2: 1,
  3: -1,
}

const activationReducer = (activation: number, { index }) =>
  activation + IndexActivationMap[index]

const activationCodeReducer = (activation: number, { index }) =>
  activation + IndexActivationMap[index]

class OPFn extends OPPart {
  code = "X"
  get saviorCode() {
    const { opFn, opType, activation } = this
    const [sex, savior, index] = [opFn?.sex, opFn?.savior, opFn?.index]
    if (savior) return "S" + { 0: 1, 1: 2, 2: 2, 3: 2 }[index]
    return activation === 0 ? "-" : "A"
  }
  get activation1or2() {
    return { 0: 1, 1: 1, 2: 1, 3: 2, 4: 2, 5: 2 }[this.activation]
  }
  get activation() {
    return this.animals.reduce(activationReducer, 0)
  }
  get animals(): OPAnimal[] {
    const { opFn, opType } = this
    const { play, blast, consume, sleep } = opType
    switch (opFn?.odLetter + opFn?.focus) {
      case "Oi":
        return [sleep, blast]
      case "Oe":
        return [consume, play]
      case "Di":
        return [sleep, consume]
      case "De":
        return [blast, play]
      default:
        return []
    }
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
    return this.opFn?.sex || "?"
  }
  get focus() {
    return this.opFn?.focus || "?"
  }
  get index() {
    return this.opType.opFunctions.findIndex(
      ({ letter }) => letter === this.code,
    )
  }
}
class DeciderFn extends OPFn {
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
