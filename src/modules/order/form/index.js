import React from "react"
import { Drawer } from "antd"
import SearchForm from "./form"
import { inject, observer } from "mobx-react"

@inject("orderStore")
@observer
class OrderForm extends React.Component {
  onClose = () => {
    const { orderStore } = this.props
    orderStore.showDrawer(false)
    orderStore.resetEditData()
  }

  render() {
    const { visible } = this.props.orderStore
    return (
      <div>
        <SearchForm />
        <Drawer
          title="订单详情"
          placement="right"
          width="800"
          closable={false}
          destroyOnClose={true}
          onClose={this.onClose}
          visible={visible}
        >
          订单详情
        </Drawer>
      </div>
    )
  }
}

export default OrderForm
