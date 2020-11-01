export const euclideanDistance = (aaa: number[], bbb: number[]) => {
  return Math.sqrt(euclideanDistanceSquared(aaa, bbb))
}

/**
 * The output of Jarvis-Patrick and K-Means clustering is not affected if Euclidean distance is replaced with Euclidean squared. However, the output of hierarchical clustering is likely to change.
 */
export const euclideanDistanceSquared = (aaa: number[], bbb: number[]) => {
  let distance = 0
  for (let index = 0; index < aaa.length; index++) {
    distance += Math.pow(aaa[index] - bbb[index], 2)
  }
  return distance
}
