import React from "react"
import { observer, inject } from "mobx-react"
import "./index.less"
import { Form, Icon, Input, Button } from "antd"
import { when } from "mobx"

const FormItem = Form.Item

@inject("authStore", "appStore")
@observer
class LoginForm extends React.Component {
  componentDidMount() {
    console.log("LoginForm---->", this.props)
    when(
      () => this.props.appStore.token,
      () => {
        this.props.history.replace("/")
      }
    )
  }

  state = {
    type: "text"
  }

  handleChangeType = () => {
    this.setState({ type: "password" })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.authStore.login(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入账号" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入账号"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入密码"
              type={this.state.type}
              onClick={this.handleChangeType}
            />
          )}
        </FormItem>
        <FormItem>
          {/* {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>记住我</Checkbox>)}
          <a className="login-form-forgot" href="/">
            忘记密码
          </a> */}
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedLoginForm = Form.create()(LoginForm)

export default WrappedLoginForm
