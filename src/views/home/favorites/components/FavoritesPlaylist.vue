<template>
  <div class="favorites-playlist">
    <header-title class="favorites-playlist__header-title"
      size="22px"
      value="Playlist"
      content="Playlist" />

    <div class="favorites-playlist__content">
      <template v-for="(item, index) of playlist">
        <div :key="item.id"
          class="favorites-playlist__item scroll-x d-flex ai-center animated bounceInUp"
          :style="{'animation-delay': `${0.1*index}s`}">
          <album-box size="52px"
            :row="true"
            :playVisible="false"
            :src="item.coverImgUrl|compressionParam"
            :main="item.name"
            :id="item.id">
            <template slot="sub">{{item.trackCount}} songs</template>
          </album-box>

          <van-icon class="item__play"
            name="play-circle-o"
            size="26px"
            @click="onPlayClick(item.id)" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action, Mutation } from 'vuex-class'
import { fetchFavoritePlaylist } from '@/api/auth'

@Component
export default class FavoritesPlaylist extends Vue {
  @State('userInfo') userInfo!: skyMusic.userInfo
  @Action('playNextMusic') playNextMusic!: Function
  @Action('updatePlayList') updatePlayList!: Function

  playlist = []

  async onPlayClick(id: number) {
    await this.updatePlayList({ id })
    await this.playNextMusic()
  }

  async mounted() {
    try {
      const data: any = await fetchFavoritePlaylist(this.userInfo.userId)
      this.playlist = data.playlist
    } catch (error) {}
  }
}
</script>

<style lang="scss" scoped>
.favorites-playlist {
  &__header-title {
    margin: 20px 0 8px;
  }

  &__item {
    padding: 8px 12px;
    animation-duration: 0.5s;
    .album-box {
      flex: 1;
    }
    .item__play {
      flex-shrink: 0;
      color: #aaa;
    }
  }
}
</style>
