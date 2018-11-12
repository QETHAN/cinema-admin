import React from "react"
import { Row, Col, Form, Input, Button, Radio, Divider } from "antd"

import styles from "./index.module.less"
import City from "./city"
import { observer, inject } from "mobx-react"
import UploadList from "./uploadList"
import MyInput from "./input"

const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

@inject("cinemaStore")
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
          const [province, city, county] = values.area
          const {
            cinemaStore: {
              isEdit,
              editData: { id }
            }
          } = this.props

          const data = {
            ...values,
            province,
            city,
            county
          }

          data.image_ids = this.props.cinemaStore.getImageIds()

          if (isEdit) {
            data.id = id
          }

          delete data.image_urls
          delete data.images
          delete data.area

          this.props.cinemaStore.save(data)
        }
      }
    )
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldsError }
    } = this.props

    const store = this.props.cinemaStore

    const formLayout = {
      labelCol: {
        xs: 24,
        sm: 5
      },
      wrapperCol: {
        xs: 24,
        sm: 14
      }
    }

    const formLayout2 = {
      labelCol: {
        xs: 24,
        sm: 7
      },
      wrapperCol: {
        xs: 24,
        sm: 17
      }
    }

    const formLayout3 = {
      labelCol: {
        xs: 24,
        sm: 10
      },
      wrapperCol: {
        xs: 24,
        sm: 14
      }
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="影院名称" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入影院名称" }],
            initialValue: store.editData.name
          })(<Input placeholder="请输入商户名称" />)}
        </FormItem>

        <FormItem label="所属区域" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("area", {
            rules: [{ required: true, message: "请选择所属区域" }],
            initialValue: store.editData.province
              ? [
                  store.editData.province,
                  store.editData.city,
                  store.editData.county
                ]
              : []
          })(<City form={this.props.form} />)}
        </FormItem>

        <FormItem label="街道地址" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("address", {
            rules: [{ required: true, message: "请输入街道地址" }],
            initialValue: store.editData.address
          })(<Input placeholder="请输入街道地址" />)}
        </FormItem>

        <FormItem label="电话" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("phone", {
            rules: [{ required: true, message: "请输入电话" }],
            initialValue: store.editData.phone
          })(<Input placeholder="请输入电话" />)}
        </FormItem>

        <FormItem label="公交" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("vehicle", {
            rules: [{ required: true, message: "请输入公交" }],
            initialValue: store.editData.vehicle
          })(<Input placeholder="请输入公交" />)}
        </FormItem>

        <FormItem
          label="特色服务介绍"
          className={styles.formItem}
          {...formLayout}
        >
          {getFieldDecorator("special_info", {
            rules: [{ required: true, message: "请输入特色服务介绍" }],
            initialValue: store.editData.special_info
          })(
            <TextArea
              placeholder="请输入特色服务介绍"
              autosize={{ minRows: 3 }}
            />
          )}
        </FormItem>

        <FormItem label="介绍" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("info", {
            rules: [{ required: true, message: "请输入介绍" }],
            initialValue: store.editData.info
          })(<TextArea placeholder="请输入介绍" autosize={{ minRows: 3 }} />)}
        </FormItem>

        <FormItem label="图片" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("images", {
            rules: [{ required: true, message: "请上传图片" }],
            initialValue: store.editData.image_urls || []
          })(<UploadList form={this.props.form} name="images" type="2" />)}
        </FormItem>

        <Divider />

        <FormItem label="中鑫ID" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("zx_id", {
            // rules: [{ required: true, message: "请输入中鑫ID" }],
            initialValue: store.editData.zx_id
          })(<Input placeholder="请输入中鑫ID" />)}
        </FormItem>
        <FormItem label="天工ID" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("tg_id", {
            // rules: [{ required: true, message: "请输入天工ID" }],
            initialValue: store.editData.tg_id
          })(<Input placeholder="请输入天工ID" />)}
        </FormItem>

        <FormItem
          label="影院URL识别参数"
          className={styles.formItem}
          {...formLayout}
        >
          {getFieldDecorator("param", {
            // rules: [{ required: true, message: "请输入影院URL识别参数" }],
            initialValue: store.editData.param
          })(<Input placeholder="请输入影院URL识别参数" />)}
        </FormItem>
        <FormItem
          label="微信支付key"
          className={styles.formItem}
          {...formLayout}
        >
          {getFieldDecorator("wx_key", {
            // rules: [{ required: true, message: "请输入微信支付key" }],
            initialValue: store.editData.wx_key
          })(<Input placeholder="请输入微信支付key" />)}
        </FormItem>
        <FormItem
          label="微信secret"
          className={styles.formItem}
          {...formLayout}
        >
          {getFieldDecorator("wx_secret", {
            // rules: [{ required: true, message: "请输入微信secret" }],
            initialValue: store.editData.wx_secret
          })(<Input placeholder="请输入微信secret" />)}
        </FormItem>
        <FormItem
          label="微信mch-id"
          className={styles.formItem}
          {...formLayout}
        >
          {getFieldDecorator("wx_mch_id", {
            // rules: [{ required: true, message: "请输入微信mch-id" }],
            initialValue: store.editData.wx_mch_id
          })(<Input placeholder="请输入微信mch-id" />)}
        </FormItem>
        <FormItem label="微信APPID" className={styles.formItem} {...formLayout}>
          {getFieldDecorator("wx_app_id", {
            // rules: [{ required: true, message: "请输入微信APPID" }],
            initialValue: store.editData.wx_app_id
          })(<Input placeholder="请输入微信APPID" />)}
        </FormItem>

        <Divider />

        <Row gutter={48}>
          <Col span={12}>
            <FormItem
              label="是否可退票"
              className={styles.formItem}
              {...formLayout2}
            >
              {getFieldDecorator("allow_refund_ticket", {
                // rules: [{ required: true, message: "请选择是否可退票" }],
                initialValue: store.editData.allow_refund_ticket || 1
              })(
                <RadioGroup>
                  <Radio value={1}>不可退票</Radio>
                  <Radio value={2}>可退票</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="退票时限"
              className={styles.formItem}
              {...formLayout2}
            >
              {getFieldDecorator("refund_ticket_limit_minute", {
                // rules: [{ required: true, message: "请输入退票时限" }],
                initialValue: store.editData.refund_ticket_limit_minute
              })(
                <MyInput
                  before={<span>影片开始前</span>}
                  after={<span>分钟</span>}
                  style={{ width: 50 }}
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem
          label="影片支付时间限制"
          className={styles.formItem}
          {...formLayout}
        >
          {getFieldDecorator("user_buy_ticket_limit_minute", {
            // rules: [{ required: true, message: "请输入影片支付时间限制" }],
            initialValue: store.editData.user_buy_ticket_limit_minute
          })(
            <MyInput
              before={<span>影片开始前</span>}
              after={<span>分钟停止购买</span>}
              style={{ width: 50 }}
            />
          )}
        </FormItem>

        <Row gutter={48}>
          <Col span={12}>
            <FormItem
              label="会员生日消息提示"
              className={styles.formItem}
              {...formLayout3}
            >
              {getFieldDecorator("allow_user_birthday_tip", {
                // rules: [{ required: true, message: "请选择会员生日消息提示" }],
                initialValue: store.editData.allow_user_birthday_tip || 1
              })(
                <RadioGroup>
                  <Radio value={1}>不提示</Radio>
                  <Radio value={2}>提示</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="提示时间"
              className={styles.formItem}
              {...formLayout2}
            >
              {getFieldDecorator("user_birthday_tip_limit_day", {
                // rules: [{ required: true, message: "请输入提示时间" }],
                initialValue: store.editData.user_birthday_tip_limit_day
              })(
                <MyInput
                  before={<span>生日前</span>}
                  after={<span>分钟</span>}
                  style={{ width: 50 }}
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem
          label="单一订单最多可允许积分兑换金额"
          className={styles.formItem}
          labelCol={{
            xs: 24,
            sm: 8
          }}
        >
          {getFieldDecorator("user_points_use_limit", {
            initialValue: store.editData.user_points_use_limit
          })(
            <MyInput
              after={<span>元（一个积分相当于一分钱）</span>}
              style={{ width: 50 }}
            />
          )}
        </FormItem>

        <Divider />

        <FormItem
          label="普通会员单日购片数量限制"
          className={styles.formItem}
          labelCol={{ xs: 24, sm: 7 }}
          wrapperCol={{ xs: 24, sm: 17 }}
        >
          <Row gutter={48}>
            <Col span={12}>
              <FormItem label="普通会员票" {...formLayout3}>
                {getFieldDecorator("user_buy_ticket_limit", {
                  initialValue: store.editData.user_buy_ticket_limit
                })(<MyInput after={<span>张</span>} style={{ width: 80 }} />)}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label="特惠票" {...formLayout2}>
                {getFieldDecorator("user_buy_sale_ticket_limit", {
                  initialValue: store.editData.user_buy_sale_ticket_limit
                })(<MyInput after={<span>张</span>} style={{ width: 80 }} />)}
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          label="VIP会员单日购片数量限制"
          className={styles.formItem}
          labelCol={{ xs: 24, sm: 7 }}
          wrapperCol={{ xs: 24, sm: 17 }}
        >
          <Row gutter={48}>
            <Col span={12}>
              <FormItem label="VIP会员票" {...formLayout3}>
                {getFieldDecorator("vip_user_buy_ticket_limit", {
                  initialValue: store.editData.vip_user_buy_ticket_limit
                })(<MyInput after={<span>张</span>} style={{ width: 80 }} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="特惠票" {...formLayout2}>
                {getFieldDecorator("vip_user_buy_sale_ticket_limit", {
                  initialValue: store.editData.vip_user_buy_sale_ticket_limit
                })(<MyInput after={<span>张</span>} style={{ width: 80 }} />)}
              </FormItem>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          style={{ marginTop: -10 }}
          extra="说明： 购片限制以天为单位， 时间区间为凌晨6点到次日六点"
        />

        <Divider />

        <FormItem
          style={{ marginTop: 30, textAlign: "center" }}
          className={styles.formItem}
        >
          <Button style={{ marginRight: 8 }} onClick={this.handleCancel}>
            取消
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={store.saveLoading}
            disabled={hasErrors(getFieldsError())}
          >
            {store.saveLoading ? "保存中" : "确定"}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedAddForm = Form.create()(MyForm)

export default WrappedAddForm
