import React from "react"
import { Layout, Icon } from "antd"
import styles from "./index.module.less"
import { inject, observer } from "mobx-react"

const { Header } = Layout

@inject("authStore", "appStore")
@observer
class MyHeader extends React.Component {
  handleLogout = async () => {
    this.props.authStore.logout()
  }

  handleTriggerClick = () => {
    this.props.onToggle()
  }

  render() {
    return (
      <Header className={styles.header}>
        <Icon
          className={styles.trigger}
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.handleTriggerClick}
        />
        <span className={styles.logout} onClick={this.handleLogout}>
          <Icon type="logout" theme="outlined" />
          <span style={{ marginLeft: 5 }}>退出</span>
        </span>
      </Header>
    )
  }
}

export default MyHeader
