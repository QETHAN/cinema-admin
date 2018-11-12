import BaseApi from "api/base"

const API = "/merchant-admin-roles"

export default class Api extends BaseApi {
  getData(params) {
    return this.base(API, "get", params)
  }

  save(data) {
    const url = data.id ? `${API}/${data.id}` : API
    const method = data.id ? "put" : "post"
    return this.base(url, method, data)
  }

  del(data) {
    return this.base(`${API}/${data.id}`, "del")
  }
}
