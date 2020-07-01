const baseUrls: any = {
  development: 'http://localhost:3000/',
  production: 'https://api.yang143.cn/'
}

export const APIBASEURL: string = baseUrls[process.env.NODE_ENV]

// 自定义预置图片
export const CUSTOMIMAGE = {
  empty: '//yun.yang143.cn/static/2020-07/01/undraw_happy_music_g6wc.svg',
  login: '//yun.yang143.cn/static/2020-07/01/undraw_fingerprint_swrc.svg'
}
