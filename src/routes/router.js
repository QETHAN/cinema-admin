import { lazy } from "react"

const Merchant = lazy(() => import("modules/merchant"))
const Films = lazy(() => import("modules/films"))
const Admin = lazy(() => import("modules/admin"))
const User = lazy(() => import("modules/user"))
const UserDetail = lazy(() => import("modules/user/detail"))
const Goods = lazy(() => import("modules/goods"))
const Package = lazy(() => import("modules/package"))
const Category = lazy(() => import("modules/category"))
const Cinema = lazy(() => import("modules/cinema"))
const Schedule = lazy(() => import("modules/schedule"))
const Movie = lazy(() => import("modules/movie"))
const Order = lazy(() => import("modules/order"))
const Madmin = lazy(() => import("modules/madmin"))
const Mrole = lazy(() => import("modules/mrole"))
// const Account = lazy(() => import("modules/account"))
const Log = lazy(() => import("modules/log"))
const NotMatch = lazy(() => import("components/404"))

export const routers = [
  {
    path: "/",
    aliasPath: "/",
    key: "/merchant",
    exact: true,
    component: Merchant,
    icon: "user",
    name: "商户管理",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/films",
    key: "/films",
    exact: true,
    component: Films,
    icon: "video-camera",
    name: "影片总库管理",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/admin",
    key: "/admin",
    exact: true,
    component: Admin,
    icon: "user",
    name: "超级管理员",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/user",
    key: "/user",
    exact: true,
    component: User,
    icon: "user",
    name: "会员管理",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/user/:id",
    aliasPath: "/user",
    key: "/user/:id",
    component: UserDetail,
    icon: "user",
    name: "会员详情",
    requiresAuth: true,
    menu: false
  },
  {
    path: "/goods",
    key: "/goods",
    exact: true,
    component: Goods,
    icon: "user",
    name: "卖品管理",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/package",
    key: "/package",
    exact: true,
    component: Package,
    icon: "user",
    name: "套餐管理",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/category",
    key: "/category",
    exact: true,
    component: Category,
    icon: "user",
    name: "分类管理",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/cinema",
    key: "/cinema",
    exact: true,
    component: Cinema,
    icon: "user",
    name: "影院管理",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/schedule",
    key: "/schedule",
    exact: true,
    component: Schedule,
    icon: "user",
    name: "排片管理",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/movie",
    key: "/movie",
    exact: true,
    component: Movie,
    icon: "user",
    name: "影片管理",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/order",
    key: "/order",
    exact: true,
    component: Order,
    icon: "user",
    name: "订单管理",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/madmin",
    key: "/madmin",
    exact: true,
    component: Madmin,
    icon: "user",
    name: "商户管理员",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/mrole",
    key: "/mrole",
    exact: true,
    component: Mrole,
    icon: "user",
    name: "管理员角色",
    requiresAuth: true,
    menu: true
  },
  {
    path: "/log",
    key: "/log",
    exact: true,
    component: Log,
    icon: "user",
    name: "操作记录",
    requiresAuth: true,
    menu: true
  },
  {
    path: "*",
    key: "*",
    name: "*",
    component: NotMatch,
    requiresAuth: false
  }
]

export const routesByName = routers.reduce((ret, route) => {
  ret[route.name] = { ...route }
  return ret
}, {})
