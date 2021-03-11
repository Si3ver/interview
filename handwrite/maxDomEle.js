// 获取当前页面出现次数最多的标签

function getFrequentTag () {
  const tags = [].map.call(
    document.querySelectorAll('*'), 
    node => 
      node.tagName.toLowerCase()
  )
  const map = tags.reduce((o, tag) => {
    o[tag] = o[tag] ? o[tag] + 1 : 1
    return o
  }, {})
  const list = Object.entries(map)
  const targetItem = list.reduce((maxTimeItem, item) => {
    return item[1] > maxTimeItem[1] ? item : maxTimeItem
  })
  return targetItem[0]
}

getFrequentTag()
