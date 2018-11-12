import React from "react"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import CategoryForm from "./form"
import { observer, inject } from "mobx-react"

@inject("categoryStore")
@observer
class Category extends React.Component {
  componentDidMount() {
    this.props.categoryStore.getData()
  }

  render() {
    const { listData, total, size } = this.props.categoryStore
    return (
      <>
        <CategoryForm />
        <List
          data={listData}
          total={total}
          size={size}
          route={this.props.route}
        />
      </>
    )
  }
}

export default AuthWrapper(Category)
