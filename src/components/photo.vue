<template>
  <img
    :src="myPhoto2Src"
    :class="$style.myPhoto"
    :width="p_width"
    :height="p_width"
    title="Это я!"
    @load="$emit('imgPhotoLoad')"
  >
</template>

<script>
import myPhoto2Src from '@/assets/my-photo-2.jpg'

export default {
  name: 'Photo',
  props: {
    p_width: {
      default: 100,
      type: Number,
    },
  },
  data () {
    return {
      myPhoto2Src,
    }
  },
}
</script>

<style module>
  .myPhoto {
    border: 3px solid var(--v-primary-base);
    border-radius: 3px;
  }
</style>
