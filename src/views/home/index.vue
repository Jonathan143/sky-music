<template>
  <div class="home">
    <div class="home-header"
      :class="{'home-header-background': active!=='Suggest'}">
      <van-icon name="search" />
      <van-tabs v-model="active"
        color="#9025fc"
        title-active-color="#303133">
        <template v-for="tab of tabList">
          <van-tab :title="tab"
            :key="tab"
            :name="tab"
            replace
            :to="{name:`home${tab}`}" />
        </template>
      </van-tabs>
      <van-image round
        width="30px"
        height="30px"
        :src="avatar|replaceHttp"
        @click="onAvatarClick" />
    </div>

    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Home extends Vue {
  @State('userInfo') userInfo!: skyMusic.userInfo
  @State('isLogin') isLogin!: boolean

  active = 'Suggest'
  tabList = ['Suggest', 'Favorites', 'Library']

  public get avatar(): string {
    return this.userInfo.avatarUrl || require('@/assets/image/logo.png')
  }

  onAvatarClick() {
    !this.isLogin &&
      this.$router.push({
        name: 'login',
        query: { redirect: this.$route.fullPath }
      })
  }

  @Watch('$route.name', { immediate: true })
  onRouteNameChange(name: string) {
    this.active = name.replace('home', '')
  }
}
</script>

<style lang="scss" scoped>
.home {
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
    backdrop-filter: blur(6px);
    &-background {
      background-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
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
      .van-hairline--top-bottom::after {
        border: none;
      }
    }
  }
}
</style>
