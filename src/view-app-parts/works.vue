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
      class="ma-1"
    >
      <my-work
        v-for="workItem in worksInfo"
        :key="workItem.img"
        :p_workData="workItem"
        :p_isExpandWork="isExpanded(workItem.img)"
        @toggleWork="onExpendWork"
        :ref="getWorkItemRef(workItem.img)"
      />
    </div>
    <v-scale-transition
      v-else
      class="ma-1"
      :class="wrapWorkClass"
      origin="center center"
      tag="div"
      group
    >
      <my-work
        v-for="workItem in worksInfo"
        :key="workItem.img"
        :p_workData="workItem"
        :p_isExpandWork="isExpanded(workItem.img)"
        @toggleWork="onExpendWork"
        :ref="getWorkItemRef(workItem.img)"
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
      wrapWorkClass: 'layout justify-center wrap',
      expandedWork: null,
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
    },
  },
  methods: {
    onExpendWork (_idx) {
      this.worksInfo = [...this.worksInfo]
      if (this.expandedWork == _idx) {
        this.expandedWork = null
      } else {
        this.expandedWork = _idx
        scrollToElementHref.call(this, this.getWorkItemRef(_idx), true)
      }
    },
    getWorkItemRef(_idx) {
      return 'workItem' + _idx
    },
    isExpanded(_workId) {
      return this.expandedWork == _workId
    },
  },
}
</script>

