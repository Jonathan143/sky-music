<template>
  <div class="home-arists scroll-x d-flex">
    <template v-for="(arists, index) of aristsList">
      <arists-box class="home-arists__item animated fadeInUp"
        :style="{animationDelay: `${0.1*index}s`}"
        :key="index"
        :data="arists"
        @play="onPlayAllClick" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchAristsList, fetchSingerTop50Songs } from '@/api/basis'
import { Action } from 'vuex-class'

@Component
export default class HomeArists extends Vue {
  @Action('updatePlayList') updatePlayList!: Function
  @Action('playNextMusic') playNextMusic!: Function
  aristsList = []

  async onPlayAllClick({ id }: any) {
    const list = await fetchSingerTop50Songs(id)
    await this.updatePlayList({ list })
    await this.playNextMusic()
  }

  async mounted() {
    this.aristsList = await fetchAristsList()
  }
}
</script>

<style lang="scss" scoped>
.home-arists {
  padding: 12px;
  height: 114px;
  user-select: none;
  &__item {
    flex-shrink: 0;
    padding-right: 26px;
    animation-duration: 0.4s;
  }
}
</style>
