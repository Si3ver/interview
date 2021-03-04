let arr = new Array(9999999).fill(0)

console.time('FOR')
for(let i = 0; i < arr.length; ++i) {}
console.timeEnd('FOR')

console.time('WHILE')
let i = 0;
while(i++ < arr.length) {}
console.timeEnd('WHILE')

console.time('FOREACH')
arr.forEach(() => {})
console.timeEnd('FOREACH')

console.time('FORIN')
for(let _ in arr) {}
console.timeEnd('FORIN')

console.time('FOROF')
for(let _v of arr) {}
console.timeEnd('FOROF')
