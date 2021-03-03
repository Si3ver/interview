console.log('start')
setTimeout(() => {
  console.log('children2')
  Promise.resolve().then(() => {
    console.log('children3')
  })
})

new Promise(function (resolve) {
  console.log('children4')
  setTimeout(function () {
    console.log('children5')
    resolve('children6')
  }, 0)
}).then((res) => {
  console.log('children7')
  setTimeout(() => {
    console.log(res)
  }, 0)
})

// start
// children4
// 第一轮宏任务结束
// children2
// 第二轮宏任务结束
// children3
// children5
// children7
// children6
