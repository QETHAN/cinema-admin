import BaseApi from "api/base"

export default class Api extends BaseApi {
  login(data) {
    return this.base("/auths", "post", data)
  }

  logout() {
    return this.base("/auths/1", "del")
  }
}
