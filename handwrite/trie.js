class Trie {
  constructor() {
    this.root = {}
  }

  insert(word) {
    let node = this.root
    for (const ch of word) {
      if (node[ch] == null) node[ch] = {}
      node = node[ch]
    }
    node.isWord = true
  }

  _traverse (word) {
    let node = this.root
    for (const ch of word) {
      node = node[ch]
      if (node == null) return null
    }
    return node
  }

  search (word) {
    const node = this._traverse(word)
    return node != null && node.isWord === true
  }

  startsWith (prefix) {
    const node = this._traverse(prefix)
    return !!node
  }
}

// ---- test case ----
var tree = new Trie()
tree.insert('abc')
tree.insert('abd')
tree.insert('bcd')
console.log(JSON.stringify(tree.root, null, 2))
