// 手撕Promise、Promise.all、Promise.race、Promise.finally、
class MyPromise {
  static PENDING = 'PENDING'
  static RESOLVED = 'RESOLVED'
  static REJECTED = 'REJECTED'

  constructor(executor) {
    this.status = this.PENDING
    this.value = void(0)
    this.reason = void(0)
    this.onResolvedCallback = []
    this.onRejectedCallback = []

    const resolve = (value) => {
      if (this.status === this.PENDING) {
        this.status = this.RESOLVED
        this.value = value
        this.onResolvedCallback.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.status === this.PENDING) {
        this.status = this.REJECTED
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
      case this.PENDING:
        this.onResolvedCallback.push(() => {
          onResolved(this.value)
        })
        onRejected && this.onRejectedCallback.push(() => {
          onRejected(this.reason)
        })
        break
      case this.RESOLVED:
        onResolved(this.value)
        break
      case this.REJECTED:
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
new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('ok')
    reject('not ok')
  }, 1000);
}).then().then(
  (data) => {
    console.log('[Promise] success', data)
  },
  (err) => {
    console.log('[Promise] fail', err)
    // throw err
  }
).catch(
  (err) => {
    console.log('[Promise] catch', err)
  }
).finally(
  () => {
    console.log('[Promise] finally')
  }
)


new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('ok')
    reject('not ok')
  }, 1000);
}).then().then().then(
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

