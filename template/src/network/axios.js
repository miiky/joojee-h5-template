import axios from 'axios'
import store from '@/store/index'
import { md5 } from 'vux'

const Axios = axios.create()

Axios.defaults.timeout = 50000

Axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

// `transformRequest` 允许在向服务器发送前，修改请求数据
// 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
// 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
Axios.defaults.transformRequest = [
  data => {
    // 对 data 进行任意转换处理
    let ret = ''
    for (let it in data) {
      if (data[it] != undefined)
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret.endsWith('&') ? ret.slice(0, ret.length - 1) : ret
  }
]

// 添加请求拦截器
Axios.interceptors.request.use(
  config => {
    //get请求url参数拼接
    let payload = md5(config.method + config.url)
    //全局请求状态管理入栈
    store.commit('pushRequest', payload)
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
Axios.interceptors.response.use(
  response => {
    let config = response.config
    let payload = md5(config.method + config.url)
    //全局请求状态管理出栈
    store.commit('popRequest', payload)
    // 对响应数据做点什么
    return response
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          // let config = err.response.config
          // let payload = md5(config.method + config.url)
          // store.commit('popRequest', payload)
          // return err.response
          break

        case 401:
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break
      }
      let payload = md5(err.response.config.method + err.response.config.url)
      store.commit('popRequest', payload)
      store.dispatch('showPopupAction', { type: false, msg: err.message })
    } else {
      store.commit('clearRequest')
      store.dispatch('showPopupAction', {
        type: false,
        msg: '服务器异常',
        time: 3000
      })
    }
    // 对响应错误做点什么
    return Promise.reject(err)
  }
)

export default Axios
