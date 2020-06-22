<template>
  <div class="home-popular">
    <van-swipe :autoplay="0"
      :loop="false"
      :show-indicators="false">
      <van-swipe-item v-for="(ranking, index) in rankingList"
        :key="index">
        <div class="home-popular__container">
          <div class="home-popular__header d-flex ai-center jc-between"
            :style="getHeaderStyle(index)">
            <div class="d-flex ai-center">
              <span class="header__name">{{ranking.name}}</span>
              <van-icon name="arrow"
                size="14px" />
            </div>

            <van-icon name="play-circle"
              size="20px"
              @click.stop="onPlayClick" />
          </div>

          <div class="home-popular__content">
            <div class="content__item d-flex ai-center"
              v-for="(item, i) of ranking.tracks"
              :key="i">
              <span class="content__item-serial">{{i+1}}</span>
              <van-image class="content__item-avatar"
                :src="item.picUrl"
                width="38px"
                height="38px"
                round />
              <div>
                <p class="content__item-name">{{item.name}}</p>
                <p class="content__item-singer">{{item.singer}}</p>
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchRankingList } from '@/api/home'

@Component
export default class HomePopular extends Vue {
  rankingList = []

  onPlayClick() {}

  getHeaderStyle(index: number) {
    const colors = [
      '#ee9ae5 10%, #5961f9 100%',
      '#f97794 10%, #623aa2 100%',
      '#EEAD92 10%, #6018DC 100%'
    ]
    return {
      backgroundImage: `linear-gradient(135deg, ${colors[index]})`
    }
  }

  async mounted() {
    const requests = []
    for (const id of [1, 0, 3]) {
      requests.push(fetchRankingList(id, 10))
    }
    this.rankingList = (await Promise.all(requests)) as []
  }
}
</script>

<style lang="scss" scoped>
.home-popular {
  &__container {
    padding: 12px;
  }

  &__header {
    padding: 12px;
    margin: 0 12px;
    border-radius: 20px 20px 0 0;
    .header__name {
      font-size: 14px;
      line-height: 1;
      color: #fff;
      padding-right: 3px;
    }
    .van-icon {
      color: #fff;
    }
  }

  &__content {
    padding: 12px;
    border-radius: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .content__item {
      padding: 12px 0;
      &-serial {
        color: $color-text-sub;
        flex-shrink: 0;
      }
      &-avatar {
        margin: 0 12px;
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
}
</style>
