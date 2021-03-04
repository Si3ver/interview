// 后端
const http = require('http');
const url = require('url');
http.createServer((req, res) => {
  // /api?callback=onResponse
  // 解析前端请求url中的callback名
  if(req.url.includes('/api')) {
    let myurl = url.parse(req.url);
    let params = new URLSearchParams(myurl.query)
    let posts = ['js', 'php'];
    let mathodName = params.get('callback');
    res.end(`${mathodName}(${JSON.stringify(posts)})`)
  }
})
.listen(9090, () => {
  console.log(9090);
})
