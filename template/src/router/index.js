import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
Vue.use(Router)

import tools from '@/utils/tools'

import Home from '@/views/home/index'

const router = new Router({
  mode: 'history',
  base: '/swwd/',
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

router.beforeEach(async (to, from, next) => {
  //获取路由元信息
  let meta = to.meta
  //设置标题头
  document.title = meta.title
  //设置头部菜单
  tools.setJoojeeHeader(meta.menuBar || {}, meta.menuBars || [], meta.switch, meta.navMode)

  let _to = to.fullPath
  //当从oauth重定向回应用，获取code值，携带code值跳转到当初离开的页面
  if (_to.includes('code')) {
    let _code = _to.split('?')[1].split('=')[1]
    let _path = from.path
    //获取授权之前的路径
    let _currentPath = tools.loadFromLocal('currentPath')
    tools.removeFromLocal('currentPath')
    //如果还没有sessionKey，则初始化用户登陆状态
    if (tools.isEmpty(store.getters.sessionKey)) {
      await store.dispatch('initUserLoginStatus').catch(err => {
        console.log(err)
      })
    }
    //重定向到授权之前的路径
    if (_path == '/' && _currentPath) {
      next({
        path: _currentPath
      })
    }
  }
  next()
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})
export default router
