<template>
  <v-carousel
    class="elevation-0"
    hide-delimiters
    interval="15000"
    height="auto"
  >
    <canvas-item
      key="1"
    />
    <canvas-item
      key="2"
    />
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

