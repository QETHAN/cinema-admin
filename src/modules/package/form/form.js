import React from "react"
import { Form, Input, Button, Select, Radio } from "antd"
import Big from "big.js"
import styles from "./index.module.less"
import { observer, inject } from "mobx-react"
import UploadList from "./uploadList"
import ProductsSelect from "./productsSelect"

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

@inject("packageStore")
@observer
class MyForm extends React.Component {
  state = {
    origin_price: "0.00"
  }

  handleCancel = e => {
    this.props.onCancel()
  }

  resetFields = () => {
    this.props.form.resetFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, packageStore } = this.props

    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 20 } },
      (err, values) => {
        if (err) {
          console.log("Received values of form: ", values)
        } else {
          const data = {
            ...values,
            image_id: packageStore.imageIds[0],
            origin_price: this.state.origin_price,
            products: values.products.join(",")
          }

          if (packageStore.isEdit) {
            data.id = packageStore.editData.id
          }

          delete data.image_urls

          packageStore.save(data)
        }
      }
    )
  }

  handleCalPrice = value => {
    this.setState({
      origin_price: value.reduce((sum, item) => {
        return new Big(sum).plus(item.price).toString()
      }, 0)
    })
  }

  componentDidCatch() {}

  render() {
    const {
      cinemaList,
      goodsList,
      categoryList,
      form: { getFieldDecorator }
    } = this.props

    const store = this.props.packageStore

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

        <FormItem {...formItemLayout} label="套餐名称">
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "请输入套餐名称"
              }
            ],
            initialValue: store.isEdit ? store.editData.name : undefined
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="套餐内容">
          {getFieldDecorator("products", {
            rules: [
              {
                required: true,
                message: "请选择套餐内容"
              }
            ],
            initialValue: store.isEdit
              ? store.editData.products.map(item => item.id)
              : undefined
          })(
            <ProductsSelect
              goodsList={goodsList}
              onCalPrice={this.handleCalPrice}
            />
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="套餐原价">
          <span>{this.state.origin_price}元</span>
        </FormItem>

        <FormItem {...formItemLayout} label="套餐售价">
          {getFieldDecorator("present_price", {
            rules: [
              {
                required: true,
                message: "请输入套餐售价，单位（元）"
              }
            ],
            initialValue: store.editData.present_price
              ? store.editData.present_price
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
              {categoryList.map(item => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem label="套餐图片" {...formItemLayout}>
          {getFieldDecorator("image_urls", {
            rules: [{ required: true, message: "请上传套餐图片" }],
            initialValue: store.editData.image_urls
          })(<UploadList type="4" />)}
        </FormItem>

        <FormItem label="是否热门" {...formItemLayout}>
          {getFieldDecorator("is_hot", {
            rules: [{ required: true, message: "请选择是否热门" }],
            initialValue: store.editData.is_hot || 0
          })(
            <RadioGroup>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </RadioGroup>
          )}
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
