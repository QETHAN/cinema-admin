import React from "react"
import { Form, Input, Button, Select } from "antd"
import styles from "./index.module.less"
import { observer, inject } from "mobx-react"
import UploadList from "./uploadList"

const FormItem = Form.Item
const Option = Select.Option

@inject("goodsStore")
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
    const { form, goodsStore } = this.props

    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 20 } },
      (err, values) => {
        if (err) {
          console.log("Received values of form: ", values)
        } else {
          const data = {
            ...values,
            image_id: goodsStore.imageIds[0]
          }

          if (goodsStore.isEdit) {
            data.id = goodsStore.editData.id
          }

          delete data.image_urls

          goodsStore.save(data)
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

    const store = this.props.goodsStore

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
        {store.isEdit ? (
          <FormItem {...formItemLayout} label="项目编号">
            <span>{store.editData.id}</span>
          </FormItem>
        ) : null}

        <FormItem {...formItemLayout} label="所属店面">
          {getFieldDecorator("cinema_id", {
            rules: [
              {
                required: true,
                message: "请选择所属店面"
              }
            ],
            initialValue: store.editData.cinema_id
              ? store.editData.cinema_id
              : undefined
          })(
            <Select placeholder="请选择所属店面">
              {this.props.cinemaList.map(item => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="项目名称">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "请输入项目名称"
              }
            ],
            initialValue: store.editData.name ? store.editData.name : undefined
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="规格">
          {getFieldDecorator("unit", {
            rules: [
              {
                required: true,
                message: "请输入规格"
              }
            ],
            initialValue: store.editData.unit ? store.editData.unit : undefined
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="库存">
          {getFieldDecorator("stock", {
            rules: [
              {
                required: true,
                message: "请输入库存"
              }
            ],
            initialValue: store.editData.stock
              ? store.editData.stock
              : undefined
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="已销数量">
          {getFieldDecorator("sellout", {
            rules: [
              {
                required: true,
                message: "请输入库存"
              }
            ],
            initialValue: store.editData.sellout
              ? store.editData.sellout
              : undefined
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="销售单价（分）">
          {getFieldDecorator("price", {
            rules: [
              {
                required: true,
                message: "请输入销售单价（单位：分）"
              }
            ],
            initialValue: store.editData.price
              ? store.editData.price
              : undefined
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="购买可获取积分">
          {getFieldDecorator("score", {
            rules: [
              {
                required: true,
                message: "请输入购买可获取积分"
              }
            ],
            initialValue: store.editData.score
              ? store.editData.score
              : undefined
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="所属分类">
          {getFieldDecorator("category_id", {
            initialValue: store.editData.category_id
              ? store.editData.category_id
              : undefined
          })(
            <Select style={{ width: 174 }} placeholder="请选择套餐所属分类">
              {this.props.categoryList.map(item => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="商品图片">
          {getFieldDecorator("image_urls", {
            rules: [{ required: true, message: "请上传商品图片" }],
            initialValue: store.editData.image_urls
          })(<UploadList type="3" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="状态">
          {getFieldDecorator("onsale", {
            initialValue: store.editData.onsale
              ? store.editData.onsale
              : undefined
          })(
            <Select style={{ width: 174 }} placeholder="请选择状态">
              <Option value="1">上架</Option>
              <Option value="0">下架</Option>
            </Select>
          )}
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
