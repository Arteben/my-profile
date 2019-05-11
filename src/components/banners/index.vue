<template>
  <v-carousel
    class="elevation-0"
    hide-delimiters
    hide-controls
    height="auto"
  >
    <canvas-item />
  </v-carousel>
</template>

<script>
import CanvasItem from './canvas-item'
export default {
  name: 'Banners',
  components: {
    CanvasItem
  }
}
</script>

