// 1. 构造函数继承
// 在子类的构造函数中执行父类的构造函数
// 缺点：继承不到父类原型上的属性和方法

function Parent () {
  this.name = 'Tom'
}
Parent.prototype.getName = function () {
  return this.name
}

function Child () {
  Parent.call(this)
  this.type = 'child'
}

const child = new Child()
console.log(child)
console.log(child.getName())  // Error
