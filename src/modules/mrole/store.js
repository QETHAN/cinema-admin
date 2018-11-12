import { observable, action, flow } from "mobx"
import { showSuccess } from "utils"

export default class Store {
  api
  appStore

  @observable
  visible = false
  @observable
  isEdit = false
  @observable
  editData = {}

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
  saveLoading = false

  constructor(api, appStore) {
    this.api = api
    this.appStore = appStore
  }

  @action.bound
  showDrawer(visible) {
    this.visible = visible
  }

  @action.bound
  setIsEdit(isEdit) {
    this.isEdit = isEdit
  }

  @action.bound
  setEditData(data) {
    this.editData = { ...data }
  }

  @action.bound
  resetEditData() {
    this.editData = {}
    this.saveLoading = false
  }

  getPage() {
    const page = sessionStorage.getItem("page")
    if (page) this.page = Number(page)
    return this.page
  }

  getSize() {
    const size = sessionStorage.getItem("size")
    if (size) this.size = Number(size)
    return this.size
  }

  @action
  setPagination(page = 1, size = 20) {
    this.page = page
    this.size = size
    sessionStorage.setItem("page", this.page)
    sessionStorage.setItem("size", this.size)
  }

  getData = flow(function*() {
    try {
      this.listLoading = true

      let params = {}

      params = {
        ...this.searchParams,
        page: this.getPage(),
        "per-page": this.getSize()
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
      this.visible = false
      showSuccess(data)

      this.resetEditData()
      this.getData()
    } catch (err) {
      this.saveLoading = false
    }
  })

  del = flow(function*(data) {
    try {
      yield this.api.del(data)

      showSuccess(data, "del")

      if (this.listData.length === 1) {
        this.page > 1 ? this.page-- : (this.page = 1)
      }

      this.getData()
    } catch (err) {
      this.saveLoading = false
    }
  })
}
