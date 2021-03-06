<template>
  <div class="sky-player safe-area-inset-bottom"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd">
    <van-icon name="like-o" />
    <van-icon name="arrow-left"
      @click="playPreviousMusic" />

    <div class="sky-player__content">
      <van-circle v-model="currentRate"
        :rate="0"
        :speed="100"
        :color="gradientColor"
        stroke-width="80"
        size="36px" />
      <van-image class="content__cover"
        :class="{'content__cover--playing': isPlaying}"
        round
        height="32px"
        width="32px"
        :src="currentMusic.picUrl|compressionParam"
        fit="cover" />
      <van-icon class="sky-player__action-play"
        :name="isPlaying?'pause':'play'"
        size="20"
        @click="()=>this.tooglePlayState()" />
    </div>

    <van-icon name="arrow"
      @click="playNextMusic()" />
    <van-icon name="wap-nav" />
    <audio ref="skyAudio"
      :src="msuicSrc"
      preload="metadata" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Watch } from 'vue-property-decorator'
import { State, Mutation, Action } from 'vuex-class'
import rgbaster from 'rgbaster'
import { compressionParam } from '@/libs/utils.string.ts'
import touchUtil from '@/libs/util.touch.ts'

@Component
export default class SkyPlayer extends Vue {
  @Ref('skyAudio') readonly refSkyAudio!: HTMLButtonElement

  @State isPlaying!: boolean
  @State playList!: Array<skyMusic.music>
  @State currentMusic!: skyMusic.music

  @Mutation('tooglePlayState') tooglePlayState!: Function
  @Action('playNextMusic') playNextMusic!: Function
  @Action('playPreviousMusic') playPreviousMusic!: Function

  currentRate = 100
  gradientColor = {
    '10%': '#CE9FFC',
    '100%': '#7367F0 '
  }
  styleColor = {}

  public get msuicSrc(): string {
    const id = this.currentMusic.id
    return id ? `https://music.163.com/song/media/outer/url?id=${id}.mp3` : ''
  }

  @Watch('currentMusic')
  async rgbColor() {
    const picUrl = compressionParam(this.currentMusic.picUrl)
    try {
      const res = await rgbaster(picUrl, {
        ignore: ['rgb(255,255,255)', 'rgb(0,0,0)']
      })
      this.styleColor = { backgroundColor: res[0].color }
    } catch (error) {}
  }

  onTouchStart(event: TouchEvent) {
    touchUtil.touchStart(event)
  }

  onTouchMove(event: TouchEvent) {
    touchUtil.touchMove(event)
  }

  onTouchEnd() {
    const { direction, deltaY } = touchUtil
    if (direction === 'vertical' && deltaY < -10) {
      console.log(1)
    }
  }

  initData() {
    this.$nextTick(() => {
      Vue.prototype.$skyPlayer = this.refSkyAudio

      // 开始播放
      this.refSkyAudio.onplaying = () => {
        this.tooglePlayState(true)
        document.title = this.currentMusic.name
      }

      // 播放进度
      this.refSkyAudio.ontimeupdate = (e: any) => {
        const { currentTime, duration } = e.target
        this.currentRate = parseInt((currentTime / duration) * 100 + '')
      }

      // 播放结束
      this.refSkyAudio.onended = () => {
        this.playNextMusic()
      }

      // 加载失败
      this.refSkyAudio.onerror = () => {
        if (this.playList.length) {
          this.$toast('歌曲加载失败')
          this.playNextMusic()
        }
      }
    })
  }

  mounted() {
    this.initData()
  }
}
</script>

<style lang="scss">
.sky-player {
  position: fixed;
  bottom: 0;
  height: 0;
  width: calc(100% - 24px);
  height: 56px;
  display: flex;
  padding: 0 12px;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  border-radius: 40px 40px 0 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  &__content {
    font-size: 0;
    position: relative;
    .content__cover {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      &--playing {
        animation: sky-rotate 12s linear infinite;
      }
    }
  }
  &__action {
    &-play {
      position: absolute !important;
      top: 50%;
      left: 50%;
      color: rgba(255, 255, 255, 0.8);
      transform: translate(-50%, -50%);
    }
  }
}

@keyframes sky-rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
