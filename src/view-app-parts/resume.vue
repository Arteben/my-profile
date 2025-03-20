<template>
  <v-container
    id="resume"
    :class="$style.mainContainer"
    class="primaryBackground"
    fluid
  >
    <v-layout
      :class="$style.bannersLayout"
      justify-center
    >
      <banners />
    </v-layout>
    <v-layout
      class="pt-4 px-3 pb-0"
      :class="[isWideScreen ? 'pt-8 pb-2' : '', $style.contactsLayout]"
      wrap
      align-center
      justify-center
    >
      <contacts />
      <v-spacer v-if="!isMobileScreen" />
      <my-photo />
    </v-layout>
    <v-layout
      wrap
      :justify-space-around="!isMobileScreen"
    >
      <info-blocks />
    </v-layout>
  </v-container>
</template>

<script>
import { banners, contacts, infoBlocks, myPhoto } from '@/components'

export default {
  name: 'Resume',
  components: {
    banners,
    contacts,
    infoBlocks,
    myPhoto,
  },

  computed: {
    isMobileScreen () {
      return this.$vuetify.breakpoint.smAndDown
    },
    isWideScreen () {
      return this.$vuetify.breakpoint.lgAndUp
    },
  },
}
</script>

<style module>
.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contactsLayout {
  max-width: 900px;
  width: 80%;
}
.bannersLayout {
  max-width: 1000px;
  width: 70%;
}
</style>
