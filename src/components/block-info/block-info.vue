<template>
  <v-layout
    wrap
    justify-center
  >
    <block-info-element
      v-for="(blockInfo, idx) of infoBlocks"
      :key="idx"
      :p_blockInfo="blockInfo"
      :p_isExpanded="hasExpanded(idx)"
      @expandCard="expand(idx)"
      :ref="getHref(idx)"
    />
  </v-layout>
</template>

<script>
import infoBlocks from '@/assets/infoBlocks.json'
import BlockInfoElement from './block-info-element'
import { scrollToElementHref } from '@/utils'

export default {
  name: 'BlockInfo',
  props: {
    p_isExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      infoBlocks: (infoBlocks || []),
      expandedBlock: null,
    }
  },
  computed: {
    isMobileScreen () {
      return this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    getHref (_idx) {
      return 'blockElement_' + _idx
    },
    hasExpanded(_idx) {
      return this.p_isExpanded || (this.expandedBlock === _idx)
    },
    expand (_idx) {
      if (this.expandedBlock == _idx) {
        this.expandedBlock = null
      } else {
        this.expandedBlock = _idx
        scrollToElementHref.call(this, this.getHref(_idx))
      }
    },
  },
  components: {
    BlockInfoElement,
  },
}
</script>
