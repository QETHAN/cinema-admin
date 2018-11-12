import React from "react"
import { Drawer, Button, Icon } from "antd"
import MyForm from "./form"
import { inject, observer } from "mobx-react"

@inject("adminStore")
@observer
class AdminForm extends React.Component {
  onClose = () => {
    const { adminStore } = this.props
    adminStore.showDrawer(false)
    adminStore.resetEditData()
  }

  showDrawer = () => {
    this.props.adminStore.showDrawer(true)
  }

  render() {
    const { visible, isEdit } = this.props.adminStore
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 15 }}
          onClick={this.showDrawer}
        >
          <Icon type="plus" theme="outlined" />
          <span>新增超级管理员</span>
        </Button>

        <Drawer
          title={isEdit ? "修改密码" : "新增超级管理员"}
          placement="right"
          width="800"
          closable={false}
          destroyOnClose={true}
          onClose={this.onClose}
          visible={visible}
        >
          <MyForm
            onCancel={this.onClose}
            wrappedComponentRef={form => {
              this.form = form
            }}
          />
        </Drawer>
      </div>
    )
  }
}

export default AdminForm
