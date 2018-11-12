import React from "react"
import { Drawer, Button, Icon } from "antd"
import { inject, observer } from "mobx-react"
import MyForm from "./form"

@inject("madminStore", "mroleStore")
@observer
class MadminForm extends React.Component {
  constructor(props) {
    super(props)
    this.props.mroleStore.getData()
  }

  onClose = () => {
    const { madminStore } = this.props
    madminStore.showDrawer(false)
    madminStore.resetEditData()
  }

  showDrawer = () => {
    this.props.madminStore.showDrawer(true)
  }

  render() {
    const { visible, isEdit } = this.props.madminStore
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 15 }}
          onClick={this.showDrawer}
        >
          <Icon type="plus" theme="outlined" />
          <span>新增管理员</span>
        </Button>
        <Drawer
          title={isEdit ? "修改密码" : "新增管理员"}
          placement="right"
          width="800"
          closable={false}
          destroyOnClose={true}
          onClose={this.onClose}
          visible={visible}
        >
          <MyForm
            roles={this.props.mroleStore.listData}
            onCancel={this.onClose}
          />
        </Drawer>
      </div>
    )
  }
}

export default MadminForm
