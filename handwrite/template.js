// 模拟实现 Vue 模板字符串
function parseStr(str, obj) {
  // Object.keys(obj).forEach(key => {
  //   str = str.replace(new RegExp(`{{${key}}}`, 'g'), obj[key])
  // })

  return str.replace(/\{\{(.*?)\}\}/g, (_match, key) => {
    // console.log(_match, key)
    return obj[key]
  })
}

// ---- test case ----
const res = parseStr('i am {{name}}, age is {{age}}', {
  name: 'Tom Cat',
  age: 24,
})
console.log(res)
