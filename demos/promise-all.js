// 手写 promise.all
function PromiseAll(promiseArray) {
  // return Promise.all(promiseArray)
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promiseArray)) {
      return reject()
    }
    const res = []
    const len = promiseArray.length
    let   cnt = 0
    for (let i = 0; i < len; ++i) {
      Promise.resolve(promiseArray[i])
        .then(value => {
          ++cnt
          res[i] = value
          if (cnt === len) {
            resolve(res)
          }
        })
        .catch(e => {
          reject(e)
        })
    }
  })
}

// ---- test case ----
const pro1 = new Promise(res => {
  setTimeout(() => {
    res('1')
  }, 1000)
})

const pro2 = new Promise(res => {
  setTimeout(() => {
    res('2')
  }, 2000)
})

const pro3 = new Promise(res => {
  setTimeout(() => {
    res('3')
  }, 3000)
})

const proAll = PromiseAll([pro1, pro2, pro3])
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })
