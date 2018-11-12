import React from "react"
import { Row, Col, Form, Input, Button } from "antd"
import styles from "./index.module.less"
import { observer, inject } from "mobx-react"

const FormItem = Form.Item

@inject("logStore")
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

  handleSubmit = e => {
    e.preventDefault()
    const { form } = this.props

    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 20 } },
      (err, values) => {
        if (err) {
          console.log("Received values of form: ", values)
        } else {
          const params = { "filter[name][like]": values.name }

          this.props.logStore.getData(params)
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
        <Row gutter={48}>
          <Col span={12}>
            <FormItem label="电影名称" className={styles.formItem}>
              {getFieldDecorator("name")(
                <Input placeholder="请输入电影名称" />
              )}
            </FormItem>
            <FormItem>
              <Button icon="search" onClick={this.handleSubmit}>
                查询
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

const WrappedAddForm = Form.create()(MyForm)

export default WrappedAddForm
