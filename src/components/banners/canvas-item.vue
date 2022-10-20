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
      default: '',
    },
    p_isSelected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      animation: null,
      elementHeight: 'auto',
      width: 250,
      height: 48,
      isFirstLoaded: false,
    }
  },
  watch: {
    isSound (_flag) {
      this.animation && this.animation.sound(_flag)
    },
    p_isSelected (_flag) {
      if (_flag && this.animation && this.isFirstLoaded) {
        this.animation.play()
      }
    },
  },
  mounted() {
    var vuetifyTheme = this.$vuetify.theme
    var backgroundColor = vuetifyTheme.primaryBackground
    if (typeof backgroundColor == 'object') {
      backgroundColor = backgroundColor.base
    }
    var textColor = vuetifyTheme.primaryText
    if (typeof textColor == 'object') {
      textColor = textColor.base
    }
    if (this.p_animationName) {
      this.animation = bannerAnimations(this.p_animationName, {
        canvas: this.$refs.canvas,
        background: backgroundColor,
        textColor,
        width: this.width,
        height: this.height,
      })
    }

    window.addEventListener('load', this.playAnimationForLoaded)
  },
  beforeDestroy () {
    window.removeEventListener('load', this.playAnimationForLoaded)
  },
  methods: {
    playAnimationForLoaded () {
      this.animation && this.animation.play()
      this.isFirstLoaded = true
    },
    onResize() {
      if (this.animation) {
        let elementWidth = this.$el.clientWidth
        this.elementHeight = elementWidth * this.animation.p
      }
    },
  },
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
