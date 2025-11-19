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
      @expandCard="expandCard(idx, true)"
      @collapseCard="expandCard(idx, false)"
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
    p_isAllExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      infoBlocks: (infoBlocks || []),
      expandedBlock: null,
      expandedBlocks: [],
    }
  },
  created() {
    this.infoBlocks.forEach((element, idx) => {
      if (this.p_isAllExpanded) {
        this.expandedBlocks[idx] = true
        return
      }

      this.expandedBlocks[idx] = Boolean(idx == 0)
    })
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
      return this.expandedBlocks[_idx] == true
    },
    expandCard (_idx, isExpand) {
      if (this.expandedBlocks[_idx] == undefined) {
        return
      }

      if (isExpand) {
        this.expandedBlocks.fill(false)
        this.expandedBlocks[_idx] = true
        scrollToElementHref.call(this, this.getHref(_idx))
      } else {
        this.expandedBlocks[_idx] = isExpand
      }

      this.expandedBlocks = [...this.expandedBlocks]
    },
  },
  components: {
    BlockInfoElement,
  },
}
</script>
