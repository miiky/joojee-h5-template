import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import * as utils from '@/utils/index'

import Home from '@/views/home/home'

const router = new Router({
  mode: 'history',
  base: '/projectName/',
  routes: [{
    path: '/',
    name: 'home',
    meta: {
      index: 1,
      title: 'Miiky模板',
      // switch: false,
      // menuBar: { id: 1, imgFont: 'e675' },
      menuBars: [{
          id: 2,
          imgFont: 'e69f',
          name: '我的主页'
        }
        // { id: 11, imgFont: 'e6a0', name: '通知' }
      ]
    },
    component: Home
  }]
})

router.beforeEach((to, from, next) => {
  let meta = to.meta
  document.title = meta.title
  utils.setHeader(meta.menuBar || {}, meta.menuBars || [], meta.switch)

  //当从oauth重定向回应用，获取code值，携带code值跳转到当初离开的页面
  let _to = to.fullPath
  if (_to.includes('code')) {
    let _code = _to.split('?')[1].split('=')[1]
    let _path = from.path
    let _currentPath = utils.loadFromLocal('currentPath')
    utils.removeFromLocal('currentPath')
    if (_path == '/' && _currentPath) {
      next({
        path: _currentPath,
        query: {
          code: _code
        }
      })
    }
  }
  next()
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})
export default router
