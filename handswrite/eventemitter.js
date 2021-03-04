class MyEventEmitter {
  constructor () {
    this._cache = Object.create(null)
  }
  on (type, callback) {
    if (this._cache[type]) {
      this._cache[type].push(callback)
    } else {
      this._cache[type] = [callback]
    }
    
  }
  off (type, callback) {
    let fns = this._cache[type]
    if (callback) {
      this._cache[type] = fns.filter(fn => fn !== callback)
    } else {
      this._cache[type] = []
    }
  }
  trigger (type, data) {
    const fns = this._cache[type]
    if (Array.isArray(fns)) {
      fns.forEach(fn => fn(data))
    }
  }
}

// ---- test case ----
const cb1 = x => {console.log(x)}
const cb2 = x => {console.log(x + x)}
const em = new MyEventEmitter()
em.on('hEvent', cb1)
em.on('hEvent', cb2)
em.off('hEvent', cb1)
em.trigger('hEvent', 'helloworld')
em.off('hEvent')
em.trigger('hEvent', 'helloworld')
