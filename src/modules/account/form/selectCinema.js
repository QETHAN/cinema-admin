import React from "react"
import { Checkbox } from "antd"
import City from "./city"
import { inject, observer } from "mobx-react"

const CheckboxGroup = Checkbox.Group

const plainOptions = ["Apple", "Pear", "Orange"]
const defaultCheckedList = ["Apple", "Orange"]

@inject("cinemaStore")
@observer
class SelectCinema extends React.Component {
  constructor(props) {
    super(props)

    const value = props.value || ""
    this.state = {
      value
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return {
        value: nextProps.value
      }
    }
    return null
  }

  handleChange = e => {
    const value = e.target.value

    if (isNaN(value)) {
      return
    }

    if (!("value" in this.props)) {
      this.setState({ value })
    }
    this.triggerChange(value)
  }

  triggerChange = changedValue => {
    const onChange = this.props.onChange

    if (onChange) {
      onChange(changedValue)
    }
  }

  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length
    })
  }

  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked
    })
  }

  handleCityChange = val => {
    this.props.cinemaStore.getData({
      "filter[province]": val[0],
      "filter[city]": val[1],
      "filter[county]": val[2]
    })
  }

  render() {
    const state = this.state

    return (
      <>
        <City onChange={this.handleCityChange} />

        <div>
          <div style={{ borderBottom: "1px solid #E9E9E9" }}>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
              全部
            </Checkbox>
          </div>
          <br />
          <CheckboxGroup
            options={this.props.cinemaStore.listData}
            value={this.state.checkedList}
            onChange={this.onChange}
          />
        </div>
      </>
    )
  }
}

export default SelectCinema
