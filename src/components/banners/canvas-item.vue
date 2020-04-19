<template>
  <v-carousel-item>
    <canvas
      ref="canvas"
      :class="$style.canvas"
      @v-resize="onResize"
      :style="{ height: elementHeight }"
      :width="width + 'px'"
      :height="height + 'px'"
    />
  </v-carousel-item>
</template>

<script>
import bannerAnimations from './animations/bannerAnimations'
export default {
  name: 'CanvasItem',
  props: {
    p_animationName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      animation: null,
      elementHeight: 'auto',
      width: 250,
      height: 40
    }
  },
  watch: {
    '$eventsBus.sound' (_flag) {
      if (this.animation) {
        this.animation.sound(_flag)
      }
    }
  },
  mounted() {
    var vuetifyTheme = this.$vuetify.theme
    var backgroundColor = vuetifyTheme.secondary
    var textColor = vuetifyTheme.primary
    if (this.p_animationName) {
      this.animation = bannerAnimations(this.p_animationName, {
        canvas: this.$refs.canvas,
        background: backgroundColor,
        textColor,
        width: this.width,
        height: this.height,
        isSound: this.$eventsBus.sound
      })
      this.animation.mounted()
      this.animation.action()
      this.$eventsBus.setListener('scrollApp', () => {
        this.animation.action()
      }, this)
    }
  },
  methods: {
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
