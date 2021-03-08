// 函数柯里化
const currying = (fn) => {
  return _curry = (...args) => {
    return args.length >= fn.length
           ? fn(...args)
           : (...newArgs) => _curry(...args, ...newArgs)
  }
}

// ---- test case ----
const add = (a, b, c, d) => a + b + c + d
const cAdd = currying(add)
console.log(cAdd(1)(2)(3)(4))
console.log(cAdd(1, 2)(3, 4))
console.log(cAdd(1)(2, 3, 4))
console.log(cAdd(1, 2, 3)(4))
