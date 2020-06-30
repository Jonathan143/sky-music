import Vue from 'vue'
import Vuex from 'vuex'
import { fetchPlayListDetail } from '@/api/basis'
import { fetchLoginUserStatus } from '@/api/auth'
import cloneDeep from 'lodash/cloneDeep'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},

    isPlaying: false,
    playList: [] as Array<skyMusic.music>,
    currentMusic: {} as skyMusic.music
  },
  getters: {
    // 播放器显示状态
    isPlayerVisible(state) {
      return !!state.playList.length
    },

    // 正在播放的音乐的index
    currentMusicIndex(state) {
      return state.playList.findIndex(
        (item: any) => item.id === state.currentMusic.id
      )
    }
  },
  mutations: {
    // 切换播放状态
    tooglePlayState(state, value) {
      state.isPlaying = value !== undefined ? !!value : !state.isPlaying
      state.currentMusic.id &&
        Vue.prototype.$skyPlayer[state.isPlaying ? 'play' : 'pause']()
    },

    // 插入歌曲
    unshiftMusic(state, value) {
      if (state.playList.findIndex(item => item.id === value.id) === -1) {
        state.playList.unshift(value)
      }
    }
  },
  actions: {
    async checkLoginStatus({ state }) {
      try {
        const { profile }: any = await fetchLoginUserStatus()
        state.isLogin = true
        state.userInfo = { ...state.userInfo, ...profile }
      } catch (error) {
        state.isLogin = false
      }
    },

    // 播放下一首歌曲
    playNextMusic({ state, getters }, value) {
      if (value) {
        state.currentMusic = value
      } else {
        let index = getters.currentMusicIndex
        index = index === state.playList.length - 1 ? 0 : index + 1
        state.currentMusic = state.playList[index]
      }
      setTimeout(() => {
        Vue.prototype.$skyPlayer.play()
      }, 10)
    },

    // 播放上一首歌曲
    playPreviousMusic({ state, getters }) {
      const index = getters.currentMusicIndex
      if (index) {
        state.currentMusic = state.playList[index - 1]
        setTimeout(() => {
          Vue.prototype.$skyPlayer.play()
        }, 10)
      }
      Vue.prototype.$toast('已经是第一首歌曲了')
    },

    // 添加下一首播放歌曲
    addNextMusic({ state, getters }, value) {
      const index = getters.currentMusicIndex
      if (index !== -1) {
        if (state.currentMusic.id === value.id) {
          return
        }
        state.playList.splice(index, 0)
      }
      state.playList.splice(1, 0, value)
    },

    // 更新播放列表
    async updatePlayList(
      { state },
      { id, list = [] }: { id?: string; list?: Array<skyMusic.music> }
    ) {
      if (id) {
        const { tracks } = await fetchPlayListDetail(id)
        state.playList = cloneDeep(tracks)
      } else {
        state.playList = cloneDeep(list)
      }
    }
  },
  modules: {}
})
