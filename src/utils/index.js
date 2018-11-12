import { message } from "antd"

export const isLoggedIn = () => {
  return true
}

export const getAuthRoutes = (routersConfig, routers) => {
  console.log(routersConfig)
  console.log(routers)
  const authRoutes = routers
    .reduce((ret, route) => {
      if (routersConfig[route.name]) {
        ret.push({
          ...routersConfig[route.name],
          child_functions: route.child_functions
        })

        if (route.name === "会员管理") {
          ret.push({
            ...routersConfig["会员详情"],
            child_functions: ["编辑", "重置IC卡密码"]
          })
        }
      }

      return ret
    }, [])
    .concat(routersConfig["*"])

  console.log("routers-------------->", authRoutes)
  return authRoutes
}

export const isDev = () => {
  return process.env.NODE_ENV === "development"
}

export const isUndefined = foo => {
  return foo === undefined
}

export const showSuccess = (data, method) => {
  message.success(
    data.id ? (method === "del" ? "删除成功" : "更新成功") : "保存成功"
  )
}

export const showResetSucces = () => {
  message.success("重置密码成功")
}

export const showError = error => {
  message.error(error.message ? error.message : "出现错误了")
}

// 查询参数
export const generateSearchParams = params => {
  return Object.keys(params).reduce((ret, key) => {
    if (params[key]) {
      let searchKey = `filter[${key}]`

      if (key.indexOf("name") !== -1) {
        searchKey = searchKey + "[like]"
      }

      ret[searchKey] = params[key]
    }

    return ret
  }, {})
}
