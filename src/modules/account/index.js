import React from "react"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import AccountForm from "./form"
import { observer, inject } from "mobx-react"

@inject("mroleStore")
@observer
class Account extends React.Component {
  componentDidMount() {
    this.props.mroleStore.getData()
  }

  componentWillUnmount() {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("size")
  }

  render() {
    const { listData, total, size } = this.props.mroleStore
    return (
      <>
        <AccountForm />
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

export default AuthWrapper(Account)
