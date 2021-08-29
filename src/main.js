import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast'
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue({})

// Vue.use(VueLazyLoad, {
//   preLoad: 1,
//   loading: require('./assets/img/common/placeholder.png')
// })
Vue.use(VueLazyload)

// 安装toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
