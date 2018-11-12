import React from "react"
import styled from "./index.module.less"
import exceptionConfig from "./config"
import PropTypes from "prop-types"

const Exception = ({ img, code, desc }) => (
  <section className={styled.exception}>
    <section className={styled.img}>
      <img src={img || exceptionConfig[code].img} alt={code} />
    </section>
    <section className={styled.content}>
      <h1>{code}</h1>
      <p className={styled.desc}>{desc || exceptionConfig[code].desc}</p>
    </section>
  </section>
)
Exception.propTypes = {
  img: PropTypes.string,
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  desc: PropTypes.string
}
Exception.defaultProps = {
  code: 404
}
export default Exception
