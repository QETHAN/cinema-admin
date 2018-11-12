import React from "react"
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Radio,
  Divider,
  Checkbox,
  DatePicker
} from "antd"
import moment from "moment"
import styles from "./index.module.less"
import City from "./city"
import { observer, inject } from "mobx-react"

const FormItem = Form.Item
const RadioGroup = Radio.Group

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

@inject("merchantStore")
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
            merchantStore: {
              isEdit,
              editData: { id }
            }
          } = this.props

          const data = {
            ...values,
            province,
            city,
            county,
            resource: values.resource.join(","),
            start_time: values.start_time.format("YYYY-MM-DD HH:mm:ss"),
            end_time: values.end_time.format("YYYY-MM-DD HH:mm:ss"),
            merchant_admin_password: "123456"
          }

          if (isEdit) {
            data.id = id
          }

          delete data.area

          this.props.merchantStore.save(data)
        }
      }
    )
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldsError }
    } = this.props

    const store = this.props.merchantStore

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={48}>
          <Col span={12}>
            <FormItem label="商户名称" className={styles.formItem}>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入商户名称" }],
                initialValue: store.editData.name
              })(<Input placeholder="请输入商户名称" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="登录账号" className={styles.formItem}>
              {getFieldDecorator("merchant_admin_username", {
                rules: [{ required: true, message: "请输入登录账号" }],
                initialValue: store.editData.merchant_admin_username
              })(<Input placeholder="请输入登录账号" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={48}>
          <Col span={12}>
            <FormItem label="所属区域" className={styles.formItem}>
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
          </Col>
          {store.isEdit ? (
            <Col span={12}>
              <FormItem label="登录密码" className={styles.formItem}>
                <Button>重置登录密码</Button>
              </FormItem>
            </Col>
          ) : null}
        </Row>
        <FormItem label="手机号码" className={styles.formItem}>
          <Col span={8}>
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "请输入手机号码" }],
              initialValue: store.editData.phone
            })(<Input placeholder="请输入手机号码" />)}
          </Col>
        </FormItem>
        <FormItem label="联系人信息" className={styles.formItem}>
          {getFieldDecorator("user_info", {
            rules: [{ required: true, message: "请输入联系人信息" }],
            initialValue: store.editData.user_info
          })(<Input placeholder="请输入联系人信息" />)}
        </FormItem>
        <Divider />
        <FormItem label="影院类型" className={styles.formItem}>
          {getFieldDecorator("cinema_type", {
            rules: [{ required: true, message: "请选择影院类型" }],
            initialValue: store.editData.cinema_type
          })(
            <RadioGroup>
              <Radio value={1}>独立</Radio>
              <Radio value={2}>连锁</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label="功能选择" className={styles.formItem}>
          {getFieldDecorator("resource", {
            rules: [{ required: true, message: "请选择功能" }],
            initialValue: store.editData.resource
              ? store.editData.resource.split(",")
              : []
          })(
            <Checkbox.Group
              style={{ width: "100%" }}
              onChange={this.handleCheckBoxChange}
            >
              <Row>
                <Col span={8}>
                  <Checkbox value="1" style={{ marginBottom: 5 }}>
                    当日要提醒
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="2" style={{ marginBottom: 5 }}>
                    会员登记
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="3" style={{ marginBottom: 5 }}>
                    会员类型
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="4" style={{ marginBottom: 5 }}>
                    库存管理
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="5" style={{ marginBottom: 5 }}>
                    卖品管理
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="6" style={{ marginBottom: 5 }}>
                    活管理
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          )}
        </FormItem>
        <FormItem
          label="生效日期"
          className={styles.formItem}
          style={{ marginBottom: 30 }}
          required
        >
          <Col span={8}>
            <FormItem>
              {getFieldDecorator("start_time", {
                rules: [{ required: true, message: "请输入开始日期" }],
                initialValue: store.editData.start_time
                  ? moment(store.editData.start_time, "YYYY-MM-DD HH:mm:ss")
                  : null
              })(
                <DatePicker
                  style={{ width: "100%" }}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                />
              )}
            </FormItem>
          </Col>
          <Col span={2}>
            <span
              style={{
                display: "inline-block",
                width: "100%",
                textAlign: "center"
              }}
            >
              至
            </span>
          </Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator("end_time", {
                rules: [{ required: true, message: "请输入结束日期" }],
                initialValue: store.editData.end_time
                  ? moment(store.editData.end_time, "YYYY-MM-DD HH:mm:ss")
                  : null
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
            </FormItem>
          </Col>
        </FormItem>
        <FormItem label="单影票收取手续费" className={styles.formItem}>
          <Col span={8}>
            {getFieldDecorator("tax_fee", {
              initialValue: store.editData.tax_fee
            })(<Input placeholder="请输入手续费" addonAfter="元" />)}
          </Col>
        </FormItem>
        <FormItem label="影院开通版本" className={styles.formItem}>
          {getFieldDecorator("cinema_version", {
            rules: [{ required: true, message: "请选择开通版本" }],
            initialValue: store.editData.cinema_version
          })(
            <RadioGroup>
              <Radio value={1}>订票版本</Radio>
              <Radio value={2}>购票版本</Radio>
            </RadioGroup>
          )}
        </FormItem>
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
