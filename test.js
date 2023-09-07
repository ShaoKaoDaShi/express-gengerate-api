function debounce(fn, delayTime) {
  let id
  return (...args) => {
    id = setTimeout(() => {
      if (id != false) return
      fn(...args)
      clearTimeout(id)
    }, delayTime)
  }
}
const arr2 = [[1,2,3],[2,3,4],[2,3,5,6]]
function a(arr){
  if(arr.length === 0) return
  let item1 = arr[0]
  if(arr.length === 1) return item1
  for(let i = 1; i < arr.length; i++){
    item1 = item1.filter(item=>{
      return arr[i].includes(item)
    })
  }
  return item1
}

console.log(a(arr2))