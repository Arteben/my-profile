<template>
  <img
    :src="myPhoto2Src"
    :class="$style.myPhoto"
    :width="p_width"
    :height="p_width"
    :title="$langs.title('photo_itsMe')"
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
    border: 3px solid #FFF;
    border-radius: 10px;
  }
</style>
