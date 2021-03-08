// 2. 原型链继承
// 缺陷：
// 1. 两个实例引用的是同一个原型对象
// 2. 在创建子类实例时无法向父类构造传参, 即没有实现super()的功能


function Parent () {
  this.name = 'Tom'
  this.play = [1, 2, 3]
}
Parent.prototype.getName = function () {
  return this.name
}

function Child () {
  this.type = 'child'
}
// 子类的原型对象指向父类实例
Child.prototype = new Parent()
// 根据原型链的规则,顺便绑定一下constructor, 这一步不影响继承, 只是在用到constructor时会需要
Child.prototype.constructor = Child


// ---- test case ----
const child = new Child()
console.log(child)
console.log(child.getName())
console.log(child.constructor === Child, child.constructor === Parent)
