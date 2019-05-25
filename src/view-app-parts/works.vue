<template>
  <v-container
    id="works"
    :class="[$style.mainContainer, 'mainBackground-light-4']"
    fluid
  >
    works
  </v-container>
</template>

<script>
import getJson from '@/mixins/getJson'
export default {
  name: 'Resume',
  created () {
    this.getJsonData('projects.json')
  },
  watch: {
    jsonData (_data) {
      console.log('json', _data)
    }
  },
  mixins: [
    getJson
  ]
}
</script>

<style module>
  .mainContainer {
    min-height: 2000px;
    background: white !important;
    /* min-height: 100%; */
  }
</style>
