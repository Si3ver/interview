// 时间戳写法，第一次立即执行
function throttle1(fn, interval) {
  let last = 0
  return function () {
    let now = Date.now()
    if (now - last >= interval) {
      last = now
      fn.apply(this, arguments)
    }
  }
}

// 定时器写法，第一次不立即执行
function throttle2(fn, interval) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args)
        timer = null
      }, interval)
    }
  }
}

function throttle3(fn, interval) {
  let timer = null
  let startTime = Date.now()

  return function () {
    let curTime = Date.now()
    let remainTime = delay - (curTime - startTime)
    let context = this
    let args = arguments
    clearTimeout(timer)
    if (remainTime <= 0) {
      fn.apply(context, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(fn, remainTime)
    }
  }
}

function handle () {
  console.log(Math.random())
}

const throttleHandle = throttle(handle, 1000)
throttleHandle()
throttleHandle()
throttleHandle()
throttleHandle()
throttleHandle()
throttleHandle()
throttleHandle()
throttleHandle()

