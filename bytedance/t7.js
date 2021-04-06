/* 题目: JS 实现一个带并发限制的异步调度控制器 Scheduler，保证同时运行的任务最多有两个

class Schedular {
  add (promiseCreator) { ... }
  // ...
}

*/

class Scheduler {
  constructor() {
    this.tasks = [],      // 待运行的任务
    this.usingTask = []   // 正在运行的任务
  }
  // promiseCreator 是一个异步函数，return Promise
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      promiseCreator.resolve = resolve
      if (this.usingTask.length < 2) {
        this.usingRun(promiseCreator)
      } else {
        this.tasks.push(promiseCreator)
      }
    })
  }
  // 执行任务
  usingRun(promiseCreator) {
    this.usingTask.push(promiseCreator)
    promiseCreator().then(() => {
      promiseCreator.resolve()
      this.usingMove(promiseCreator)
      if (this.tasks.length > 0) {
        this.usingRun(this.tasks.shift())
      }
    })
  }
  // 某任务执行完，新任务加入运行队列
  usingMove(promiseCreator) {
    let index = this.usingTask.findIndex(promiseCreator)
    this.usingTask.splice(index, 1)
  }
}

// ---- test case ----
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})
const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output： 2 3 1 4
// 一开始，两个任务进入队列
// 500ms时，任务2完成，打印2，任务3开始执行
// 800ms时，任务3完成，打印3，任务4开始执行
// 1000ms时，任务1完成，打印1
// 1200ms时，任务4完成，打印4
