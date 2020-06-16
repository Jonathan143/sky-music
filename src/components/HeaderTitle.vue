<template>
  <div class="header-title d-flex jc-between ai-center">
    <div class="header-title__content">
      <slot>
        <span class="content__main"
          :style="{fontSize: size}">{{title}}</span>
        <template v-if="sub">
          <span class="content__divide">/</span>
          <span class="content__sub">{{sub}}</span>
        </template>
      </slot>
    </div>
    <div class="d-flex ai-center"
      @click="onRightClick">
      <slot name="icon">
        <van-icon :name="icon"
          size="14px"
          color="#909399" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class HeaderTitle extends Vue {
  @Prop({ default: '16px' }) private size?: string
  @Prop({ default: '' }) private title?: string
  @Prop({ default: '' }) private sub?: string
  @Prop({ default: 'arrow' }) private icon?: string

  onRightClick() {
    this.$emit('click')
  }
}
</script>

<style lang="scss" scoped>
.header-title {
  padding: 0 12px;
  &__content {
    .content {
      &__main {
        font-size: 16px;
        font-weight: bold;
        color: $color-text-main;
      }
      &__divide {
        color: $color-text-sub;
        font-size: 12px;
        padding: 0 8px;
      }
      &__sub {
        font-size: 12px;
        color: $color-text-sub;
      }
    }
  }
}
</style>
