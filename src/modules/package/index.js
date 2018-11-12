import React from "react"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import PackageForm from "./form"
import { observer, inject } from "mobx-react"

@inject("packageStore")
@observer
class Package extends React.Component {
  componentDidMount() {
    this.props.packageStore.getData()
  }

  componentWillUnmount() {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("size")
  }

  render() {
    const { listData, total, size } = this.props.packageStore
    return (
      <>
        <PackageForm />
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

export default AuthWrapper(Package)
