import Axios from './axios'
import store from '@/store/index'
import swwd from '../store/modules/swwd'

const _isPro = process.env.NODE_ENV === 'production'

//税务问答服务配置
const grant_type = 'client_credentials'
const scope = 'app'
const client_secret = _isPro ?
  '0d90ab37d2ad240024b94d5dddf6f515' :
  '7735df3555f682a78c90385f64101d35'
const client_id = _isPro ? 'a2e9d7f3b0f635f9' : '54e09818ceb97c45'

//税企通oauth配置
const j_grant_type = 'authorization_code'

const JOOJEE_OAUTH_URL = 'https://oauth.joojee.cn'
const SWWD_API_URL = 'https://api.joojee.cn/swwd'

const REDIRECT_RUL = _isPro ?
  'https://static.joojee.cn/swwd' :
  'http://192.168.1.222:8080/'

export const redirect_uri_for_code =
  JOOJEE_OAUTH_URL +
  '/oauth/authorize?client_id=' +
  client_id +
  '&response_type=code&redirect_uri=' +
  REDIRECT_RUL

/**
 * 1、获取服务token
 * @param {* 回调参数} code
 * @param {* 回调地址} uri
 */
export let getServerToken = code =>
  Axios.post(JOOJEE_OAUTH_URL + '/oauth/token', {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: grant_type
  })

/**
 * 2、获取用户token
 * @param {* 回调参数} code
 * @param {* 回调地址} uri
 */
export let getUserToken = code =>
  Axios.post(JOOJEE_OAUTH_URL + '/oauth/token', {
    client_id: client_id,
    client_secret: client_secret,
    grant_type: j_grant_type,
    code: code,
    redirect_uri: REDIRECT_RUL
  })

/**
 * 3、获取sessionKey
 * @param {用户token} token
 */
export let getSessionKey = token =>
  Axios.post(SWWD_API_URL + '/login', {
    access_token: token
  })
