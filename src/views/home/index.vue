<template>
  <div class="home">
    <div class="home-header">
      <van-icon name="search" />
      <van-tabs v-model="active"
        color="#9025fc"
        title-active-color="#303133">
        <template v-for="tab of tabList">
          <van-tab :title="tab"
            :key="tab"
            :name="tab"
            :to="{name:`home${tab}`}" />
        </template>
      </van-tabs>
      <van-image round
        width="30px"
        height="30px"
        src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  active = 'Suggest'
  tabList = ['Suggest', 'Favorites', 'Library']
}
</script>

<style lang="scss" scoped>
.home {
  height: 500px;
  &-header {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    ::v-deep .van-tabs {
      flex: 1;
      margin: 0 18px;
      .van-tabs__nav {
        background-color: unset;
      }
      .van-tab__text {
        transition: all 0.3s ease-in-out;
        font-weight: 600;
      }
      .van-tab--active {
        .van-tab__text {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
