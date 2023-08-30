import { describe, expect, it } from "@jest/globals"
import { COINS, NamedCOINS, parseCoinText, parseTypeTextWithCoins } from "./Coin"

const { coinOD, coinDiDe, coinOiOe, coinFT, coinNS, coinEnAct, coinInAct, coinSfm, coinDefm, coinTie, coinSie } = NamedCOINS

describe("COINS", () => {
  it("exists", () => {
    expect(COINS).toBeDefined()
  })
})

describe("parseCoinText", () => {
  it("exists", () => {
    expect(parseCoinText).toBeDefined()
  })
  it("matches", () => {
    expect(parseCoinText("mmtesepbc").map(Number).join("")).toMatchInlineSnapshot(`"11111111100"`)
    expect(parseCoinText("fffesepbc").map(Number).join("")).toMatchInlineSnapshot(`"11110110000"`)
    expect(parseCoinText("fftinecsp").map(Number).join("")).toMatchInlineSnapshot(`"11001000000"`)
    expect(parseCoinText("fffesepbc#1").map(Number).join("")).toMatchInlineSnapshot(`"11110110011"`)
    expect(parseCoinText("fffesepbc#2").map(Number).join("")).toMatchInlineSnapshot(`"11110110010"`)
    expect(parseCoinText("fffesepbc#3").map(Number).join("")).toMatchInlineSnapshot(`"11110110001"`)
    expect(parseCoinText("fffesepbc#4").map(Number).join("")).toMatchInlineSnapshot(`"11110110000"`)
  })
})

describe("parseTypeTextWithCoins", () => {
  it("exists", () => {
    expect(parseTypeTextWithCoins).toBeDefined()
  })
  it("matches", () => {
    expect(parseTypeTextWithCoins("mmtesepbc").map(Number).join("")).toMatchInlineSnapshot(`"11111111100"`)
    expect(parseTypeTextWithCoins("fffesepbc").map(Number).join("")).toMatchInlineSnapshot(`"11110110000"`)
    expect(parseTypeTextWithCoins("fftinecsp").map(Number).join("")).toMatchInlineSnapshot(`"11000000000"`)
    expect(parseTypeTextWithCoins("fffesepbc#1").map(Number).join("")).toMatchInlineSnapshot(`"11110110011"`)
    expect(parseTypeTextWithCoins("fffesepbc#2").map(Number).join("")).toMatchInlineSnapshot(`"11110110010"`)
    expect(parseTypeTextWithCoins("fffesepbc#3").map(Number).join("")).toMatchInlineSnapshot(`"11110110001"`)
    expect(parseTypeTextWithCoins("fffesepbc#4").map(Number).join("")).toMatchInlineSnapshot(`"11110110000"`)
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
        const type = "FF-Fe/Se-PC/B(S)#1"
        for (const [name, coin] of Object.entries(NamedCOINS)) {
          if (coin.index === -1) continue
          if (coin.parse(type) === null) {
            throw new Error(`${name} parser fails on ${type}`)
          }
          expect(coin.parse("FF-Fe/Se-PC/B(S)#1")).not.toBeNull()
          expect(coin.parse("ff-fe/se-pc/b(s)#1")).not.toBeNull()
          expect(coin.parse("fFe/fSe-PCB 1")).not.toBeNull()
          expect(coin.parse("FFFeSePCBS1")).not.toBeNull()
          expect(coin.parse("FFFeSePCB1")).not.toBeNull()
          expect(coin.parse("fftinecsp1")).not.toBeNull()
        }
      })
      it("parses minimal types", () => {
        for (const [name, coin] of Object.entries(NamedCOINS)) {
          expect(coin.parse("FF-Fe/Se-PC/B#1")).not.toBeNull()
        }
      })
    })
  })

  describe("coinOD", () => {
    describe("parse function", () => {
      it("parses as edge", () => {
        expect(coinOD.parse("")).toBe(null)
        expect(coinOD.parse("SB/P(S)")).toBe(null)
        expect(coinOD.parse("FF-SB/P(S)")).toBe(null)
      })
      it("parses as heads", () => {
        expect(coinOD.parse("Di")).toBe(true)
        expect(coinOD.parse("Ti")).toBe(true)
        expect(coinOD.parse("Fi")).toBe(true)
        expect(coinOD.parse("De")).toBe(true)
        expect(coinOD.parse("Te")).toBe(true)
        expect(coinOD.parse("Fe")).toBe(true)

        expect(coinOD.parse("fDi")).toBe(true)
        expect(coinOD.parse("fTi")).toBe(true)
        expect(coinOD.parse("fFi")).toBe(true)
        expect(coinOD.parse("fDe")).toBe(true)
        expect(coinOD.parse("fTe")).toBe(true)
        expect(coinOD.parse("fFe")).toBe(true)

        expect(coinOD.parse("mDi")).toBe(true)
        expect(coinOD.parse("mTi")).toBe(true)
        expect(coinOD.parse("mFi")).toBe(true)
        expect(coinOD.parse("mDe")).toBe(true)
        expect(coinOD.parse("mTe")).toBe(true)
        expect(coinOD.parse("mFe")).toBe(true)

        expect(coinOD.parse("fini")).toBe(true)
        expect(coinOD.parse("fffini")).toBe(true)
        expect(coinOD.parse("mffinisbp")).toBe(true)
      })
      it("parses as tails", () => {
        expect(coinOD.parse("nifi")).toBe(false)
        expect(coinOD.parse("ffnifi")).toBe(false)
        expect(coinOD.parse("mfnifisbp")).toBe(false)

        expect(coinOD.parse("Oi")).toBe(false)
        expect(coinOD.parse("Si")).toBe(false)
        expect(coinOD.parse("Ni")).toBe(false)
        expect(coinOD.parse("Oe")).toBe(false)
        expect(coinOD.parse("Se")).toBe(false)
        expect(coinOD.parse("Ne")).toBe(false)
        expect(coinOD.parse("fOi")).toBe(false)
        expect(coinOD.parse("fSi")).toBe(false)
        expect(coinOD.parse("fNi")).toBe(false)
        expect(coinOD.parse("fOe")).toBe(false)
        expect(coinOD.parse("fSe")).toBe(false)
        expect(coinOD.parse("fNe")).toBe(false)
        expect(coinOD.parse("mOi")).toBe(false)
        expect(coinOD.parse("mSi")).toBe(false)
        expect(coinOD.parse("mNi")).toBe(false)
        expect(coinOD.parse("mOe")).toBe(false)
        expect(coinOD.parse("mSe")).toBe(false)
        expect(coinOD.parse("mNe")).toBe(false)
      })
    })
  })

  describe("coinDiDe", () => {
    describe("parse function", () => {
      it("parses as heads", () => {
        expect(coinDiDe.parse("De/Se")).toBe(true)
        expect(coinDiDe.parse("Te/Se")).toBe(true)
        expect(coinDiDe.parse("Fe/Se")).toBe(true)
        expect(coinDiDe.parse("Se/De")).toBe(true)
        expect(coinDiDe.parse("Se/Te")).toBe(true)
        expect(coinDiDe.parse("Se/Fe")).toBe(true)

        expect(coinDiDe.parse("fDe")).toBe(true)
        expect(coinDiDe.parse("fTe")).toBe(true)
        expect(coinDiDe.parse("fFe")).toBe(true)

        expect(coinDiDe.parse("mDe")).toBe(true)
        expect(coinDiDe.parse("mTe")).toBe(true)
        expect(coinDiDe.parse("mFe")).toBe(true)
      })
      it("parses as tails", () => {
        expect(coinDiDe.parse("Di/Se")).toBe(false)
        expect(coinDiDe.parse("Ti/Se")).toBe(false)
        expect(coinDiDe.parse("Fi/Se")).toBe(false)
        expect(coinDiDe.parse("Se/Di")).toBe(false)
        expect(coinDiDe.parse("Se/Ti")).toBe(false)
        expect(coinDiDe.parse("Se/Fi")).toBe(false)

        expect(coinDiDe.parse("fDi")).toBe(false)
        expect(coinDiDe.parse("fTi")).toBe(false)
        expect(coinDiDe.parse("fFi")).toBe(false)

        expect(coinDiDe.parse("mDi")).toBe(false)
        expect(coinDiDe.parse("mTi")).toBe(false)
        expect(coinDiDe.parse("mFi")).toBe(false)
      })
    })
  })

  describe("coinFT", () => {
    describe("parse function", () => {
      it("parses as edge", () => {
        expect(coinFT.parse("?F-De/Se")).toBe(null)
        expect(coinFT.parse("F?-De/Se")).toBe(null)
        expect(coinFT.parse("FF-De/Se")).toBe(null)
        expect(coinFT.parse("De/Se")).toBe(null)
        expect(coinFT.parse("Se/De")).toBe(null)
        expect(coinFT.parse("fDe")).toBe(null)
        expect(coinFT.parse("mDe")).toBe(null)
        expect(coinFT.parse("Di/Se")).toBe(null)
        expect(coinFT.parse("Se/Di")).toBe(null)
        expect(coinFT.parse("fDi")).toBe(null)
        expect(coinFT.parse("mDi")).toBe(null)
      })
      it("parses as heads", () => {
        expect(coinFT.parse("Te/Se")).toBe(true)
        expect(coinFT.parse("Se/Te")).toBe(true)
        expect(coinFT.parse("fTe")).toBe(true)
        expect(coinFT.parse("mTe")).toBe(true)
        expect(coinFT.parse("Ti/Se")).toBe(true)
        expect(coinFT.parse("Se/Ti")).toBe(true)
        expect(coinFT.parse("fTi")).toBe(true)
        expect(coinFT.parse("mTi")).toBe(true)
      })
      it("parses as tails", () => {
        expect(coinFT.parse("Fe/Se")).toBe(false)
        expect(coinFT.parse("Se/Fe")).toBe(false)
        expect(coinFT.parse("fFe")).toBe(false)
        expect(coinFT.parse("mFe")).toBe(false)
        expect(coinFT.parse("Fi/Se")).toBe(false)
        expect(coinFT.parse("Se/Fi")).toBe(false)
        expect(coinFT.parse("fFi")).toBe(false)
        expect(coinFT.parse("mFi")).toBe(false)
      })
    })
  })

  describe("coinNS", () => {
    describe("parse function", () => {
      it("parses as edge", () => {
        expect(coinNS.parse("?F-Oe/Dx")).toBe(null)
        expect(coinNS.parse("F?-Oe/Dx")).toBe(null)
        expect(coinNS.parse("FF-Oe/Dx")).toBe(null)
        expect(coinNS.parse("Oe/Dx")).toBe(null)
        expect(coinNS.parse("Dx/Oe")).toBe(null)
        expect(coinNS.parse("fOe")).toBe(null)
        expect(coinNS.parse("mOe")).toBe(null)
        expect(coinNS.parse("Oi/Dx")).toBe(null)
        expect(coinNS.parse("Dx/Oi")).toBe(null)
        expect(coinNS.parse("fOi")).toBe(null)
        expect(coinNS.parse("mOi")).toBe(null)
      })
      it("parses as heads", () => {
        expect(coinNS.parse("Se/Dx")).toBe(true)
        expect(coinNS.parse("Dx/Se")).toBe(true)
        expect(coinNS.parse("fSe")).toBe(true)
        expect(coinNS.parse("mSe")).toBe(true)
        expect(coinNS.parse("Si/Dx")).toBe(true)
        expect(coinNS.parse("Dx/Si")).toBe(true)
        expect(coinNS.parse("fSi")).toBe(true)
        expect(coinNS.parse("mSi")).toBe(true)
        expect(coinNS.parse("si")).toBe(true)
      })
      it("parses as tails", () => {
        expect(coinNS.parse("Ne/Dx")).toBe(false)
        expect(coinNS.parse("Dx/Ne")).toBe(false)
        expect(coinNS.parse("fNe")).toBe(false)
        expect(coinNS.parse("mNe")).toBe(false)
        expect(coinNS.parse("Ni/Dx")).toBe(false)
        expect(coinNS.parse("Dx/Ni")).toBe(false)
        expect(coinNS.parse("fNi")).toBe(false)
        expect(coinNS.parse("mNi")).toBe(false)
        expect(coinNS.parse("ni")).toBe(false)
      })
    })
  })

  describe("coinTie", () => {
    describe("parse function", () => {
      it("parses as edge", () => {
        expect(coinTie.parse("?F-De/Se")).toBe(null)
        expect(coinTie.parse("F?-De/Se")).toBe(null)
        expect(coinTie.parse("FF-De/Se")).toBe(null)
        expect(coinTie.parse("De/Se")).toBe(null)
        expect(coinTie.parse("Se/De")).toBe(null)
        expect(coinTie.parse("fDe")).toBe(null)
        expect(coinTie.parse("mDe")).toBe(null)
        expect(coinTie.parse("Di/Se")).toBe(null)
        expect(coinTie.parse("Se/Di")).toBe(null)
        expect(coinTie.parse("fDi")).toBe(null)
        expect(coinTie.parse("mDi")).toBe(null)
      })
      it("parses as heads", () => {
        expect(coinTie.parse("Te/Se")).toBe(true)
        expect(coinTie.parse("Se/Te")).toBe(true)
        expect(coinTie.parse("fTe")).toBe(true)
        expect(coinTie.parse("mTe")).toBe(true)
        expect(coinTie.parse("Fi/Se")).toBe(true)
        expect(coinTie.parse("Se/Fi")).toBe(true)
        expect(coinTie.parse("fFi")).toBe(true)
        expect(coinTie.parse("mFi")).toBe(true)
      })
      it("parses as tails", () => {
        expect(coinTie.parse("Fe/Se")).toBe(false)
        expect(coinTie.parse("Se/Fe")).toBe(false)
        expect(coinTie.parse("fFe")).toBe(false)
        expect(coinTie.parse("mFe")).toBe(false)
        expect(coinTie.parse("Ti/Se")).toBe(false)
        expect(coinTie.parse("Se/Ti")).toBe(false)
        expect(coinTie.parse("fTi")).toBe(false)
        expect(coinTie.parse("mTi")).toBe(false)
      })
    })
  })

  describe("coinSie", () => {
    describe("parse function", () => {
      it("parses as edge", () => {
        expect(coinSie.parse("?F-Oe/Dx")).toBe(null)
        expect(coinSie.parse("F?-Oe/Dx")).toBe(null)
        expect(coinSie.parse("FF-Oe/Dx")).toBe(null)
        expect(coinSie.parse("Oe/Dx")).toBe(null)
        expect(coinSie.parse("Dx/Oe")).toBe(null)
        expect(coinSie.parse("fOe")).toBe(null)
        expect(coinSie.parse("mOe")).toBe(null)
        expect(coinSie.parse("Oi/Dx")).toBe(null)
        expect(coinSie.parse("Dx/Oi")).toBe(null)
        expect(coinSie.parse("fOi")).toBe(null)
        expect(coinSie.parse("mOi")).toBe(null)
      })
      it("parses as heads", () => {
        expect(coinSie.parse("Se/Dx")).toBe(true)
        expect(coinSie.parse("Dx/Se")).toBe(true)
        expect(coinSie.parse("fSe")).toBe(true)
        expect(coinSie.parse("mSe")).toBe(true)
        expect(coinSie.parse("Ni/Dx")).toBe(true)
        expect(coinSie.parse("Dx/Ni")).toBe(true)
        expect(coinSie.parse("fNi")).toBe(true)
        expect(coinSie.parse("mNi")).toBe(true)
        expect(coinSie.parse("ni")).toBe(true)
      })
      it("parses as tails", () => {
        expect(coinSie.parse("Ne/Dx")).toBe(false)
        expect(coinSie.parse("Dx/Ne")).toBe(false)
        expect(coinSie.parse("fNe")).toBe(false)
        expect(coinSie.parse("mNe")).toBe(false)
        expect(coinSie.parse("Si/Dx")).toBe(false)
        expect(coinSie.parse("Dx/Si")).toBe(false)
        expect(coinSie.parse("fSi")).toBe(false)
        expect(coinSie.parse("mSi")).toBe(false)
        expect(coinSie.parse("si")).toBe(false)
      })
    })
  })

  describe("coinOiOe", () => {
    describe("parse function", () => {
      it("parses as null", () => {
        expect(coinOiOe.parse("Ox")).toBe(null)
        expect(coinOiOe.parse("Sx")).toBe(null)
        expect(coinOiOe.parse("Nx")).toBe(null)
        expect(coinOiOe.parse("fOx")).toBe(null)
        expect(coinOiOe.parse("fSx")).toBe(null)
        expect(coinOiOe.parse("fNx")).toBe(null)
        expect(coinOiOe.parse("mOx")).toBe(null)
        expect(coinOiOe.parse("mSx")).toBe(null)
        expect(coinOiOe.parse("mNx")).toBe(null)
      })
      it("parses as heads", () => {
        expect(coinOiOe.parse("Oe")).toBe(true)
        expect(coinOiOe.parse("Se")).toBe(true)
        expect(coinOiOe.parse("Ne")).toBe(true)
        expect(coinOiOe.parse("fOe")).toBe(true)
        expect(coinOiOe.parse("fSe")).toBe(true)
        expect(coinOiOe.parse("fNe")).toBe(true)
        expect(coinOiOe.parse("mOe")).toBe(true)
        expect(coinOiOe.parse("mSe")).toBe(true)
        expect(coinOiOe.parse("mNe")).toBe(true)
      })
      it("parses as tails", () => {
        expect(coinOiOe.parse("Oi")).toBe(false)
        expect(coinOiOe.parse("Si")).toBe(false)
        expect(coinOiOe.parse("Ni")).toBe(false)
        expect(coinOiOe.parse("fOi")).toBe(false)
        expect(coinOiOe.parse("fSi")).toBe(false)
        expect(coinOiOe.parse("fNi")).toBe(false)
        expect(coinOiOe.parse("mOi")).toBe(false)
        expect(coinOiOe.parse("mSi")).toBe(false)
        expect(coinOiOe.parse("mNi")).toBe(false)
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
