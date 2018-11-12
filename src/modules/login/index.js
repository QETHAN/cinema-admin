import React, { Component } from "react"
import { Layout } from "antd"
import { withRouter } from "react-router-dom"
import { inject, observer } from "mobx-react"
import "./index.scss"
import LoginForm from "./form/index"

const { Header, Content, Footer } = Layout

@inject("appStore")
@observer
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    if (this.props.appStore.token) {
      this.props.history.push("/")
    }
  }

  render() {
    return (
      <Layout className="login__layout">
        <Header>
          <h1>影院管理系统</h1>
        </Header>
        <Content className="login__layout__content">
          <div className="login__layout__content-inner">
            <LoginForm {...this.props} />
          </div>
        </Content>
        <Footer className="login__layout__footer">
          ©2018 Created by Lonlife
        </Footer>
      </Layout>
    )
  }
}

export default withRouter(Login)
