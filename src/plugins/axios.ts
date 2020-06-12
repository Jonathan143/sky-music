/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import { Toast } from 'vant'
// import store from '../store/index'
// import qs from 'qs' // 根据需求导入qs模块

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, other: string): void => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 301:
      if (localStorage.userInfo) {
        localStorage.removeItem('userInfo')
        Toast('登录过期，请重新登录')
      } else {
        Toast('请登录')
      }

      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      Toast('登录过期，请重新登录')
      localStorage.removeItem('userInfo')
      break
    // 404请求不存在
    case 404:
      Toast('请求的资源不存在')
      break
    default:
      Toast(other)
  }
}
/**
 * 创建axios实例
 * 设置post请求头
 */
import { APIBASEURL } from '../config'
const instance = axios.create({
  timeout: 1000 * 10,
  baseURL: APIBASEURL,
  withCredentials: true,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

// 请求拦截器
// 每次请求前，如果存在token则在请求头中携带token

instance.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)
  },
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    }
  }
)

export default instance
