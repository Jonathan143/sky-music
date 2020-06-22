<template>
  <div class="home-arists scroll-x d-flex">
    <div class="home-arists__item animated fadeInUp"
      v-for="(arists, index) of aristsList"
      :style="{'animation-delay': `${0.1*index}s`}"
      :key="index">
      <van-image radius="12px"
        :src="arists.picUrl"
        fit="cover" />

      <div class="home-arists__name sky-ellipsis">{{arists.name}}</div>

      <van-icon name="play-circle"
        class="home-arists__play-icon"
        @click.stop="onPlayClick" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchAristsList } from '@/api/home'

@Component
export default class HomeArists extends Vue {
  aristsList = []

  onPlayClick() {}

  async mounted() {
    this.aristsList = await fetchAristsList()
  }
}
</script>

<style lang="scss" scoped>
.home-arists {
  padding: 12px;
  user-select: none;
  &__item {
    flex-shrink: 0;
    font-size: 0;
    padding-right: 26px;
    .van-image {
      width: 90px;
      height: 114px;
    }
  }
  &__name {
    font-size: 11px;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90px;
    padding: 4px 12px;
    box-sizing: border-box;
    border-radius: 0 0 16px 16px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &__play-icon {
    position: absolute;
    right: 30px;
    top: 4px;
    font-size: 20px;
    color: #fff;
    z-index: 3;
  }
}
</style>
