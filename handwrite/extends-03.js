// 3. 组合式继承
// 缺陷：
// 构造函数被执行两次
// 子类创建实例时，原型中会存在两份相同的属性和方法，这并不优雅


function Parent () {
  this.name = 'Tom'
  this.play = [1, 2, 3]
}
Parent.prototype.getName = function () {
  return this.name
}

function Child () {
  // 构造函数继承
  Parent.call(this)
  this.type = 'child'
}
Child.prototype = new Parent()
Child.prototype.constructor = Child


// ---- test case ----
const child = new Child()
console.log(child)
console.log(child.getName())
console.log(child.constructor === Child, child.constructor === Parent)
