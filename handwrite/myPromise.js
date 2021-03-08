// 手撕Promise、Promise.all、Promise.race、Promise.finally、
const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = void(0)
    this.reason = void(0)
    this.hasExecOnRejected = false
    this.onResolvedCallback = []
    this.onRejectedCallback = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVED
        this.value = value
        this.onResolvedCallback.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallback.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then (onResolved, onRejected) {
    switch (this.status) {
      case PENDING:
        this.onResolvedCallback.push(() => {
          onResolved(this.value)
        })
        if (onRejected) {
          this.onRejectedCallback.push(
            () => {
              onRejected(this.reason)
            }
          )
        }
        break
      case RESOLVED:
        onResolved(this.value)
        break
      case REJECTED:
        onRejected && onRejected(this.reason)
        break
      default:
        break
    }
    return this
  }
  catch (onRejected) {
    this.then(null, onRejected)
    return this
  }
  static all (arr) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(arr))  throw new Error('MyPromise.all() only support Array')
      const res = []
      let oIdx = 0

      const process = (item, idx) => {
        res[idx] = item
        if (++oIdx === arr.length) {
          resolve(res)
        }
      }

      arr.forEach((item, idx) => {
        if (item && typeof item.then === 'function') {
          item.then((item) => {
            process(item, idx)
          }, (err) => {
            return reject(err)
          })
        } else {
          process(item, idx)
        }
      })
    })
  }
  finally (onFinished) {
    this.then((val) => {
      onFinished()
      return val
    }).catch((err) => {
      onFinished()
      return err
    })
  }
}

// ---- test case ----
// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('ok')
//     reject('not ok')
//   }, 1000);
// }).then().then(
//   (data) => {
//     console.log('[Promise] success', data)
//   },
//   (err) => {
//     console.log('[Promise] fail', err)
//     // throw err
//   }
// ).catch(
//   (err) => {
//     console.log('[Promise] catch', err)
//   }
// ).finally(
//   () => {
//     console.log('[Promise] finally')
//   }
// )


new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('ok')
    reject('not ok')
  }, 1000);
}).then(
  (data) => {
    console.log('[MyPromise] success', data)
  },
  (err) => {
    console.log('[MyPromise] fail', err)
  }
).catch(err => {
  console.log('[MyPromise] catch', err)
}).finally(
  () => {
    console.log('[MyPromise] finally')
  }
)


// const p1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('ok1')
//     reject('fail1')
//   }, 1000);
// })
// const p2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('ok2')
//   }, 2000);
// })

// MyPromise.all([1, 2, 3, p1, p2]).then(data => {
//   console.log('[MyPromise.all] resolve', data);
// }, err => {
//   console.log('[MyPromise.all] reject', err);
// })

// Promise.all([1, 2, 3, p1, p2]).then(data => {
//   console.log('[Promise.all] resolve', data);
// }, err => {
//   console.log('[Promise.all] reject', err);
// })

