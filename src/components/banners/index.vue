<template>
  <v-carousel
    class="elevation-0"
    hide-delimiters
    hide-controls
  >
    <v-carousel-item>
      <want-be-game-dev />
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import wantBeGameDev from './wantBeGameDev'
export default {
  name: 'Banners',
  components: {
    wantBeGameDev
  }
}
</script>

