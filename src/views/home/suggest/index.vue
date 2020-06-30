<template>
  <div class="suggest">
    <div class="suggest__header d-flex ai-center jc-center">
      <p>Hi {{userInfo.nickname}}</p>
      <p>Made for you</p>
      <div class="suggest__header-play-all d-flex ai-center jc-center"
        @click="onPlayAllClick">
        <van-icon name="play"
          color="#fff"
          size="38px" />
      </div>
    </div>
    <div class="suggest__content">
      <song-list :data="musicList"
        @item-click="onSongItemClick" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchPersonalizedNewSongs } from '@/api/basis'
import { State, Action, Mutation } from 'vuex-class'

@Component
export default class HomeSuggest extends Vue {
  @State('userInfo') userInfo!: skyMusic.userInfo
  @Action('playNextMusic') playNextMusic!: Function
  @Action('updatePlayList') updatePlayList!: Function
  @Mutation('unshiftMusic') unshiftMusic!: Function
  musicList = []

  async onSongItemClick(song: skyMusic.music) {
    this.unshiftMusic(song)
    await this.playNextMusic(song)
  }

  async onPlayAllClick() {
    await this.updatePlayList({ list: this.musicList })
    await this.playNextMusic(this.musicList[0])
  }

  async mounted() {
    this.musicList = await fetchPersonalizedNewSongs()
  }
}
</script>

<style lang="scss" scoped>
.suggest {
  &__header {
    width: 100%;
    height: 240px;
    color: #fff;
    font-size: 26px;
    flex-direction: column;
    background-image: linear-gradient(35deg, #9795f0 0%, #fbc8d4 100%);
    &-play-all {
      position: absolute;
      left: calc(50% - 30px);
      top: 184px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: $color-primary;
    }
  }
  &__content {
    margin-top: -26px;
    padding-top: 20px;
    background-color: #fff;
    border-radius: 26px 26px 0 0;
  }
}
</style>