import React from "react"
import { withRouter } from "react-router-dom"
import { Table, Divider } from "antd"
import { observer, inject } from "mobx-react"
import SearchForm from "./search"
import { pageScrollToTop } from "../../../../utils"

@inject("userStore")
@observer
class UserPoints extends React.Component {
  handleDelete = e => {}

  handlePageChange = (page, size) => {
    this.props.history.push(
      `${this.props.match.url}?page=${page}&per-page=${size}`
    )
    pageScrollToTop()
  }

  handleSizeChange = (current, size) => {
    this.props.history.push(
      `${this.props.match.url}?page=${current}&per-page=${size}`
    )
  }

  columns = [
    {
      title: "时间",
      dataIndex: "created",
      key: "created"
    },
    {
      title: "影城",
      dataIndex: "cinema",
      key: "cinema"
    },
    {
      title: "订单号",
      dataIndex: "trade_no",
      key: "trade_no"
    },
    {
      title: "金额",
      dataIndex: "total_fee",
      key: "total_fee"
    },
    {
      title: "商品",
      dataIndex: "product",
      key: "product"
    },
    {
      title: "积分",
      dataIndex: "points",
      key: "points"
    },
    {
      title: "抵扣金额",
      dataIndex: "deduction",
      key: "deduction"
    },
    {
      title: "积分总数",
      dataIndex: "points_total",
      key: "points_total"
    }
  ]

  componentWillReceiveProps(props) {
    console.log("order------------------>")
    console.log(props)
  }

  componentDidMount() {
    console.log("Points------>", this.props)
  }

  render() {
    const { pointsLoading } = this.props.userStore
    return (
      <>
        <SearchForm />
        <Divider style={{ marginTop: 5 }} />
        <Table
          loading={pointsLoading}
          columns={this.columns}
          rowKey={record => record.uid}
          dataSource={this.props.data}
          expandedRowRender={record => (
            <p style={{ margin: 0 }}>{record.trade_no}</p>
          )}
          pagination={{
            showSizeChanger: true,
            current: this.props.page,
            pageSize: this.props.size,
            total: this.props.total,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handleSizeChange
          }}
        />
      </>
    )
  }
}

export default withRouter(UserPoints)
