<template>
  <div class="favorites">
    <template v-if="userInfo.userId">
      <favorites-artists />
      <favorites-playlist />
    </template>

    <van-empty v-else
      class="sky-empty-image"
      :image="$CUSTOMIMAGE.login"
      description="请先登录" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FavoritesArtists from './components/FavoritesArtists.vue'
import FavoritesPlaylist from './components/FavoritesPlaylist.vue'
import { State } from 'vuex-class'

@Component({
  components: { FavoritesArtists, FavoritesPlaylist }
})
export default class HomeFavorites extends Vue {
  @State('userInfo') userInfo!: skyMusic.userInfo
}
</script>

<style lang="scss" scoped>
.favorites {
  margin-top: 56px;
}
</style>
