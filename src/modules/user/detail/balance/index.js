import React from "react"
import { withRouter } from "react-router-dom"
import { Table, Divider } from "antd"
import { observer, inject } from "mobx-react"
import SearchForm from "./search"
import { pageScrollToTop } from "../../../../utils"

@inject("userStore")
@observer
class UserBalance extends React.Component {
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
      title: "类型",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "途径",
      dataIndex: "channel",
      key: "channel"
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
      title: "余额",
      dataIndex: "balance",
      key: "balance"
    },
    {
      title: "余额总数",
      dataIndex: "balance_total",
      key: "balance_total"
    }
  ]

  componentWillReceiveProps(props) {
    console.log("order------------------>")
    console.log(props)
  }

  componentDidMount() {
    console.log("Balance------>", this.props)
  }

  render() {
    const { balanceLoading } = this.props.userStore
    return (
      <>
        <SearchForm />
        <Divider style={{ marginTop: 5 }} />
        <Table
          loading={balanceLoading}
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

export default withRouter(UserBalance)
