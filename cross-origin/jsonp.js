function showData(data) {
  console.log(data)
}

//一个 jsonp函数大概是这样
function jsonp({url, params}) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    params = JSON.parse(JSON.stringify(params));
    let arrs = [];
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`);
    }
    script.src = `${url}?${arrs.join('&')}`;
    script.onload = (res) => {
      document.body.appendChild(script);
      console.log('请求成功了：', res)
      resolve(res)
    }
    script.onerror = (err) => {
      document.body.appendChild(script);
      console.log('请求失败了', err)
      reject(err)
    }
  })
}

var a = jsonp({
  url: 'http://weoa.com/data/km-qa.js',
  params: {
    v: '1.0',
    rnd: 0.8325103155783109,
    callback: 'showData'
  },
}).then(data => {
  console.log(data)
})
