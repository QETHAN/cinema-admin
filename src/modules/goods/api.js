import BaseApi from "api/base"

const API = "/sale-products"

export default class Api extends BaseApi {
  getData(params) {
    return this.base(API, "get", params)
  }

  save(data) {
    const url = data.id ? `${API}/${data.id}` : API
    const method = data.id ? "put" : "post"
    return this.base(url, method, data)
  }
}
