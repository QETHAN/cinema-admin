import React from "react"
import { Upload, Icon, Modal } from "antd"
import { inject, observer } from "mobx-react"

@inject("appStore", "cinemaStore")
@observer
class UploadList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: props.form.getFieldValue(props.name)
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleChange = ({ file, fileList, event }) => {
    const { onChange } = this.props
    onChange(fileList)

    const store = this.props.cinemaStore

    if (file.status === "done") {
      store.setImageIds(file.response)
    }

    if (file.status === "removed") {
      store.removeImageIds(fileList.map(item => item.uid))
    }

    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action={`${process.env.REACT_APP_UPLOAD_URL}image/upload`}
          listType="picture-card"
          name="images"
          headers={{ "X-Api-Key": this.props.appStore.token }}
          data={{ type: this.props.type }}
          withCredentials={true}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 6 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="图片" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default UploadList
