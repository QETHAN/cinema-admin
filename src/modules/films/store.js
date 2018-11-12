import { observable, action, flow } from "mobx"
import { showSuccess, isDev } from "utils"

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
  posterIds = []
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
  searchParams = {}

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
    this.imageIds = data.image_urls.map(item => item.uid)
    this.posterIds = data.poster_urls.map(item => item.uid)
  }

  @action
  resetEditData() {
    this.editData = {}
    this.imageIds = []
    this.posterIds = []
  }

  @action
  getImageIds() {
    return this.imageIds.join(",")
  }

  @action
  setImageIds(ids) {
    this.imageIds = [...this.imageIds, ...ids]
  }

  @action
  removeImageIds(ids) {
    this.imageIds = this.imageIds.filter(item => !ids.includes(item))
  }

  @action
  getPosterIds() {
    return this.posterIds.join(",")
  }

  @action
  setPosterIds(ids) {
    this.posterIds = [...this.posterIds, ...ids]
  }

  @action
  removePosterIds(ids) {
    this.posterIds = this.posterIds.filter(item => !ids.includes(item))
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
  setSearchParams(params) {
    this.searchParams = params
  }

  getData = flow(function*() {
    try {
      this.listLoading = true

      const params = {
        ...this.searchParams,
        page: this.getPage(),
        "per-page": this.getSize()
      }

      const res = yield this.api.getData(params)

      this.listLoading = false

      this.listData =
        res.data &&
        res.data.map(item => {
          return {
            ...item,
            poster_urls: item.poster_urls.map(item => ({
              uid: item.id,
              status: "done",
              url: isDev()
                ? process.env.REACT_APP_UPLOAD_URL + item.url
                : item.url
            })),
            image_urls: item.image_urls.map(item => ({
              uid: item.id,
              status: "done",
              url: isDev()
                ? process.env.REACT_APP_UPLOAD_URL + item.url
                : item.url
            }))
          }
        })

      this.total = res.total
      this.size = res.size
    } catch (err) {
      this.listLoading = false
    }
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
