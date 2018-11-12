import React from "react"
import { Icon } from "antd"
import PropTypes from "prop-types"

const FilterIcon = ({ type, activeColor, filtered }) => (
  <Icon type={type} style={{ color: filtered ? activeColor : "#aaa" }} />
)
FilterIcon.propTypes = {
  type: PropTypes.string,
  filtered: PropTypes.bool,
  activeColor: PropTypes.string
}

FilterIcon.defaultProps = {
  type: "search",
  activeColor: "#13c2c2"
}
export default FilterIcon
