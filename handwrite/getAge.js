/**
 * 根据出生年月计算年龄
 * 约定： 过了 x岁 生日后一天才算 x 岁
 * @param {String} birthday 出生年月日
 * @returns {Number} 年龄
 */
function getAge(birthday) {
  const validator = new RegExp(/^\d{4}-\d{2}-\d{2}$/)
  if (!validator.test(birthday)) {
    throw new Error(`invalid argument ${birthday}`)
  }

  const [birthYear, birthMonth, birthDay] = birthday.split('-').map(str => Number(str))
  const now = new Date()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth() + 1
  const nowDay = now.getDate()

  const age = nowYear - birthYear - 1
  if (nowMonth > birthMonth || (nowMonth === birthMonth && nowDay > birthDay)) {
    return age + 1
  } else {
    return age
  }
}

// ---- test case ----
const log = console.log
log(getAge('2010-03-11')) // 11
log(getAge('2010-03-12')) // 10
log(getAge('2010-03-13')) // 10
