import { flow } from "mobx"

export default class Store {
  api
  appStore

  constructor(api, appStore) {
    this.api = api
    this.appStore = appStore
  }

  login = flow(function*(data) {
    try {
      const res = yield this.api.login(data)
      if (res.data["access-token"]) {
        this.appStore.setToken(res.data["access-token"])

        // 获取当前用户的权限
        this.appStore.getRouter()
      }
    } catch (error) {}
  })

  logout = flow(function*(data) {
    try {
      const res = yield this.api.logout()
      if (res.status === 200) {
        this.appStore.removeToken()
      }
    } catch (error) {}
  })
}
