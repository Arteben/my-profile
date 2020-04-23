<template>
  <v-carousel
    class="elevation-0"
    hide-delimiters
    interval="15000"
    height="auto"
    @change="onCarouselSelected"
  >
    <template
      v-for="banner in banners"
    >
      <canvas-item
        :p_animationName="banner"
        :p_isSelected="(banner === selectedItem)"
        :key="banner"
      />
    </template>
  </v-carousel>
</template>

<script>
import CanvasItem from './canvas-item'

const banners = [
  'wordsBlocks', 'iWantToBe'
]

export default {
  name: 'Banners',
  data () {
    return {
      banners,
      selectedItem: null
    }
  },
  methods: {
    onCarouselSelected (_id) {
      this.selectedItem = banners[_id]
    }
  },
  components: {
    CanvasItem
  }
}
</script>

