import BaseApi from "api/base"

export default class Api extends BaseApi {
  getData(params) {
    return this.base("/merchants", "get", params)
  }

  save(data) {
    const url = data.id ? `/merchants/${data.id}` : "/merchants"
    const method = data.id ? "put" : "post"
    return this.base(url, method, data)
  }

  del(data) {}
}
