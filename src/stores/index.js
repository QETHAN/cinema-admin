import AppStore from "stores/app"
import HomeStore from "modules/home/store"
import AuthStore from "modules/login/store"
import MerchantStore from "modules/merchant/store"
import FilmsStore from "modules/films/store"
import AdminStore from "modules/admin/store"
import UserStore from "modules/user/store"
import GoodsStore from "modules/goods/store"
import PackageStore from "modules/package/store"
import CategoryStore from "modules/category/store"
import CinemaStore from "modules/cinema/store"
import ScheduleStore from "modules/schedule/store"
import MovieStore from "modules/movie/store"
import OrderStore from "modules/order/store"
import MadminStore from "modules/madmin/store"
import MroleStore from "modules/mrole/store"
import AccountStore from "modules/account/store"
import LogStore from "modules/log/store"

import Api from "api"

export const appStore = new AppStore()
const homeStore = new HomeStore(new Api.HomeApi(), appStore)
const authStore = new AuthStore(new Api.AuthApi(), appStore)
const merchantStore = new MerchantStore(new Api.MerchantApi(), appStore)
const filmsStore = new FilmsStore(new Api.FilmsApi(), appStore)
const adminStore = new AdminStore(new Api.AdminApi(), appStore)
const userStore = new UserStore(new Api.UserApi(), appStore)
const goodsStore = new GoodsStore(new Api.GoodsApi(), appStore)
const packageStore = new PackageStore(new Api.PackageApi(), appStore)
const categoryStore = new CategoryStore(new Api.CategoryApi(), appStore)
const cinemaStore = new CinemaStore(new Api.CinemaApi(), appStore)
const scheduleStore = new ScheduleStore(new Api.ScheduleApi(), appStore)
const movieStore = new MovieStore(new Api.MovieApi(), appStore)
const orderStore = new OrderStore(new Api.OrderApi(), appStore)
const madminStore = new MadminStore(new Api.MadminApi(), appStore)
const mroleStore = new MroleStore(new Api.MroleApi(), appStore)
const accountStore = new AccountStore(new Api.AccountApi(), appStore)
const logStore = new LogStore(new Api.LogApi(), appStore)

const stores = {
  appStore,
  homeStore,
  authStore,
  merchantStore,
  filmsStore,
  adminStore,
  userStore,
  goodsStore,
  packageStore,
  categoryStore,
  cinemaStore,
  scheduleStore,
  movieStore,
  orderStore,
  madminStore,
  mroleStore,
  accountStore,
  logStore
}

export default stores
