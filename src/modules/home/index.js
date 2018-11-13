import React from "react"
import { observer, inject } from "mobx-react"
import { Layout } from "antd"
import MySider from "components/sider"
import MyHeader from "components/header"
import AuthWrapper from "components/authWrapper"
import styles from "./index.module.less"

import renderRoutes from "routes/renderRoutes"
import { routesByName } from "routes/router"
import { getAuthRoutes } from "utils"

const { Content } = Layout

@inject("appStore", "homeStore")
@observer
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ("routers" in nextProps) {
      return { routers: nextProps.routers }
    }

    return null
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    const { routers } = this.props.appStore

    if (!routers.length) {
      // 获取当前用户的权限
      this.props.appStore.getRouter()
      return "loading..."
    }

    const authRoutes = getAuthRoutes(routesByName, routers)
    const routes = renderRoutes(authRoutes)

    return (
      <Layout className={styles.home}>
        <Layout style={{ height: "100%" }}>
          <MySider
            className={styles.sider}
            collapsed={this.state.collapsed}
            routers={routers}
          />
          <Layout>
            <MyHeader onToggle={this.toggle} />
            <Content style={{ height: "100%", overflow: "auto" }}>
              <div
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  background: "#fff",
                  minHeight: 280
                }}
              >
                {routes}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default AuthWrapper(Home)
