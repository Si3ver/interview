function loadImg(arr) {
  if (arr.length === 0) {
    return '暂无'
  }
  const res = []
  let index = 0
  const imageOnLoad = (src, i) => {
    const image = new Image()
    image.onload = function () {
      res[i] = true;
      index += 1;
      if (index === arr.length) {
        onComplete()
      }
    }
    image.onerror = function () {
      res[i] = false;
      index += 1;
      if (index === arr.length) {
        onComplete()
      }
    }
    image.src = src
  }
  const onComplete = () => {
    if (res.some(val => val)) {
      console.log('加载完成')
    } else {
      res.forEach((val, i) => {
        val ? console.log(`${i}加载完成`) : console.log(`${i}加载不完成`)
      })
    }
  }

  for (let i = 0; i < arr.length; i++) {
    imageOnLoad(arr[i], i)
  }
}

// ---- test case ----
const imgArr = [
  'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c1df89cb0c546e9b77f7aff6f0a8588~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:120:120.awebp',
  'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00458-1998.jpg',

]
loadImg(imgArr)
