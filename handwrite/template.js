// 模拟实现 Vue 模板字符串
function parseStr(str, obj) {
  Object.keys(obj).forEach(key => {
    str = str.replace(new RegExp(`{{${key}}}`, 'g'), obj[key])
  })
  return str
}

// ---- test case ----
const res = parseStr('i am {{name}}, age is {{age}}', {
  name: 'Tom Cat',
  age: 24,
})
console.log(res)
