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
    />
  </v-layout>
</template>

<script>
import infoBlocks from '@/assets/infoBlocks.json'
import BlockInfoElement from './block-info-element'

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
    hasExpanded(_idx) {
      return this.p_isExpanded || (this.expandedBlock === _idx)
    },
    expand (_idx) {
      this.expandedBlock = _idx
    },
  },
  components: {
    BlockInfoElement,
  },
}
</script>
