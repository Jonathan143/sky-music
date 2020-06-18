<template>
  <div class="discovery">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(banner, index) in bannerList"
        :key="index">
        <div class="discovery-swipe__image-container">
          <van-image :src="banner.imageUrl"
            height="140px"
            lazy-load />
        </div>
      </van-swipe-item>
    </van-swipe>

    <div>
      <header-title class="discovery__header-title"
        v-model="active"
        :content="['Album','Arists']" />

      <div class="discovery__album-container scroll-x d-flex">
        <template v-for="i of 10">
          <album-box :key="i"
            size="68px"></album-box>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchBanner, fetchSongList } from '@/api/home'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class HomeLibrary extends Vue {
  bannerList = []
  songList = []
  active = 'Album'

  async mounted() {
    const result = await Promise.all([fetchBanner(), fetchSongList()])
    this.bannerList = result[0]
    this.songList = result[1]
  }
}
</script>

<style lang="scss" scoped>
.discovery {
  margin-top: 44px;
  &-swipe__image-container {
    padding: 10px 12px;
    ::v-deep .van-image {
      border-radius: 16px;
      &__img {
        border-radius: 16px;
        box-shadow: 0 26px 8px -20px rgba(144, 37, 252, 0.3);
      }
    }
  }

  ::v-deep .van-swipe {
    &__indicators {
      bottom: 20px;
    }
    &__indicator {
      width: 8px;
      height: 3px;
      border-radius: 6px;
      &--active {
        opacity: 1;
        background-color: #fff;
      }
    }
  }

  &__header-title {
    margin-top: 12px;
    .content {
      &__divide {
        color: $color-text-sub;
        font-size: 12px;
        padding: 0 8px;
      }
      &__item {
        font-size: 12px;
        color: $color-text-sub;
        transition: all 0.3s ease-in-out;
        &--active {
          font-size: 16px;
          font-weight: bold;
          color: $color-text-main;
        }
      }
    }
  }
  &__album-container {
    padding: 12px;
    & > .album-box {
      padding-right: 36px;
    }
  }
}
</style>
