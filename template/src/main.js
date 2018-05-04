// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from '@/router/index'
import store from '@/store/index'
import App from './App'

// import iView from 'iview'
import 'iview/dist/styles/iview.css'
// Vue.use(iView)
import {
  Flexbox,
  FlexboxItem
} from 'vux'

Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)

FastClick.attach(document.body)

sqt.config({
  debug: false
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
