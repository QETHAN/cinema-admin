import React from "react"
import { NavLink, withRouter } from "react-router-dom"
import { Layout, Menu, Icon } from "antd"
import { inject, observer } from "mobx-react"
import { routesByName } from "routes/router"

import styles from "./index.module.less"

const { Sider } = Layout

@inject("appStore", "authStore")
@observer
class MySider extends React.Component {
  render() {
    const { location, routers } = this.props

    const routersConfig = routers.map(route => routesByName[route.name])

    console.log("sider-------------->", routersConfig)
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <h1 className={styles.sider__h1}>玲珑订票</h1>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={[
            location.pathname
              .split("/")
              .slice(0, 2)
              .join("/")
          ]}
        >
          {routersConfig.filter(route => route.menu).map(route => {
            return (
              <Menu.Item key={route.aliasPath || route.path}>
                <NavLink to={route.aliasPath || route.path}>
                  <Icon type={route.icon} />
                  <span>{route.name}</span>
                </NavLink>
              </Menu.Item>
            )
          })}
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(MySider)
