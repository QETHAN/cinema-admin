import BaseApi from "api/base"

export default class Api extends BaseApi {
  getData(params) {
    return this.base("/admin-users", "get", params)
  }

  save(data) {
    const url = data.id ? `/admin-users/${data.id}` : "/admin-users"
    const method = data.id ? "put" : "post"
    return this.base(url, method, data)
  }

  del(data) {
    return this.base(`/admin-users/${data.id}`, "del")
  }
}
