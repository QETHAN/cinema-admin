import React from "react"
import { Drawer, Button, Icon } from "antd"
import { inject, observer } from "mobx-react"
import MyForm from "./form"

@inject("mroleStore")
@observer
class MroleForm extends React.Component {
  onClose = () => {
    const { showDrawer, resetEditData } = this.props.mroleStore
    showDrawer(false)
    resetEditData()
  }

  showDrawer = () => {
    this.props.mroleStore.showDrawer(true)
  }

  render() {
    const { visible, isEdit } = this.props.mroleStore
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 15 }}
          onClick={this.showDrawer}
        >
          <Icon type="plus" theme="outlined" />
          <span>新增管理员角色</span>
        </Button>
        <Drawer
          title={isEdit ? "修改角色" : "新增管理员角色"}
          placement="right"
          width="800"
          closable={false}
          destroyOnClose={true}
          onClose={this.onClose}
          visible={visible}
        >
          <MyForm onCancel={this.onClose} />
        </Drawer>
      </div>
    )
  }
}

export default MroleForm
