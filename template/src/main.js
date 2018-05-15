// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from '@/router/index'
import store from '@/store/index'
import App from './App'

import '@/assets/font/iconfont.css'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

import tools from '@/utils/tools'
import bus from '@/utils/bus'
import net from '@/network/index'
Vue.prototype.$tools = tools
Vue.prototype.$bus = bus
Vue.prototype.$net = net

if (tools.isJoojee()) {
  tools.initJoojeeHeader()
}

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app-box')
