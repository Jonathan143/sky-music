<template>
  <div class="home-arists scroll-x d-flex">
    <template v-for="(arists, index) of aristsList">
      <arists-box class="home-arists__item animated fadeInUp"
        :style="{'animation-delay': `${0.1*index}s`}"
        :key="index"
        :data="arists" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fetchAristsList } from '@/api/home'

@Component
export default class HomeArists extends Vue {
  aristsList = []

  // onPlayClick() {}

  async mounted() {
    this.aristsList = await fetchAristsList()
  }
}
</script>

<style lang="scss" scoped>
.home-arists {
  padding: 12px;
  height: 114px;
  user-select: none;
  &__item {
    flex-shrink: 0;
    padding-right: 26px;
  }
}
</style>
