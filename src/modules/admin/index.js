import React from "react"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import AdminForm from "./form"
import { observer, inject } from "mobx-react"

@inject("adminStore")
@observer
class Admin extends React.Component {
  componentDidMount() {
    this.props.adminStore.getData()
  }

  componentWillUnmount() {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("size")
  }

  render() {
    const { listData, total, size } = this.props.adminStore
    return (
      <>
        <AdminForm />
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

export default AuthWrapper(Admin)
