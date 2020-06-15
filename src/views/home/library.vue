<template>
  <div class="discovery">
    <van-swipe :autoplay="0">
      <van-swipe-item v-for="(banner, index) in bannerList"
        :key="index">
        <van-image :src="banner.imageUrl"
          height="260px"
          lazy-load />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { fetchBanner, fetchSongList } from '@/api/home'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeDiscovery extends Vue {
  bannerList = []
  songList = []

  async mounted() {
    // const result = await Promise.all([fetchBanner(), fetchSongList()])
    // this.bannerList = result[0]
    // this.songList = result[1]
  }
}
</script>

<style lang="scss" scoped>
</style>
