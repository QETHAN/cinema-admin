import React from "react"
import { Input } from "antd"

export default class MyInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return {
        number: nextProps.value
      }
    }
    return null
  }

  constructor(props) {
    super(props)

    const value = props.value || ""
    this.state = {
      number: value
    }
  }

  handleChange = e => {
    const number = e.target.value

    if (isNaN(number)) {
      return
    }

    if (!("value" in this.props)) {
      this.setState({ number })
    }
    this.triggerChange(number)
  }

  triggerChange = changedValue => {
    const onChange = this.props.onChange

    if (onChange) {
      onChange(changedValue)
    }
  }

  render() {
    const { before, after, placeholder, style } = this.props
    const state = this.state
    return (
      <span>
        {before}
        <Input
          type="text"
          size="small"
          value={state.number}
          onChange={this.handleChange}
          style={{ width: style.width, marginLeft: 5, marginRight: 5 }}
          placeholder={placeholder}
        />
        {after}
      </span>
    )
  }
}
