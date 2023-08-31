// 1. 跳台阶，斐波那契计算
// function fn(n) {
//   if (n === 1 || n === 2) return 1
//   return fn(n - 1) + fn(n - 2)
// }
// const arr = [fn(3), fn(4), fn(5), fn(6)]
// console.log(arr)

// 算法优化
// function fn1(n) {
//   const arr = [1, 1]
//   for (let i = 3; i <= n; i++) {
//     let item2 = arr[1]
//     arr[1] = arr[0] + arr[1]
//     arr[0] = item2
//   }
//   return arr[1]
// }

// const arr1 = [fn1(3), fn1(4), fn1(5), fn1(6)]
// console.log(arr1)

//2. leetcode 62 不同路径

// function fn3(m, n) {
//   const arr = []
//   for (let i = 0; i < m; i++) {
//     arr[i]=[]
//     for (let j = 0; j < n; j++) {
//       if (i === 0 || j === 0) {
//         arr[i][j] = 1
//         continue
//       }
//       arr[i][j] = arr[i - 1][j] + arr[i][j - 1]
//     }
//   }
//   return arr[m-1][n-1]
// }
// const arr2 = [fn3(1,2), fn3(2,2), fn3(3,2), fn3(4,2), fn3(5,2), fn3(6,6)]
// console.log(arr2)

// 优化算法
// function fn3(m, n) {
//   const arr = Array(n).fill(1);
//   for (let i = 0; i < m; i++) {
//     if(i === 0) continue
//     for (let j = 0; j < n; j++) {
//       if ( j === 0) {
//         arr[j]=1
//         continue
//       }
//       arr[j]=arr[j]+arr[j-1]
//     }
//   }
//   return arr[n-1]
// }

// const arr2 = [fn3(1,2), fn3(2,2), fn3(3,2), fn3(4,2), fn3(5,2), fn3(6,6)]
// console.log(arr2)

//2. leetcode 63 最小路径
// f(m,n) = min(f(m-1,n),f(m,n-1)) + arr[m][n]

// function fn3(arr) {
//   const m = arr.length
//   const n = arr[0].length
//   const arr1 = Array(n).fill(Infinity)

//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (i === 0 && j === 0) {
//         arr1[j] = arr[i][j]
//       } else if (i === 0) {
//         arr1[j] = arr[i][j] + arr1[j - 1]
//       } else if (j === 0) {
//         arr1[j] = arr1[j] + arr[i][j]
//       } else {
//         arr1[j] = Math.min(arr1[j - 1], arr1[j]) + arr[i][j]
//       }
//     }
//   }

//   return arr1[n - 1]
// }
// const grid = [
//   [1, 3, 1],
//   [1, 5, 1],
//   [4, 2, 1],
// ]
// const grid1 = [
//   [1, 2, 3],
//   [4, 5, 6],
// ]

// console.log(fn3(grid))
// console.log(fn3(grid1))

//3.leetcode 174 地下城游戏
// f(m,n) = max(min(f(m+1,n),f(m,n+1))- arr[m][n],1)
// function fn3(arr) {
//   const m = arr.length
//   const n = arr[0].length
//   const result = Array(m)
//     .fill([])
//     .map(() => Array(n).fill(0))
//   for (let i = m - 1; i >= 0; i--) {
//     for (let j = n - 1; j >= 0; j--) {
//       if (i === m - 1 && j === n - 1) {
//         result[i][j] = Math.max(1 - arr[i][j], 1)
//       } else if (i === m - 1) {
//         result[i][j] = Math.max(result[i][j + 1] - arr[i][j], 1)
//       } else if (j === n - 1) {
//         result[i][j] = Math.max(result[i + 1][j] - arr[i][j], 1)
//       } else {
//         result[i][j] = Math.max(Math.min(result[i + 1][j], result[i][j + 1]) - arr[i][j], 1)
//       }
//     }
//   }
//   return result[0][0]
// }
// const dungeon = [
//   [-2, -3, 3],
//   [-5, -10, 1],
//   [10, 30, -5],
// ]

// console.log(fn3(dungeon))

// 3.背包最大值问题

function fn3(weight, value, backWeight) {
  const m = weight.length
  const n = backWeight
  const result = Array(m)
    .fill([])
    .map(() => Array(n).fill(0))
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if(weight[i] <= j){
        if(result[i][j] === 0) result[i][j] = value[i]
        result[i][j] = Math.max(result[i - 1][j], result[i][j -1] + value)
      }
      result[i][j] =
    }
  }
  return result[0][0]
}