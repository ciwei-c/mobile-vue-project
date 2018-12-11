/**
 * 去中心化
 * @param {上下文} requireContext
 * @param {排除文件} exinclude
 */
export const deCentralization = (
  requireContext,
  exinclude = /index/,
  fn = argv => argv
) => {
  const sourceMap = {}
  const paths = requireContext.keys().filter(p => {
    return !exinclude.test(p)
  })
  for (let p of paths) {
    const ss = fn(requireContext(p))
    for (let s in ss) {
      sourceMap[s] = ss[s]
    }
  }
  return sourceMap
}

/**
 * 去中心化(export default形式)
 * @param {上下文} requireContext
 */
export const deCentralizationUmd = (
  requireContext,
  fn = (a, b) => ({
    ...a,
    ...b
  })
) => {
  const sourceMap = (r => {
    return requireContext.keys().map(k => {
      return r(k).default
    })
  })(requireContext)
  return sourceMap.reduce(fn)
}
