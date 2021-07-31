import { describe, it, expect, test } from "@jest/globals"
import { Coin, COINS, NamedCOINS, parseCoinText } from "./Coin"
import { OPT512 } from "./OPT512"

const { coinOD, coinDiDe, coinOiOe, coinFT, coinNS, coinEnAct, coinInAct, coinSfm, coinDefm } = NamedCOINS

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
      expect(coinEnAct).toBeDefined()
    })
    describe("parse function", () => {
      it("parses heads", () => {
        expect(coinEnAct.parse("PBC")).toBe(true)
        expect(coinEnAct.parse("PCB")).toBe(true)
        expect(coinEnAct.parse("PBCS")).toBe(true)
        expect(coinEnAct.parse("PCBS")).toBe(true)
        expect(coinEnAct.parse("fffesepbcs")).toBe(true)
        expect(coinEnAct.parse("FF-Fe/Se-PB/C(S)")).toBe(true)
        expect(coinEnAct.parse("FF-Fi/Si-PB/C(S)")).toBe(true)
        expect(coinEnAct.parse("sdkfjhsdkfjhdskjh-PB/C(S)")).toBe(true)

        expect(coinEnAct.parse("PB/C(S)")).toBe(true)
      })
      describe("Play first & Sleep last", () => {
        it("parses as heads", () => {
          expect(coinEnAct.parse("PBC")).toBe(true)
          expect(coinEnAct.parse("PCB")).toBe(true)
          expect(coinEnAct.parse("P??S")).toBe(true)
          expect(coinEnAct.parse("P(S)")).toBe(true)
          expect(coinEnAct.parse("P?(S)")).toBe(true)
          expect(coinEnAct.parse("P??(S)")).toBe(true)
          expect(coinEnAct.parse("PB(S)")).toBe(true)
          expect(coinEnAct.parse("PC(S)")).toBe(true)
          expect(coinEnAct.parse("P(S")).toBe(true)
        })
      })
      describe("Play with activated Sleep", () => {
        it("parses as tails", () => {
          expect(coinEnAct.parse("PBS")).toBe(false)
          expect(coinEnAct.parse("PCS")).toBe(false)
          expect(coinEnAct.parse("P?S")).toBe(false)
          expect(coinEnAct.parse("P?S?")).toBe(false)
          expect(coinEnAct.parse("PC?B")).toBe(false)
          expect(coinEnAct.parse("PB?C")).toBe(false)
          expect(coinEnAct.parse("P/S")).toBe(false)
          expect(coinEnAct.parse("P/SC")).toBe(false)
          expect(coinEnAct.parse("P/SB")).toBe(false)
        })
      })

      describe("Sleep first & Play last", () => {
        it("parses as tails", () => {
          expect(coinEnAct.parse("SBC")).toBe(false)
          expect(coinEnAct.parse("SCB")).toBe(false)
        })
      })
      describe("Sleep with activated Play", () => {
        it("parses as heads", () => {
          expect(coinEnAct.parse("SBP")).toBe(true)
          expect(coinEnAct.parse("SCP")).toBe(true)
        })
      })

      describe("Blast Play", () => {
        it("parses as heads", () => {
          expect(coinEnAct.parse("BP")).toBe(true)
          expect(coinEnAct.parse("BPS")).toBe(true)
          expect(coinEnAct.parse("BPC")).toBe(true)
        })
      })
      describe("Blast Sleep", () => {
        it("parses as tails", () => {
          expect(coinEnAct.parse("BS")).toBe(false)
          expect(coinEnAct.parse("BSC")).toBe(false)
          expect(coinEnAct.parse("BSP")).toBe(false)
        })
      })

      describe("Consume Play", () => {
        it("parses as heads", () => {
          expect(coinEnAct.parse("CP")).toBe(true)
          expect(coinEnAct.parse("CPB")).toBe(true)
          expect(coinEnAct.parse("CPS")).toBe(true)
        })
      })
      describe("Consume Sleep", () => {
        it("parses as tails", () => {
          expect(coinEnAct.parse("CS")).toBe(false)
          expect(coinEnAct.parse("CSB")).toBe(false)
          expect(coinEnAct.parse("CSP")).toBe(false)
        })
      })
    })
  })

  describe("coinInAct", () => {
    it("exists", () => {
      expect(coinInAct).toBeDefined()
    })
    describe("parse function", () => {
      it("parses heads", () => {
        expect(coinInAct.parse("BPS")).toBe(true)
        expect(coinInAct.parse("BSP")).toBe(true)
        expect(coinInAct.parse("BPSC")).toBe(true)
        expect(coinInAct.parse("BSPC")).toBe(true)
        expect(coinInAct.parse("fffesepbcs")).toBe(true)
        expect(coinInAct.parse("FF-Fe/Se-BP/S(C)")).toBe(true)
        expect(coinInAct.parse("FF-Fi/Si-BP/S(C)")).toBe(true)
        expect(coinInAct.parse("sdkfjhsdkfjhdskjh-BP/S(C)")).toBe(true)
      })
      describe("Blast first & Consume last", () => {
        it("parses as heads", () => {
          expect(coinInAct.parse("BPS")).toBe(true)
          expect(coinInAct.parse("BSP")).toBe(true)
          expect(coinInAct.parse("B??C")).toBe(true)
          expect(coinInAct.parse("B(C)")).toBe(true)
          expect(coinInAct.parse("B(C")).toBe(true)
        })
      })
      describe("Blast with activated Consume", () => {
        it("parses as tails", () => {
          expect(coinInAct.parse("BPC")).toBe(false)
          expect(coinInAct.parse("BSC")).toBe(false)
          expect(coinInAct.parse("B?C")).toBe(false)
          expect(coinInAct.parse("B?C?")).toBe(false)
          expect(coinInAct.parse("BS?P")).toBe(false)
          expect(coinInAct.parse("BP?S")).toBe(false)
          expect(coinInAct.parse("B/C")).toBe(false)
        })
      })

      describe("Consume first & Blast last", () => {
        it("parses as tails", () => {
          expect(coinInAct.parse("CPS")).toBe(false)
          expect(coinInAct.parse("CSP")).toBe(false)
        })
      })
      describe("Consume with activated Blast", () => {
        it("parses as heads", () => {
          expect(coinInAct.parse("CPB")).toBe(true)
          expect(coinInAct.parse("CSB")).toBe(true)
        })
      })

      describe("Plast Blast", () => {
        it("parses as heads", () => {
          expect(coinInAct.parse("PB")).toBe(true)
          expect(coinInAct.parse("PBC")).toBe(true)
          expect(coinInAct.parse("PBS")).toBe(true)
        })
      })
      describe("Plast Consume", () => {
        it("parses as tails", () => {
          expect(coinInAct.parse("PC")).toBe(false)
          expect(coinInAct.parse("PCS")).toBe(false)
          expect(coinInAct.parse("PCB")).toBe(false)
        })
      })

      describe("Sleep Blast", () => {
        it("parses as heads", () => {
          expect(coinInAct.parse("SB")).toBe(true)
          expect(coinInAct.parse("SBP")).toBe(true)
          expect(coinInAct.parse("SBC")).toBe(true)
        })
      })
      describe("Sleep Consume", () => {
        it("parses as tails", () => {
          expect(coinInAct.parse("SC")).toBe(false)
          expect(coinInAct.parse("SCP")).toBe(false)
          expect(coinInAct.parse("SCB")).toBe(false)
        })
      })
    })
  })

  describe("coinDefm", () => {
    it("exists", () => {
      expect(coinDefm).toBeDefined()
    })
    describe("parse function", () => {
      it("is null", () => {
        expect(coinDefm.parse("")).toBeNull()
      })
      it("is heads", () => {
        expect(coinDefm.parse("FM-Fi/Si")).toBe(true)
        expect(coinDefm.parse("MM-Fi/Si")).toBe(true)

        expect(coinDefm.parse("mDe")).toBe(true)
        expect(coinDefm.parse("mFe")).toBe(true)
        expect(coinDefm.parse("mTe")).toBe(true)

        expect(coinDefm.parse("fDi")).toBe(true)
        expect(coinDefm.parse("fFi")).toBe(true)
        expect(coinDefm.parse("fTi")).toBe(true)
      })
      it("is tails", () => {
        expect(coinDefm.parse("MF-Fe/Se")).toBe(false)
        expect(coinDefm.parse("FF-Fe/Se")).toBe(false)

        expect(coinDefm.parse("mDi")).toBe(false)
        expect(coinDefm.parse("mFi")).toBe(false)
        expect(coinDefm.parse("mTi")).toBe(false)

        expect(coinDefm.parse("fDe")).toBe(false)
        expect(coinDefm.parse("fFe")).toBe(false)
        expect(coinDefm.parse("fTe")).toBe(false)
      })
    })
  })

  describe("coinSfm", () => {
    it("exists", () => {
      expect(coinSfm).toBeDefined()
    })
    describe("parse function", () => {
      it("is null", () => {
        expect(coinSfm.parse("mO")).toBeNull()
        expect(coinSfm.parse("mOe")).toBeNull()
        expect(coinSfm.parse("mOi")).toBeNull()
        expect(coinSfm.parse("mFi")).toBeNull()
        expect(coinSfm.parse("mFe")).toBeNull()
        expect(coinSfm.parse("mSB")).toBeNull()
        expect(coinSfm.parse("fFi")).toBeNull()
        expect(coinSfm.parse("fFe")).toBeNull()
        expect(coinSfm.parse("fSB")).toBeNull()
      })
      it("is heads", () => {
        expect(coinSfm.parse("mS")).toBe(true)
        expect(coinSfm.parse("mSe")).toBe(true)
        expect(coinSfm.parse("mSi")).toBe(true)

        expect(coinSfm.parse("MM-Fi/Si")).toBe(true)
        expect(coinSfm.parse("mFi/mSi")).toBe(true)
        expect(coinSfm.parse("mSi/mFi")).toBe(true)

        expect(coinSfm.parse("fN")).toBe(true)
        expect(coinSfm.parse("fNe")).toBe(true)
        expect(coinSfm.parse("fNi")).toBe(true)
      })
      it("is tails", () => {
        expect(coinSfm.parse("mN")).toBe(false)
        expect(coinSfm.parse("mNe")).toBe(false)
        expect(coinSfm.parse("mNi")).toBe(false)

        expect(coinSfm.parse("fS")).toBe(false)
        expect(coinSfm.parse("fSe")).toBe(false)
        expect(coinSfm.parse("fSi")).toBe(false)
      })
    })
  })
})
