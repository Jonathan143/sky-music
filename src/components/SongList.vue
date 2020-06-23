<template>
  <div class="song-list">
    <div class="song-list__item d-flex ai-center"
      v-for="(item, i) of data"
      :key="i">
      <span class="song-list__item-serial">{{i+1}}</span>
      <van-image class="song-list__item-avatar"
        :src="item[coverKey]|compressionParam"
        width="38px"
        height="38px"
        lazy-load
        round />
      <div style="flex: 1">
        <p class="song-list__item-name sky-ellipsis">{{item[nameKey]}}</p>
        <p class="song-list__item-singer">{{item[singerKey]}}</p>
      </div>
      <slot name="right"
        v-bind="item"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class SongList extends Vue {
  @Prop({ type: Array, required: true }) private data!: []
  @Prop({ type: String, default: 'picUrl' }) private coverKey?: string
  @Prop({ type: String, default: 'name' }) private nameKey?: string
  @Prop({ type: String, default: 'singer' }) private singerKey?: string
}
</script>

<style lang="scss" scoped>
.song-list {
  padding: 12px 12px 12px 0;
  &__item {
    padding: 12px 0;
    &-serial {
      color: $color-text-sub;
      flex-shrink: 0;
      min-width: 40px;
      text-align: center;
    }
    &-avatar {
      margin-right: 12px;
      flex-shrink: 0;
    }
    &-name {
      color: $color-text-main;
      font-size: 14px;
    }
    &-singer {
      font-size: 10px;
      color: $color-text-sub;
    }
  }
}
</style>
