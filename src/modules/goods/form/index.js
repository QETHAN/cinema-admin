import React from "react"
import { Drawer, Button, Icon } from "antd"
import MyForm from "./form"
import { inject, observer } from "mobx-react"

@inject("goodsStore", "cinemaStore", "categoryStore")
@observer
class GoodsForm extends React.Component {
  constructor(props) {
    super(props)
    this.props.cinemaStore.getAllData()
    this.props.categoryStore.getAllData()
  }

  onClose = () => {
    const { goodsStore } = this.props
    goodsStore.showDrawer(false)
    goodsStore.resetEditData()
  }

  showDrawer = () => {
    this.props.goodsStore.showDrawer(true)
  }

  render() {
    const { visible, isEdit } = this.props.goodsStore
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 15 }}
          onClick={this.showDrawer}
        >
          <Icon type="plus" theme="outlined" />
          <span>新增卖品</span>
        </Button>

        <Drawer
          title={isEdit ? "编辑卖品" : "新增卖品"}
          placement="right"
          width="800"
          closable={false}
          destroyOnClose={true}
          onClose={this.onClose}
          visible={visible}
        >
          <MyForm
            cinemaList={this.props.cinemaStore.allData}
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

export default GoodsForm
