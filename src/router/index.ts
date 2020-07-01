import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routesContext = require.context('./modules', true, /\.ts$/)
const routes: Array<RouteConfig> = []
routesContext.keys().forEach(router => {
  const routerConfig = routesContext(router)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  const ctrl = routerConfig.default || routerConfig

  routes.push(ctrl)
})

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const { isCheckedLoginStatus, isLogin } = store.state
  if (!isCheckedLoginStatus && !isLogin) {
    try {
      await store.dispatch('checkLoginStatus')
    } catch (error) {}
    next()
  } else next()
})

export default router
