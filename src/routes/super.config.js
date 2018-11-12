import { isDev } from "utils"

const superRoutes = !isDev()
  ? [
      {
        name: "商户管理",
        route: "/merchant",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        name: "影片总库管理",
        route: "/films",
        child_functions: ["查看", "编辑"]
      },
      {
        name: "超级管理员",
        route: "/admin",
        child_functions: ["新增", "编辑", "删除"]
      }
    ]
  : [
      {
        name: "商户管理",
        route: "/merchant",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        name: "影片总库管理",
        route: "/films",
        child_functions: ["查看", "编辑"]
      },
      {
        name: "超级管理员",
        route: "/admin",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        name: "会员管理",
        route: "/user",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        route: "/category",
        name: "分类管理",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        route: "/goods",
        name: "卖品管理",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        route: "/package",
        name: "套餐管理",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        route: "/schedule",
        name: "排片管理",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        name: "影院管理",
        route: "/cinema",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        name: "影片管理",
        route: "/movie",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        name: "订单管理",
        route: "/order",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        name: "商户管理员",
        route: "/madmin",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        name: "管理员角色",
        route: "/mrole",
        child_functions: ["新增", "编辑", "删除"]
      },
      {
        name: "操作记录",
        route: "/log",
        child_functions: []
      }
    ]

export default superRoutes
