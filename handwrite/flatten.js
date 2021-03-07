// 数组扁平化
// 解法一：调用内置API，Array.prototype.flat([depth])
const flatten1 = function (arr) {
  if (!Array.isArray(arr)) throw new Error('only apply to Array!')
  return arr.flat(Infinity)
}

// 解法二：for循环 + push
const flatten2 = function (arr) {
  const res = []
  for (let item of arr) {
    if (item instanceof Array) {
      res.push(...flatten2(item))
    } else {
      res.push(item)
    }
  }
  return res
}

// 解法三：while循环 + some判断结束 + concat
// 【无副作用】因为只是在此函数体内，指向了另一个引用类型，并未修改引用的值
const flatten3 = function (arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// 解法四：[].reduce(cb(acc, cur[, idx[, arr]])[, initV])
const flatten4 = function (arr) {
  return arr.reduce((acc, cur) => 
    acc.concat(Array.isArray(cur) ? flatten4(cur) : cur)
  , [])
}

// 解法五：【仅适用于数组元素全是数字的场景】
const flatten5 = function (arr) {
  return arr.toString().split(',').map(item => +item)
}

// ---- test case ----
const arr = [1, undefined, null,[2,3,[4,[5]]]]
const arr1 = flatten1(arr)
const arr2 = flatten2(arr)
const arr3 = flatten3(arr)
const arr4 = flatten4(arr)
const arr5 = flatten5(arr)

console.log(arr)
console.log(arr1)
console.log(arr2)
console.log(arr3)
console.log(arr4)
console.log(arr5)
