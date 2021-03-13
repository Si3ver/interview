/**
 * 
 * @param {*} options options.url, options.type
 * @param {*} duration 间隔
 * @returns null
 */
function fetch(options, duration) {
  const start = Date.now()
  return function () {
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('readyStateChange', () => {
      if (Date.now() - start >= duration && xhr.readyState != '4') {
        xhr.abort()
      }
      xhr.open(options.url, options.type, true)
      xhr.send()
    })
  }
}
