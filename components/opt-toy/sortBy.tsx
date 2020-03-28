export const sortBy = (a: string | number, b: string | number) => a > b ? 1 : b > a ? -1 : 0;

export const sortByRandom = () => sortBy(Math.random(), Math.random())
