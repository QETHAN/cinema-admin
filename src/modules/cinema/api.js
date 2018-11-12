import BaseApi from "api/base"

export default class Api extends BaseApi {
  getData(params) {
    return this.base("/cinemas", "get", params)
  }

  save(data) {
    const url = data.id ? `/cinemas/${data.id}` : "/cinemas"
    const method = data.id ? "put" : "post"
    return this.base(url, method, data)
  }
}
