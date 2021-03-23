function singleton (fn) {
  let result = null
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

const getScript = singleton(function() {
  return document.createElement('script')
})

const script1 = getScript()
const script2 = getScript()
console.log(script1 === script2)
