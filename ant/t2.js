// 请通过代码实现大整数（可能比Number.MAX_VALUE大）相加运算
// 思路：对齐，逐位相加
class MyBigInt {
  constructor (str) {
    this.str = str
  }
  plus (bigInt) {
    const str1 = this.str, str2 = bigInt.str
    const m = str1.length, n = str2.length
    const maxLen = Math.max(m, n)
    const padStr1 = str1.padStart(maxLen, '0')
    const padStr2 = str2.padStart(maxLen, '0')
    const res = []
    let curry = 0
    for (let i = maxLen - 1; i >= 0; --i) {
      const digit1 = +padStr1[i]
      const digit2 = +padStr2[i]
      const sum = curry + digit1 + digit2
      res.unshift(~~(sum % 10))
      curry = ~~(sum / 10)
    }
    curry > 0 && res.unshift(curry)
    return this.toString(res)
  }
  toString (res) {
    return res.join('')
  }
}

// ---- test case ----
var bigint1 = new MyBigInt('1234232453525454546445451434342153453454545454545454')
var bigint2 = new MyBigInt('1234232453525454546445451434342153453454545454545454')
console.log(bigint1.plus(bigint2)) // 2468464907050909092890902868684306906909090909090908
