<template>
  <div class="arists-box">
    <van-image radius="12px"
      :src="data[coverKey]|compressionParam"
      lazy-load
      :width="width"
      :height="height"
      fit="cover" />

    <div class="arists-box__name sky-ellipsis"
      v-if="data[nameKey]">{{data[nameKey]}}</div>

    <van-icon name="play-circle"
      v-if="playVisible"
      class="arists-box__play-icon"
      @click.stop="onPlayClick" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AristsBox extends Vue {
  @Prop({ default: () => ({}), type: Object }) data!: {}
  @Prop({ default: '90px', type: [String, Number] }) width?: string
  @Prop({ default: '114px', type: [String, Number] }) height?: string
  @Prop({ default: 'picUrl', type: String }) coverKey?: string
  @Prop({ default: 'name', type: String }) nameKey?: string
  @Prop({ default: true, type: Boolean }) playVisible?: string

  onPlayClick() {
    this.$emit('play', this.data)
  }
}
</script>

<style lang="scss" scoped>
.arists-box {
  font-size: 0;
  user-select: none;
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
    border-radius: 50%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  ::v-deep .van-image {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>
