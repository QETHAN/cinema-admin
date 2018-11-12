import React, { Suspense, lazy } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { inject, observer } from "mobx-react"
// import DevTools from "mobx-react-devtools"
// import { isDev } from "utils"
import LoggedRoute from "routes/loggedRoute"

const Login = lazy(() => import("modules/login"))

@inject("appStore")
@observer
class App extends React.Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/login" render={() => <Login />} />
            <LoggedRoute />
            <Redirect to="/login" />
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

export default App
