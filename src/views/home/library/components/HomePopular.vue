<template>
  <div class="home-popular">
    <van-swipe :autoplay="0"
      :loop="false"
      :show-indicators="false">
      <van-swipe-item v-for="(ranking, index) in rankingList"
        :key="index">
        <div class="home-popular__container">
          <div class="home-popular__header d-flex ai-center jc-between"
            :style="getHeaderStyle(index)">
            <div class="d-flex ai-center">
              <span class="header__name">{{ranking.name}}</span>
              <van-icon name="arrow"
                size="14px" />
            </div>

            <van-icon name="play-circle"
              size="20px"
              @click.stop="onPlayClick(ranking)" />
          </div>

          <song-list class="home-popular__content"
            :data="ranking.tracks||[]"
            @item-click="onSongItemClick" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchPlayListDetail } from '@/api/basis'
import { Action, Mutation } from 'vuex-class'

@Component
export default class HomePopular extends Vue {
  @Action('playNextMusic') playNextMusic!: Function
  @Action('updatePlayList') updatePlayList!: Function
  @Mutation('unshiftMusic') unshiftMusic!: Function

  rankingList = []

  async onPlayClick(ranking: skyMusic.playList) {
    await this.updatePlayList({ list: ranking.tracks })
    await this.playNextMusic()
  }

  async onSongItemClick(song: skyMusic.music) {
    this.unshiftMusic(song)
    await this.playNextMusic(song)
  }

  getHeaderStyle(index: number) {
    const colors = [
      '#ee9ae5 10%, #5961f9 100%',
      '#f97794 10%, #623aa2 100%',
      '#FFAA85 10%, #B3315F 100%'
    ]
    return {
      backgroundImage: `linear-gradient(135deg, ${colors[index]})`
    }
  }

  async mounted() {
    const requests = []
    for (const id of [3778678, 3779629, 19723756]) {
      requests.push(fetchPlayListDetail(id, 10))
    }
    this.rankingList = (await Promise.all(requests)) as []
  }
}
</script>

<style lang="scss" scoped>
.home-popular {
  &__container {
    padding: 12px;
  }

  &__header {
    padding: 12px;
    margin: 0 12px;
    border-radius: 20px 20px 0 0;
    .header__name {
      font-size: 14px;
      line-height: 1;
      color: #fff;
      padding-right: 3px;
    }
    .van-icon {
      color: #fff;
    }
  }

  &__content {
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
