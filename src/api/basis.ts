// 基础接口无需登录认证
import axios from '@/plugins/axios'

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
const fetchAlbumList = async (limit = 10) => {
  try {
    const data: any = await axios('personalized', { params: { limit } })
    return data.result
  } catch (error) {
    return []
  }
}

// 获取歌手列表
const fetchAristsList = async (limit = 10, offset = 0) => {
  try {
    const data: any = await axios('top/artists', { params: { limit, offset } })
    return data.artists
  } catch (error) {
    return []
  }
}

// 获取歌单详情
const fetchPlayListDetail = async (
  idx: number | string,
  limit?: number
): Promise<skyMusic.playList> => {
  try {
    const data: any = await axios('playlist/detail', { params: { id: idx } })
    const {
      coverImgUrl,
      tracks,
      name,
      playCount,
      id,
      subscribedCount, // 订阅数
      shareCount,
      commentCount,
      description
    } = data.playlist
    const formatTracks: Array<skyMusic.music> = []
    for (const t of limit ? tracks.slice(0, limit) : tracks) {
      formatTracks.push({
        name: t.name, //歌名
        id: t.id,
        singer: t.ar[0].name, //歌手
        alName: t.al.name, //专辑名
        picUrl: t.al.picUrl //歌曲图片
      })
    }
    return {
      tracks: formatTracks,
      coverImgUrl,
      name,
      playCount,
      id,
      subscribedCount,
      shareCount,
      commentCount,
      description
    }
  } catch (error) {
    return { tracks: [] }
  }
}

const fetchPersonalizedNewSongs = async () => {
  try {
    const { result }: any = await axios('/personalized/newsong')
    return result.map(({ id, name, picUrl, song }: any) => ({
      id,
      name,
      picUrl,
      singer: song.artists[0].name,
      alName: song.album.name
    }))
  } catch (error) {
    return []
  }
}

export {
  fetchBanner,
  fetchAlbumList,
  fetchAristsList,
  fetchPlayListDetail,
  fetchPersonalizedNewSongs
}
