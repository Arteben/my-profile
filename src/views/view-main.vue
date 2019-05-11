<template>
  <v-container
    ref="container"
    :class="[$style.mainContainer, 'mainBackground']"
    fluid
  >
    <v-layout justify-center>
      <banners />
    </v-layout>
    <v-layout
      pa-4
      wrap
      align-center
      justify-center
    >
      <contacts />
      <v-img
        title="Это я!"
        class="my-2"
        :class="$style.myPhoto"
        :src="myPhotoSrc"
        max-width="150"
        width="100"
      />
    </v-layout>
    <v-layout
      wrap
      :justify-space-around="!isMobileScreen"
    >
      <info-block
        v-for="block of infoBlocks"
        :key="block.title"
        :p_title="block.title"
        :p_icon="block.icon"
        :p_items="block.items"
      />
    </v-layout>
  </v-container>
</template>

<script>
import myPhotoSrc from '@/assets/my-photo.jpg'
import { banners, contacts, infoBlock } from '@/components'
import infoBlocks from '@/assets/infoBlocks.json'

export default {
  name: 'ViewMain',
  components: {
    banners,
    contacts,
    infoBlock
  },
  data () {
    return {
      myPhotoSrc,
      infoBlocks
    }
  },
  computed: {
    isMobileScreen () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>

<style module>
  .mainContainer {
    min-height: 100%;
  }
  .myPhoto {
    border: 3px ridge floralwhite;
    border-radius: 5px;
    transform: rotate(3deg);
  }
</style>
