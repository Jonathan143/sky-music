<template>
  <div class="album-box d-flex"
    :class="{'flex-row': row}">
    <div class="album-box__cover-container">
      <van-image class="album-box__cover"
        :width="size"
        :height="size"
        lazy-load
        radius="12px"
        :src="src" />
      <van-image class="album-box__cd-cover"
        :width="size"
        :height="size"
        round
        :src="require('@/assets/image/singlecover.png')" />

      <van-icon name="play-circle"
        v-if="playVisible"
        class="album-box__play-icon"
        @click.stop="onPlayClick" />
    </div>

    <slot>
      <div class="album-box__content">
        <div class="content__main sky-ellipsis">
          <slot name="main">{{main}}</slot>
        </div>
        <div class="content__sub sky-ellipsis">
          <slot name="sub">{{sub}}</slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ default: '', type: String }) src?: string
  @Prop({ default: '', type: [String, Number] }) id?: string
  @Prop({ default: '60', type: [String, Number] }) size?: string
  @Prop({ default: false, type: Boolean }) row?: boolean
  @Prop({ default: '', type: [String, Number] }) main?: string
  @Prop({ default: '', type: [String, Number] }) sub?: string
  @Prop({ default: true, type: Boolean }) playVisible?: string

  onPlayClick() {
    this.$emit('play', this.id)
  }
}
</script>

<style lang="scss" scoped>
.album-box {
  flex-direction: column;
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
.flex-row {
  flex-direction: row;
  .album-box {
    &__content {
      padding: {
        top: 0;
        left: 20px;
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      .content__main {
        font-size: 15px;
        font-weight: bold;
        padding-bottom: 8px;
      }
    }
  }
}
</style>
