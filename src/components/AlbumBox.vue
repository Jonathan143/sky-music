<template>
  <div class="album-box d-flex"
    :class="{'flex-column': column}">
    <div class="album-box__cover-container">
      <van-image class="album-box__cover"
        :width="size"
        :height="size"
        radius="12px"
        :src="src" />
      <van-image class="album-box__cd-cover"
        :width="size"
        :height="size"
        round
        :src="require('@/assets/image/singlecover.png')" />

      <van-icon name="play-circle"
        class="album-box__play-icon"
        @click.stop="onPlayClick" />
    </div>

    <slot>
      <div class="album-box__content">
        <div class="content__main sky-ellipsis"
          v-if="main">{{main}}</div>
        <div class="content__sub sky-ellipsis"
          v-if="sub">{{sub}}</div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ default: '', type: String }) src?: string
  @Prop({ default: '60', type: [String, Number] }) size?: string
  @Prop({ default: true, type: Boolean }) column?: boolean
  @Prop({ default: '', type: [String, Number] }) main?: string
  @Prop({ default: '', type: [String, Number] }) sub?: string

  onPlayClick() {}
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
    right: 4px;
    top: 4px;
    font-size: 20px;
    color: #fff;
    z-index: 3;
  }

  &__content {
    padding-top: 8px;
    .content {
      &__main {
        font-size: 14px;
        line-height: 18px;
        color: $color-text-main;
      }
      &__sub {
        font-size: 11px;
        color: $color-text-sub;
      }
    }
  }
}
.flex-column {
  flex-direction: column;
}
</style>
