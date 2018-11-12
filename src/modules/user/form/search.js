import React from "react"
import { Form, Input, Button, Select, DatePicker } from "antd"
import { observer, inject } from "mobx-react"
import { generateSearchParams } from "utils"
import styles from "./index.module.less"

const FormItem = Form.Item
const Option = Select.Option

@inject("userStore")
@observer
class MyForm extends React.Component {
  handleCancel = e => {
    this.props.onCancel()
  }

  resetFields = () => {
    this.props.form.resetFields()
  }

  handleCheckBoxChange = checkedValues => {
    console.log("checked = ", checkedValues)
  }

  handleReset = e => {
    this.resetFields()
    const store = this.props.userStore
    store.setSearchParams({})
    store.getData()
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
          const store = this.props.userStore
          store.setSearchParams(generateSearchParams(values))
          store.getData()
        }
      }
    )
  }

  render() {
    const {
      form: { getFieldDecorator },
      userStore: { searchParams }
    } = this.props

    const formLayout = {
      labelCol: {
        xs: 24,
        sm: 7
      },
      wrapperCol: {
        xs: 24,
        sm: 17
      }
    }
    return (
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
        style={{ marginBottom: 24 }}
      >
        <FormItem label="UID" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("uid", {
            initialValue: searchParams.uid
          })(<Input placeholder="请输入UID" />)}
        </FormItem>
        <FormItem label="姓名" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("name", {
            initialValue: searchParams.name
          })(<Input placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem label="手机" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("phone", {
            initialValue: searchParams.phone
          })(<Input placeholder="请输入手机" />)}
        </FormItem>

        <FormItem label="IC卡号" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("ic_id", {
            initialValue: searchParams.ic_id
          })(<Input placeholder="请输入IC卡号" />)}
        </FormItem>

        <FormItem label="会员类型" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("type", {
            initialValue: searchParams.type
          })(
            <Select style={{ width: 174 }} placeholder="会员类型">
              <Option value="1">普通会员</Option>
              <Option value="2">高级会员</Option>
            </Select>
          )}
        </FormItem>

        <FormItem label="注册时间" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("created", {
            initialValue: searchParams.created
          })(
            <DatePicker
              style={{ width: "100%" }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          )}
        </FormItem>
        <FormItem>
          <Button icon="search" onClick={this.handleSubmit}>
            查询
          </Button>
          <Button onClick={this.handleReset} style={{ marginLeft: 12 }}>
            重置
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedAddForm = Form.create()(MyForm)

export default WrappedAddForm
