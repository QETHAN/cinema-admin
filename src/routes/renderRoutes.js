import React, { Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import ErrorBoundary from "components/errorBoundary"

const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch {...switchProps}>
        {routes &&
          routes.map((route, idx) => (
            <Route
              key={route.key || idx}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={props => {
                return (
                  <ErrorBoundary>
                    <route.component {...props} {...extraProps} route={route} />
                  </ErrorBoundary>
                )
              }}
            />
          ))}
      </Switch>
    </Suspense>
  ) : null

export default renderRoutes
