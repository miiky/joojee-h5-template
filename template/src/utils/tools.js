import router from '@/router/index'
import bus from '@/utils/bus'
import Cookies from 'js-cookie'
import net from '@/network/index'

let tools = {}
tools.isWeixn = function () {
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
tools.isEmpty = value => {
  if (!value || value === undefined || value == 'undefined' || value == '') {
    return true
  }
  return false
}

/**
 * 判断是否在税企通里
 */
tools.isJoojee = function () {
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
tools.log = msg => {
  if (_isDev && console && console.log) {
    console.log(msg)
  }
}

/**
 *  存储数据到localstorage中
 * @param {* 键 } key
 * @param {* 值 } value
 */
tools.saveToLocal = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 从localstorage中获取存储的值
 * @param {*键 } key
 */
tools.loadFromLocal = key => {
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
tools.removeFromLocal = name => {
  window.localStorage.removeItem(name)
}

/**
 * 
 * @param {时间的毫秒数} time 
 */
tools.specialTime = (time) => {
  //当前时间
  let _now = new Date().getTime()
  //时间差
  let _interval = _now - time
  // （1）小于等于5分钟  显示刚刚
  // （2）大于5分钟，小于60分钟 显示X分钟前
  // （3）大于等于60分钟，小于24小时 显示X小时前
  // （4）大于等于24小时，小于48小时 显示昨天
  // （5）大于等于48小时，小于72小时 显示前天
  // （6）大于等于72小时，小于96小时 显示3天前
  // （7）大于等于96小时，小于120小时 显示4天前
  // （8）大于等于144小时，小于168小时 显示5天前
  // （9）大于等于168小时，小于192小时 显示6天前
  // （10）大于等于192小时，小于216小时 显示7天前
  // （11）大于等于216小时 显示年-月-日
  if (_interval <= 5 * 60 * 1000) {
    return '刚刚'
  } else if (_interval < 60 * 60 * 1000) {
    return Number.parseInt(_interval / 1000 / 60) + '分钟前'
  } else if (_interval < 24 * 60 * 60 * 1000) {
    return Number.parseInt(_interval / 1000 / 60 / 60) + '小时前'
  } else if (_interval < 48 * 60 * 60 * 1000) {
    return '昨天'
  } else if (_interval < 72 * 60 * 60 * 1000) {
    return '前天'
  } else if (_interval < 96 * 60 * 60 * 1000) {
    return '3天前'
  } else if (_interval < 144 * 60 * 60 * 1000) {
    return '4天前'
  } else if (_interval < 168 * 60 * 60 * 1000) {
    return '5天前'
  } else if (_interval < 192 * 60 * 60 * 1000) {
    return '6天前'
  } else if (_interval < 216 * 60 * 60 * 1000) {
    return '7天前'
  } else {
    let _month = new Date(time).getMonth() + 1
    let _day = new Date(time).getUTCDate()
    return _month + '月' + _day + '日'
  }
}


tools.initJoojeeHeader = () => {
  sqt.config({
    debug: false
  })
}
tools.setJoojeeHeader = (menuBar, menuBars, mode = true) => {
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
    success: function (res) {
      bus.$emit('menu' + res.id, res)
    }
  }
  sqt.showNavigation(options)
}

tools.oauth = () => {
  //记录当前路由，然后跳转获取code，便于重定向回应用后回到操作前的页面
  let currentPath = router.currentRoute.fullPath
  tools.saveToLocal('currentPath', currentPath)
  //跳转获取code
  window.location.href = net.redirect_uri_for_code
}

export default tools
