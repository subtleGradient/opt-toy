export const euclideanDistance = (aaa: number[], bbb: number[]) => {
  return Math.sqrt(euclideanDistanceSquared(aaa, bbb))
}

export const euclideanDistanceSquared = (aaa: number[], bbb: number[]) => {
  let distance = 0
  for (let index = 0; index < aaa.length; index++) {
    distance += Math.pow(aaa[index] - bbb[index], 2)
  }
  return distance
}
