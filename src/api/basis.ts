// 基础接口无需登录认证
import axios from '@/plugins/axios'

// 首页banner
export async function fetchBanner() {
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

// 推荐最新专辑
export async function fetchAlbumList(limit = 10) {
  try {
    const data: any = await axios('album/newest', { params: { limit } })
    return data.albums
  } catch (error) {
    return []
  }
}

export async function fetchAlbumDetail(idx: number) {
  try {
    const { songs }: any = await axios('album', { params: { id: idx } })
    return songs.map((t: any) => ({
      name: t.name, //歌名
      id: t.id,
      singer: t.ar.map((item: any) => item.name).join(), //歌手
      alName: t.al.name, //专辑名
      picUrl: t.al.picUrl //歌曲图片
    }))
  } catch (error) {
    return []
  }
}

// 获取歌手列表
export async function fetchAristsList(limit = 10, offset = 0) {
  try {
    const { artists, more }: any = await axios('top/artists', {
      params: { limit, offset }
    })
    return { list: artists, more }
  } catch (error) {
    return { list: [], more: false }
  }
}

// 获取歌单详情
export async function fetchPlayListDetail(
  idx: number | string,
  limit?: number
): Promise<skyMusic.playList> {
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
        singer: t.ar.map((item: any) => item.name).join(), //歌手
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

// 获取最新歌曲
export async function fetchPersonalizedNewSongs() {
  try {
    const { result }: any = await axios('/personalized/newsong')
    return result.map(({ id, name, picUrl, song }: any) => ({
      id,
      name,
      picUrl,
      singer: song.artists.map((item: any) => item.name).join(),
      alName: song.album.name
    }))
  } catch (error) {
    return []
  }
}

// 获取歌手热门50首歌曲
export async function fetchSingerTop50Songs(idx: string | number) {
  try {
    const { songs }: any = await axios('artist/top/song', {
      params: { id: idx }
    })
    return songs.map((t: any) => ({
      name: t.name, //歌名
      id: t.id,
      singer: t.ar.map((item: any) => item.name).join(), //歌手
      alName: t.al.name, //专辑名
      picUrl: t.al.picUrl //歌曲图片
    }))
  } catch (error) {
    return []
  }
}
