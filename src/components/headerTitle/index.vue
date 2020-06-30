<template>
  <div class="header-title d-flex jc-between ai-center">
    <div class="header-title__content d-flex ai-center">
      <slot>
        <template v-for="(item,index) of mainContent">
          <div :key="index">
            <span class="content__divide"
              v-if="index">/</span>
            <span class="content__main"
              :style="{fontSize: value===item?size:'12px'}"
              :class="{'content__main--active': value===item}"
              @click="onTagClick(item)">{{item}}</span>
          </div>
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
import { Component, Vue, Prop, Model } from 'vue-property-decorator'

@Component
export default class HeaderTitle extends Vue {
  @Prop({ default: '16px' }) private size?: string
  @Prop({ default: '', type: [String, Array] }) private content?: string
  @Prop({ default: 'arrow' }) private icon?: string
  @Model('change', { type: String, default: '' }) value!: string

  public get mainContent() {
    return typeof this.content === 'string'
      ? this.content.split(' ')
      : this.content
  }

  onTagClick(val: string) {
    this.$emit('change', val)
  }

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
        font-size: 12px;
        color: $color-text-sub;
        transition: all 0.3s ease-in-out;
        &--active {
          font-size: 18px;
          font-weight: bold;
          color: $color-text-main;
        }
      }
      &__divide {
        color: $color-text-sub;
        font-size: 12px;
        padding: 0 8px;
      }
    }
  }
}
</style>
