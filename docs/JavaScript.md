## 1. 基础

### 1. 手写深拷贝

```js
function deepClone(origin = {}, hashMap = new WeakMap()) {
  // 1. 判断是否是一般对象
  if (typeof origin !== 'object' || origin == null) return origin
  if (origin instanceof Date) return new Date(origin)
  if (origin instanceof RegExp) return new RegExp(origin)

  // 2. 循环引用处理
  const hashKey = hashMap.get(origin)
  if (hashKey) return hashKey

  let target = new origin.constructor()
  hashMap.set(origin, target)

  // 3. 递归拷贝每个属性
  for(let key in origin) {
    if (origin.hasOwnProperty(key)) {
      target[key] = deepClone(origin[key])
    }
  }
  return target
}
```

[🌰](../demos/js-demo-01.html)

## 2. 原型 & 原型链

### 1. 准确判断数组

1. instanceof。不准确，如果网页中包含多个框架，那实际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的Array构造函数。如果你从一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自不同的构造函数
2. constructor。 constructor可以被重写，所以不能确保一定是数组
3. Array.isArray。推荐
4. Object.prototype.toString。推荐

### 2. class 的原型本质

1. class实际上是函数的语法糖
2. instanceof 基于原型链查找

[🌰](../demos/js-demo-02.html)

#### 3. 实现简易版jQuery

[🌰](../demos/js-demo-03.html)

## 3. 作用域 & 闭包

### this 不同应用场景，如何取值

1. 当作普通函数被调用
2. 使用 call、apply、bind
3. 作为对象方法调用
4. 在class的方法中调用
5. 箭头函数

### 手写bind函数

[🌰](../demos/js-demo-04.html)

### 闭包应用举例

+ 隐藏数据，只提供API
+ cacheService

## 4. 异步


