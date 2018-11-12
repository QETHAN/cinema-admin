import React from "react"
import { Cascader } from "antd"
import { inject, observer } from "mobx-react"

@inject("appStore", "cinemaStore")
@observer
class City extends React.Component {
  constructor(props) {
    super(props)
    this.props.appStore.getCities()
  }

  handleChange = (val, selectedOptions) => {
    // 请求影院接口
    console.log(val)
    this.props.onChange(val)
  }

  render() {
    return (
      <Cascader
        placeholder="请选择所属区域"
        options={this.props.appStore.cities}
        onChange={this.handleChange}
      />
    )
  }
}

export default City
