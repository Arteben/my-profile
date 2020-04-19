<template>
  <v-carousel
    class="elevation-0"
    hide-delimiters
    interval="15000"
    height="auto"
  >
    <template
      v-for="banner in banners"
    >
      <canvas-item
        :p_animationName="banner"
        :key="banner"
      />
    </template>
  </v-carousel>
</template>

<script>
import CanvasItem from './canvas-item'

const banners = [
  'iWantToBe', 'wordsBlocks'
]

export default {
  name: 'Banners',
  data () {
    return {
      banners
    }
  },
  components: {
    CanvasItem
  }
}
</script>

