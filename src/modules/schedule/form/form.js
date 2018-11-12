import React from "react"
import { inject, observer } from "mobx-react"
import { Form, Input, Radio, Divider, DatePicker, Button, Col } from "antd"
import PriceThree from "./priceThree"
import styles from "./index.module.less"

const FormItem = Form.Item
const RadioGroup = Radio.Group
const { RangePicker } = DatePicker

@inject("scheduleStore")
@observer
class MyForm extends React.Component {
  constructor(props) {
    super(props)

    const store = this.props.scheduleStore
    store.editData.date_price_arr.slice(0, -1).forEach(item => {
      store.timeSpans.push({
        id: item.id,
        start_time: item.start_time,
        end_time: item.end_time
      })
    })
  }
  handleCancel = e => {
    this.props.onCancel()
  }

  resetFields = () => {
    this.props.form.resetFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    const { form, scheduleStore } = this.props

    form.validateFieldsAndScroll(
      { scroll: { offsetTop: 20 } },
      (err, values) => {
        if (err) {
          console.log("Received values of form: ", values)
        } else {
          scheduleStore.timeSpans.forEach((time, index) => {
            if (time.id) {
              values.date_price_arr[index]["id"] = time.id
            }
            values.date_price_arr[index]["start_time"] = time.start_time

            values.date_price_arr[index]["end_time"] = time.end_time
          })

          console.log(values)

          const data = {
            ...values
          }

          delete data.rangeTime

          if (scheduleStore.isEdit) {
            data.id = scheduleStore.editData.id
          }

          scheduleStore.save(data)
        }
      }
    )
  }

  handleAdd = () => {
    const {
      form: { validateFields }
    } = this.props

    validateFields(["rangeTime"], errors => {
      if (errors) {
        return
      } else {
        this.addTimeSpan()
      }
    })
  }

  addTimeSpan() {
    const store = this.props.scheduleStore
    const form = this.props.form
    const rangeTime = form.getFieldValue("rangeTime")
    const startTime = rangeTime[0].format("YYYY-MM-DD HH:mm:ss")
    const endTime = rangeTime[1].format("YYYY-MM-DD HH:mm:ss")

    if (store.timeSpans.map(item => item.start_time).includes(startTime)) {
      return
    }

    store.timeSpans.push({ start_time: startTime, end_time: endTime })

    store.addTimeSpan({
      start_time: startTime,
      end_time: endTime,
      price: "",
      vip_price: "",
      sale_price: "",
      timeSpan: (
        <li key={`${startTime}-li`}>
          <p key={`${startTime}-p-1`}>{startTime}</p>至
          <p key={`${startTime}-p-2`}>{endTime}</p>
        </li>
      )
    })
  }

  handleDelete = ({ id, index }) => {
    console.log(index)
    const store = this.props.scheduleStore
    store.delPlanDatePrice({ id, index })
  }

  render() {
    const {
      form: { getFieldDecorator }
    } = this.props

    const store = this.props.scheduleStore

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

    return (
      <Form onSubmit={this.handleSubmit} style={{ marginTop: 12 }}>
        <FormItem {...formItemLayout} label="所属影院">
          <span>
            {store.editData.cinema_info && store.editData.cinema_info.name}
          </span>
        </FormItem>

        <FormItem {...formItemLayout} label="电影名称">
          <span>{store.editData.film_name}</span>
        </FormItem>

        <FormItem {...formItemLayout} label="排场时间">
          <span>{store.editData.start_time}</span>
        </FormItem>

        <FormItem {...formItemLayout} label="时间段选择">
          {getFieldDecorator("rangeTime", {})(
            <RangePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime
              style={{ marginRight: 12 }}
            />
          )}
          <Button onClick={this.handleAdd}>添加</Button>
        </FormItem>

        <Divider />

        {store.editData.date_price_arr &&
          store.editData.date_price_arr.map((item, index) => (
            <FormItem
              {...formItemLayout}
              label={item.timeSpan}
              colon={false}
              className={styles.timeSpan}
              key={`${item.start_time}-pt`}
            >
              <PriceThree
                data={item}
                index={index}
                form={this.props.form}
                onDelete={this.handleDelete.bind(this, { id: item.id, index })}
              />
            </FormItem>
          ))}

        <FormItem {...formItemLayout} label="特惠票数量">
          {getFieldDecorator("sale_total", {
            rules: [
              {
                required: true,
                message: "请输入特惠票数量"
              }
            ],
            initialValue: store.isEdit ? store.editData.sale_total : undefined
          })(<Input style={{ width: 174 }} />)}
        </FormItem>

        <Divider />

        <FormItem label="电影类型" {...formItemLayout}>
          {getFieldDecorator("type", {
            rules: [{ required: true, message: "请选择电影类型" }],
            initialValue: store.editData.type || "Normal"
          })(
            <RadioGroup>
              <Radio value="Normal">普通</Radio>
              <Radio value="3D">3D</Radio>
              <Radio value="MAX">MAX</Radio>
              <Radio value="MAX3D">MAX3D</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <FormItem label="电影语言" {...formItemLayout}>
          {getFieldDecorator("lang", {
            rules: [{ required: true, message: "请选择电影语言" }],
            initialValue: store.editData.lang || "国语"
          })(
            <RadioGroup>
              <Radio value="国语">国语</Radio>
              <Radio value="英语">英语</Radio>
            </RadioGroup>
          )}
        </FormItem>

        <Divider />

        <FormItem style={{ marginTop: 30 }}>
          <Col offset={6} span={16}>
            <Button style={{ marginRight: 8 }} onClick={this.handleCancel}>
              取消
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={store.saveLoading}
            >
              {store.saveLoading ? "保存中" : "确定"}
            </Button>
          </Col>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(MyForm)
