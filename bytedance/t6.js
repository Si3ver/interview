// 写出你认为最好的继承
// 寄生组合式继承

function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'yellow']
}
Parent.prototype.getName = function() {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

// 关键
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function prototype(child, parent) {
  var prototype = object(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

// 进行继承
prototype(Child, Parent)
// ---- test case ----
var c1 = new Child('Tom', 23)
var c2 = new Child('Jerry', 25)
c1.colors.push('black')
console.log(c1.colors)
console.log(c2.colors)
console.log(c1.name === c2.name)
