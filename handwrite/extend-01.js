// 1. 原型链继承
function Parent() {
  this.name = 'Kevin'
}
Parent.prototype.getName = function() {
  console.log(this.name)
}

function Child() {

}
Child.prototype = new Parent()

// ---- test case ----
var child1 = new Child()
child1.getName()          // 'Kevin'

/**
child1.__proto__ === Child.prototype
child1.__proto__.__proto__ === Parent.prototype

问题：
1. 引用类型的属性被所有实例共享
2. 在创建Child的实例时，不能向 Parent 传参
 */

