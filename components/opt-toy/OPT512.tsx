import {
  OPT512Maybe,
  NamedCOINS,
  BoolMaybe,
  isBool,
  cleanCoinText,
  BLANK_TYPE,
  parseCoinText,
  extractAnimalsFromOP512,
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

function codeForBoolMaybe<
  Tails extends string,
  Heads extends string,
  Edge extends string,
>(
  values: readonly [tails: Tails, heads: Heads, edge: Edge],
  side: BoolMaybe,
): Tails | Heads | Edge {
  return values[maybeBoolToIndex(side)]
}

type OPLetterType = OPDLetterType | OPOLetterType | OPODLetterType
type OPAnimalType = OPInfoType | OPEnergyType
type OPCodeLetter = OPLetterType | OPFocusType | OPSexType

type OPODLetterType    = "O"| "D"| "?" // prettier-ignore
type OPDLetterType     = "F"| "T"| "D" // prettier-ignore
type OPOLetterType     = "N"| "S"| "O" // prettier-ignore
type OPFocusType       = "i"| "e"| "x" | "?" // prettier-ignore
type OPSexType         = "f"| "m"| "?" // prettier-ignore
type OPEnergyType      = "S"| "P"| "?" // prettier-ignore
type OPInfoType        = "C"| "B"| "?" // prettier-ignore

const OPODLetterCodes = ["O", "D", "?"] as const // prettier-ignore
const OPDLetterCodes  = ["F", "T", "D"] as const // prettier-ignore
const OPOLetterCodes  = ["N", "S", "O"] as const // prettier-ignore
const OPFocusCodes    = ["i", "e", "x"] as const // prettier-ignore
const OPSexCodes      = ["f", "m", "?"] as const // prettier-ignore
const OPEnergyCodes   = ["S", "P", "?"] as const // prettier-ignore
const OPInfoCodes     = ["C", "B", "?"] as const // prettier-ignore

/** @deprecated use OPFocusCodes instead */
export const FocusCodes = OPFocusCodes

const getOPODLetterCodeForCoinEdge = (side: BoolMaybe) => codeForBoolMaybe(OPODLetterCodes, side) // prettier-ignore
const getOPDLetterCodeForCoinEdge  = (side: BoolMaybe) => codeForBoolMaybe(OPDLetterCodes,  side) // prettier-ignore
const getOPOLetterCodeForCoinEdge  = (side: BoolMaybe) => codeForBoolMaybe(OPOLetterCodes,  side) // prettier-ignore
const getOPFocusCodeForCoinEdge    = (side: BoolMaybe) => codeForBoolMaybe(OPFocusCodes,    side) // prettier-ignore
const getOPSexCodeForCoinEdge      = (side: BoolMaybe) => codeForBoolMaybe(OPSexCodes,      side) // prettier-ignore
const getOPEnergyCodeForCoinEdge   = (side: BoolMaybe) => codeForBoolMaybe(OPEnergyCodes,   side) // prettier-ignore
const getOPInfoCodeForCoinEdge     = (side: BoolMaybe) => codeForBoolMaybe(OPInfoCodes,     side) // prettier-ignore

const OPCodeLetterToSide: { [F in OPCodeLetter]: BoolMaybe } = {
  "?": null,
  x: null,

  e: true,
  i: false,

  D: null,
  O: null,

  T: true,
  F: false,

  S: true,
  N: false,

  m: true,
  f: false,
}

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

const MissingAnimal = {
  BCP: "S" as "S",
  BPS: "C" as "C",
  CPS: "B" as "B",
  BCS: "P" as "P",
}

export const ActivationsToAnimalsString = {
  "B eEnergy eInfo": "BP/S(C)",
  "B iEnergy eInfo": "BS/P(C)",
  "B eEnergy iInfo": "BP/C(S)",
  "B iEnergy iInfo": "BS/C(P)",
  "C eEnergy eInfo": "CP/B(S)",
  "C iEnergy eInfo": "CS/B(P)",
  "C eEnergy iInfo": "CP/S(B)",
  "C iEnergy iInfo": "CS/P(B)",
  "P eEnergy eInfo": "PB/C(S)",
  "P iEnergy eInfo": "PB/S(C)",
  "P eEnergy iInfo": "PC/B(S)",
  "P iEnergy iInfo": "PC/S(B)",
  "S eEnergy eInfo": "SB/P(C)",
  "S iEnergy eInfo": "SB/C(P)",
  "S eEnergy iInfo": "SC/P(B)",
  "S iEnergy iInfo": "SC/B(P)",

  "P xEnergy xInfo": "P",
  "B xEnergy xInfo": "B",
  "C xEnergy xInfo": "C",
  "S xEnergy xInfo": "S",

  "P xEnergy eInfo": "PB",
  "P xEnergy iInfo": "PC",
  "S xEnergy eInfo": "SB",
  "S xEnergy iInfo": "SC",

  "B eEnergy xInfo": "BP",
  "B iEnergy xInfo": "BS",
  "C eEnergy xInfo": "CP",
  "C iEnergy xInfo": "CS",

  "S eEnergy xInfo": "S/P",
  "P iEnergy xInfo": "P/S",
  "B xEnergy iInfo": "B/C",
  "C xEnergy eInfo": "C/B",

  "P eEnergy xInfo": "P(S)",
  "S iEnergy xInfo": "S(P)",
  "B xEnergy eInfo": "B(C)",
  "C xEnergy iInfo": "C(B)",
}

export class OPT512 {
  edit() {
    for (const key in this) {
      if (!key.startsWith("memo_")) continue
      delete this[key]
    }
  }

  static from(typeCode: string): OPT512 { return new OPT512(parseCoinText(typeCode)) } // prettier-ignore
  static fromDirtyCoinText(typeCode: string): OPT512 { return OPT512.from(typeCode) } // prettier-ignore
  static fromCoinText(typeCode: string): OPT512 { return new OPT512(parseCoinText(typeCode)) } // prettier-ignore

  get eDecider() { return this.deciders.find((Dx) => Dx.focus === "e") || this.deciders[0] } // prettier-ignore
  get iDecider() { return this.deciders.find((Dx) => Dx.focus === "i") || this.deciders[1] } // prettier-ignore
  get deciders() {
    const { feeling, thinking } = this
    return [feeling, thinking].sort(sortByIndex)
  }
  get eObserver() { return this.observers.find((Ox) => Ox.focus === "e") || this.observers[0] } // prettier-ignore
  get iObserver() { return this.observers.find((Ox) => Ox.focus === "i") || this.observers[1] } // prettier-ignore
  get observers() {
    const { intuition, sensing } = this
    return [intuition, sensing].sort(sortByIndex)
  }
  get functions() {
    const { feeling, thinking, intuition, sensing } = this
    return [feeling, thinking, intuition, sensing].sort(sortByIndex)
  }
  readonly S = new Sensing(this)
  readonly T = new Thinking(this)
  readonly N = new iNtuition(this)
  readonly F = new Feeling(this)

  readonly sensing = this.S
  readonly thinking = this.T
  readonly intuition = this.N
  readonly feeling = this.F

  get Di(): Thinking | Feeling { return this[this.codeDi[0]] } // prettier-ignore
  get De(): Thinking | Feeling { return this[this.codeDe[0]] } // prettier-ignore
  get Oi(): Sensing | iNtuition { return this[this.codeOi[0]] } // prettier-ignore
  get Oe(): Sensing | iNtuition { return this[this.codeOe[0]] } // prettier-ignore

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

  private getAnimalByLetters(letters: AnimalLetters) {
    const { play, sleep, blast, consume } = this
    const animals = [play, sleep, blast, consume]
    const index = animals.findIndex((animal) => animal.letters === letters)
    return animals[index]
  }
  get ST() { return this.getAnimalByLetters("ST") } // prettier-ignore
  get SF() { return this.getAnimalByLetters("SF") } // prettier-ignore
  get NT() { return this.getAnimalByLetters("NT") } // prettier-ignore
  get NF() { return this.getAnimalByLetters("NF") } // prettier-ignore

  constructor(public type: OPT512Maybe) {
    this.type = (type || BLANK_TYPE).slice(0) as OPT512Maybe
  }
  toJSON() { return this.type } // prettier-ignore
  static fromJSON(type: OPT512Maybe) { return new OPT512(type) } // prettier-ignore

  get typeNumber() { return parseInt(this.typeNumberString, 2) } // prettier-ignore
  get typeNumberString() { return this.type.map(Number).reverse().join("") } // prettier-ignore
  getComplimentType(): OPT512 { return OPT512.fromTypeNumber(this.typeNumber ^ 0b111111111) } // prettier-ignore
  static fromTypeNumber(typeNumber: number): OPT512 { return new OPT512(typeNumberToCoins(typeNumber)) } // prettier-ignore
  static random() { return OPT512.fromTypeNumber(getRandomInt(0, 0b111111111)) } // prettier-ignore

  /** @deprecated*/
  get sortValue() {
    return (
      sideToDistance(this.type[NamedCOINS.coinNS.index]) *
        (this.type[NamedCOINS.coinOD.index] ? 10 : 100) +
      sideToDistance(this.type[NamedCOINS.coinFT.index]) *
        (this.type[NamedCOINS.coinOD.index] ? 100 : 10) +
      sideToDistance(this.type[NamedCOINS.coinOD.index]) * 1000
    )
  }

  /** @deprecated*/
  get dPosition() { return this.De.rawActivation - this.Di.rawActivation } // prettier-ignore
  /** @deprecated*/
  get dRotation() {
    return (
      Math.round(
        ((Math.atan2(this.De.rawActivation, this.Di.rawActivation) * 180) /
          Math.PI) *
          100,
      ) / 100
    )
  }
  /** @deprecated*/
  get oPosition() { return this.Oe.rawActivation - this.Oi.rawActivation } // prettier-ignore
  /** @deprecated*/
  get oRotation() {
    return (
      Math.round(
        ((Math.atan2(this.Oe.rawActivation, this.Oi.rawActivation) * 180) /
          Math.PI) *
          100,
      ) / 100
    )
  }
  /** @deprecated*/
  get temperamentPosition(): [number, number] { return [this.dPosition, this.oPosition] } // prettier-ignore
  /** @deprecated*/
  get temperamentRotation() {
    return (
      Math.round(
        ((Math.atan2(...this.temperamentPosition) * 180) / Math.PI) * 100,
      ) / 100
    )
  }

  /** @deprecated*/
  get positionSTNF() {
    return (
      (4 - this.ST.rawActivation) * 100 + (4 - this.NF.rawActivation) * -100
    )
  }
  /** @deprecated*/
  get positionSFNT() {
    return (
      (4 - this.SF.rawActivation) * 100 + (4 - this.NT.rawActivation) * -100
    )
  }

  private memo_position: number[]
  /** @deprecated*/
  get position() {
    return (
      this.memo_position ||
      (this.memo_position = [
        this.sIndex,
        this.tIndex,
        this.nIndex,
        this.fIndex,

        this.PlayIndex,
        this.BlastIndex,
        this.ConsumeIndex,
        this.SleepIndex,

        this.play.rawActivation,
        this.blast.rawActivation,
        this.consume.rawActivation,
        this.sleep.rawActivation,

        this.positionSTNF,
        // this.NT.index,
        // this.SF.index,

        ...[
          OPCodeLetterToSide[this.S.focus],
          OPCodeLetterToSide[this.T.focus],

          OPCodeLetterToSide[this.S.sex],
          OPCodeLetterToSide[this.De.sex],
          OPCodeLetterToSide[this.T.sex],

          // this.sideOfEnergyInfo,
          // this.sideOfNFST,
          // this.sideOfSFNT,
          // this.sideOfFiTe,
          // this.sideOfNiSe,
          // this.sideOfSiNe,
          // this.sideOfTiFe,
          ...this.type,
        ].map(sideToDistance),
      ].map(Number))
    )
  }
  /** @deprecated*/
  static getCoinDistanceBetween(a: OPT512, b: OPT512) { return euclideanDistance(a?.position, b?.position) } // prettier-ignore

  /** @deprecated*/
  get rawActivation() { return this.functions.reduce((aaa, fn) => aaa + fn?.activation, 0) } // prettier-ignore

  static getAll(): OPT512[] {
    return Array(512)
      .fill(0)
      .map((_, i) => OPT512.fromTypeNumber(i))
  }

  get eCount() { return this.type.filter((it) => it === true).length } // prettier-ignore
  get iCount() { return this.type.filter((it) => it === false).length } // prettier-ignore
  get nullCount() { return this.type.filter((it) => it == null).length } // prettier-ignore
  get isEmpty() { return this.nullCount === this.type.length } // prettier-ignore
  get isFull() { return this.nullCount === 0 } // prettier-ignore
  get fmS(): OPSexType { return getOPSexCodeForCoinEdge(this.type[NamedCOINS.coinSfm.index]) } // prettier-ignore
  get fmDe() { return getOPSexCodeForCoinEdge(this.type[NamedCOINS.coinDefm.index]) } // prettier-ignore

  get odLetter() { return getOPODLetterCodeForCoinEdge(this.type[NamedCOINS.coinOD.index]) } // prettier-ignore
  set odLetter(letter: OPODLetterType) { this.edit(); this.type[NamedCOINS.coinOD.index] = OPCodeLetterToSide[letter] } // prettier-ignore

  get dLetter() { return getOPDLetterCodeForCoinEdge(this.type[NamedCOINS.coinFT.index]) } // prettier-ignore
  set dLetter(letter: OPDLetterType) { this.edit(); this.type[NamedCOINS.coinFT.index] = OPCodeLetterToSide[letter] } // prettier-ignore

  get oLetter(): OPOLetterType { return getOPOLetterCodeForCoinEdge(this.type[NamedCOINS.coinNS.index]) } // prettier-ignore
  set oLetter(letter: OPOLetterType) { this.edit(); this.type[NamedCOINS.coinNS.index] = OPCodeLetterToSide[letter] } // prettier-ignore

  get dFocus() { return getOPFocusCodeForCoinEdge(this.type[NamedCOINS.coinDiDe.index]) } // prettier-ignore
  set dFocus(letter: OPFocusType) { this.edit(); this.type[NamedCOINS.coinDiDe.index] = OPCodeLetterToSide[letter] } // prettier-ignore

  get oFocus() { return getOPFocusCodeForCoinEdge(this.type[NamedCOINS.coinOiOe.index]) } // prettier-ignore
  set oFocus(letter: OPFocusType) { this.edit(); this.type[NamedCOINS.coinOiOe.index] = OPCodeLetterToSide[letter] } // prettier-ignore

  /** @deprecated use energyActivation or infoActivation instead */
  get a2Focus() { return getOPFocusCodeForCoinEdge(this.a2FocusBool) } // prettier-ignore
  /** @deprecated use energyActivationBool or infoActivationBool instead */
  get a2FocusBool() { return null } // prettier-ignore
  /** @deprecated use energyActivationBool or infoActivationBool instead */
  get a3FocusBool() { return null } // prettier-ignore
  /** @deprecated use energyActivationBool or infoActivationBool instead */
  set a2FocusBool(side: BoolMaybe) { this.edit() } // prettier-ignore
  /** @deprecated use energyActivationBool or infoActivationBool instead */
  set a3FocusBool(side: BoolMaybe) { this.edit() } // prettier-ignore
  /** @deprecated use energyActivation or infoActivation instead */
  get a3Focus() { return getOPFocusCodeForCoinEdge(this.a3FocusBool) } // prettier-ignore

  get energyActivation() { return getOPFocusCodeForCoinEdge(this.energyActivationBool) } // prettier-ignore
  get energyActivationBool() { return this.type[NamedCOINS.coinEnAct.index] } // prettier-ignore
  set energyActivation(letter: OPFocusType) { this.energyActivationBool = OPCodeLetterToSide[letter] } // prettier-ignore
  set energyActivationBool(side: BoolMaybe) { this.edit(); this.type[NamedCOINS.coinEnAct.index] = side } // prettier-ignore

  get infoActivation() { return getOPFocusCodeForCoinEdge(this.infoActivationBool) } // prettier-ignore
  get infoActivationBool() { return this.type[NamedCOINS.coinInAct.index] } // prettier-ignore
  set infoActivation(letter: OPFocusType) { this.infoActivationBool = OPCodeLetterToSide[letter] } // prettier-ignore
  set infoActivationBool(side: BoolMaybe) { this.edit(); this.type[NamedCOINS.coinInAct.index] = side } // prettier-ignore

  get DTFxei(): DTFxei { return `${this.dLetter}${this.dFocus}` as any } // prettier-ignore
  get OSNxei(): OSNxei { return `${this.oLetter}${this.oFocus}` as any } // prettier-ignore

  get S1() { return codeForBoolMaybe([this.OSNxei, this.DTFxei, this.DTFxei], this.type[NamedCOINS.coinOD.index]) } // prettier-ignore
  get S2() { return codeForBoolMaybe([this.DTFxei, this.OSNxei, this.OSNxei], this.type[NamedCOINS.coinOD.index]) } // prettier-ignore
  get D1() { return Flipped[this.S2] || this.S2 } // prettier-ignore
  get D2() { return Flipped[this.S1] || this.S1 } // prettier-ignore

  get codeDe(): "De" | "Te" | "Fe" { return { e: this.DTFxei, i: Flipped[this.DTFxei] }[this.dFocus] } // prettier-ignore
  get codeOe(): "Oe" | "Se" | "Ne" { return { e: this.OSNxei, i: Flipped[this.OSNxei] }[this.oFocus] } // prettier-ignore
  get codeDi(): "Di" | "Ti" | "Fi" { return Flipped[this.codeDe] } // prettier-ignore
  get codeOi(): "Oi" | "Si" | "Ni" { return Flipped[this.codeOe] } // prettier-ignore

  get isJumper() { return this.dFocus === "x" ? null : this.dFocus === this.oFocus } // prettier-ignore

  private memo_opFunctions: OP4Fns
  get opFunctions(): OP4Fns {
    if (this.memo_opFunctions) return this.memo_opFunctions
    const sex = {
      Si: this.fmS,
      Se: this.fmS,
      Ni: Flipped[this.fmS],
      Ne: Flipped[this.fmS],
      [this.codeDe]: this.fmDe,
      [this.codeDi]: Flipped[this.fmDe],
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
    if (this.isJumper === true) {
      const [s1, s2, d1, d2] = fns
      fns[1] = d1
      d1.grantStackIndex = 1
      fns[2] = s2
      s2.grantStackIndex = 2
    }
    const [fn1, fn2, fn3, fn4] = fns
    return (this.memo_opFunctions = [fn1, fn2, fn3, fn4])
  }

  get letters() { return this.opFunctions.sort(sortByIndex).map((opFn) => opFn.letter[0])  } // prettier-ignore
  get tIndex() { return this.letters.indexOf("T")  } // prettier-ignore
  get sIndex() { return this.letters.indexOf("S")  } // prettier-ignore
  get fIndex() { return this.letters.indexOf("F")  } // prettier-ignore
  get nIndex() { return this.letters.indexOf("N")  } // prettier-ignore

  get PlayIndex() { return this.animalLetters.indexOf("P")  } // prettier-ignore
  get BlastIndex() { return this.animalLetters.indexOf("B")  } // prettier-ignore
  get ConsumeIndex() { return this.animalLetters.indexOf("C")  } // prettier-ignore
  get SleepIndex() { return this.animalLetters.indexOf("S")  } // prettier-ignore
  get A1Code() { return `O${this.oFocus}D${this.dFocus}`  } // prettier-ignore

  private get activationStack() { return `${this.A1} ${this.energyActivation}Energy ${this.infoActivation}Info`  } // prettier-ignore
  private get animalString(): any { return ActivationsToAnimalsString[this.activationStack] ?? "?"  } // prettier-ignore
  private get animalLetters(): any { return extractAnimalsFromOP512(this.animalString)  } // prettier-ignore

  get animalCodes(): [OPAnimalType, OPAnimalType, OPAnimalType, OPAnimalType] { return this.animalLetters.split("")  } // prettier-ignore

  get A1(): OPAnimalType { return AnimalCodeToAnimalLetter[this.A1Code] || "?"  } // prettier-ignore
  get A2(): OPAnimalType { return this.animalLetters[1] ?? "?"  } // prettier-ignore
  get A3(): OPAnimalType { return this.animalLetters[2] ?? "?"  } // prettier-ignore
  get A4(): OPAnimalType { return this.animalLetters[3] ?? "?"  } // prettier-ignore

  toString() { return this.OPSCode  } // prettier-ignore
  valueOf() { return this.toString()  } // prettier-ignore

  get OPSCode(): string {
    const { sexString, S1, S2, animalString } = this
    return `${sexString}${S1}/${S2}-${animalString}`
  }
  private get sexString() {
    const { fmS, fmDe } = this
    return fmS === "?" && fmDe === "?" ? "" : `${fmS}${fmDe}-`.toUpperCase()
  }

  /** @deprecated use toString instead */
  get OP512(): string {
    const { fmS, fmDe, S1, S2, A1, A2, A3, A4 } = this
    return `${fmS}${fmDe}-${S1}/${S2}-${A1}${A2}/${A3}(${A4})`
  }

  get sideOfEnergyInfo(): BoolMaybe { return { P:true, S:true, C:false, B:false }[this.A4] } // prettier-ignore
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
  /** @deprecated*/
  includesText(type: string) { return this.toString().includes(type) } // prettier-ignore
  /** @deprecated*/
  includesAnyText(...types: string[]) { return types.findIndex((type) => this.includesText(type)) > -1 } // prettier-ignore
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

const rawActivations = [
  7206,
  7207,
  7216,
  7217,
  8106,
  8107,
  8116,
  8117,
  8206,
  8207,
  8216,
  8217,
  ,
  9008,
  9009,
  9018,
  9019,
  9108,
  9109,
  9118,
  9119,
  19208,
  109209,
  1009218,
  10009219,
]

export abstract class OPPart {
  readonly code: string
  constructor(public opType: OPT512) {}
  abstract get flipSide(): OPPart
  abstract get rawActivation(): number
  get activation() { return rawActivations.indexOf(this.rawActivation) } // prettier-ignore
  get activationDistance() { return this.activation - 12 } // prettier-ignore
}

type AnimalFunctionPair = [Sensing | iNtuition, Thinking | Feeling]

type AnimalLetters = "ST" | "SF" | "NT" | "NF"

abstract class OPAnimal extends OPPart {
  get letters(): AnimalLetters {
    const [{ code: letterO }, { code: letterD }] = this.functions
    return (letterO + letterD) as any // TODO(tom): remove any once we upgrade to the latest TS
  }
  readonly code: OPAnimalType
  get name() { return this.constructor.name } // prettier-ignore
  readonly focus: OPFocusType
  get index(): number { return this.opType.animalCodes.indexOf(this.code) } // prettier-ignore
  abstract get flipSide(): OPAnimal
  abstract get functions(): AnimalFunctionPair
  get sex(): "MM" | "MF" | "FM" | "FF" { return (this.observer.sex + this.decider.sex).toUpperCase() as any } // prettier-ignore
  get observer() { return this.functions[0] } // prettier-ignore
  get decider() { return this.functions[1] } // prettier-ignore
  get flipSideIsLast() { return this.flipSide.index === 3 } // prettier-ignore
  get rawActivation() {
    return (
      2 -
      this.index +
      (this.flipSideIsLast ? 0.5 : 0) +
      0.1 * ({ MM: 2, MF: 1, FM: -1, FF: -2 }[this.sex] ?? 0)
    )
  }
  get temperament() { return `${this.observer.code}${this.decider.code}` } // prettier-ignore
  get label() { return `${this.sex} ${this.temperament} ${this.name}` } // prettier-ignore
}
abstract class InfoAnimal extends OPAnimal {
  kind = "info"
}
abstract class EnergyAnimal extends OPAnimal {
  kind = "energy"
}

class Blast extends InfoAnimal {
  readonly code = "B" as "B"
  readonly focus = "e" as "e"
  get flipSide() { return this.opType.consume } // prettier-ignore
  get functions(): AnimalFunctionPair { return [this.opType.iObserver, this.opType.eDecider] } // prettier-ignore
}
class Consume extends InfoAnimal {
  readonly code = "C" as "C"
  readonly focus = "i" as "i"
  get flipSide() { return this.opType.blast } // prettier-ignore
  get functions(): AnimalFunctionPair { return [this.opType.eObserver, this.opType.iDecider] } // prettier-ignore
}
class Play extends EnergyAnimal {
  readonly code = "P" as "P"
  readonly focus = "e" as "e"
  get flipSide() { return this.opType.sleep } // prettier-ignore
  get functions(): AnimalFunctionPair { return [this.opType.eObserver, this.opType.eDecider] } // prettier-ignore
}
class Sleep extends EnergyAnimal {
  readonly code = "S" as "S"
  readonly focus = "i" as "i"
  get flipSide() { return this.opType.play } // prettier-ignore
  get functions(): AnimalFunctionPair { return [this.opType.iObserver, this.opType.iDecider] } // prettier-ignore
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
  get label() { return this.fullCode } // prettier-ignore
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
  get activation1or2() { return { 0: 1, 1: 1, 2: 1, 3: 2, 4: 2, 5: 2 }[this.activation] } // prettier-ignore
  get gapBetweenAnimals(): 0 | 1 | 2 { return (this.animals[1]?.index - this.animals[0]?.index - 1) as any } // prettier-ignore
  get activationDetails() {
    const {
      opFn: { sex, index, grantStackIndex, savior } = {},
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
  get isPolar() { return this.gapBetweenAnimals === 2 } // prettier-ignore
  get isPairActive() { return this.gapBetweenAnimals === 0 } // prettier-ignore

  get rawActivation() {
    const {
      opFn: { sex, index, grantStackIndex, savior } = {},
      animals: [fA1, fA2],
      opType: {
        animals: [a1, a2, a3, a4],
      },
    } = this

    return [
      // savior,
      // this.isPairActive && fA1.index === 0 && sex === "m" && index === 0, // M double pair activated 1st
      // this.isPairActive && fA1.index === 0 && sex === "m" && index === 1, // M double pair activated 2nd
      // this.isPairActive && fA1.index === 0 && sex === "f" && index === 0, // F double pair activated 1st
      // this.isPairActive && fA1.index === 0 && sex === "f" && index === 1, // F double pair activated 2nd

      1 + index,
      1 + fA1?.index,
      1 + fA2?.index,
      // 2 - this.gapBetweenAnimals,
      // sex === "m",

      // { info: -1, energy: 1 }[fA1.kind] ?? 0,

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
  get animals(): [InfoAnimal, EnergyAnimal] | [EnergyAnimal, InfoAnimal] | [] {
    const { opFn, opType } = this
    const { play, blast, consume, sleep } = opType
    let animals: [InfoAnimal, EnergyAnimal] | [EnergyAnimal, InfoAnimal] | []
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
  get sex() { return this.opFn?.sex ?? "?" } // prettier-ignore
  get focus() { return this.opFn?.focus ?? "?" } // prettier-ignore
  get index() { return this.opFn?.index ?? -1 } // prettier-ignore
}
abstract class DeciderFn extends OPFn {
  isObserver = false
  isDecider = true
  code = "D"
}
class Feeling extends DeciderFn {
  readonly code = "F"
  get flipSide() { return this.opType.thinking } // prettier-ignore
}
class Thinking extends DeciderFn {
  readonly code = "T"
  get flipSide() { return this.opType.feeling } // prettier-ignore
}

abstract class ObserverFn extends OPFn {
  isObserver = true
  isDecider = false
  code = "O"
}
class iNtuition extends ObserverFn {
  readonly code = "N"
  get flipSide() { return this.opType.sensing } // prettier-ignore
}
class Sensing extends ObserverFn {
  readonly code = "S"
  get flipSide() { return this.opType.intuition } // prettier-ignore
}

export const maybeBoolToIndex = (value: BoolMaybe) =>
  !isBool(value) ? 2 : value ? 1 : 0

const AnimalCodeToAnimalLetter = {
  OiDi: "S",
  OiDe: "B",
  OeDi: "C",
  OeDe: "P",
}

/**
 * @deprecated
 */
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
