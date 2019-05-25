<template>
  <v-container
    id="works"
    class="worksBackground"
    v-bind="{ [`grid-list-${size}`]: true }"
    fluid
  >
    <v-layout
      wrap
      justify-center
    >
      <my-work
        v-for="workItem in myWorks"
        :key="workItem.name"
        :p_workData="workItem"
      />
    </v-layout>
  </v-container>
</template>

<script>
import query from '@/mixins/query'
import { myWork } from '@/components'

export default {
  name: 'Works',
  data () {
    return {
      myWorks: null
    }
  },
  components: {
    myWork
  },
  created () {
    this.initQuery('myWorks', 'projects.json')
  },
  watch: {
    'myWorks' (_data) {
      console.log('json', _data)
    }
  },
  computed: {
    size () {
      return this.$vuetify.breakpoint.name
    }
  },
  mixins: [
    query
  ]
}
</script>

<style module>
</style>
