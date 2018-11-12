import React from "react"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import ScheduleForm from "./form"
import { observer, inject } from "mobx-react"
import { Divider } from "antd"

@inject("scheduleStore")
@observer
class Films extends React.Component {
  componentWillMount() {
    console.log("will mount---------------->")
  }

  componentDidMount() {
    this.props.scheduleStore.getData()
  }

  componentWillUnmount() {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("size")
  }

  render() {
    const { listData, total, size } = this.props.scheduleStore
    return (
      <>
        <ScheduleForm />
        <Divider />
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
