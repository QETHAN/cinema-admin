import React from "react"
import PropTypes from "prop-types"
import { Table } from "antd"
import { observer, inject } from "mobx-react"
import "./index.less"
import { pageScrollToTop } from "../../../utils"

@inject("logStore")
@observer
class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    total: PropTypes.number
  }

  handleEdit = row => {
    const store = this.props.logStore
    store.setIsEdit(true)
    store.setEditData(row)
    store.showDrawer(true)
  }

  getData = (page, size) => {
    const store = this.props.logStore
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
      title: "管理员",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "操作模块",
      dataIndex: "length",
      key: "length"
    },
    {
      title: "操作事项",
      dataIndex: "recommend",
      key: "recommend"
    }
  ]

  render() {
    const store = this.props.logStore
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
