import React from "react"
import PropTypes from "prop-types"
import { Table, Divider, Popconfirm } from "antd"
import { observer, inject } from "mobx-react"
import "./index.less"
import SearchForm from "./search"

@inject("packageStore", "cinemaStore")
@observer
class List extends React.Component {
  constructor(props) {
    super(props)
    this.props.packageStore.getAllData()
  }

  static propTypes = {
    data: PropTypes.array,
    total: PropTypes.number
  }

  handleEditOnSale = row => {
    const store = this.props.packageStore
    store.save({ ...row, onsale: row.onsale === 1 ? 0 : 1 })
  }

  handleDelete = row => {
    this.props.packageStore.del(row)
  }

  getData = (page, size) => {
    const store = this.props.packageStore
    store.setPagination(page, size)
    store.getData()
  }

  handlePageChange = (page, size) => {
    this.getData(page, size)
  }

  handleSizeChange = (current, size) => {
    this.getData(current, size)
  }

  columns = [
    {
      title: "所属影院",
      dataIndex: "cinema",
      key: "cinema"
    },
    {
      title: "套餐名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "所属分类",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "套餐内容",
      dataIndex: "products",
      key: "products",
      render: products => {
        return products.map(item => item.name).join("，")
      }
    },
    {
      title: "套餐原价",
      dataIndex: "origin_price",
      key: "origin_price"
    },
    {
      title: "套餐售价",
      dataIndex: "present_price",
      key: "present_price"
    },
    {
      title: "可获积分",
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
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <a
            href="javascript:;"
            onClick={this.handleEditOnSale.bind(this, record)}
          >
            {record.onsale === 1 ? "下架" : "上架"}
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要删除?"
            onConfirm={() => this.handleDelete(record)}
          >
            <a href="javascript:;">删除</a>
          </Popconfirm>
        </span>
      )
    }
  ]

  render() {
    const store = this.props.packageStore
    return (
      <>
        <SearchForm cinemaList={this.props.cinemaStore.allData} />
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
