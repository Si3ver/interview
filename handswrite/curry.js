const curry = (fn) =>
  (_curry = (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...newArgs) => _curry(...args, ...newArgs))

// ---- tes case ----
const sum = (a, b, c, d) => a + b + c + d;
const currySum = curry(sum);
console.log(currySum(1, 2, 3, 4));
console.log(currySum(1, 2)(3, 4));
console.log(currySum(1)(2)(3)(4));
