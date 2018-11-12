import React from "react"
import { Drawer, Button, Icon } from "antd"
import MyForm from "./form"
import { inject, observer } from "mobx-react"

@inject("packageStore", "cinemaStore", "goodsStore", "categoryStore")
@observer
class packageForm extends React.Component {
  constructor(props) {
    super(props)
    this.props.cinemaStore.getAllData()
    this.props.goodsStore.getAllData()
    this.props.categoryStore.getAllData()
  }

  onClose = () => {
    const { packageStore } = this.props
    packageStore.showDrawer(false)
    packageStore.resetEditData()
  }

  showDrawer = () => {
    this.props.packageStore.showDrawer(true)
  }

  render() {
    const { visible, isEdit } = this.props.packageStore
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 15 }}
          onClick={this.showDrawer}
        >
          <Icon type="plus" theme="outlined" />
          <span>新增套餐</span>
        </Button>

        <Drawer
          title={isEdit ? "编辑套餐" : "新增套餐"}
          placement="right"
          width="800"
          closable={false}
          destroyOnClose={true}
          onClose={this.onClose}
          visible={visible}
        >
          <MyForm
            cinemaList={this.props.cinemaStore.allData}
            goodsList={this.props.goodsStore.allData}
            categoryList={this.props.categoryStore.allData}
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

export default packageForm
