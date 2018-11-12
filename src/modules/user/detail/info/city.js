import React from "react"
import { Cascader } from "antd"
import { inject, observer } from "mobx-react"

@inject("merchantStore", "appStore")
@observer
class City extends React.Component {
  handleChange = (val, selectedOptions) => {
    const { onChange } = this.props
    onChange(val)
  }

  render() {
    const area = this.props.form.getFieldValue("area")
    const options = this.props.appStore.cities
    return (
      <Cascader
        placeholder="请选择所属区域"
        options={options}
        defaultValue={area}
        onChange={this.handleChange}
        changeOnSelect
      />
    )
  }
}

export default City
