<template>
  <div class="home-album scroll-x d-flex">
    <template v-for="(album, index) of albumList">
      <album-box :key="album.id"
        class="animated fadeInUp"
        :style="{'animation-delay': `${0.1*index}s`,animationDuration: '0.5s'}"
        size="68px"
        :src="album.picUrl|compressionParam"
        :main="album.name"
        :id="album.id"
        :sub="album.copywriter"
        @play="onPlayClick"></album-box>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchAlbumList } from '@/api/home'
import { Action, Mutation } from 'vuex-class'

@Component
export default class HomeAlbum extends Vue {
  @Action('playNextMusic') playNextMusic!: Function
  @Action('updatePlayList') updatePlayList!: Function

  albumList = []

  async onPlayClick(id: number) {
    console.log(id)

    await this.updatePlayList({ id })
    await this.playNextMusic()
  }

  async mounted() {
    this.albumList = await fetchAlbumList()
  }
}
</script>

<style lang="scss" scoped>
.home-album {
  padding: 12px;
  height: 114px;
  & > .album-box {
    padding-right: 36px;
  }
}
</style>
