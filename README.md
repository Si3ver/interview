# interview

面试知识点整理

+ [HTML](./docs/html.md)
+ [CSS](./docs/css.md)
+ [JavaScript](./docs/JavaScript.md)
+ [手撕系列](./handwrite/)

## 面试题集锦

### ESM 和 CJS 的区别

+ CJS
  - 运行时加载模块
  - 输出值的浅拷贝 [demo](./module/cjs/b2.js)
  - 具有缓存
+ ESM
  - 静态编译期间，就确定了模块的依赖
  - 输出值的引用

> https://juejin.cn/post/6844903598480965646

### mixin 与 继承

+ mixin 本质是对象融合，会把原型链上的方法一并拷贝过去
  - 从一定程度上，mixin 弥补了 JavaScript 单一原型链的缺陷，可以实现类似于多重继承的效果。
+ mixin + 工厂模式 -> 寄生式继承

### 项目，如何提高可扩展性


### HTTPS 哪三个随机数？


