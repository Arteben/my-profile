<template>
  <v-container
    id="resume"
    class="primaryBackground"
    fluid
  >
    <v-layout justify-center>
      <banners />
    </v-layout>
    <v-layout
      class="pt-4 px-3 pb-0"
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
  },
}
</script>
