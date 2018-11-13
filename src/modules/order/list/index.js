import React from "react"
import PropTypes from "prop-types"
import { Table } from "antd"
import { observer, inject } from "mobx-react"
import "./index.less"
import { pageScrollToTop } from "../../../utils"

@inject("orderStore")
@observer
class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    total: PropTypes.number
  }

  handleEdit = row => {
    const store = this.props.orderStore
    store.setIsEdit(true)
    store.setEditData(row)
    store.showDrawer(true)
  }

  getData = (page, size) => {
    const store = this.props.orderStore
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
      title: "下单时间",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "用户",
      dataIndex: "length",
      key: "length"
    },
    {
      title: "影城",
      dataIndex: "recommend",
      key: "recommend"
    },
    {
      title: "订单号",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "支付金额",
      dataIndex: "director",
      key: "director"
    },
    {
      title: "支付方式",
      dataIndex: "publisher",
      key: "publisher"
    },
    {
      title: "状态",
      dataIndex: "movie_maker",
      key: "movie_maker",
      render: type => (type === 1 ? "独立" : "连锁")
    },
    {
      title: "商品",
      dataIndex: "actor",
      key: "actor"
    }
  ]

  render() {
    const store = this.props.orderStore
    return (
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
    )
  }
}

export default List
