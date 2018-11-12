import { observable, action, flow } from "mobx"
import { showSuccess, isDev } from "../../utils"

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
  imageIds = []

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

  @observable
  allData = []

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
    this.imageIds = []
  }

  @action
  setImageIds(ids) {
    this.imageIds = [...this.imageIds, ...ids]
  }

  @action
  removeImageIds(ids) {
    this.imageIds = this.imageIds.filter(item => !ids.includes(item))
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

  @action
  getListData() {
    if (this.listData.length) return this.listData
    this.getData()
  }

  @action
  getAllData() {
    if (this.allData.length) return this.allData
    this.getData(true)
  }

  getData = flow(function*(isAll) {
    try {
      this.listLoading = true

      let params = {}

      if (!isAll) {
        params = { page: this.getPage(), "per-page": this.getSize() }
      }

      const res = yield this.api.getData(params)

      this.listLoading = false

      const data =
        res.data &&
        res.data.map(item => {
          return {
            ...item,
            image_urls: [
              {
                uid: item.image_id,
                status: "done",
                url: isDev()
                  ? process.env.REACT_APP_UPLOAD_URL + item.preview
                  : item.preview
              }
            ]
          }
        })

      if (isAll) {
        this.allData = data
      } else {
        this.listData = data
      }

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
