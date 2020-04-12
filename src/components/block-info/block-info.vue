<template>
  <v-scale-transition
    :class="['layout', 'wrap', !isMobileScreen && 'justify-space-around']"
    origin="top left"
    tag="div"
    group
  >
    <block-info-element
      v-for="blockInfo of infoBlocks"
      :key="blockInfo.title"
      :p_blockInfo="blockInfo"
      @changeTabs="onChangeTabs"
      :ref="blockInfo.title"
    />
  </v-scale-transition>
</template>

<script>
import infoBlocks from '@/assets/infoBlocks.json'
import BlockInfoElement from './block-info-element'
import { scrollToElementHref } from '@/utils'

export default {
  name: 'BlockInfo',
  computed: {
    infoBlocks () {
      return infoBlocks || []
    },
    isMobileScreen () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    onChangeTabs({elementTitle, tabIdx}) {
      if (tabIdx === 1) {
        scrollToElementHref.call(this, elementTitle)
      }
    }
  },
  components: {
    BlockInfoElement
  }
}
</script>
