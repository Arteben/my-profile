<template>
  <v-flex>
    <img-photo
      v-if="p_isPrintMode"
      :p_width="100"
      @imgPhotoLoad="$emit('photoLoad')"
    />
    <v-layout
      v-else
      column
      align-center
      :class="[$style.photoWithLabel, photoPadding]"
    >
      <img-photo
        v-if="isNormalPhoto"
        :p_width="100"
      />
      <img-photo
        v-else
        :p_width="200"
      />
      <v-flex
        class="body-2"
        flex-grow-0
      >Это я!</v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { default as imgPhoto } from './photo'

export default {
  name: 'TitlePhoto',
  props: {
    p_isPrintMode: {
      default: false,
      type: Boolean,
    },
  },
  components: {
    imgPhoto,
  },
  computed: {
    isNormalPhoto () {
      const breakpoint = this.$vuetify.breakpoint
      return !(breakpoint && breakpoint.xs)
    },
    photoPadding () {
      return this.isNormalPhoto && 'my-2' || 'my-4'
    },
  },
}
</script>

<style module>
  .photoWithLabel {
    transform: rotate(-4deg);
    color: var(--v-primaryText-base);
  }
</style>
