<template>
  <div>
    <img
      v-if="p_isPrintMode"
      :src="myPhotoSrc"
      :class="$style.myPhoto"
      width="100"
      @load="$emit('photoLoad')"
    >
    <v-img
      v-else
      title="Это я!"
      class="my-2"
      :class="$style.myPhoto"
      :src="myPhotoSrc"
      max-width="150"
      width="100"
    />
  </div>
</template>

<script>
import myPhotoSrc from '@/assets/my-photo.jpg'

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
      myPhotoSrc
    }
  }
}
</script>

<style module>
  .myPhoto {
    border: 3px ridge floralwhite;
    border-radius: 5px;
    transform: rotate(3deg);
  }
</style>
