// https://github.com/LeuisKen/leuisken.github.io/issues/2
// 将一个扁平对象，根据 keys 树形化
function toTree(obj, [key, ...rest], result = {}) {
  if (result.value == null) {
    result.value = obj[key]
    if (rest.length) {
      result.children = toTreeList(obj, rest)
    }
  } else if (result.value === obj[key] && rest.length) {
    toTreeList(obj, rest, result.children)
  }
  return result
}

// 将一个扁平对象的树形化产物，不重复地放到 list 里
function toTreeList(obj, keys, list = []) {
  let value = obj[keys[0]]
  let target = list.find(item => item.value === value)
  if (target) {
    toTree(obj, keys, target)
  } else {
    list.push(toTree(obj, keys))
  }
  return list
}

// 将一个扁平化对象组成的列表，变成树形化的列表
function listToTree(list = [], keys = []) {
  return list.reduce(
    (result, obj) => toTreeList(obj, keys, result),
    []
  )
}



// ---- test case ----
const entries = [
  { "province": "浙江", "city": "杭州", "name": "西湖" },
  { "province": "四川", "city": "成都", "name": "锦里" },
  { "province": "四川", "city": "成都", "name": "方所" },
  { "province": "四川", "city": "阿坝", "name": "九寨沟" }
]

const keys = ['province', 'city', 'name']
console.log(JSON.stringify(listToTree(entries, keys), null, 2))

/**
[
  {
    "value": "浙江",
    "children": [
      {
        "value": "杭州",
        "children": [
          {
            "value": "西湖"
          }
        ]
      }
    ]
  },
  {
    "value": "四川",
    "children": [
      {
        "value": "成都",
        "children": [
          {
            "value": "锦里"
          },
          {
            "value": "方所"
          }
        ]
      },
      {
        "value": "阿坝",
        "children": [
          {
            "value": "九寨沟"
          }
        ]
      }
    ]
  }
]
 */
