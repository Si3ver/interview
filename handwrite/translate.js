// https://github.com/LeuisKen/leuisken.github.io/issues/2

// 将一个扁平对象，根据 keys 树形化
function toTree(obj, [key, ...rest], result = {}) {
  if (result.value == null) {
    result.value = obj[key]
    if (rest.length) {
      result.children = addEntryIntoTree(obj, rest)
    }
  } else if (result.value === obj[key] && rest.length) {
    addEntryIntoTree(obj, rest, result.children)
  }
  return result
}

// 将一个扁平对象的树形化产物，不重复地放到 tree 里
function addEntryIntoTree(entry, keys, tree = []) {
  let value = entry[keys[0]]
  let target = tree.find(item => item.value === value)
  if (target) {
    toTree(entry, keys, target)
  } else {
    tree.push(toTree(entry, keys))
  }
  return tree
}

// 将一个扁平化对象组成的列表，变成树形化的列表
function translate(entries = [], keys = []) {
  return entries.reduce(
    (tree, entry) => {
      return addEntryIntoTree(entry, keys, tree)
    },
    []
  )
}



// ---- test case ----
var entries = [
  { "province": "浙江", "city": "杭州", "name": "西湖" },
  { "province": "四川", "city": "成都", "name": "锦里" },
  { "province": "四川", "city": "成都", "name": "方所" },
  { "province": "四川", "city": "阿坝", "name": "九寨沟" }
]
var keys = ['province', 'city', 'name']
// translate(entries, keys)
console.log(JSON.stringify(translate(entries, keys), null, 2))

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
