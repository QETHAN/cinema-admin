import { observable, action, flow } from "mobx"
import { showResetSucces, showSuccess } from "utils"

export default class Store {
  api
  appStore

  @observable
  editData = {} // info data

  @observable
  listLoading = false
  @observable
  listData = []
  @observable
  total = 0
  @observable
  size = 20
  @observable
  page = 1
  @observable
  type = ""

  @observable
  searchParams = {}

  @observable
  saveLoading = false
  @observable
  resetLoading = false

  @observable
  orders = []
  @observable
  ordersLoading = false
  @observable
  ordersTotal = 0
  @observable
  ordersPage = 1
  @observable
  ordersSize = 20
  @observable
  ordersSearchParams = {}

  @observable
  points = []
  @observable
  pointsLoading = false
  @observable
  pointsTotal = 0
  @observable
  pointsPage = 1
  @observable
  pointsSize = 20
  @observable
  pointsSearchParams = {}

  @observable
  balance = []
  @observable
  balanceLoading = false
  @observable
  balanceTotal = 0
  @observable
  balancePage = 1
  @observable
  balanceSize = 20
  @observable
  balanceSearchParams = {}

  constructor(api, appStore) {
    this.api = api
    this.appStore = appStore
  }

  @action
  showDrawer(visible) {
    this.visible = visible
  }

  @action
  resetEditData() {
    this.editData = {}
    this.saveLoading = false
  }

  @action
  setType(type) {
    this.type = type
  }

  @action
  getPage(type = "") {
    const page = sessionStorage.getItem(`${type}page`)
    if (page) this.page = Number(page)
    return this.page
  }

  @action
  getSize(type = "") {
    const size = sessionStorage.getItem(`${type}size`)
    if (size) this.size = Number(size)
    return this.size
  }

  @action
  setPagination(page = 1, size = 20, type = "") {
    this.page = page
    this.size = size

    sessionStorage.setItem(`${type}page`, page)
    sessionStorage.setItem(`${type}size`, size)
  }

  @action
  setSearchParams(params) {
    this.searchParams = params
  }

  getInfo = flow(function*(uid) {
    try {
      this.listLoading = true

      const res = yield this.api.getInfo(uid)

      this.listLoading = false

      this.editData = res.data[0] || {}
      this.total = res.total
      this.size = res.size
    } catch (err) {}
  })

  getOrders() {
    this.getData()
  }

  getPoints() {
    this.getData()
  }

  getBalance() {
    this.getData()
  }

  getData = flow(function*() {
    try {
      this.listLoading = true

      const params = {
        ...this.searchParams,
        page: this.getPage(this.type),
        "per-page": this.getSize(this.type)
      }
      const res = yield this.api.getData(params)

      this.listLoading = false

      this.listData = res.data
      this.total = res.total
      this.size = res.size
    } catch (err) {}
  })

  save = flow(function*(data) {
    try {
      this.saveLoading = true

      yield this.api.save(data)

      this.saveLoading = false

      showSuccess(data)

      this.getData()
    } catch (err) {
      this.saveLoading = false
    }
  })

  resetPwd = flow(function*(data) {
    try {
      this.resetLoading = true

      yield this.api.save(data)

      this.resetLoading = false

      showResetSucces()
    } catch (err) {
      this.resetLoading = false
    }
  })

  getOrders = flow(function*(uid) {
    try {
      this.ordersLoading = true

      const params = {
        ...this.ordersSearchParams,
        page: this.ordersPage,
        "per-page": this.ordersSize,
        "filter[uid]": uid
      }
      const res = yield this.api.getOrders(params)

      this.ordersLoading = false

      this.orders = res.data
      this.ordersTotal = res.total
      this.ordersSize = res.size
    } catch (err) {}
  })

  getPoints = flow(function*(uid) {
    try {
      this.pointsLoading = true

      const params = {
        ...this.searchParams,
        page: this.page,
        "per-page": this.size,
        "filter[user_id]": uid
      }
      const res = yield this.api.getPoints(params)

      this.pointsLoading = false

      this.points = res.data
      this.pointsTotal = res.total
      this.pointsSize = res.size
    } catch (err) {}
  })

  getBalance = flow(function*(uid) {
    try {
      this.balanceLoading = true

      const params = {
        ...this.balanceSearchParams,
        page: this.page,
        "per-page": this.size,
        "filter[user_id]": uid
      }
      const res = yield this.api.getBalance(params)

      this.balanceLoading = false

      this.balance = res.data
      this.balanceTotal = res.total
      this.balanceSize = res.size
    } catch (err) {}
  })
}
