import { Component } from "react"
import Axios from "axios"
import { message } from "antd"

Axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
Axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
Axios.defaults.timeout = 30000

const postMethods = ["post", "put", "del"]
const handleMethodName = method => {
  return method === "del" ? "delete" : method
}
postMethods.forEach(method => {
  Axios.defaults.headers[handleMethodName(method)]["Content-Type"] =
    "application/json;charset=UTF-8"
})

const BASE_URL = process.env.REACT_APP_BASE_URL
Axios.defaults.baseURL = BASE_URL
Axios.defaults.withCredentials = true
Axios.interceptors.request.use(
  config => {
    // loading start
    console.log(config)
    return config
  },
  error => Promise.reject(error)
)

Axios.interceptors.response.use(
  response => {
    // loading end
    return response
  },
  error => {
    // 网络断开时，response undefined
    return Promise.reject(error)
  }
)

const checkStatus = res => {
  console.log("response:")
  console.log(res)

  const { headers } = res
  const paginationTotal = headers["x-pagination-total-count"]
  const paginationPerPage = headers["x-pagination-per-page"]

  if (res.status === 200 || res.status === 201 || res.status === 304) {
    if (paginationTotal) {
      return {
        data: res.data,
        status: res.status,
        size: Number.parseInt(paginationPerPage),
        total: Number.parseInt(paginationTotal)
      }
    }
    return { data: res.data, status: res.status }
  }

  if (res.status === 204) {
    return {}
  }

  if (res.data.message) {
    message.error(res.data.message)
  }

  return Promise.reject({
    status: res.status,
    code: res.data.code,
    message: res.data.message,
    data: res.data
  })
}

const handleError = error => {
  const response = error.response

  const msg =
    response && response.data.message
      ? response.data.message
      : response && response.data.length
        ? response.data[0].message
        : "服务端未响应，或者网络有问题"

  message.error(msg)

  return Promise.reject({
    code: 500,
    message: "服务端未响应，或者网络有问题"
  })
}

const request = postMethods.reduce((ret, method) => {
  ret[method] = (url, data, headers) => {
    return Axios({
      method: handleMethodName(method),
      url,
      headers,
      data
    }).then(checkStatus, handleError)
  }

  return ret
}, {})

request.get = (url, params, headers) => {
  return Axios({
    method: "get",
    url,
    headers,
    params
  }).then(checkStatus, handleError)
}

postMethods.concat(["get"]).forEach(method => {
  Component.prototype[method] = request[method]
})

export default request
