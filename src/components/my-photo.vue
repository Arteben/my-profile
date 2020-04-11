<template>
  <v-flex>
    <img
      v-if="p_isPrintMode"
      :src="myPhoto2Src"
      :class="$style.myPhoto"
      width="100"
      @load="$emit('photoLoad')"
    >
    <v-layout
      v-else
      column
      align-center
      class="my-2"
      :class="$style.photoWithLabel"
    >
      <v-img
        title="Это я!"
        :class="$style.myPhoto"
        :src="myPhoto2Src"
        width="100"
        height="100"
      />
      <v-flex
        class="body-2"
        flex-grow-0
      >Это я!</v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import myPhoto2Src from '@/assets/my-photo-2.jpg'

export default {
  name: 'MyPhoto',
  props: {
    p_isPrintMode: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      myPhoto2Src
    }
  }
}
</script>

<style module>
  .photoWithLabel {
    transform: rotate(-4deg);
  }
  .myPhoto {
    border: 3px solid var(--v-primary-base);
    border-radius: 3px;
  }
</style>
