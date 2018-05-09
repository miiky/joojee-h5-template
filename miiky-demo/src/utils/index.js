import router from '@/router/index'
import store from '@/store/index'
import bus from '@/utils/bus'
import { querystring } from 'vux'
import Cookies from 'js-cookie'
import * as net from '@/network/index'

// 环境value
let _isDev = process.env.NODE_ENV === 'development'

/**
 * 判断是否在微信里
 */
export let isWeixn = function() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

/**
 * 判断一个string是否为空
 * @param {*} value
 */
export const isEmpty = value => {
  if (!value || value === undefined || value == 'undefined' || value == '') {
    return true
  }
  return false
}

/**
 * 判断是否在税企通里
 */
export let isJoojee = function() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.includes('joojee')) {
    return true
  } else {
    return false
  }
}

/**
 * 开发输出log
 * @param {消息} msg
 */
export const log = msg => {
  if (_isDev && console && console.log) {
    console.log(msg)
  }
}

/**
 *  存储数据到localstorage中
 * @param {* 键 } key
 * @param {* 值 } value
 */
export const saveToLocal = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 从localstorage中获取存储的值
 * @param {*键 } key
 */
export const loadFromLocal = key => {
  let localStorageName = window.localStorage.getItem(key)
  try {
    if (localStorageName) {
      return JSON.parse(localStorageName)
    } else {
      return ''
    }
  } catch (e) {
    return ''
  }
}

/**
 * 从localstorage中删除存储元素
 * @param {*} name
 */
export const removeFromLocal = name => {
  window.localStorage.removeItem(name)
}

export const initHeader = () => {}
export const setHeader = (menuBar, menuBars, mode = true) => {
  let options = {
    navConfig: {
      switch: true,
      animation: true
    },
    menuConfig: {
      switch: mode,
      menuBar: menuBar,
      menuBars: menuBars
    },
    success: function(res) {
      bus.$emit('menu' + res.id, res)
    }
  }
  sqt.showNavigation(options)
}

export const initOauth = async () => {
  //获取url中的code
  let code = querystring.parse(location.search).code
  //查看该code是否已经授权过
  if (code == store.getters.code) {
    return
  }
  //如果code为空并且openid也为空，则直接跳转oauth授权去获取code
  if (isEmpty(code) && isEmpty(store.getters.userAccessToken)) {
    await oauth()
    return
  }
  //如果已经有了code但是没有openid则去获取token
  if (isEmpty(store.getters.userAccessToken)) {
    //请求获取token
    await initUserToken(code)
    //请求获取sessionKey
    await initSessionKey()
  }
}

export const oauth = () => {
  // console.log('oauth...')
  //查看cookie中是否有未过期的token，如果有则返回
  if (!isEmpty(Cookies.get('user_access_token'))) {
    return
  }
  //记录当前路由，然后跳转获取code，便于重定向回应用后回到操作前的页面
  let currentPath = router.fullPath
  saveToLocal('currentPath', currentPath)
  //跳转获取code
  window.location.href = net.redirect_uri_for_code
}

/**
 * 通过code去换取token
 * @param {* 授权token的code值} code
 */
const initUserToken = async code => {
  await net.getUserToken(code).then(res => {
    let token = res.data.access_token
    //将获取的token和code放到store中去管理状态
    store.commit('setUserAccessToken', {
      code: code,
      token: token,
      expires: res.data.expires_in
    })
  })
}

const initSessionKey = async () => {
  await net.getSessionKey(store.getters.userAccessToken).then(res => {
    let sessionKey = res.data.entities[0].sessionKey
    store.commit('setSessionKey', sessionKey)
  })
}
