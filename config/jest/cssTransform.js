// https://jestjs.io/docs/code-transformation#writing-custom-transformers
module.exports = {
  process() {
    return "module.exports = {};"
  },
  getCacheKey() {
    return "cssTransform"
  },
}
