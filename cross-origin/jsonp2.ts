const btn: HTMLElement = document.getElementById('btn');
btn.addEventListener('click',() => {
  let url = 'http://127.0.0.1:3030/jsonp?type=all&callback=getdata';
  loadScripr(url);},false)
  function loadScripr(src: string): void {    const script: HTMLScriptElement = document.createElement('script');    script.src = src;    script.onload = () => {      // 每次动态创建script标签之后,都将script标签删掉 这很重要哦，不然整个页面的 script 标签要爆炸了        document.body.removeChild(script)    }    script.onerror = () => {        console.error('请求失败了');       delete window['getdata'];        document.body.removeChild(script)    }    document.body.appendChild(script);}function getdata(data: any): void {// data 为服务端返回的数据   // to do something    alert(JSON.stringify(data))}  
