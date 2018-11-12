import { observable, action, flow } from "mobx"
import { showSuccess } from "../../utils"
import React from "react"

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
  searchParams = {}

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
  timeSpans = [] // 电影排片时段

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
  addTimeSpan(timeSpan) {
    this.editData.date_price_arr.unshift(timeSpan)
  }

  @action
  deleteDatePriceArr(index) {
    this.editData.date_price_arr.splice(index, 1)
  }

  @action
  resetEditData() {
    this.editData = {}
    this.timeSpans = []
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

      const data = res.data
      data.map(item => {
        const datePriceArr = item.date_price_arr.map(
          (datePriceItem, index) => ({
            ...datePriceItem,
            timeSpan: (
              <li key={`${datePriceItem.start_time}-li`}>
                <p key={`${datePriceItem.start_time}-p-1`}>
                  {datePriceItem.start_time}
                </p>
                至
                <p key={`${datePriceItem.start_time}-p-2`}>
                  {datePriceItem.end_time}
                </p>
              </li>
            )
          })
        )

        datePriceArr.push({
          start_time: item.start_time,
          end_time: item.end_time,
          price: item.price,
          vip_price: item.vip_price,
          sale_price: item.sale_price,
          is_default: true,
          timeSpan: (
            <li key="default-li">
              <p key="default-li-p">默认</p>
            </li>
          )
        })

        item.date_price_arr = datePriceArr

        for (let i = 0; i < 4; i++) {
          item[`date_price_arr${i + 1}`] = datePriceArr
        }

        return item
      })

      console.log("date-arr-------------->", data)

      this.listData = data
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

  delPlanDatePrice = flow(function*({ id, index }) {
    try {
      yield this.api.delPlanDatePrice(id)

      showSuccess({ id }, "del")

      if (this.listData.length === 1) {
        this.page > 1 ? this.page-- : (this.page = 1)
      }

      this.timeSpans.splice(index, 1)
      this.deleteDatePriceArr(index)
    } catch (err) {
      this.saveLoading = false
    }
  })
}
