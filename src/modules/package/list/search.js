import React from "react"
import { Form, Input, Button, Select } from "antd"
import styles from "./search.module.less"
import { observer, inject } from "mobx-react"
import { generateSearchParams } from "utils"

const FormItem = Form.Item
const Option = Select.Option

@inject("packageStore")
@observer
class MyForm extends React.Component {
  handleCancel = e => {
    this.props.onCancel()
  }

  resetFields = () => {
    this.props.form.resetFields()
  }

  handleReset = e => {
    this.resetFields()
    const store = this.props.packageStore
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
          const store = this.props.packageStore
          store.setSearchParams(generateSearchParams(values))
          store.getData()
        }
      }
    )
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props

    const formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }

    const buttonItemLayout = {
      wrapperCol: { offset: 2 }
    }

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem label="所属影院" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("cinema_id")(
            <Select style={{ width: 174 }} placeholder="请选择影院">
              {this.props.cinemaList.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem label="套餐名称" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("name")(<Input placeholder="请输入套餐名称" />)}
        </FormItem>

        <FormItem label="状态">
          {getFieldDecorator("onsale")(
            <Select style={{ width: 174 }} placeholder="请选择状态">
              <Option value="1">上架</Option>
              <Option value="0">下架</Option>
            </Select>
          )}
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
