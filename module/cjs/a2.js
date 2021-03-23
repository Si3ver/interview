const foo = {
	count: 0
}

exports.foo=foo;

setTimeout(()=>{
	foo.count += 1
	console.log('changed foo')
},1000)
