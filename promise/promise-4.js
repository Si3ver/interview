// promise API
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(executor) {
    this.status = PENDING
    this.value = void(0)
    this.reason = void(0)
    this.onFulfilledCallback = []
    this.onRejectedCallback = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onFulfilledCallback.forEach(fn => fn())
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
  then (onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    if (this.status === PENDING) {
      this.onFulfilledCallback.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallback.push(() => {
        onRejected(this.reason)
      })
    }
  }
  catch (errCallBack) {
    this.then(null, errCallBack)
  }
  finally (callback) {
    return this.then((value) => {
      return MyPromise.resolve(callback()).then(()=>value)
    },  (reason) => {
      return MyPromise.resolve(callback()).then(()=>{throw reason})
    })
  }
}


// MyPromise.all = function(values) {
//   if (!Array.isArray(values)) {
//     const type = typeof values
//     return new TypeError(`TypeError: ${type} is not iterable`)
//   }

//   return new MyPromise((resolve, reject) => {
//     const res = []
//     let orderIdx = 0

//     const processResByKey = (value, idx) => {
//       res[idx] = value
//       if (++orderIdx === values.length) {
//         resolve(res)
//       }
//     }

//     for (let i = 0; i < values.length; ++i) {
//       const value = values[i]
//       if (value && typeof value.then === 'function') {
//         value.then((value) => {
//           processResByKey(value, i)
//         }, reject)
//       } else {
//         processResByKey(value, i)
//       }
//     }
//   })
// }

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (!Array.isArray(promises)) throw new TypeError(`${typeof promises} not support`)

    const res = []
    let orderIdx = 0

    const process = (val, i) => {
    console.log('🚀~ val, i', val, i)
      res[i] = val
      if (++orderIdx === promises.length) {
        resolve(res)
      }
    }

    for(let i = 0; i < promises.length; ++i) {
      const pro = promises[i]
      if (pro && typeof pro.then === 'function') {
        pro.then((pro) => {
          process(pro, i)
        }, reject)
      } else {
        process(pro, i)
      }
    }
  })
}

let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok1');
  }, 1000);
})

let p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok2')
    // reject('ok2');
  }, 1000);
})

MyPromise.all([1,2,3,p1,p2]).then(data => {
  console.log('resolve', data);
}, err => {
  console.log('reject', err);
})
