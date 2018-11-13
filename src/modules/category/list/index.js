import React from "react"
import PropTypes from "prop-types"
import { Table, Divider, Popconfirm } from "antd"
import { observer, inject } from "mobx-react"
import "./index.less"
import { pageScrollToTop } from "../../../utils"

@inject("categoryStore")
@observer
class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    total: PropTypes.number
  }

  handleEdit = row => {
    const store = this.props.categoryStore
    store.setIsEdit(true)
    store.setEditData(row)
    store.showDrawer(true)
  }

  handleDelete = row => {
    this.props.categoryStore.del(row)
  }

  getData = (page, size) => {
    const store = this.props.categoryStore
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
      title: "所属影院",
      dataIndex: "cinema",
      key: "cinema"
    },
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "分类排序",
      dataIndex: "sort",
      key: "sort"
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.handleEdit.bind(this, record)}>
            编辑
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
    const store = this.props.categoryStore

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
