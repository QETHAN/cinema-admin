import request from "../request"
import { appStore } from "stores"

export default class BaseApi {
  base(url, method, data, headers = {}) {
    return request[method](url, data, {
      "X-Api-Key": appStore.token,
      ...headers
    })
  }

  getArea(areaId = 0) {
    return this.base(`/cities?parent_id=${areaId}`, "get")
  }

  getPrivilege() {
    return this.base("/merchant-admin-resources", "get")
  }

  getRouter(params) {
    return this.base("/routers", "get", params)
  }
}
