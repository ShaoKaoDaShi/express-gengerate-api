const arr = [
  {
    id: 2,
    name: '部门B',
    parentId: 0,
  },
  {
    id: 3,
    name: '部门C',
    parentId: 1,
  },
  {
    id: 1,
    name: '部门A',
    parentId: 2,
  },
  {
    id: 4,
    name: '部门D',
    parentId: 1,
  },
  {
    id: 5,
    name: '部门E',
    parentId: 2,
  },
  {
    id: 6,
    name: '部门F',
    parentId: 3,
  },
  {
    id: 7,
    name: '部门G',
    parentId: 2,
  },
  {
    id: 8,
    name: '部门H',
    parentId: 4,
  },
]

function parseArrToTree(arr) {
  function getRoot(arr) {
    return arr.find((item) => item.parentId === 0)
  }

  function creteChildren(parent, arr) {
    if (parent === undefined) return
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].parentId === parent.id) {
        parent.children ? parent.children.push(arr[i]) : (parent.children = [arr[i]])
      }
    }
  }

  function createTree(parrentList, arr) {
    for (let i = 0; i < parrentList.length; i++) {
      creteChildren(parrentList[i], arr)
      if (parrentList[i].children?.length > 0) createTree(parrentList[i].children, arr)
    }
  }
  const root = getRoot(arr)
  createTree([root], arr)
  return root
}
console.log(parseArrToTree(arr))
