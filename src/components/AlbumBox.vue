<template>
  <div class="album-box d-flex">
    <div class="album-box__cover-container">
      <van-image class="album-box__cover"
        :width="size"
        :height="size"
        radius="12px"
        src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <van-image class="album-box__cd-cover"
        :width="size"
        :height="size"
        round
        :src="require('@/assets/image/singlecover.png')" />

      <van-icon name="play-circle"
        class="album-box__play-icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ default: '60', type: [String, Number] }) size?: string
}
</script>

<style lang="scss" scoped>
.album-box {
  &__cover-container {
    position: relative;
  }
  &__cover {
    z-index: 1;
  }
  &__cd-cover {
    position: absolute;
    left: 12px;
    top: 0;
  }

  &__play-icon {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
  }
}
</style>
