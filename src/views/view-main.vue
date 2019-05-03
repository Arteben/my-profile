<template>
  <v-container
    ref="container"
    :class="[$style.container]"
    fluid
  >
    <v-layout justify-center>
      <v-flex xs12>
        <banners />
      </v-flex>
      <!-- <v-card -->
      <!-- <v-card>
        asdfasdf
      </v-card> -->
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
