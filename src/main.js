import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import "./index.less"

// import VirtualScroll from './plugins/index'
import VirtualScroll from 'virtual-scr-list'
import 'virtual-scr-list/styles/index.css'

Vue.use(VirtualScroll)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
