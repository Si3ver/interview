class MyEventEmitter {
  constructor () {
    this._cache = Object.create(null)
  }
  on (type, callback) {
    
  }
  off (type, callback) {

  }
  trigger (type, data) {

  }
}

// ---- test case ----
const em = new MyEventEmitter()
em.on('test', console.log)
em.trigger('test', 'helloworld')

