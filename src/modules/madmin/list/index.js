import React from "react"
import PropTypes from "prop-types"
import { Table, Divider, Popconfirm } from "antd"
import { observer, inject } from "mobx-react"
import "./index.less"
import { pageScrollToTop } from "../../../utils"

@inject("madminStore")
@observer
class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    total: PropTypes.number
  }

  handleEdit = row => {
    const store = this.props.madminStore
    store.setIsEdit(true)
    store.setEditData(row)
    store.showDrawer(true)
  }

  getData = (page, size) => {
    const store = this.props.madminStore
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
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "管理员角色",
      dataIndex: "role_name",
      key: "role_name"
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.handleEdit.bind(this, record)}>
            修改密码
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确定要删除?"
            onConfirm={() => this.handleDelete(record)}
          >
            <a href="javascript:;">删除账户</a>
          </Popconfirm>
        </span>
      )
    }
  ]

  render() {
    const store = this.props.madminStore
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
