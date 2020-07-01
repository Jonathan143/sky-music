// 需要登录认证的接口
import axios from '@/plugins/axios'

// 获取用户登录状态
export function fetchLoginUserStatus() {
  return axios('login/status')
}

// 获取用户信息
export function fetchUserDetail(uid: number) {
  return axios('user/detail', {
    params: { uid }
  })
}

// 登录
export function login(phone: string, password: string) {
  return axios('/login/cellphone', {
    params: { phone, password }
  })
}

// 发送验证码
export function sendCaptcha(phone: string) {
  return axios('/captcha/sent', {
    params: { phone }
  })
}

// 验证验证码
export function verifyCaptcha(phone: string, captcha: string) {
  return axios('/captcha/verify', {
    params: { phone, captcha }
  })
}

// 获取收藏的歌手列表
export function fetchFavoriteArtists() {
  return axios('artist/sublist')
}

// 获取已收藏专辑列表
export function fetchFavoriteAlbums(limit = 20, offset = 0) {
  return axios('album/sublist', {
    params: { limit, offset }
  })
}

// 获取用户已收藏歌单列表
export function fetchFavoritePlaylist(uid: number) {
  return axios('user/playlist', {
    params: { uid }
  })
}
