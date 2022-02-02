<template>
  <v-container
    id="works"
    class="worksBackground pa-8"
    v-bind="{ [`grid-list-${size}`]: true }"
    fluid
  >
    <div
      v-if="isMobile"
      :class="wrapWorkClass"
    >
      <my-work
        v-for="workItem in worksInfo"
        :key="workItem.link"
        :p_workData="workItem"
        @toggleWork="onExpendWork"
        :ref="workItem.name"
      />
    </div>
    <v-scale-transition
      v-else
      :class="wrapWorkClass"
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
      wrapWorkClass: 'layout justify-center wrap'
    }
  },
  components: {
    myWork,
  },
  computed: {
    size () {
      return this.$vuetify.breakpoint.name
    },
    isMobile () {
      return this.$vuetify.breakpoint.xs
    }
  },
  methods: {
    onExpendWork ({ ref }) {
      this.worksInfo = [...this.worksInfo]
      scrollToElementHref.call(this, ref, true)
    },
  },
}
</script>

