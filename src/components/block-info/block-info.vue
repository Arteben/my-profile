<template>
  <v-layout
    wrap
    :justify-space-around="!isMobileScreen"
  >
    <v-flex
      ma-3
      :class="$style.rootContainer"
      v-for="block of infoBlocks"
      :key="block.title"
    >
      <p
        :title="block.title"
      >
        <v-icon
          x-large
        >mdi-{{ block.icon }}</v-icon>
        &nbsp;
        <span
          class="title"
        >{{ block.title }}:</span>
      </p>
      <p
        v-for="item of block.items"
        :key="item.title"
        class="pl-4 body-2"
        :title="item.title"
      >
        <v-icon
          :size="item.isBig && '24' || '18'"
        >mdi-{{ item.icon }}</v-icon>
        &nbsp;
        <span
          :class="item.isBig && 'subheading' || ''"
        >{{ item.name || item.title }}</span>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import infoBlocks from '@/assets/infoBlocks.json'

export default {
  name: 'Contacts',
  computed: {
    infoBlocks () {
      return infoBlocks || []
    },
    isMobileScreen () {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>

<style module>
  .rootContainer {
    min-width: 250px;
    flex-grow: 0;
  }
</style>
