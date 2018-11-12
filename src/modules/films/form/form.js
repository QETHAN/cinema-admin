import React from "react"
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Divider,
  Checkbox,
  DatePicker
} from "antd"
import { observer, inject } from "mobx-react"
import moment from "moment"

import styles from "./index.module.less"
import UploadList from "./uploadList"

const FormItem = Form.Item
const TextArea = Input.TextArea
const CheckboxGroup = Checkbox.Group

const formatOptions = [
  { label: "4DX", value: 1 },
  { label: "3DIMAX", value: 2 },
  { label: "3D", value: 3 },
  { label: "2D", value: 4 }
]

const languageOptions = [
  { label: "中文", value: 1 },
  { label: "英文", value: 2 }
]

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

@inject("filmsStore")
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
          const {
            filmsStore: {
              isEdit,
              editData: { id }
            }
          } = this.props

          const data = { ...values }

          data.image_ids = this.props.filmsStore.getImageIds()
          data.poster_ids = this.props.filmsStore.getPosterIds()

          if (isEdit) {
            data.id = id
            delete data.image_urls
            delete data.poster_urls
          }

          this.props.filmsStore.save(data)
        }
      }
    )
  }

  render() {
    const dividerStyle = {
      marginTop: 12,
      marginBottom: 12,
      marginLeft: 0,
      marginRight: 0
    }

    const {
      form: { getFieldDecorator, getFieldsError }
    } = this.props

    const store = this.props.filmsStore

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        <FormItem label="电影名称" style={{ marginBottom: 0 }}>
          <span>{store.editData.name}</span>
        </FormItem>

        <Divider style={dividerStyle} />

        <FormItem label="电影推荐" className={styles.formItem}>
          {getFieldDecorator("recommend", {
            rules: [{ required: true, message: "请输入电影推荐" }],
            initialValue: store.editData.recommend
          })(
            <TextArea placeholder="请输入电影推荐" autosize={{ minRows: 3 }} />
          )}
        </FormItem>

        <Row gutter={48}>
          <Col span={12}>
            <FormItem label="电影类型" className={styles.formItem}>
              {getFieldDecorator("category", {
                rules: [{ required: true, message: "请输入电影类型称" }],
                initialValue: store.editData.category
              })(<Input placeholder="请输入电影类型" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="电影时长" className={styles.formItem}>
              {getFieldDecorator("length", {
                rules: [{ required: true, message: "请输入电影时长" }],
                initialValue: store.editData.length
              })(<Input placeholder="请输入电影时长" addonAfter="分钟" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={48}>
          <Col span={12}>
            <FormItem label="导演" className={styles.formItem}>
              {getFieldDecorator("director", {
                rules: [{ required: true, message: "请输入导演" }],
                initialValue: store.editData.director
              })(<Input placeholder="请输入导演" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="制片人" className={styles.formItem}>
              {getFieldDecorator("movie_maker", {
                rules: [{ required: true, message: "请输入制片人" }],
                initialValue: store.editData.movie_maker
              })(<Input placeholder="请输入制片人" />)}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={48}>
          <Col span={12}>
            <FormItem label="演员" className={styles.formItem}>
              {getFieldDecorator("actor", {
                rules: [{ required: true, message: "请输入演员" }],
                initialValue: store.editData.actor
              })(<Input placeholder="请输入演员" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="发行商" className={styles.formItem}>
              {getFieldDecorator("publisher", {
                rules: [{ required: true, message: "请输入发行商" }],
                initialValue: store.editData.publisher
              })(<Input placeholder="请输入发行商" />)}
            </FormItem>
          </Col>
        </Row>

        <FormItem label="电影格式" className={styles.formItem}>
          {getFieldDecorator("format", {
            rules: [{ required: true, message: "请选择电影格式" }],
            initialValue: store.editData.format
          })(<CheckboxGroup options={formatOptions} />)}
        </FormItem>

        <FormItem label="电影语言" className={styles.formItem}>
          {getFieldDecorator("language", {
            rules: [{ required: true, message: "请选择电影语言" }],
            initialValue: store.editData.language
          })(<CheckboxGroup options={languageOptions} />)}
        </FormItem>

        <FormItem label="上映时间" className={styles.formItem}>
          {getFieldDecorator("release_date", {
            rules: [{ required: true, message: "请输入结束日期" }],
            initialValue: store.editData.release_date
              ? moment(store.editData.release_date, "YYYY-MM-DD")
              : null
          })(<DatePicker showTime format="YYYY-MM-DD" />)}
        </FormItem>

        <FormItem label="电影剧情" className={styles.formItem}>
          {getFieldDecorator("plot", {
            rules: [{ required: true, message: "请输入电影剧情" }],
            initialValue: store.editData.plot
          })(
            <TextArea placeholder="请输入电影剧情" autosize={{ minRows: 3 }} />
          )}
        </FormItem>

        <FormItem label="电影视频" className={styles.formItem}>
          {getFieldDecorator("trailer_url", {
            rules: [{ required: true, message: "请输入电影视频链接地址" }],
            initialValue: store.editData.trailer_url
          })(<Input placeholder="请输入电影视频链接地址" />)}
        </FormItem>

        <Divider />

        <FormItem label="电影海报" className={styles.formItem}>
          {getFieldDecorator("poster_urls", {
            rules: [{ required: true, message: "请上传电影海报" }],
            initialValue: store.editData.poster_urls
          })(
            <UploadList
              form={this.props.form}
              name="poster_urls"
              id={store.editData.id}
              type="5"
            />
          )}
        </FormItem>

        <FormItem label="电影图片" className={styles.formItem}>
          {getFieldDecorator("image_urls", {
            rules: [{ required: true, message: "请上传电影图片" }],
            initialValue: store.editData.image_urls
          })(
            <UploadList
              form={this.props.form}
              name="image_urls"
              id={store.editData.id}
              type="1"
            />
          )}
        </FormItem>

        <Divider />

        <Row gutter={48}>
          <Col span={12}>
            <FormItem label="购票人数加" className={styles.formItem}>
              {getFieldDecorator("buy_count", {
                rules: [{ required: true, message: "请输入购票人数" }],
                initialValue: store.editData.buy_count
              })(<Input placeholder="请输入购票人数" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="想看人数加" className={styles.formItem}>
              {getFieldDecorator("want_see_count", {
                rules: [{ required: true, message: "请输入想看人数" }],
                initialValue: store.editData.want_see_count
              })(<Input placeholder="请输入想看人数" />)}
            </FormItem>
          </Col>
        </Row>

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
