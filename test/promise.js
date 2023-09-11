// promise.all
function all(arr) {
  return new Promise((resolve, reject) => {
    const result = Array(arr.length).fill(undefined)
    let successNum = 0
    for (let i = 0; i < arr.length; i++) {
      function asyncTask(i, task) {
        task
          .then((res) => {
            result[i] = res
            if (++successNum === arr.length - 1) resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      }
      asyncTask(i, arr[i])
    }
  })
}
