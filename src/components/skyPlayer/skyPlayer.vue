<template>
  <div class="sky-player">
    <van-icon name="fire-o" />
    <van-icon name="arrow-left" />

    <div class="sky-player__content">
      <van-circle v-model="currentRate"
        :rate="30"
        :speed="100"
        :color="gradientColor"
        stroke-width="80"
        size="36px" />
      <van-image class="content__cover"
        round
        height="32px"
        width="32px"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        fit="cover" />
      <van-icon class="sky-player__action-play"
        name="play"
        size="20" />
    </div>

    <van-icon name="arrow" />
    <van-icon name="wap-nav" />
    <audio ref="audio"
      :src="src"
      preload="metadata" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SkyPlayer extends Vue {
  src = ''
  currentRate = 100
  gradientColor = {
    '10%': '#CE9FFC',
    '100%': '#7367F0 '
  }
}
</script>

<style lang="scss">
.sky-player {
  position: fixed;
  bottom: 0;
  height: 0;
  width: 100%;
  height: 56px;
  display: flex;
  padding: 0 12px;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 40px 40px 0 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  &__content {
    font-size: 0;
    position: relative;
    .content__cover {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &__action {
    &-play {
      position: absolute !important;
      top: 50%;
      left: 50%;
      color: rgba(255, 255, 255, 0.8);
      transform: translate(-50%, -50%);
    }
  }
}
</style>
