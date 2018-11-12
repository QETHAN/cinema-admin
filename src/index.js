import React from "react"
import ReactDom from "react-dom"
import { configure } from "mobx"
import { Provider } from "mobx-react"
import { LocaleProvider } from "antd"
import zh_CN from "antd/lib/locale-provider/zh_CN"
import moment from "moment"
import "moment/locale/zh-cn"

import stores from "stores"
import App from "modules/app"
import "assets/style/index.less"

moment.locale("zh-cn")

configure({
  enforceActions: "observed"
})

ReactDom.render(
  <Provider {...stores}>
    <LocaleProvider locale={zh_CN}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById("root")
)
