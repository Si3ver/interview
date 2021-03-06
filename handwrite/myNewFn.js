/**
 * 模拟实现 new
 * @param {Function} Constr 构造函数
 * @param  {...any} args 参数
 */
const myNewFn = function(Constr, ...args) {
  const obj = {}
  Object.setPrototypeOf(obj, Constr.prototype)
  let result = Constr.apply(obj, args)
  return result instanceof Object ? result : obj
}

// ---- test case ----
const Person = function (name, age) {
  this.name = name
  this.age = age
}

var p1 = myNewFn(Person, 'Tom', 23)
var p2 = new Person('Jerry', 24)
console.log(p1, p2)
console.log(p1.__proto__ === Person.prototype)
console.log(p1.__proto__ === p2.__proto__)
