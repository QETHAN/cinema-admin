import React from "react"
import { Form, Input, Button } from "antd"
import styles from "./index.module.less"
import { observer, inject } from "mobx-react"
import { generateSearchParams } from "../../../utils"

const FormItem = Form.Item

@inject("filmsStore")
@observer
class MyForm extends React.Component {
  handleCancel = e => {
    this.props.onCancel()
  }

  handleReset = e => {
    this.props.form.resetFields()
    const store = this.props.filmsStore
    store.setPagination(1, store.size)
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
          this.props.filmsStore.setSearchParams(generateSearchParams(values))
          this.props.filmsStore.getData()
        }
      }
    )
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props

    return (
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
        style={{ marginBottom: 24 }}
      >
        <FormItem label="电影名称" className={styles.formItem}>
          {getFieldDecorator("name")(<Input placeholder="请输入电影名称" />)}
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
