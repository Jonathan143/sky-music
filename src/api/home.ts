import axios from '@/plugins/axios'

// 首页banner
const fetchBanner = async () => {
  return axios('banner')
}

export { fetchBanner }
