<template>
  <v-container
    ref="container"
    :class="[$style.container, 'mainBackground']"
    fluid
  >
    <v-layout justify-center>
      <banners />
    </v-layout>
  </v-container>
</template>

<script>
import { banners } from '@/components'
export default {
  name: 'ViewMain',
  components: {
    'banners': banners
  },
  data () {
    return {
      //
    }
  },
}
</script>

<style module>
  .container {
    min-height: calc(100% + 200px);
  }
</style>
