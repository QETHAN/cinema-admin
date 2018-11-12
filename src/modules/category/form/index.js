import React from "react"
import { Drawer, Button, Icon } from "antd"
import MyForm from "./form"
import { inject, observer } from "mobx-react"

@inject("categoryStore", "cinemaStore")
@observer
class CategoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.props.cinemaStore.getAllData()
  }

  showDrawer = () => {
    this.props.categoryStore.showDrawer(true)
  }

  onClose = () => {
    const { categoryStore } = this.props
    categoryStore.showDrawer(false)
    categoryStore.resetEditData()
  }

  render() {
    const { visible, isEdit } = this.props.categoryStore
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 15 }}
          onClick={this.showDrawer}
        >
          <Icon type="plus" theme="outlined" />
          <span>新增分类</span>
        </Button>

        <Drawer
          title={isEdit ? "编辑分类" : "新增分类"}
          placement="right"
          width="800"
          closable={false}
          destroyOnClose={true}
          onClose={this.onClose}
          visible={visible}
        >
          <MyForm
            cinemaList={this.props.cinemaStore.allData}
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

export default CategoryForm
