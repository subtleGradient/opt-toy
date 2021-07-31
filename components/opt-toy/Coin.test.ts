import { describe, it, expect, test } from "@jest/globals"
import { Coin, COINS, NamedCOINS } from "./Coin"

describe("COINS", () => {
  it("exists", () => {
    expect(COINS).toBeDefined()
  })
})
describe("NamedCOINS", () => {
  it("exists", () => {
    expect(NamedCOINS).toBeDefined()
  })
  describe("every coin", () => {
    describe("parse function", () => {
      it("fails for blank string", () => {
        for (const [name, coin] of Object.entries(NamedCOINS)) {
          expect(coin.parse("")).toBeNull()
        }
      })
      it("parses standard types", () => {
        const type = "FF-Fe/Se-PC/B(S)"
        for (const [name, coin] of Object.entries(NamedCOINS)) {
          if (coin.parse(type) === null) {
            throw new Error(`${name} parser fails on ${type}`)
          }
          expect(coin.parse("FF-Fe/Se-PC/B(S)")).not.toBeNull()
        }
      })
      it("parses minimal types", () => {
        for (const [name, coin] of Object.entries(NamedCOINS)) {
          expect(coin.parse("FF-Fe/Se-PC/B")).not.toBeNull()
        }
      })
    })
  })

  describe("coinEnAct", () => {
    it("exists", () => {
      expect(NamedCOINS.coinEnAct).toBeDefined()
    })
    describe("parse function", () => {
      it("parses heads", () => {
        expect(NamedCOINS.coinEnAct.parse("PBC")).toBe(true)
        expect(NamedCOINS.coinEnAct.parse("PCB")).toBe(true)
        expect(NamedCOINS.coinEnAct.parse("PBCS")).toBe(true)
        expect(NamedCOINS.coinEnAct.parse("PCBS")).toBe(true)
        expect(NamedCOINS.coinEnAct.parse("fffesepbcs")).toBe(true)
        expect(NamedCOINS.coinEnAct.parse("FF-Fe/Se-PB/C(S)")).toBe(true)
        expect(NamedCOINS.coinEnAct.parse("FF-Fi/Si-PB/C(S)")).toBe(true)
        expect(NamedCOINS.coinEnAct.parse("sdkfjhsdkfjhdskjh-PB/C(S)")).toBe(true)
      })
      describe("Play first & Sleep last", () => {
        it("parses as heads", () => {
          expect(NamedCOINS.coinEnAct.parse("PBC")).toBe(true)
          expect(NamedCOINS.coinEnAct.parse("PCB")).toBe(true)
          expect(NamedCOINS.coinEnAct.parse("P??S")).toBe(true)
          expect(NamedCOINS.coinEnAct.parse("P(S)")).toBe(true)
          expect(NamedCOINS.coinEnAct.parse("P(S")).toBe(true)
        })
      })
      describe("Play with activated Sleep", () => {
        it("parses as tails", () => {
          expect(NamedCOINS.coinEnAct.parse("PBS")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("PCS")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("P?S")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("P?S?")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("PC?B")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("PB?C")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("P/S")).toBe(false)
        })
      })

      describe("Sleep first & Play last", () => {
        it("parses as tails", () => {
          expect(NamedCOINS.coinEnAct.parse("SBC")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("SCB")).toBe(false)
        })
      })
      describe("Sleep with activated Play", () => {
        it("parses as heads", () => {
          expect(NamedCOINS.coinEnAct.parse("SBP")).toBe(true)
          expect(NamedCOINS.coinEnAct.parse("SCP")).toBe(true)
        })
      })

      describe("Blast Play", () => {
        it("parses as heads", () => {
          expect(NamedCOINS.coinEnAct.parse("BP")).toBe(true)
          expect(NamedCOINS.coinEnAct.parse("BPS")).toBe(true)
          expect(NamedCOINS.coinEnAct.parse("BPC")).toBe(true)
        })
      })
      describe("Blast Sleep", () => {
        it("parses as tails", () => {
          expect(NamedCOINS.coinEnAct.parse("BS")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("BSC")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("BSP")).toBe(false)
        })
      })

      describe("Consume Play", () => {
        it("parses as heads", () => {
          expect(NamedCOINS.coinEnAct.parse("CP")).toBe(true)
          expect(NamedCOINS.coinEnAct.parse("CPB")).toBe(true)
          expect(NamedCOINS.coinEnAct.parse("CPS")).toBe(true)
        })
      })
      describe("Consume Sleep", () => {
        it("parses as tails", () => {
          expect(NamedCOINS.coinEnAct.parse("CS")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("CSB")).toBe(false)
          expect(NamedCOINS.coinEnAct.parse("CSP")).toBe(false)
        })
      })
    })
  })

  describe("coinDefm", () => {
    it("exists", () => {
      expect(NamedCOINS.coinDefm).toBeDefined()
    })
    describe("parse function", () => {
      it("is heads for 'mDe'", () => {
        expect(NamedCOINS.coinDefm.parse("mDe")).toBe(true)
      })
      it("is tails for 'mDi'", () => {
        expect(NamedCOINS.coinDefm.parse("mDi")).toBe(false)
      })
    })
  })

  describe("coinSfm", () => {
    it("exists", () => {
      expect(NamedCOINS.coinSfm).toBeDefined()
    })
    describe("parse function", () => {
      it("is null for 'mO'", () => {
        expect(NamedCOINS.coinSfm.parse("mO")).toBeNull()
        expect(NamedCOINS.coinSfm.parse("mOe")).toBeNull()
        expect(NamedCOINS.coinSfm.parse("mOi")).toBeNull()
      })
    })
  })
})
