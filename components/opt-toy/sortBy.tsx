export const sortBy = (a: string | number, b: string | number) =>
  a > b ? 1 : b > a ? -1 : 0

export const sorterize = <T extends any>(
  getSortValue: (thing: T) => any,
  _sortBy: typeof sortBy = sortBy
) => (a: T, b: T) => _sortBy(getSortValue(a), getSortValue(b))

export const sortByRandom = sorterize(Math.random)
