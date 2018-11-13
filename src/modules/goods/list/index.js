import React from "react"
import PropTypes from "prop-types"
import { Table, Divider } from "antd"
import { observer, inject } from "mobx-react"
import "./index.less"
import SearchForm from "./search"
import { pageScrollToTop } from "../../../utils"

@inject("goodsStore", "cinemaStore")
@observer
class List extends React.Component {
  constructor(props) {
    super(props)
    this.props.cinemaStore.getAllData()
  }

  static propTypes = {
    data: PropTypes.array,
    total: PropTypes.number
  }

  handleEdit = row => {
    const store = this.props.goodsStore
    store.setIsEdit(true)
    store.setEditData(row)
    store.showDrawer(true)
  }

  handleEditOnSale = row => {
    const store = this.props.goodsStore
    const data = { ...row, onsale: row.onsale ? 0 : 1 }
    delete data.image_urls
    store.save(data)
  }

  getData = (page, size) => {
    const store = this.props.goodsStore
    store.setPagination(page, size)
    store.getData()
  }

  handlePageChange = (page, size) => {
    this.getData(page, size)
    pageScrollToTop()
  }

  handleSizeChange = (current, size) => {
    this.getData(current, size)
  }

  columns = [
    {
      title: "项目编码",
      key: "index",
      render: (text, record, index) => {
        return index + 1
      }
    },
    {
      title: "项目名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "所属店面",
      dataIndex: "cinema",
      key: "cinema"
    },
    {
      title: "规格",
      dataIndex: "unit",
      key: "unit"
    },
    {
      title: "库存",
      dataIndex: "stock",
      key: "stock"
    },
    {
      title: "已售数量",
      dataIndex: "sellout",
      key: "sellout"
    },
    {
      title: "销售单价（分）",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "积分",
      dataIndex: "score",
      key: "score"
    },
    {
      title: "状态",
      dataIndex: "onsale",
      key: "onsale",
      render: onsale => {
        return onsale === 1 ? "上架" : "下架"
      }
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <a
            href="javascript:;"
            onClick={this.handleEditOnSale.bind(this, record)}
          >
            {record.onsale ? "下架" : "上架"}
          </a>
          <Divider type="vertical" />
          <a href="javascript:;" onClick={this.handleEdit.bind(this, record)}>
            修改
          </a>
        </span>
      )
    }
  ]

  render() {
    const store = this.props.goodsStore
    return (
      <>
        <SearchForm cinemaList={this.props.cinemaStore.allData} />
        <Divider style={{ marginTop: 5 }} />
        <Table
          loading={store.listLoading}
          columns={this.columns}
          rowKey={record => record.id}
          dataSource={this.props.data}
          pagination={{
            showSizeChanger: true,
            current: store.page,
            pageSize: store.size,
            total: store.total,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handleSizeChange
          }}
        />
      </>
    )
  }
}

export default List
