export const sortBy = (a: string | number, b: string | number) =>
  a > b ? 1 : b > a ? -1 : 0

export const sorterize = <T extends any>(
  getSortValue: (thing: T) => number | string,
) => (a: T, b: T) => sortBy(getSortValue(a), getSortValue(b))

export const sortByRandom = sorterize(Math.random)
