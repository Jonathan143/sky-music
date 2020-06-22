const baseUrls: any = {
  development: 'http://localhost:3000/',
  production: 'https://api.yang143.cn/'
}

export const APIBASEURL: string = baseUrls[process.env.NODE_ENV]
