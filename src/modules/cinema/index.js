import React from "react"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import CinemaForm from "./form"
import { observer, inject } from "mobx-react"

@inject("cinemaStore")
@observer
class Cinema extends React.Component {
  componentDidMount() {
    this.props.cinemaStore.getData()
  }

  componentWillUnmount() {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("size")
  }

  render() {
    const { listData, total, size } = this.props.cinemaStore
    return (
      <>
        <CinemaForm />
        <List data={listData} total={total} size={size} />
      </>
    )
  }
}

export default AuthWrapper(Cinema)
