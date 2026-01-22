import { NextPage } from "next"
import { useEffect, useState } from "react"
import { OPT512 } from "../../components/opt-toy/OPT512"
import OptToyApp from "../../components/opt-toy/OptToyApp"
import { OP_Type } from "../../components/opt-toy/OP_Type"
import { isSSR } from "../../util/constants"

function useRandomType() {
  const [opType, setType] = useState(() => new OPT512(null))
  useEffect(() => {
    setType(OPT512.random())
  }, [])
  return opType
}

export default function ({}) {
  const op = useRandomType()

  return (
    <>
      <OP_Type opType={op} />
      <h2>A1: {op.A1}</h2>
      <h2>A2: {op.A2}</h2>
      <h2>A3: {op.A3}</h2>
      <h2>A4: {op.A4}</h2>
      <h2>S1: {op.S1}</h2>
      <h2>S2: {op.S2}</h2>
      <h2>D1: {op.D1}</h2>
      <h2>D2: {op.D2}</h2>
      {/*

      See .OK/tarzan-paths.ok.md

      TODO:
      for Fe/Se PBCS
      draw a Tarzan swing path
      Fe in the middle
      Ti Sleep on the left, blocked by Consume, resulting in Ni pull Blast
      Ni Sleep on the right, blocked by Blast, resulting in Ti pull Consume
      */}
    </>
  )
}
