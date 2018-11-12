import React from "react"
import { Drawer, Divider } from "antd"
import SearchForm from "./search"
import MyForm from "./form"
import { inject, observer } from "mobx-react"

@inject("movieStore")
@observer
class FilmsForm extends React.Component {
  onClose = () => {
    const { movieStore } = this.props
    movieStore.showDrawer(false)
    movieStore.resetEditData()
  }

  render() {
    const { visible } = this.props.movieStore
    return (
      <div>
        <SearchForm />
        <Divider />
        <Drawer
          title="电影详情"
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

export default FilmsForm
