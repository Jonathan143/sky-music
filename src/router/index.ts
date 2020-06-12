import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routesContext = require.context('./modules', true, /\.ts$/)
let routes: Array<RouteConfig> = []
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

export default router
