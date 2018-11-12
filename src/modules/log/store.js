import { observable, action, flow } from "mobx"
import { showSuccess } from "../../utils"

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
  saveLoading = false

  constructor(api, appStore) {
    this.api = api
    this.appStore = appStore
  }

  @action
  showDrawer(visible) {
    this.visible = visible
  }

  @action
  setIsEdit(isEdit) {
    this.isEdit = isEdit
  }

  @action
  setEditData(data) {
    this.editData = { ...data }
  }

  @action
  resetEditData() {
    this.editData = {}
    this.saveLoading = false
  }

  getData = flow(function*(params) {
    try {
      this.listLoading = true
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
}
