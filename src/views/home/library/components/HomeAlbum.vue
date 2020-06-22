<template>
  <div class="home-album scroll-x d-flex">
    <template v-for="(album, index) of albumList">
      <album-box :key="album.id"
        class="animated fadeInUp"
        :style="{'animation-delay': `${0.1*index}s`}"
        size="68px"
        :src="album.picUrl"
        :main="album.name"
        :sub="album.copywriter"></album-box>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchAlbumList } from '@/api/home'

@Component
export default class HomeAlbum extends Vue {
  albumList = []

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
