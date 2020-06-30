<template>
  <div class="favorites">
    <favorites-artists />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FavoritesArtists from './components/FavoritesArtists.vue'

@Component({
  components: { FavoritesArtists }
})
export default class HomeFavorites extends Vue {}
</script>

<style lang="scss" scoped>
.favorites {
  margin-top: 56px;
}
</style>
