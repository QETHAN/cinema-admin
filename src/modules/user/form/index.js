import React from "react"
import { Drawer, Divider } from "antd"
import { inject, observer } from "mobx-react"
import SearchForm from "./search"
import MyForm from "./form"

@inject("userStore")
@observer
class AdminForm extends React.Component {
  onClose = () => {
    const { userStore } = this.props
    userStore.showDrawer(false)
    userStore.resetEditData()
  }

  render() {
    const { visible } = this.props.userStore
    return (
      <div>
        <SearchForm />
        <Divider />
        <Drawer
          title="会员详情"
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
