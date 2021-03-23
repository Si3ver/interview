Function.prototype.before = function(beforeFn) {
  const _self = this
  return function() {
    beforeFn.apply(this, arguments)
    return _self.apply(this, arguments)
  }
}

Function.prototype.after = function(afterFn) {
  const _self = this
  return function() {
    const ret = _self.apply(this, arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}

// ---- test case ----
let doSomething = function () {
  console.log(1)
}

doSomething = doSomething.before(() => {
  console.log(3)
}).after(() => {
  console.log(2)
})

doSomething() // 312
