import React from "react"
import { Form, Input, Button } from "antd"
import styles from "./index.module.less"
import { observer, inject } from "mobx-react"
import SelectCinema from "./selectCinema"
import Privilege from "./privilege"
import { getPrivilegeIds } from "utils/helper"

const FormItem = Form.Item

@inject("mroleStore", "cinemaStore")
@observer
class MyForm extends React.Component {
  constructor(props) {
    super(props)
    this.props.cinemaStore.getData()
  }
  state = {
    checkAll: true
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
    const { form, mroleStore } = this.props

    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 20 } },
      (err, values) => {
        if (err) {
          console.log("Received values of form: ", values)
        } else {
          const data = {
            name: values.name,
            cinema_ids: values.cinema_ids.join(","),
            function_ids: [
              ...values.privilege.parent,
              ...values.privilege.child
            ]
              .filter(item => item !== "all")
              .join(",")
          }

          if (mroleStore.isEdit) {
            data.id = mroleStore.editData.id
          }

          console.log(data)
          this.props.mroleStore.save(data)
        }
      }
    )
  }

  handleChangeType = () => {
    this.setState({ type: "password" })
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props

    const { editData, saveLoading } = this.props.mroleStore

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
        <FormItem {...formItemLayout} label="角色名称">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "请输入角色名称"
              }
            ],
            initialValue: editData.name
          })(<Input placeholder="请输入角色名称" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="选择影院" required>
          <FormItem>
            {getFieldDecorator("cinema_ids", {
              rules: [
                {
                  required: true,
                  message: "请选择影院"
                }
              ],
              initialValue: editData.cinema_id_list
            })(<SelectCinema data={this.props.cinemaStore.listData} />)}
          </FormItem>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="权限选择"
          required
          style={{ marginTop: -24 }}
        >
          <FormItem>
            {getFieldDecorator("privilege", {
              rules: [
                {
                  required: true,
                  message: "请选择权限"
                }
              ],
              initialValue: getPrivilegeIds(editData.functions || [])
            })(<Privilege />)}
          </FormItem>
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
