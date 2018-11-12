import React from "react"
import { Drawer, Button, Icon } from "antd"
import MyForm from "./form"
import { inject, observer } from "mobx-react"
import { canAdd } from "utils/helper"

@inject("merchantStore", "appStore")
@observer
class MerchantForm extends React.Component {
  constructor(props) {
    super(props)
    this.props.appStore.getArea(0)
  }

  onClose = () => {
    const { merchantStore } = this.props
    merchantStore.showDrawer(false)
    merchantStore.resetEditData()
  }

  showDrawer = () => {
    this.props.merchantStore.showDrawer(true)
  }

  render() {
    const { visible, isEdit } = this.props.merchantStore
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 15 }}
          onClick={this.showDrawer}
          disabled={!canAdd(this.props.route.child_functions)}
        >
          <Icon type="plus" theme="outlined" />
          <span>新增商户</span>
        </Button>

        <Drawer
          title={isEdit ? "编辑商户" : "新增商户"}
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

export default MerchantForm
