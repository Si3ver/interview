/**
 * 模拟实现 Object.assign
 * @param {Object} target 接收对象
 * @param {Object} source 被拷贝的对象
 * @returns 
 */
function myAssign(target, source) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  const to = Object(target) // 装箱转换，对于 object ，仍然指向同一个地址
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      to[key] = source[key]
    }
  }
  return to
}

// ---- test case ----
const target1 = { a: 1, b: 2 };
const target2 = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget1 = Object.assign(target1, source)
const returnedTarget2 = myAssign(target2, source)

console.log(returnedTarget1 === target1, returnedTarget2 === target2)
