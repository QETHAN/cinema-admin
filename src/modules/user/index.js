import React from "react"
import { withRouter } from "react-router-dom"
import AuthWrapper from "components/authWrapper"
import List from "./list"
import AdminForm from "./form"
import { observer, inject } from "mobx-react"
import queryString from "query-string"

@inject("userStore")
@observer
class User extends React.Component {
  getPageParams(props) {
    const { page, size } = props.userStore

    const query = queryString.parse(props.location.search)
    const pagination = {
      page: query.page ? parseInt(query.page) : page,
      size: query["per-page"] ? parseInt(query["per-page"]) : size
    }
    props.userStore.setPagination(pagination.page, pagination.size)
  }

  getData = props => {
    this.getPageParams(props)

    this.props.userStore.getData()
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // 不再提供 prevProps 的获取方式
  //   const query = queryString.parse(nextProps.location.search)
  //   debugger
  //   if (query.page !== prevState.page || query["per-page"] !== prevState.size) {
  //     return {
  //       page: query.page,
  //       size: query["per-page"]
  //     }
  //   }

  //   // 默认不改动 state
  //   return null
  // }

  componentWillReceiveProps(nextProps) {
    console.log("props------>", nextProps)
    this.getData(nextProps)
  }

  componentDidMount() {
    this.getData(this.props)
  }

  componentWillUnmount() {
    sessionStorage.removeItem("page")
    sessionStorage.removeItem("size")
  }

  render() {
    const { listData } = this.props.userStore

    return (
      <>
        <AdminForm />
        <List data={listData} route={this.props.route} />
      </>
    )
  }
}

export default AuthWrapper(withRouter(User))
