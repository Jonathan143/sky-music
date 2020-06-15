import axios from '@/plugins/axios'
import { compressionParam } from '@/libs/utils.string'

// 首页banner
const fetchBanner = async () => {
  try {
    const data: any = await axios('banner')
    return data.banners.map(
      ({ imageUrl, typeTitle, targetType, targetId }: any) => ({
        imageUrl,
        typeTitle,
        targetType,
        targetId
      })
    )
  } catch (error) {
    return []
  }
}

// 推荐歌单
const fetchSongList = async (limit?: number) => {
  try {
    const data: any = await axios(`personalized?limit=${limit || 10}`)
    return data.result.map((item: any) => ({
      ...item,
      picUrl: compressionParam(item.picUrl)
    }))
  } catch (error) {
    return []
  }
}

export { fetchBanner, fetchSongList }
