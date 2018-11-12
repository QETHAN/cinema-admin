import React from "react"
import { Row, Col, Form, Input, Button, Divider, Select, Spin } from "antd"
import { withRouter } from "react-router-dom"
import styles from "./index.module.less"
import City from "./city"
import { observer, inject } from "mobx-react"

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

@inject("userStore", "appStore")
@observer
class MyForm extends React.Component {
  constructor(props) {
    super(props)
    props.appStore.getArea(0)
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

  handleResetPwd = e => {
    const editData = this.props.userStore.editData
    this.props.userStore.resetPwd({
      ...editData,
      id: editData.uid,
      ic_password: "123456"
    })
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
          const [province, city, district] = values.area
          const {
            userStore: {
              editData: { uid }
            }
          } = this.props

          const data = {
            ...values,
            province,
            city,
            district,
            id: uid
          }

          delete data.area

          this.props.userStore.save(data)
        }
      }
    )
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldsError }
    } = this.props
    const store = this.props.userStore
    console.log("store--------------->", store)
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

    const monthOptions = [...Array(12).keys()].map(month => (
      <Option value={month + 1} key={month}>
        {month + 1}
      </Option>
    ))

    const dayOfMonthOptions = [...Array(31).keys()].map(day => (
      <Option value={day + 1} key={day}>
        {day + 1}
      </Option>
    ))

    return (
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 300
        }}
      >
        {store.listLoading ? (
          <Spin />
        ) : (
          <Form
            onSubmit={this.handleSubmit}
            layout="inline"
            style={{ width: 848, margin: "0 auto", marginTop: 24 }}
          >
            <Row gutter={48}>
              <Col span={12}>
                <FormItem
                  label="会员UID"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("uid", {
                    rules: [{ required: true, message: "请输入会员UID" }],
                    initialValue: store.editData.uid
                  })(<Input placeholder="请输入会员UID" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="注册日期"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("created")(<span>2018-10-15</span>)}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={48}>
              <Col span={12}>
                <FormItem
                  label="注册手机号"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("phone", {
                    rules: [{ required: true, message: "请输入注册手机号" }],
                    initialValue: store.editData.phone
                  })(<Input placeholder="请输入注册手机号" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="用户昵称"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("nickname", {
                    rules: [{ required: true, message: "请输入用户昵称" }],
                    initialValue: store.editData.nickname
                  })(<Input placeholder="请输入用户昵称" />)}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={48}>
              <Col span={12}>
                <FormItem
                  label="会员类型"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("type", {
                    rules: [{ required: true, message: "请选择会员类型" }],
                    initialValue: store.editData.type
                  })(
                    <Select style={{ width: 174 }} placeholder="会员类型">
                      <Option value="1">普通会员</Option>
                      <Option value="2">高级会员</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row gutter={48}>
              <Col span={12}>
                <FormItem
                  label="IC卡号"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("ic_id", {
                    rules: [{ required: true, message: "请输入IC卡号" }],
                    initialValue: store.editData.ic_id
                  })(<Input placeholder="请输入IC卡号" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem className={styles.formItem} {...formLayout}>
                  <Button
                    onClick={this.handleResetPwd}
                    loading={store.resetLoading}
                  >
                    {store.resetLoading ? "正在重置中..." : "重置IC卡密码"}
                  </Button>
                </FormItem>
              </Col>
            </Row>

            <Row gutter={48}>
              <Col span={8}>
                <FormItem
                  label="发卡日期"
                  className={styles.formItem}
                  {...formLayout}
                >
                  <span>{store.editData.ic_create}</span>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="有效期"
                  className={styles.formItem}
                  {...formLayout}
                >
                  <span>{store.editData.ic_expire}</span>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="登记店面"
                  className={styles.formItem}
                  {...formLayout}
                >
                  <span>{store.editData.ic_store_name}</span>
                </FormItem>
              </Col>
            </Row>

            <Row gutter={48}>
              <Col span={12}>
                <FormItem
                  label="IC卡手机号"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("ic_phone", {
                    rules: [{ required: true, message: "请输入IC卡手机号" }],
                    initialValue: store.editData.ic_phone
                  })(<Input placeholder="请输入IC卡手机号" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="电子邮箱"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("email", {
                    rules: [{ required: true, message: "请输入电子邮箱" }],
                    initialValue: store.editData.email
                  })(<Input placeholder="请输入电子邮箱" />)}
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row gutter={48}>
              <Col span={12}>
                <FormItem
                  label="姓名"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("name", {
                    rules: [{ required: true, message: "请输入姓名" }],
                    initialValue: store.editData.name
                  })(<Input placeholder="请输入姓名" />)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="性别"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("gender", {
                    initialValue: store.editData.gender
                  })(
                    <Select style={{ width: 174 }} placeholder="请选择性别">
                      <Option value={1}>男</Option>
                      <Option value={2}>女</Option>
                      <Option value={0}>未知</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={48}>
              <Col span={12}>
                <FormItem
                  label="生日"
                  className={styles.formItem}
                  {...formLayout}
                >
                  <Col span={12}>
                    <FormItem className={styles.formItem}>
                      {getFieldDecorator("birthday_month", {
                        rules: [{ required: true, message: "请选择生日月份" }],
                        initialValue: store.editData.birthday_month
                      })(
                        <Select
                          style={{ width: 96, marginRight: 2 }}
                          placeholder="请选择月"
                        >
                          {monthOptions}
                        </Select>
                      )}
                      月
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem className={styles.formItem}>
                      {getFieldDecorator("birthday_day", {
                        rules: [{ required: true, message: "请选择生日天数" }],
                        initialValue: store.editData.birthday_day
                      })(
                        <Select
                          style={{ width: 96, marginRight: 6 }}
                          placeholder="请选择日"
                        >
                          {dayOfMonthOptions}
                        </Select>
                      )}
                      日
                    </FormItem>
                  </Col>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="身份证号"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("identity_id", {
                    initialValue: store.editData.identity_id
                  })(<Input placeholder="请输入身份证号" />)}
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row>
              <Col span="12">
                <FormItem
                  label="所在地区"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("area", {
                    rules: [{ required: true, message: "请选择所属区域" }],
                    initialValue: store.editData.province
                      ? [
                          store.editData.province,
                          store.editData.city,
                          store.editData.district
                        ]
                      : []
                  })(<City form={this.props.form} />)}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="18" sm={{ offset: 4 }}>
                <FormItem label="" className={styles.formItem} {...formLayout}>
                  {getFieldDecorator("street_address", {
                    initialValue: store.editData.street_address
                  })(<Input placeholder="请输入街道地址" />)}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span="24" sm={{ pull: 4 }}>
                <FormItem
                  label="备注"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("Remarks", {
                    initialValue: store.editData.Remarks
                  })(
                    <TextArea
                      placeholder="请输入备注"
                      autosize={{ minRows: 3 }}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={48}>
              <Col span={12}>
                <FormItem
                  label="余额"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("balance", {})(<span>6666</span>)}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="积分"
                  className={styles.formItem}
                  {...formLayout}
                >
                  {getFieldDecorator("points", {})(<span>2018</span>)}
                </FormItem>
              </Col>
            </Row>

            <Divider />

            <Row>
              <Col span="24">
                <FormItem
                  style={{
                    textAlign: "center",
                    marginTop: 12
                  }}
                  className={styles.formItem}
                >
                  <Button
                    style={{ marginRight: 8 }}
                    onClick={this.handleCancel}
                  >
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
              </Col>
            </Row>
          </Form>
        )}
      </Row>
    )
  }
}

const UserInfo = Form.create()(withRouter(MyForm))

export default UserInfo
