<template>
  <div id="app"
    class="safe-area-inset-bottom"
    :class="{'sky-player-placeholder': isPlayerVisible}">
    <router-view />

    <sky-player v-show="isPlayerVisible" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SkyPlayer from '@/components/skyPlayer/skyPlayer.vue'
import { Getter } from 'vuex-class'

@Component({
  components: { SkyPlayer }
})
export default class App extends Vue {
  @Getter('isPlayerVisible') isPlayerVisible!: boolean
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';

.sky-player-placeholder {
  &::after {
    height: 66px;
    display: block;
    content: '';
  }
}
</style>
