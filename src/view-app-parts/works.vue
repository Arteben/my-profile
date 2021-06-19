<template>
  <v-container
    id="works"
    class="worksBackground"
    v-bind="{ [`grid-list-${size}`]: true }"
    fluid
  >
    <v-scale-transition
      class="layout justify-center wrap"
      origin="center center"
      tag="div"
      group
    >
      <my-work
        v-for="workItem in worksInfo"
        :key="workItem.link"
        :p_workData="workItem"
        @toggleWork="onExpendWork"
        :ref="workItem.name"
      />
    </v-scale-transition>
  </v-container>
</template>

<script>
import worksInfo from '@/assets/myWorks.json'
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
    myWork,
  },
  computed: {
    size () {
      return this.$vuetify.breakpoint.name
    },
  },
  methods: {
    onExpendWork ({ ref, isExpanded }) {
      this.worksInfo = [...this.worksInfo]
      if (isExpanded) {
        scrollToElementHref.call(this, ref, true)
      }
    },
  },
}
</script>

