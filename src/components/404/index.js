import React from "react"
import Exception from "components/exception"
import { inject, observer } from "mobx-react"

@inject("appStore")
@observer
class NotFound extends React.Component {
  componentWillMount() {
    console.log(this.props)
  }
  render() {
    return <Exception />
  }
}

export default NotFound
