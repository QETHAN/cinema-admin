import React from "react"
import { withRouter } from "react-router-dom"
import { Table, Divider } from "antd"
import { observer, inject } from "mobx-react"
import SearchForm from "./search"
import { pageScrollToTop } from "../../../../utils"

@inject("userStore")
@observer
class UserOrder extends React.Component {
  handleDelete = e => {}

  handlePageChange = (page, size) => {
    this.props.history.push(
      `${this.props.match.url}?page=${page}&per-page=${size}&key=orders`
    )
    pageScrollToTop()
  }

  handleSizeChange = (current, size) => {
    this.props.history.push(
      `${this.props.match.url}?page=${current}&per-page=${size}&key=orders`
    )
  }

  columns = [
    {
      title: "下单时间",
      dataIndex: "created",
      key: "created"
    },
    {
      title: "影城",
      dataIndex: "cinema_name",
      key: "cinema_name"
    },
    {
      title: "订单号",
      dataIndex: "trade_no",
      key: "trade_no"
    },
    {
      title: "支付金额",
      dataIndex: "total_fee",
      key: "total_fee"
    },
    {
      title: "支付方式",
      dataIndex: "pay_type",
      key: "pay_type",
      render: pay_type => {
        return pay_type === 1 ? "微信支付" : "余额支付"
      }
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: status => {
        return status === 1 ? "未支付" : status === 2 ? "已支付" : "退款"
      }
    },
    {
      title: "商品",
      dataIndex: "film_name",
      key: "film_name"
    }
  ]

  componentWillReceiveProps(props) {
    console.log("order------------------>")
    console.log(props)
  }

  componentDidMount() {
    console.log("list------>", this.props)
  }

  render() {
    const { ordersLoading, orders } = this.props.userStore
    return (
      <>
        <SearchForm />
        <Divider style={{ marginTop: 5 }} />
        <Table
          loading={ordersLoading}
          columns={this.columns}
          rowKey={record => record.uid}
          dataSource={orders}
          expandedRowRender={record => (
            <p style={{ margin: 0 }}>{record.trade_no}</p>
          )}
          pagination={{
            showSizeChanger: true,
            current: this.props.pagination.page,
            pageSize: this.props.pagination.size,
            total: this.props.pagination.total,
            onChange: this.handlePageChange,
            onShowSizeChange: this.handleSizeChange
          }}
        />
      </>
    )
  }
}

export default withRouter(UserOrder)
