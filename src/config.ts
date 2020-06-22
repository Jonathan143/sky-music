const baseUrls: any = {
  development: 'http://10.10.10.76:3000/',
  production: 'https://api.yang143.cn/'
}

export const APIBASEURL: string = baseUrls[process.env.NODE_ENV]
