import React from "react"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import FilmsForm from "./form"
import { observer, inject } from "mobx-react"

@inject("filmsStore")
@observer
class Films extends React.Component {
  componentDidMount() {
    this.props.filmsStore.getData()
  }

  componentWillUnmount() {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("size")
  }

  render() {
    const { listData, total, size } = this.props.filmsStore
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
