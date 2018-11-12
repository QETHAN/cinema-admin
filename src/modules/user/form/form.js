import React from "react"
import { Form, Input, Button } from "antd"
import styles from "./index.module.less"
import { observer, inject } from "mobx-react"

const FormItem = Form.Item

@inject("userStore")
@observer
class MyForm extends React.Component {
  state = {
    type: "text"
  }

  handleCancel = e => {
    this.props.onCancel()
  }

  resetFields = () => {
    this.props.form.resetFields()
  }

  handleCheckBoxChange = checkedValues => {
    console.log("checked = ", checkedValues)
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form } = this.props

    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 20 } },
      (err, values) => {
        if (err) {
          console.log("Received values of form: ", values)
        } else {
          this.props.userStore.save(values)
        }
      }
    )
  }

  handleChangeType = () => {
    this.setState({ type: "password" })
  }

  render() {
    const {
      userStore: { saveLoading },
      form: { getFieldDecorator }
    } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    }

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 12 }}>
        <FormItem {...formItemLayout} label="用户名">
          {getFieldDecorator("email", {
            rules: [
              {
                required: true,
                message: "请输入用户名"
              }
            ],
            initialValue: ""
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请输入密码"
              }
            ],
            initialValue: ""
          })(<Input type={this.state.type} onClick={this.handleChangeType} />)}
        </FormItem>
        <FormItem
          style={{ marginTop: 30, textAlign: "center" }}
          className={styles.formItem}
        >
          <Button style={{ marginRight: 8 }} onClick={this.handleCancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" loading={saveLoading}>
            {saveLoading ? "保存中" : "确定"}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedAddForm = Form.create()(MyForm)

export default WrappedAddForm
