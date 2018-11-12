import React from "react"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import GoodsForm from "./form"
import { observer, inject } from "mobx-react"

@inject("goodsStore")
@observer
class Goods extends React.Component {
  componentDidMount() {
    this.props.goodsStore.getData()
  }

  componentWillUnmount() {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("size")
  }

  render() {
    const { listData, total, size } = this.props.goodsStore
    return (
      <>
        <GoodsForm />
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

export default AuthWrapper(Goods)
