import { OPT512 } from "./OPT512"
import { sortBy, sorterize } from "./sortBy"

const assert = (test: () => boolean, message?: string = "") => {
  const command = test
    .toString()
    .replace(
      /^function \(\) {\s+|[;]|return\s+|\s*\}$|var \$_\$.+\n[^)]+\),\s+/g,
      "",
    )
  const result = test()
  console.assert(result, `${message} ${command}`)
  return result
}

assert(() => OPT512.getAll().length === 512)

const Tom = OPT512.from("fffesepbcs")
const Britt = OPT512.from("mmfisisbpc")

assert(() => Britt.play.rawActivation < Tom.play.rawActivation) //?
assert(() => Britt.blast.rawActivation > Tom.blast.rawActivation) //?
assert(() => Britt.consume.rawActivation < Tom.consume.rawActivation) //?
assert(() => Britt.sleep.rawActivation > Tom.sleep.rawActivation) //?

function rawActivation(STNF) {
  const {
    opFn: { sex, index, grantStackIndex, savior },
    animals: [fA1, fA2],
    opType: {
      animals: [a1, a2, a3, a4],
    },
  } = STNF

  return [
    index,
    fA1.index,
    fA2.index,
  ]
    .map(Number)
    .reverse()
    .reduceRight((acc, value, index) => acc + value * 10 ** index, 0)
}

rawActivation(Tom.S)//?
rawActivation(Tom.T)//?
rawActivation(Tom.N)//?
rawActivation(Tom.F)//?

Britt.feeling.activationDetails

Tom.functions.sort(sorterize(rawActivation)).map(f=>f.code)//?
Britt.functions.sort(sorterize(rawActivation)).map(f=>f.code)//?

assert(() => Tom.feeling.rawActivation > Tom.thinking.rawActivation) //?
assert(() => Tom.feeling.rawActivation > Britt.feeling.rawActivation) //?

// assert(() => Britt.feeling.activation < Britt.thinking.activation, "bF < bT")

// console.log({
//   "B.f": Britt.feeling.activation,
//   "B.f+": JSON.stringify(Britt.feeling.activationDetails),

//   "T.f": Tom.feeling.activation,
//   "T.f+": JSON.stringify(Tom.feeling.activationDetails),
// })
// console.log("yay")

// Britt.feeling.activation
