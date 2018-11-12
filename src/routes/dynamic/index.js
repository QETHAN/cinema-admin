import Nprogress from "nprogress"
import React, { Component } from "react"
import Loadable from "react-loadable"

class Loading extends Component {
  constructor() {
    super()
    Nprogress.start()
  }

  componentWillUnmount() {
    Nprogress.done()
  }

  render() {
    return <></>
  }
}

export default loader =>
  Loadable({
    loader: () => loader.then(m => m.default),
    loading: () => <Loading />,
    timeout: 10000
  })
