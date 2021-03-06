// 限制只能用 new 调用
function Person1(name) {
  if (!new.target) {
    throw new Error('must call by new!')
  }
  this.name = name
}

function Person2(name) {
  if (!(this instanceof Person2)) {
    throw new Error('must call by new!')
  }
  this.name = name
}

// 正确调用
var pnx = new Person1('Tom')
var pny = new Person2('Jerry')
// var px = Person1('Rocky')
// var py = Person2('Panda')
