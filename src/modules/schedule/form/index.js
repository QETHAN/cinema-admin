import React from "react"
import { Drawer } from "antd"
import { inject, observer } from "mobx-react"
import SearchForm from "./search"
import MyForm from "./form"

@inject("scheduleStore")
@observer
class ScheduleForm extends React.Component {
  onClose = () => {
    const { scheduleStore } = this.props
    scheduleStore.showDrawer(false)
    scheduleStore.resetEditData()
  }

  render() {
    const { visible } = this.props.scheduleStore
    return (
      <div>
        <SearchForm />
        <Drawer
          title="修改价格"
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

export default ScheduleForm
