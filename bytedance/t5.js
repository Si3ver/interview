// 实现一个函数a，奇数次执行返回1，偶数次执行返回2
const a = (function(ret) {
  return function() {
    ret = ret === 1 ? 2 : 1
    return ret
  }
}(2))

console.log(a())
console.log(a())
console.log(a())
console.log(a())
