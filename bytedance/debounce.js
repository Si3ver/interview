// 实现防抖
// 第一版
function debounce(fn, wait) {
  let timer = null
  return function (...args) {
    if (timer != null) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

// 第二版，可以通过参数控制是否立即执行
function debounceV2(fn, wait, immediate = true) {
  let timer, context, args
  const later = () => setTimeout(() => {
    timer = null
    if (!immediate) {
      fn.apply(context, args)
      context = args = null
    }
  }, wait)

  return function(...args) {
    if (!timer) {
      timer = later()
      if (immediate) {
        fn.apply(this, params)
      } else {
        context = this
        args = params
      }
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}
