import { describe, it, expect, test } from "@jest/globals"
import { extractAnimalsFromOP512 } from "./Coin"
import { ActivationsToAnimalsString, FocusCodes, maybeBoolToIndex, NamedCOINS, OPT512, parseCoinText } from "./OPT512"
const { coinOD, coinDiDe, coinOiOe, coinFT, coinNS, coinEnAct, coinInAct, coinSfm, coinDefm } = NamedCOINS

const uniq = (item: unknown, index: number, items: unknown[]): boolean => items.indexOf(item) === index
// import { OPT512 } from "./OPT512"
// import { sortBy, sorterize } from "./sortBy"

// const assert = (test: () => boolean, message?: string = "") => {
//   const command = test.toString().replace(/^function \(\) {\s+|[;]|return\s+|\s*\}$|var \$_\$.+\n[^)]+\),\s+/g, "")
//   const result = test()
//   console.assert(result, `${message} ${command}`)
//   return result
// }

// assert(() => OPT512.getAll().length === 512)

// const Tom = OPT512.from("fffesepbcs")
// const Britt = OPT512.from("mmfisisbpc")

// assert(() => Britt.play.rawActivation < Tom.play.rawActivation) //?
// assert(() => Britt.blast.rawActivation > Tom.blast.rawActivation) //?
// assert(() => Britt.consume.rawActivation < Tom.consume.rawActivation) //?
// assert(() => Britt.sleep.rawActivation > Tom.sleep.rawActivation) //?

// function rawActivation(STNF) {
//   const {
//     opFn: { sex, index, grantStackIndex, savior },
//     animals: [fA1, fA2],
//     opType: {
//       animals: [a1, a2, a3, a4],
//     },
//   } = STNF

//   return [index, fA1.index, fA2.index]
//     .map(Number)
//     .reverse()
//     .reduceRight((acc, value, index) => acc + value * 10 ** index, 0)
// }

// rawActivation(Tom.S) //?
// rawActivation(Tom.T) //?
// rawActivation(Tom.N) //?
// rawActivation(Tom.F) //?

// Britt.feeling.activationDetails

// Tom.functions.sort(sorterize(rawActivation)).map((f) => f.code) //?
// Britt.functions.sort(sorterize(rawActivation)).map((f) => f.code) //?

// assert(() => Tom.feeling.rawActivation > Tom.thinking.rawActivation) //?
// assert(() => Tom.feeling.rawActivation > Britt.feeling.rawActivation) //?

// // assert(() => Britt.feeling.activation < Britt.thinking.activation, "bF < bT")

// // console.log({
// //   "B.f": Britt.feeling.activation,
// //   "B.f+": JSON.stringify(Britt.feeling.activationDetails),

// //   "T.f": Tom.feeling.activation,
// //   "T.f+": JSON.stringify(Tom.feeling.activationDetails),
// // })
// // console.log("yay")

// // Britt.feeling.activation

describe("OPT512", () => {
  it("exists", () => {
    expect(OPT512).toBeDefined()
  })

  describe("setters", () => {
    let opType: OPT512
    beforeEach(() => (opType = OPT512.random()))
    describe("dLetter", () => {
      // prettier-ignore
      it("can be set", () => {
        expect(opType.dLetter).not.toEqual("D")
        opType.dLetter = "D";expect(opType.dLetter).toEqual("D")
        opType.dLetter = "T";expect(opType.dLetter).toEqual("T")
        opType.dLetter = "F";expect(opType.dLetter).toEqual("F")
      })
    })
    describe("oLetter", () => {
      // prettier-ignore
      it("can be set", () => {
        opType.oLetter = "O";expect(opType.oLetter).toEqual("O")
        opType.oLetter = "S";expect(opType.oLetter).toEqual("S")
        opType.oLetter = "N";expect(opType.oLetter).toEqual("N")
      })
    })
    describe("dFocus", () => {
      // prettier-ignore
      it("can be set", () => {
        opType.dFocus = "e";expect(opType.dFocus).toBe("e")
        opType.dFocus = "i";expect(opType.dFocus).toBe("i")
        opType.dFocus = "x";expect(opType.dFocus).toBe("x")
        opType.dFocus = "?";expect(opType.dFocus).toBe("x")
      })
    })
    describe("oFocus", () => {
      // prettier-ignore
      it("can be set", () => {
        opType.oFocus = "e";expect(opType.oFocus).toBe("e")
        opType.oFocus = "i";expect(opType.oFocus).toBe("i")
        opType.oFocus = "x";expect(opType.oFocus).toBe("x")
        opType.oFocus = "?";expect(opType.oFocus).toBe("x")
      })
    })
    describe("energyActivationBool", () => {
      // prettier-ignore
      it("can be set", () => {
        opType.energyActivationBool = null; expect(opType.energyActivationBool).toBe(null)
        opType.energyActivationBool = true; expect(opType.energyActivationBool).toBe(true)
        opType.energyActivationBool = false; expect(opType.energyActivationBool).toBe(false)
      })
    })
    describe("infoActivationBool", () => {
      // prettier-ignore
      it("can be set", () => {
        opType.infoActivationBool = null; expect(opType.infoActivationBool).toBe(null)
        opType.infoActivationBool = true; expect(opType.infoActivationBool).toBe(true)
        opType.infoActivationBool = false; expect(opType.infoActivationBool).toBe(false)
      })
    })
  })

  describe("partial types", () => {
    describe("rendering", () => {
      it("must not render undefined", () => {
        const types = [
          new OPT512(null)
        ]
        for (const opType of types) {
          expect(opType.OPSCode).not.toMatch(/undefined/)
        }
      })
    })
  })

  describe("cloning", () => {
    describe("ActivationsToAnimalStack", () => {
      const animalStacks512 = OPT512.getAll()
        .map((o) => o.toString())
        .map((it) => extractAnimalsFromOP512(it))
        .filter(uniq)
      it("includes partial animal stacks", () => {
        const animalStacks = [
          ...animalStacks512,
          "P",
          "B",
          "C",
          "S",

          "P(S)",
          "B(C)",
          "C(B)",
          "S(P)",

          "P/S",
          "B/C",
          "C/B",
          "S/P",

          "PB",
          "BP",
          "CS",
          "SC",

          "PC",
          "BS",
          "CP",
          "SB",
        ]
        for (const animals of animalStacks) {
          expect(Object.values(ActivationsToAnimalsString)).toContain(animals)
        }
      })
      it("includes partial activation stacks", () => {
        /*prettier-ignore*/
        const animalStacks =
          "PBCS".split("").map(PBCS => 
          "xie".split('').map(xieIn => 
          "xie".split('').map(xieEn => `${PBCS} ${xieEn}Energy ${xieIn}Info`))).flat(9)

        for (const animals of animalStacks) {
          expect(Object.keys(ActivationsToAnimalsString)).toContain(animals)
        }
      })

      it("includes all stacks", () => {
        for (const animals of animalStacks512) {
          expect(Object.values(ActivationsToAnimalsString)).toContain(animals)
        }
      })

      it("has unique values", () => {
        expect(Object.values(ActivationsToAnimalsString).filter(uniq).length).toEqual(
          Object.keys(ActivationsToAnimalsString).length,
        )
      })
      it("has values that match its keys", () => {
        for (const activationStack in ActivationsToAnimalsString) {
          if (Object.prototype.hasOwnProperty.call(ActivationsToAnimalsString, activationStack)) {
            const animals = ActivationsToAnimalsString[activationStack]
            const [A1, energyActivation, infoActivation] = activationStack.split(" ")
            expect(A1).toEqual(animals[0])
            expect(animals + " Energy: " + energyActivation[0]).toEqual(
              animals + " Energy: " + FocusCodes[maybeBoolToIndex(coinEnAct.parse(animals))],
            )
            expect(animals + " Info: " + infoActivation[0]).toEqual(
              animals + " Info: " + FocusCodes[maybeBoolToIndex(coinInAct.parse(animals))],
            )
          }
        }
      })
    })

    describe("parseCoinText", () => {
      it("must clone all types properly", () => {
        for (const type of OPT512.getAll()) {
          const parsed = parseCoinText(type.toString())
          const clone = new OPT512(parsed)

          expect(clone.toString()).toEqual(type.toString())
          expect(clone.type).toEqual(parsed)

          expect(clone.fmS).toEqual(type.fmS)
          expect(clone.fmDe).toEqual(type.fmDe)
          expect(clone.S1).toEqual(type.S1)
          expect(clone.S2).toEqual(type.S2)
          expect(clone.A1).toEqual(type.A1)
          expect(clone.A2).toEqual(type.A2)
          expect(clone.A3).toEqual(type.A3)
          expect(clone.A4).toEqual(type.A4)

          expect(type.type[coinOD.index]).toEqual(coinOD.parse(type.toString()))
          expect(type.type[coinDiDe.index]).toEqual(coinDiDe.parse(type.toString()))
          expect(type.type[coinOiOe.index]).toEqual(coinOiOe.parse(type.toString()))
          expect(type.type[coinFT.index]).toEqual(coinFT.parse(type.toString()))
          expect(type.type[coinNS.index]).toEqual(coinNS.parse(type.toString()))
          expect(type.type[coinEnAct.index]).toEqual(coinEnAct.parse(type.toString()))
          // @ts-expect-error
          expect(type.activationStack + type.type[coinInAct.index])
            // @ts-expect-error
            .toEqual(type.activationStack + coinInAct.parse(type.toString()))
          expect(type.type[coinSfm.index]).toEqual(coinSfm.parse(type.toString()))
          expect(type.type[coinDefm.index]).toEqual(coinDefm.parse(type.toString()))

          expect(clone.type[coinOD.index]).toEqual(coinOD.parse(clone.toString()))
          expect(clone.type[coinDiDe.index]).toEqual(coinDiDe.parse(clone.toString()))
          expect(clone.type[coinOiOe.index]).toEqual(coinOiOe.parse(clone.toString()))
          expect(clone.type[coinFT.index]).toEqual(coinFT.parse(clone.toString()))
          expect(clone.type[coinNS.index]).toEqual(coinNS.parse(clone.toString()))
          expect(clone.type[coinEnAct.index]).toEqual(coinEnAct.parse(clone.toString()))
          expect(clone.type[coinInAct.index]).toEqual(coinInAct.parse(clone.toString()))
          expect(clone.type[coinSfm.index]).toEqual(coinSfm.parse(clone.toString()))
          expect(clone.type[coinDefm.index]).toEqual(coinDefm.parse(clone.toString()))

          expect("" + type + clone.type[coinOD.index]).toEqual("" + type + type.type[coinOD.index])
          expect("" + type + clone.type[coinDiDe.index]).toEqual("" + type + type.type[coinDiDe.index])
          expect("" + type + clone.type[coinOiOe.index]).toEqual("" + type + type.type[coinOiOe.index])
          expect("" + type + clone.type[coinFT.index]).toEqual("" + type + type.type[coinFT.index])
          expect("" + type + clone.type[coinNS.index]).toEqual("" + type + type.type[coinNS.index])
          expect("" + type + clone.type[coinEnAct.index]).toEqual("" + type + type.type[coinEnAct.index])
          expect("" + type + clone.type[coinInAct.index]).toEqual("" + type + type.type[coinInAct.index])
          expect("" + type + clone.type[coinSfm.index]).toEqual("" + type + type.type[coinSfm.index])
          expect("" + type + clone.type[coinDefm.index]).toEqual("" + type + type.type[coinDefm.index])

          expect(clone.type).toEqual(type.type)
        }
      })
    })
  })
})
