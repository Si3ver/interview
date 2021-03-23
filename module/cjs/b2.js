const  { foo }  = require('./a2.js')

console.log('foo', foo);//'foo',{count: 0}
setTimeout(()=>{
  console.log('after 2s foo', foo);//'after 2s foo ',{count: 1}
}, 2000)
