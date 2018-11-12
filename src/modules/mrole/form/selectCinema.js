import React from "react"
import { Checkbox } from "antd"
import City from "./city"
import { inject, observer } from "mobx-react"
import "./selectCinema.less"

const CheckboxGroup = Checkbox.Group

@inject("cinemaStore")
@observer
class SelectCinema extends React.Component {
  state = {
    checkedList: []
  }

  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return {
        checkedList: nextProps.value || [],
        checkAll: nextProps.value
          ? nextProps.data.length === nextProps.value.length
          : false
      }
    }

    return null
  }

  onChange = checkedList => {
    const options = this.props.data

    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < options.length,
      checkAll: checkedList.length === options.length
    })

    const onChange = this.props.onChange

    if (onChange) {
      onChange(checkedList)
    }
  }

  onCheckAllChange = e => {
    const options = this.props.data.map(item => item.id)

    this.setState({
      checkedList: e.target.checked ? options : [],
      indeterminate: false,
      checkAll: e.target.checked
    })

    const onChange = this.props.onChange

    if (onChange) {
      onChange(options)
    }
  }

  handleCityChange = val => {
    this.props.cinemaStore.getData({
      "filter[province]": val[0],
      "filter[city]": val[1],
      "filter[county]": val[2]
    })
  }

  render() {
    const options = this.props.data.map(item => ({
      label: item.name,
      value: item.id + ""
    }))

    return (
      <>
        <City onChange={this.handleCityChange} />

        <div>
          <div style={{ marginBottom: 10, borderBottom: "1px solid #E9E9E9" }}>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
              disabled={!options.length}
            >
              全部
            </Checkbox>
          </div>
          <div
            style={{
              padding: 15,
              height: 260,
              overflow: "auto",
              border: "1px solid #E9E9E9"
            }}
          >
            <CheckboxGroup
              className="select-cinema"
              options={options}
              value={this.state.checkedList}
              onChange={this.onChange}
            />
          </div>
        </div>
      </>
    )
  }
}

export default SelectCinema
