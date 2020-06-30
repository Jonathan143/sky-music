<template>
  <div class="favorites">
    <favorites-artists />
    <favorites-playlist />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FavoritesArtists from './components/FavoritesArtists.vue'
import FavoritesPlaylist from './components/FavoritesPlaylist.vue'

@Component({
  components: { FavoritesArtists, FavoritesPlaylist }
})
export default class HomeFavorites extends Vue {}
</script>

<style lang="scss" scoped>
.favorites {
  margin-top: 56px;
}
</style>
