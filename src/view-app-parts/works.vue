<template>
  <v-container
    id="works"
    class="worksBackground"
    v-bind="{ [`grid-list-${size}`]: true }"
    fluid
  >
    <v-scale-transition
      :class="[$style.transitionDiv, 'layout']"
      tag="div"
      group
      origin="center center"
    >
      <my-work
        v-for="workItem in worksInfo"
        :key="workItem.link"
        :p_workData="workItem"
        @toggletWork="onExpendWork"
        :ref="workItem.name"
      />
    </v-scale-transition>
  </v-container>
</template>

<script>
import worksInfo from '@/assets/myWorks.json'
// import query from '@/mixins/query'
import { myWork } from '@/components'
import { scrollToElementHref } from '@/utils'

export default {
  name: 'Works',
  data () {
    return {
      worksInfo,
    }
  },
  components: {
    myWork
  },
  computed: {
    size () {
      return this.$vuetify.breakpoint.name
    }
  },
  methods: {
    onExpendWork (_nameWork, _isExpended) {
      if (_isExpended) {
        scrollToElementHref.call(this, _nameWork, true)
      }
    }
  },
}
</script>

<style module>
  .transitionDiv {
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
