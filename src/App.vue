<template>
  <div id="app">
    <router-view />

    <sky-player />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SkyPlayer from '@/components/skyPlayer/skyPlayer.vue'

@Component({
  components: { SkyPlayer }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';

#app {
  &::after {
    height: 66px;
    display: block;
    content: '';
  }
}
</style>
