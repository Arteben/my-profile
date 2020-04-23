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
    },
    p_isSelected: {
      type: Boolean,
      default: false
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
    isSound (_flag) {
      this.animation.sound(_flag)
    },
    p_isSelected (_flag) {
      if (_flag) {
        this.animation.action()
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
      if (this.p_isSelected) {
        this.animation.action()
      }
    }
  },
  computed: {
    isSound () {
      return (this.animation && this.$eventsBus.sound && this.p_isSelected)
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
