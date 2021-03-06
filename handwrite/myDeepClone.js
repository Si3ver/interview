/**
 * 深拷贝
 * @param {any} origin 被克隆者
 */
const myDeepClone = function (origin, wm = new WeakMap()) {
  // 处理一般对象
  if (typeof origin !== 'object' || origin == null) return origin
  if (origin instanceof Date) return new Date(origin)
  if (origin instanceof RegExp) return new RegExp(origin)
  // weakMap 处理循环引用
  const stashed = wm.get(origin)
  if (stashed) return stashed
  let target = Array.isArray(origin) ? [] : {}
  wm.set(origin, target)
  // 递归拷贝每个属性（Array or Object）
  for (let key in origin) {
    if (origin.hasOwnProperty(key)) {
      target[key] = myDeepClone(origin[key], wm)
    }
  }
  return target
}

// ---- test case ----
console.time('myDeepClone1')
var p1 = {
  name: 'alwyn',
  age: 12,
  birthday: new Date('1995-09-12'),
  hobby: ['eat', 'sleep', 'code'],
  address: {
    city: 'shenzhen'
  },
}

var p2 = myDeepClone(p1)
console.log(p1, p2)
p1.address.city = 'beijing'
p2.hobby.push('music')
console.log(p1, p2)
console.timeEnd('myDeepClone1')

console.time('myDeepClone2')
// 对象存在循环引用
var o1 = {x: 1}, o2 = {y: 2}
o1.a = o2
o2.b = o1
var o3 = myDeepClone(o1)
o1.z = 100
console.log(o1, o3)
console.timeEnd('myDeepClone2')

console.time('myDeepClone3')
// 数组存在循环引用
var arr1 = [1, 2, 3]
arr1.push(arr1)
var arr2 = myDeepClone(arr1)
arr2.push(1)
console.log(arr1, arr2)
console.timeEnd('myDeepClone3')
