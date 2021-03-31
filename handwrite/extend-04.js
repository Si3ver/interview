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
var F = function() {}
F.prototype = Parent.prototype
Child.prototype = new F()

// ---- test case ----
var child1 = new Child('kevin', '18')
console.log(child1)

