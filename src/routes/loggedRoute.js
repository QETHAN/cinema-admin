import React, { Suspense, lazy } from "react"
import { Route, Redirect } from "react-router-dom"
import { inject, observer } from "mobx-react"
import { computed } from "mobx"

const Home = lazy(() => import("modules/home"))

@inject("appStore")
@observer
class LoggedRoute extends React.Component {
  @computed({ keepAlive: true })
  get token() {
    // 正确的; 计算属性会追踪 `user.name` 属性
    return this.props.appStore.token
  }

  render() {
    return this.token ? (
      <Suspense fallback={<div>Loading...</div>}>
        <Route replace path="/" render={props => <Home {...props} />} />
      </Suspense>
    ) : (
      <Redirect to="/login" />
    )
  }
}

export default LoggedRoute
