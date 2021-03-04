const partition = (arr, left, right) => {
  const pivot = arr[left]
  while (left < right) {
    while (left < right && arr[right] >= pivot) --right
    if (left < right) arr[left] = arr[right]
    while(left < right && arr[right] <= pivot) ++left
    if (left < right) arr[right] = arr[left]
  }
  arr[left] = pivot
  return left
}

const quickSort_recu = (arr, left, right) => {
  if (left > right) return
  let pivotIdx = partition(arr, left, right)
  console.log(pivotIdx, arr)
  quickSort_recu(arr, left, pivotIdx - 1)
  quickSort_recu(arr, pivotIdx + 1, right)
  return arr
}

console.log(quickSort_recu([5, 3, 9, 1, 8, 34, 12], 0, [5, 3, 9, 1, 8, 34, 12].length-1))
// console.log(quickSort_iter([5, 3, 9, 1, 8, 34, 12], 0, [5, 3, 9, 1, 8, 34, 12].length-1))
