import React from "react"
import { Form, Input, Button, Select, DatePicker } from "antd"
import styles from "./index.module.less"
import { observer, inject } from "mobx-react"

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
          store.setSearchParams(values)
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
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
      }
    }

    const buttonItemLayout = {
      wrapperCol: { offset: 2 }
    }

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="时间" className={styles.formItem} {...formLayout}>
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

        <FormItem label="类型" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("type", {
            initialValue: searchParams.type
          })(
            <Select style={{ width: 128 }} placeholder="类型">
              <Option value="1">普通会员</Option>
              <Option value="2">高级会员</Option>
            </Select>
          )}
        </FormItem>

        <FormItem label="途径" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("type", {
            initialValue: searchParams.type
          })(
            <Select style={{ width: 128 }} placeholder="途径">
              <Option value="1">普通会员</Option>
              <Option value="2">高级会员</Option>
            </Select>
          )}
        </FormItem>

        <FormItem label="影城" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("name", {
            initialValue: searchParams.name
          })(<Input placeholder="请输入影城" />)}
        </FormItem>
        <FormItem label="订单号" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("phone", {
            initialValue: searchParams.phone
          })(<Input placeholder="请输入订单号" />)}
        </FormItem>

        <FormItem
          className={styles.formItem}
          style={{ width: 223 }}
          {...buttonItemLayout}
        >
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
