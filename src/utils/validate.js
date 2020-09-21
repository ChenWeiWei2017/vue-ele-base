/**
 * 判断路径是否为外链
 *
 * @export
 * @param {*} path 路径
 * @return {*}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
