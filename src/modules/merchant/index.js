import React from "react"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import MerchantForm from "./form"
import { observer, inject } from "mobx-react"

@inject("merchantStore")
@observer
class Merchant extends React.Component {
  componentDidMount() {
    this.props.merchantStore.getData()
  }

  componentWillUnmount() {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("size")
  }

  render() {
    const { listData, total, size } = this.props.merchantStore
    return (
      <>
        <MerchantForm route={this.props.route} />
        <List
          route={this.props.route}
          data={listData}
          total={total}
          size={size}
        />
      </>
    )
  }
}

export default AuthWrapper(Merchant)
