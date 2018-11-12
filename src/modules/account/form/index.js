import React from "react"
import { Drawer, Button, Icon } from "antd"
import { inject, observer } from "mobx-react"
import MadminForm from "./form"

@inject("accountStore")
@observer
class AccountForm extends React.Component {
  onClose = () => {
    const { accountStore } = this.props
    accountStore.showDrawer(false)
    accountStore.resetEditData()
  }

  render() {
    const { visible, isEdit } = this.props.accountStore
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
          <MadminForm onCancel={this.onClose} />
        </Drawer>
      </div>
    )
  }
}

export default AccountForm
