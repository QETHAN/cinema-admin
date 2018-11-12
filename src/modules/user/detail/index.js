import React from "react"
import { withRouter, Link } from "react-router-dom"
import { inject, observer } from "mobx-react"
import { Divider, Breadcrumb, Tabs } from "antd"
import queryString from "query-string"
import UserInfo from "./info"
import UserOrder from "./order"
import UserPoints from "./points"
import UserBalance from "./balance"

const TabPane = Tabs.TabPane

@inject("userStore")
@observer
class Detail extends React.Component {
  state = {
    activeKey: "info"
  }

  handleTabChange = key => {
    this.props.history.push(`${this.props.match.url}?key=${key}`)
  }

  getPageParams(props) {
    const query = queryString.parse(props.location.search)
    const activeKey = query.key || "info"
    const store = props.userStore

    if (activeKey !== "info") {
      const pagination = {
        page: query.page ? parseInt(query.page) : store.getPage(activeKey),
        size: query["per-page"]
          ? parseInt(query["per-page"])
          : store.getSize(activeKey)
      }

      store.setPagination(pagination.page, pagination.size, activeKey)

      return {
        pagination,
        activeKey
      }
    } else {
      return { activeKey }
    }
  }

  fetchDataByType(type) {
    const name =
      "get" + [type[0].toUpperCase(), ...type.slice(1, type.length)].join("")

    this.props.userStore[name](this.props.match.params.id)
  }

  getData = props => {
    const { activeKey } = this.getPageParams(props)

    this.fetchDataByType(activeKey)
  }

  setActiveKeyFromQuery(props) {
    const query = queryString.parse(props.location.search)
    const activeKey = query.key || "info"

    this.setState({
      activeKey
    })

    this.props.userStore.setType(activeKey)
  }

  componentWillReceiveProps(nextProps) {
    console.log("props------>", nextProps)
    this.setActiveKeyFromQuery(nextProps)
    this.getData(nextProps)
  }

  componentDidMount() {
    this.setActiveKeyFromQuery(this.props)
    this.getData(this.props)
  }

  componentWillUnmount() {
    const { type } = this.props.userStore
    sessionStorage.removeItem(`${type}page`)
    sessionStorage.removeItem(`${type}size`)
  }

  render() {
    const store = this.props.userStore

    return (
      <div>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/user">用户列表</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>用户详情</Breadcrumb.Item>
        </Breadcrumb>
        <Divider />
        <Tabs
          onChange={this.handleTabChange}
          type="card"
          activeKey={this.state.activeKey}
        >
          <TabPane tab="会员信息" key="info">
            <UserInfo />
          </TabPane>
          <TabPane tab="消费记录" key="orders">
            <UserOrder
              pagination={{
                page: store.ordersPage,
                size: store.ordersSize,
                total: store.ordersTotal
              }}
            />
          </TabPane>
          <TabPane tab="积分记录" key="points">
            <UserPoints
              pagination={{
                page: store.pointsPage,
                size: store.pointsSize,
                total: store.pointsTotal
              }}
            />
          </TabPane>
          <TabPane tab="余额记录" key="balance">
            <UserBalance />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default withRouter(Detail)
