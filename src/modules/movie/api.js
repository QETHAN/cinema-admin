import BaseApi from "api/base"

export default class Api extends BaseApi {
  getData(params) {
    return this.base("/merchant-films", "get", params)
  }

  save(data) {
    const url = data.id ? `/merchant-films/${data.id}` : "/merchant-films"
    const method = data.id ? "put" : "post"
    return this.base(url, method, data)
  }

  upload(data) {
    return this.base("/image/upload", "post", data, {
      "Content-Type": "multipart/form-data"
    })
  }
}
