<template>
  <div class="artists">
    <header-title class="artists__header-title"
      size="18px"
      value="Artists"
      content="Artists" />

    <div class="artists__content scroll-x d-flex">
      <template v-for="(arists, index) of aristsList">
        <arists-box class="content__item animated fadeInUp"
          :style="{animationDelay: `${0.1*index}s`}"
          :key="index"
          width="128px"
          height="160px"
          :data="arists"
          @play="onPlayAllClick" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchSingerTop50Songs } from '@/api/basis'
import { fetchFavoriteArtists } from '@/api/auth'
import { Action } from 'vuex-class'
@Component
export default class FavoritesArtists extends Vue {
  @Action('updatePlayList') updatePlayList!: Function
  @Action('playNextMusic') playNextMusic!: Function

  aristsList = []

  async onPlayAllClick({ id }: any) {
    const list = await fetchSingerTop50Songs(id)
    await this.updatePlayList({ list })
    await this.playNextMusic()
  }

  async mounted() {
    try {
      const result = await fetchFavoriteArtists()
      this.aristsList = result.data.slice(0, 10)
    } catch (error) {}
  }
}
</script>

<style lang="scss" scoped>
.artists {
  &__content {
    padding: 12px;
    height: 160px;
    user-select: none;
    .content__item {
      flex-shrink: 0;
      padding-right: 16px;
      animation-duration: 0.4s;
    }
  }
}
</style>
