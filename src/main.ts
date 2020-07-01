import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './components'
import './plugins/vant'
import './plugins/filter'
import { CUSTOMIMAGE } from './config'

Vue.config.productionTip = false
Vue.prototype.$CUSTOMIMAGE = CUSTOMIMAGE

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
