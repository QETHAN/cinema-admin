import BaseApi from "api/base"

const API = "/plan-infos"

export default class Api extends BaseApi {
  getData(params) {
    return this.base(API, "get", params)
  }

  save(data) {
    const url = data.id ? `${API}/${data.id}` : API
    const method = data.id ? "put" : "post"
    return this.base(url, method, data)
  }

  delPlanDatePrice(id) {
    return this.base(`plan-info-date-price/${id}`, "del")
  }

  del(data) {}
}
