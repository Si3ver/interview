// 4. 寄生式组合式继承
// 是目前最成熟的继承方式，babel对ES6继承的转化也是使用了寄生组合式继承


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
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child


// ---- test case ----
const child1 = new Child()
const child2 = new Child()

console.log(child1)
console.log(child1.getName())
child1.play.push(4)
console.log(child1.play, child2.play)

