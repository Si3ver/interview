function bindEvent(elem, type, selector, fn) {
  if (fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, e => {
    let target
    if (selector) {
      // 需要代理
      target = e.target
      if (target.matches(selector)) {
        fn.call(target, e)
      }
    } else {
      // 不需要代理
      fn(e)
    }
  })
}
