import React from "react"
import { Select } from "antd"

const Option = Select.Option

class ProductsSelect extends React.Component {
  state = {
    value: []
  }

  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return {
        value: nextProps.value || []
      }
    }

    return null
  }

  handleChange = value => {
    const { onChange } = this.props

    onChange(value)
    this.setState({ value })

    this.props.onCalPrice(
      this.props.goodsList.filter(item => value.includes(item.id))
    )
  }

  render() {
    const { value } = this.state

    return (
      <Select
        mode="multiple"
        notFoundContent="暂无商品，请先去添加"
        style={{ width: "100%" }}
        placeholder="请选择套餐商品"
        defaultValue={value}
        onChange={this.handleChange}
      >
        {this.props.goodsList.map(item => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    )
  }
}

export default ProductsSelect
