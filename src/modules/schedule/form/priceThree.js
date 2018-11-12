import React from "react"
import { Form, Input, Button } from "antd"

const FormItem = Form.Item

class PriceThree extends React.Component {
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }

    const {
      form: { getFieldDecorator },
      data,
      index
    } = this.props

    return (
      <>
        <FormItem label="会员价格" {...formItemLayout}>
          {getFieldDecorator(
            data.is_default ? "price" : `date_price_arr[${index}]['price']`,
            {
              rules: [
                {
                  required: true,
                  message: "请输入会员价格"
                }
              ],
              initialValue: data.price
            }
          )(<Input style={{ width: 174 }} />)}
        </FormItem>
        <FormItem label="VIP价格" {...formItemLayout}>
          {getFieldDecorator(
            data.is_default
              ? "vip_price"
              : `date_price_arr[${index}]['vip_price']`,
            {
              rules: [
                {
                  required: true,
                  message: "请输入VIP价格"
                }
              ],
              initialValue: data.vip_price
            }
          )(<Input style={{ width: 174 }} />)}
        </FormItem>
        <FormItem label="特惠价格" {...formItemLayout}>
          {getFieldDecorator(
            data.is_default
              ? "sale_price"
              : `date_price_arr[${index}]['sale_price']`,
            {
              rules: [
                {
                  required: true,
                  message: "请输入特惠价格"
                }
              ],
              initialValue: data.sale_price
            }
          )(<Input style={{ width: 174 }} />)}
          {!data.is_default && (
            <Button
              icon="delete"
              style={{ marginLeft: 12 }}
              onClick={this.props.onDelete}
            >
              删除时间段
            </Button>
          )}
        </FormItem>
      </>
    )
  }
}

export default PriceThree
