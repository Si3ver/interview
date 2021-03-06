/**
 * 模拟 instanceof
 * @param {Object} left 某对象
 * @param {Function} right 某构造函数
 * 思路：遍历左边变量的原型链，直到找到右边变量的 prototype，如果没有找到，返回 false
 * 
 * 
 */

// > 拓展：原始类型需要返回 false，https://stackoverflow.com/questions/203739/why-does-instanceof-return-false-for-some-literals
const myInstanceofFn = function (left, right) {
  // terminator: primitive type return false
  if (['boolean', 'string', 'number'].indexOf(typeof left) > -1) return false

  let lProto = left.__proto__
  const target = right.prototype
  while (lProto) {
    if (lProto === target) return true
    lProto = lProto.__proto__
  }
  return false
}


// ---- test case ----
console.time('myInstanceofFn')
console.log(myInstanceofFn(Object.create(null), Object), Object.create(null) instanceof Object)  // false
console.log(myInstanceofFn('abc', Object), 'abc' instanceof Object)  // false
console.log(myInstanceofFn(new String('abc'), Object), new String('abc') instanceof Object)
console.log(myInstanceofFn(Array, Object), Array instanceof Object)
console.log(myInstanceofFn(Function, Object), Function instanceof Object)
console.timeEnd('myInstanceofFn')
