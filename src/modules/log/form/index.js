import React from "react"
import { Drawer } from "antd"
import MyForm from "./form"
import { inject, observer } from "mobx-react"

@inject("logStore")
@observer
class LogForm extends React.Component {
  onClose = () => {
    const { logStore } = this.props
    logStore.showDrawer(false)
    logStore.resetEditData()
  }

  render() {
    const { visible } = this.props.logStore
    return (
      <div>
        <MyForm onCancel={this.onClose} />
        <Drawer
          title="电影详情"
          placement="right"
          width="800"
          closable={false}
          destroyOnClose={true}
          onClose={this.onClose}
          visible={visible}
        >
          电影详情
        </Drawer>
      </div>
    )
  }
}

export default LogForm
