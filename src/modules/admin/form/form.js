import React from "react"
import { Form, Input, Button } from "antd"
import styles from "./index.module.less"
import { observer, inject } from "mobx-react"

const FormItem = Form.Item

@inject("adminStore")
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
          const store = this.props.adminStore

          const data = {
            username: values.username,
            password: values.password,
            is_super_role: store.editData.is_super_role
          }

          if (store.isEdit) {
            data.id = store.editData.id
            data.old_password = values.oldPassword
          }

          this.props.adminStore.save(data)
        }
      }
    )
  }

  handleChangeType = () => {
    this.setState({ type: "password" })
  }

  render() {
    const {
      adminStore,
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

    const confirmPasswordValidator = (rule, value, callback) => {
      const password = this.props.form.getFieldValue("password")

      if (value !== password) {
        return callback(new Error("两次密码不一致"))
      }

      return callback()
    }

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 12 }}>
        <FormItem {...formItemLayout} label="用户名">
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "请输入用户名"
              }
            ],
            initialValue: adminStore.editData.username
          })(<Input />)}
        </FormItem>

        {adminStore.isEdit && (
          <FormItem {...formItemLayout} label="原密码">
            {getFieldDecorator("oldPassword", {
              rules: [
                {
                  required: true,
                  message: "请输入原密码"
                }
              ],
              initialValue: ""
            })(
              <Input type={this.state.type} onClick={this.handleChangeType} />
            )}
          </FormItem>
        )}

        <FormItem {...formItemLayout} label="新密码">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "请输入新密码"
              }
            ],
            initialValue: ""
          })(<Input type={this.state.type} onClick={this.handleChangeType} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="确认密码">
          {getFieldDecorator("confirmPassword", {
            rules: [
              {
                required: true,
                message: "请输入确认密码"
              },
              { validator: confirmPasswordValidator }
            ],
            validateFirst: true,
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
          <Button
            type="primary"
            htmlType="submit"
            loading={adminStore.saveLoading}
          >
            {adminStore.saveLoading ? "保存中" : "确定"}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedAddForm = Form.create()(MyForm)

export default WrappedAddForm
