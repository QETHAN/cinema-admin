import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import styles from "./index.module.less"

const config = {
  img: "https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg",
  title: "页面出错了",
  desc: "抱歉，页面出错了"
}

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className={styles.exception}>
          <section className={styles.img}>
            <img src={config.img} alt={config.code} />
          </section>
          <section className={styles.content}>
            <h1>{config.code}</h1>
            <p className={styles.desc}>
              {config.desc}
              <br />
            </p>
            <Link to="/">&gt;&nbsp;回到首页</Link>
          </section>
        </section>
      )
    }

    return this.props.children
  }
}
