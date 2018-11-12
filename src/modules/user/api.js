import BaseApi from "api/base"

export default class Api extends BaseApi {
  getData(params) {
    return this.base("/users", "get", params)
  }

  getInfo(uid) {
    return this.base("/users", "get", { "filter[uid]": uid })
  }

  save(data) {
    const url = data.id ? `/users/${data.id}` : "/users"
    const method = data.id ? "put" : "post"
    delete data.id
    return this.base(url, method, data)
  }

  getOrders(params) {
    return this.base("/orders", "get", params)
  }

  getPoints(params) {
    return this.base("/point-logs", "get", params)
  }

  getBalance(params) {
    return this.base("/balance-logs", "get", params)
  }
}
