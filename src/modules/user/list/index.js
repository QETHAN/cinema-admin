import React, { lazy } from "react"
import { Link, withRouter, Route } from "react-router-dom"
import PropTypes from "prop-types"
import { Table } from "antd"
import { observer, inject } from "mobx-react"
import "./index.less"

const Detail = lazy(() => import("../detail"))

@inject("userStore")
@observer
class List extends React.Component {
  static propTypes = {
    data: PropTypes.array
  }

  handleEdit = row => {
    const store = this.props.userStore
    store.setIsEdit(true)
    store.setEditData(row)
    store.showDrawer(true)
  }

  handlePageChange = (page, size) => {
    this.props.history.push(
      `${this.props.match.url}?page=${page}&per-page=${size}`
    )
  }

  handleSizeChange = (current, size) => {
    this.props.history.push(
      `${this.props.match.url}?page=${current}&per-page=${size}`
    )
  }

  columns = [
    {
      title: "UID",
      dataIndex: "uid",
      key: "uid"
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "手机",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "IC卡号",
      dataIndex: "ic_id",
      key: "ic_id"
    },
    {
      title: "会员类型",
      dataIndex: "type",
      key: "type",
      render: type => {
        return type === 1 ? "普通会员" : "高级会员"
      }
    },
    {
      title: "余额（分）",
      dataIndex: "balance",
      key: "balance"
    },
    {
      title: "积分",
      dataIndex: "points",
      key: "points"
    },
    {
      title: "注册时间",
      dataIndex: "created",
      key: "created"
    },

    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <span>
          <Link to={`${this.props.match.url}/${record.uid}`}>查看详情</Link>
        </span>
      )
    }
  ]

  componentDidMount() {
    console.log("list------>", this.props)
  }

  render() {
    const { listLoading, page, size, total } = this.props.userStore
    return (
      <>
        <Table
          loading={listLoading}
          columns={this.columns}
          rowKey={record => record.uid}
          dataSource={this.props.data}
          pagination={{
            showSizeChanger: true,
            current: page,
            pageSize: size,
            total: total,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handleSizeChange
          }}
        />

        <Route
          exact
          path={`${this.props.match.url}/:id`}
          render={props => <Detail {...props} />}
        />
      </>
    )
  }
}

export default withRouter(List)
