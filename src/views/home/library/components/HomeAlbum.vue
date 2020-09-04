<template>
  <div class="home-album scroll-x d-flex">
    <template v-for="(album, index) of albumList">
      <album-box :key="album.id"
        class="animated fadeInUp"
        :style="{'animation-delay': `${0.1*index}s`}"
        size="68px"
        :src="album.picUrl|compressionParam"
        :main="album.name"
        :id="album.id"
        :sub="album.artist.name"
        @play="onPlayClick(album.id)"></album-box>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchAlbumList } from '@/api/basis'
import { Action } from 'vuex-class'
import { fetchAlbumDetail } from '@/api/basis'

@Component
export default class HomeAlbum extends Vue {
  @Action('playNextMusic') playNextMusic!: Function
  @Action('updatePlayList') updatePlayList!: Function

  albumList = []

  async onPlayClick(id: number) {
    await this.updatePlayList({ list: await fetchAlbumDetail(id) })
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
    animation-duration: 0.4s;
    padding-right: 36px;
  }
}
</style>
