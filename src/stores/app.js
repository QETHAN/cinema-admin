import { action, observable, flow } from "mobx"
import BaseApi from "api/base"
import superRoutes from "routes/super.config"
import { getPrivilegesForTree } from "utils/helper"

export default class Store {
  @observable
  token = sessionStorage.getItem("token")

  @observable
  cities = []

  @observable
  privileges = []
  @observable
  privilegesById = null

  @observable
  routers = []

  @action
  setToken(token) {
    this.token = token
    sessionStorage.setItem("token", token)
  }

  @action
  removeToken() {
    this.token = ""
    sessionStorage.removeItem("token")
  }

  @action
  getCities() {
    if (this.cities.length) return this.cities

    this.getArea()
  }

  @action
  getPrivileges() {
    if (this.privileges.length) return this.privileges

    this.getPrivilege()

    return this.privileges
  }

  @action
  getPrivilegesById() {
    if (this.privilegesById) return this.privilegesById

    this.privilegesById = this.getPrivileges()[0].children.reduce(
      (ret, item) => {
        ret[item.key] = { parent_id: item.parent_id }
        item.children.forEach(child => {
          ret[child.key] = { parent_id: child.parent_id }
        })
        return ret
      },
      {}
    )

    return this.privilegesById
  }

  getArea = flow(function*(areaId = 0) {
    if (this.cities.length) return

    const citiesStr = sessionStorage.getItem("cities")

    if (citiesStr) {
      const cities = JSON.parse(citiesStr)
      if (cities.length) {
        this.cities = cities
        return
      }
    }

    try {
      const res = yield new BaseApi().getArea(areaId)
      this.cities = res.data
      sessionStorage.setItem("cities", JSON.stringify(this.cities))
    } catch (err) {}
  })

  getPrivilege = flow(function*() {
    if (this.privileges.length) return

    const privilegesStr = sessionStorage.getItem("privileges")

    if (privilegesStr) {
      const privileges = JSON.parse(privilegesStr)
      if (privileges.length) {
        this.privileges = privileges
        return
      }
    }

    try {
      const res = yield new BaseApi().getPrivilege()

      const all = getPrivilegesForTree(res.data)

      this.privileges = [{ title: "全部", key: "all", children: all }]

      sessionStorage.setItem("privileges", JSON.stringify(this.privileges))
    } catch (err) {}
  })

  // 获取当前用户的权限数据
  getRouter = flow(function*() {
    try {
      const res = yield new BaseApi().getRouter()

      if (res.data.is_super_role) {
        this.routers = superRoutes
      } else {
        this.routers = res.data.map(item => {
          item.child_functions = item.child_functions.map(child => child.name)
          return item
        })
      }
    } catch (err) {}
  })
}
