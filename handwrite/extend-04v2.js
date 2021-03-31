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


// ---- test case ----
prototype(Child, Parent)

