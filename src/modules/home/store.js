export default class Store {
  api
  appStore

  constructor(api, appStore) {
    this.api = api
    this.appStore = appStore
  }
}
