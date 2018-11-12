import React from "react"
import PropTypes from "prop-types"
import { Table } from "antd"
import { observer, inject } from "mobx-react"
import "./index.less"
import { canShow } from "../../../utils/helper"

@inject("filmsStore")
@observer
class List extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    total: PropTypes.number
  }

  handleEdit = row => {
    const store = this.props.filmsStore
    store.setIsEdit(true)
    store.setEditData(row)
    store.showDrawer(true)
  }

  getData = (page, size) => {
    const store = this.props.filmsStore
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
      title: "电影名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "电影时长",
      dataIndex: "length",
      key: "length"
    },
    {
      title: "电影推荐",
      dataIndex: "recommend",
      key: "recommend"
    },
    {
      title: "电影类型",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "导演",
      dataIndex: "director",
      key: "director"
    },
    {
      title: "发行商",
      dataIndex: "publisher",
      key: "publisher"
    },
    {
      title: "制片人",
      dataIndex: "movie_maker",
      key: "movie_maker",
      render: type => (type === 1 ? "独立" : "连锁")
    },
    {
      title: "演员",
      dataIndex: "actor",
      key: "actor"
    },
    {
      title: "评分",
      dataIndex: "score",
      key: "score"
    },
    {
      title: "评价数量",
      dataIndex: "want_see_count",
      key: "want_see_count"
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <a
            href="javascript:;"
            onClick={this.handleEdit.bind(this, record)}
            disabled={!canShow(this.props.route.child_functions)}
          >
            查看详情
          </a>
        </span>
      )
    }
  ]

  render() {
    const store = this.props.filmsStore
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
