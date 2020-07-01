const baseUrls: any = {
  development: 'http://localhost:3000/',
  production: 'https://api.yang143.cn/'
}

export const APIBASEURL: string = baseUrls[process.env.NODE_ENV]

// 自定义预置图片
export const CUSTOMIMAGE = {
  empty: '//yun.yang143.cn/2020/07/01/533d12670f846.svg',
  login: '//yun.yang143.cn/2020/07/01/545f6f81a85d3.svg'
}
