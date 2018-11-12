import React from "react"
import { Drawer, Button, Icon } from "antd"
import MyForm from "./form"
import { inject, observer } from "mobx-react"

@inject("cinemaStore", "appStore")
@observer
class CinemaForm extends React.Component {
  constructor(props) {
    super(props)
    this.props.appStore.getArea(0)
  }

  showDrawer = () => {
    this.props.cinemaStore.showDrawer(true)
  }

  onClose = () => {
    const { cinemaStore } = this.props
    cinemaStore.showDrawer(false)
    cinemaStore.setSaveLoading(false)
    cinemaStore.resetEditData()
  }

  render() {
    const { visible, isEdit } = this.props.cinemaStore
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 15 }}
          onClick={this.showDrawer}
        >
          <Icon type="plus" theme="outlined" />
          <span>新增影院</span>
        </Button>

        <Drawer
          title={isEdit ? "编辑影院" : "新增影院"}
          placement="right"
          width="700"
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

export default CinemaForm
