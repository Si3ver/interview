// 借用构造函数（经典继承）
function Parent() {
  this.names = ['Kevin', 'Daisy']
}

function Child() {
  Parent.call(this)
}

// ---- test case ----
var child1 = new Child()
child1.names.push('Yayu')
console.log(child1.names)

var child2 = new Child()
console.log(child2.names)

/**
优点：
1. 避免了引用类型的属性被所有实例共享
2. 可以在Child中向Parent传参

缺点：
1. 方法都在构造函数中定义，每次创建实例都会去创建一遍方法
 */

