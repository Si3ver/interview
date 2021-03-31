

function translate(entries = [], keys = []) {
  return entries.reduce(
    (trie, entry) => {
      trie.insert(entry, keys)
    },
    new Trie(),
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
console.log(JSON.stringify(translate(entries, keys), null, 2))
