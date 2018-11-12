import React from "react"
import { inject, observer } from "mobx-react"
import { computed } from "mobx"

const AuthWrapper = WrappedElement => {
  @inject("appStore")
  @observer
  class Wrapper extends React.Component {
    @computed({ keepAlive: true })
    get token() {
      return this.props.appStore.token
    }

    componentWillMount() {
      if (!this.token) {
        this.props.history.push("/login")
        return
      }
    }

    render() {
      return <WrappedElement {...this.props} />
    }
  }

  return Wrapper
}

export default AuthWrapper
