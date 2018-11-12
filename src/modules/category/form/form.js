import React from "react"
import { Form, Input, Button, Select } from "antd"
import styles from "./index.module.less"
import { observer, inject } from "mobx-react"
import UploadList from "./uploadList"

const FormItem = Form.Item
const Option = Select.Option

@inject("categoryStore")
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
    const { form, categoryStore } = this.props

    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 20 } },
      (err, values) => {
        if (err) {
          console.log("Received values of form: ", values)
        } else {
          const data = {
            ...values,
            image_id: categoryStore.imageIds[0]
          }

          if (categoryStore.isEdit) {
            data.id = categoryStore.editData.id
          }

          delete data.image_urls

          categoryStore.save(data)
        }
      }
    )
  }

  handleChangeType = () => {
    this.setState({ type: "password" })
  }

  render() {
    const {
      cinemaList,
      form: { getFieldDecorator }
    } = this.props

    const store = this.props.categoryStore

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
        <FormItem {...formItemLayout} label="所属影院">
          {getFieldDecorator("cinema_id", {
            rules: [
              {
                required: true,
                message: "请选择所属影院"
              }
            ],
            initialValue: store.isEdit ? store.editData.cinema_id : undefined
          })(
            <Select placeholder="请选择所属影院">
              {cinemaList &&
                cinemaList.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="分类名称">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "请输入分类名称"
              }
            ],
            initialValue: store.isEdit ? store.editData.name : undefined
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="分类排序">
          {getFieldDecorator("sort", {
            rules: [
              {
                required: true,
                message: "请输入分类排序"
              }
            ],
            initialValue: store.isEdit ? store.editData.sort : undefined
          })(<Input />)}
        </FormItem>

        <FormItem label="分类图片" {...formItemLayout}>
          {getFieldDecorator("image_urls", {
            rules: [{ required: true, message: "请上传分类图片" }],
            initialValue: store.editData.image_urls
          })(<UploadList type="6" />)}
        </FormItem>

        <FormItem
          style={{ marginTop: 30, textAlign: "center" }}
          className={styles.formItem}
        >
          <Button style={{ marginRight: 8 }} onClick={this.handleCancel}>
            取消
          </Button>
          <Button type="primary" htmlType="submit" loading={store.saveLoading}>
            {store.saveLoading ? "保存中" : "确定"}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedAddForm = Form.create()(MyForm)

export default WrappedAddForm
