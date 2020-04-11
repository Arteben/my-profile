<template>
  <v-carousel-item>
    <canvas
      ref="canvas"
      :class="$style.canvas"
      @mousemove="startAnimate"
      v-touch="onTouch(startAnimate)"
      @v-resize="onResize"
      :style="{ height: elementHeight }"
      width="250px"
      height="40px"
    />
  </v-carousel-item>
</template>

<script>
import BannerAnimate from './animations'
export default {
  name: 'CanvasItem',
  data() {
    return {
      animation: null,
      elementHeight: 'auto'
    }
  },
  mounted() {
    var vuetifyTheme = this.$vuetify.theme
    var backgroundColor = vuetifyTheme.secondary
    var textColor = vuetifyTheme.primary
    this.animation = new BannerAnimate(this.$refs.canvas, backgroundColor, textColor)
    this.animation.draw()

    this.animation.animateBottom()
  },
  methods: {
    onTouch (_function) {
      var touchFunctions = {}
      var directions = ['left', 'right', 'top', 'bottom']
      directions.forEach((_dir) => {
        touchFunctions[_dir] = () => _function('touch')
      })
      return touchFunctions
    },
    startAnimate () {
      this.animation.animateBottom()
    },
    onResize() {
      if (this.animation) {
        let elementWidth = this.$el.clientWidth
        this.elementHeight = elementWidth * this.animation.p
      }
    }
  }
}
</script>

<style module>
.canvas {
  width: 100%;

  image-rendering: optimizeSpeed; /* Older versions of FF */
  image-rendering: -moz-crisp-edges; /* FF 6.0+ */
  image-rendering: -webkit-optimize-contrast; /* Safari */
  image-rendering: -o-crisp-edges; /* OS X & Windows Opera (12.02+) */
  image-rendering: pixelated; /* Awesome future-browsers */
  -ms-interpolation-mode: nearest-neighbor; /* IE */
}
</style>
