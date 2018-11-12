export const noop = () => {}

export const getPrivilegesForTree = (data = []) => {
  return data.map(item => {
    const children =
      (item.child_functions &&
        item.child_functions.map(child => ({
          title: child.name,
          key: child.id,
          parent_id: child.parent_id
        }))) ||
      []

    return {
      title: item.name,
      key: item.id,
      parent_id: item.parent_id,
      children
    }
  })
}

// 返回用于权限展示的ids, 一级权限id，要去掉
export const getPrivilegeIds = (data = []) => {
  return data.reduce(
    (ret, item) => {
      ret.parent.push(item.id)
      item.child_functions &&
        item.child_functions.forEach(child => {
          ret.child.push(child.id)
        })
      return ret
    },
    { parent: [], child: [] }
  )
}

export const canEdit = functions => {
  return functions.includes("编辑")
}

export const canAdd = functions => {
  return functions.includes("新增")
}

export const canShow = functions => {
  return functions.includes("查看")
}

export const canDel = functions => {
  return functions.includes("删除")
}
