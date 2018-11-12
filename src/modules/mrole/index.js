import React from "react"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import FilmsForm from "./form"
import { observer, inject } from "mobx-react"

@inject("mroleStore", "appStore")
@observer
class Films extends React.Component {
  componentDidMount() {
    this.props.mroleStore.getData()
    this.props.appStore.getPrivilege()
  }

  componentWillUnmount() {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("size")
  }

  render() {
    const { listData, total, size } = this.props.mroleStore
    return (
      <>
        <FilmsForm />
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

export default AuthWrapper(Films)
