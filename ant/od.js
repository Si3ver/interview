function observe(data) {
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key])
  })
}

function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable : true,
    configurable : true,
    set (newVal) {
      value = newVal
    },
    get () {
      return value
    },
  })
}

// ---- test case ----
var o = {time: 1}
observe(o)

setInterval(() => {
  o.time = +new Date()
  console.log(o.time)
},1000)
